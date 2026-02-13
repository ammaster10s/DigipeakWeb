/**
 * Codelift Main Application Logic
 * Handles Workspace, Connectivity, HUD, and Program Execution
 */

// Initialize Workspace
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  theme: (Blockly.Themes && Blockly.Themes.Dark) ? Blockly.Themes.Dark : null,
  zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
  trashcan: true
});

// State Management
let bleIsConnected = false;
let bleCmdChar = null;
let bleTelemChar = null;
let device, server, service;

const BLE_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const BLE_CMD_CHAR_UUID = '0000fff1-0000-1000-8000-00805f9b34fb';
const BLE_TELEM_CHAR_UUID = '0000fff2-0000-1000-8000-00805f9b34fb';

// --- UI UPDATES ---
function setStatus(text, isConnected) {
  const el = document.getElementById('connStatus');
  const dot = document.getElementById('statusDot');
  if (el) el.textContent = text.toUpperCase();
  if (dot) dot.className = isConnected ? 'status-dot connected' : 'status-dot';
  bleIsConnected = isConnected;
}

function updateHUD(data) {
  if (data.bat !== undefined) document.getElementById('hud-bat').textContent = `${data.bat.toFixed(1)} V`;
  if (data.alt !== undefined) document.getElementById('hud-alt').textContent = `${data.alt.toFixed(2)} M`;
  if (data.y !== undefined) document.getElementById('hud-yaw').textContent = `${Math.round(data.y)}°`;

  const statusEl = document.getElementById('hud-status');
  if (data.st !== undefined) {
    statusEl.textContent = data.st ? 'ARMED' : 'DISARMED';
    statusEl.style.color = data.st ? 'var(--accent-success)' : 'var(--accent-danger)';
  }

  // Update IMU stats
  if (data.imu) {
    if (data.imu.ax !== undefined) document.getElementById('hud-ax').textContent = `${data.imu.ax.toFixed(3)} g`;
    if (data.imu.ay !== undefined) document.getElementById('hud-ay').textContent = `${data.imu.ay.toFixed(3)} g`;
    if (data.imu.az !== undefined) document.getElementById('hud-az').textContent = `${data.imu.az.toFixed(3)} g`;
    if (data.imu.t !== undefined) document.getElementById('hud-temp').textContent = `${data.imu.t.toFixed(1)} °C`;
  }

  // Update horizon (AHRS)
  const horizon = document.getElementById('horizon');
  if (horizon && data.r !== undefined && data.p !== undefined) {
    horizon.style.transform = `rotate(${data.r}deg) translateY(${data.p * 0.5}px)`;
  }
}

function logToTerminal(msg, isError = false) {
  const log = document.getElementById('simLog');
  if (!log) return;
  const timestamp = new Date().toLocaleTimeString([], { hour12: false });
  log.value += `[${timestamp}] ${isError ? '❌ ' : '>> '} ${msg}\n`;
  log.scrollTop = log.scrollHeight;
}

// --- CONNECTIVITY ---
async function connectBLE() {
  try {
    logToTerminal('Searching for Codelift-enabled drone...');
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [BLE_SERVICE_UUID] }]
    });

    device.addEventListener('gattserverdisconnected', () => {
      setStatus('DISCONNECTED', false);
      logToTerminal('BLE Link Lost', true);
    });

    server = await device.gatt.connect();
    service = await server.getPrimaryService(BLE_SERVICE_UUID);
    bleCmdChar = await service.getCharacteristic(BLE_CMD_CHAR_UUID);
    bleTelemChar = await service.getCharacteristic(BLE_TELEM_CHAR_UUID);

    await bleTelemChar.startNotifications();
    bleTelemChar.addEventListener('characteristicvaluechanged', (e) => {
      const str = new TextDecoder().decode(e.target.value);
      try {
        const data = JSON.parse(str);
        updateHUD(data);
      } catch (err) { }
    });

    setStatus('CONNECTED', true);
    logToTerminal(`Linked to ${device.name}`);
  } catch (err) {
    logToTerminal(`Connection Error: ${err.message}`, true);
  }
}

// --- PROGRAM GENERATION & UPLOAD ---
function generatePayload() {
  try {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const commands = code.split('~')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => JSON.parse(s));

    return JSON.stringify(commands);
  } catch (err) {
    return null;
  }
}

async function uploadBLE() {
  if (!bleIsConnected) return alert('Link a drone via BLE first!');

  const payload = generatePayload();
  if (!payload || payload === '[]') return logToTerminal('Workspace is empty', true);

  try {
    logToTerminal(`Uploading ${JSON.parse(payload).length} commands...`);
    const data = new TextEncoder().encode(payload + '\n');
    const mtu = 200;
    for (let i = 0; i < data.length; i += mtu) {
      await bleCmdChar.writeValue(data.slice(i, i + mtu));
    }
    logToTerminal('Upload Synchronized');
  } catch (err) {
    logToTerminal(`Upload Failed: ${err.message}`, true);
  }
}

// --- MANUAL OVERRIDES ---
async function sendManualCmd(cmdObj) {
  if (!bleIsConnected) return;
  const data = new TextEncoder().encode(JSON.stringify(cmdObj) + '\n');
  await bleCmdChar.writeValue(data);
  logToTerminal(`Manual Override: ${cmdObj.cmd || cmdObj.event}`);
}

window.armDrone = () => sendManualCmd({ cmd: 'arm' });
window.disarmDrone = () => sendManualCmd({ cmd: 'disarm' });
window.landNow = () => sendManualCmd({ cmd: 'land' });
window.emergencyStop = () => sendManualCmd({ cmd: 'estop' });

// --- SIMULATION ---
function simulate() {
  const payload = generatePayload();
  if (!payload) return logToTerminal('Invalid logic in workspace', true);

  const cmds = JSON.parse(payload);
  logToTerminal('--- SIMULATION START ---');
  cmds.forEach((c, i) => {
    logToTerminal(`Step ${i + 1}: ${c.cmd || c.event}`);
    if (c.actions) {
      c.actions.forEach(a => logToTerminal(`  -> Action: ${a.cmd}`));
    }
  });
  logToTerminal('--- SIMULATION COMPLETE ---');
}

function clearWorkspace() {
  if (confirm('Clear all blocks?')) workspace.clear();
}

// Global Exports
window.connectBLE = connectBLE;
window.uploadBLE = uploadBLE;
window.simulate = simulate;
window.clearWorkspace = clearWorkspace;

// Auto-preview
workspace.addChangeListener(() => {
  const payload = generatePayload();
  const preview = document.getElementById('jsonPreview');
  if (preview) {
    preview.value = payload ? JSON.stringify(JSON.parse(payload), null, 2) : 'Error in blocks';
  }
});