<?php
$pageTitle = "DIGIPEAK OPS // IMU DIAGNOSTICS";
$pageDescription = "Real-time IMU orientation viewer and diagnostics.";
include __DIR__ . "/php/partials/header.php";
?>
</main>
<script src="/php/assets/site.js"></script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .imu-root {
    position: fixed; inset: 0;
    z-index: 10;
    padding-top: 64px;
    background: #08090c;
    font-family: 'JetBrains Mono', monospace;
    color: #e4e4e7;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Top bar */
  .imu-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(10,11,15,0.95);
    backdrop-filter: blur(12px);
  }
  .imu-topbar-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #71717a;
  }
  .imu-topbar-title span { color: #ef4444; }
  .imu-topbar-right { display: flex; align-items: center; gap: 12px; }

  .imu-btn {
    padding: 8px 18px;
    font-family: inherit;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }
  .imu-btn:hover { border-color: #fff; color: #fff; }
  .imu-btn.active { border-color: #22c55e; color: #22c55e; box-shadow: 0 0 12px rgba(34,197,94,0.15); }
  .imu-btn.danger { border-color: rgba(239,68,68,0.4); color: #ef4444; }
  .imu-btn.danger:hover { background: #ef4444; color: #fff; }

  .status-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: #52525b;
  }
  .status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #3f3f46;
    transition: all 0.3s;
  }
  .status-dot.live { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.5); animation: pulse-dot 2s infinite; }
  @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* Main content */
  .imu-content {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 340px;
    overflow: hidden;
  }

  /* 3D Viewport */
  .viewport {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(ellipse at center, rgba(20,22,30,1) 0%, #08090c 70%);
    overflow: hidden;
  }
  .viewport canvas { display: block; }

  .viewport-label {
    position: absolute;
    top: 16px; left: 20px;
    font-size: 9px;
    letter-spacing: 0.2em;
    color: #3f3f46;
    text-transform: uppercase;
  }
  .viewport-axes {
    position: absolute;
    bottom: 20px; left: 20px;
  }
  .viewport-angles {
    position: absolute;
    top: 16px; right: 20px;
    text-align: right;
  }
  .angle-row {
    font-size: 11px;
    margin-bottom: 4px;
    color: #52525b;
  }
  .angle-row .val {
    font-weight: 700;
    font-size: 16px;
    min-width: 70px;
    display: inline-block;
    text-align: right;
  }
  .angle-row.roll .val { color: #ef4444; }
  .angle-row.pitch .val { color: #3b82f6; }
  .angle-row.yaw .val { color: #22c55e; }

  /* Right Panel */
  .imu-panel {
    border-left: 1px solid rgba(255,255,255,0.06);
    background: #0a0b0f;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .panel-section {
    padding: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .panel-section-title {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: #52525b;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  /* Horizon */
  .horizon-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    background: #0d0e14;
    border-radius: 4px;
  }
  .horizon-bg {
    position: absolute;
    width: 200%; height: 200%;
    top: -50%; left: -50%;
    background: linear-gradient(180deg, rgba(30,64,175,0.5) 50%, rgba(120,53,15,0.5) 50%);
    transition: transform 0.1s ease-out;
  }
  .horizon-center {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 50px; height: 3px;
    background: #ef4444;
    border-radius: 2px;
    z-index: 5;
    box-shadow: 0 0 12px rgba(239,68,68,0.4);
  }
  .horizon-label {
    position: absolute;
    top: 6px; left: 8px;
    font-size: 8px;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.2);
    z-index: 5;
  }

  /* Sensor readouts */
  .sensor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
  .sensor-cell {
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.015);
    border-radius: 3px;
  }
  .sensor-cell .label {
    font-size: 8px;
    letter-spacing: 0.15em;
    color: #3f3f46;
    margin-bottom: 4px;
  }
  .sensor-cell .value {
    font-size: 13px;
    font-weight: 600;
    color: #a1a1aa;
  }

  /* Bar meters */
  .bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .bar-label {
    font-size: 9px;
    color: #52525b;
    width: 28px;
    text-align: right;
    flex-shrink: 0;
  }
  .bar-track {
    flex: 1; height: 6px;
    background: rgba(255,255,255,0.04);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }
  .bar-center {
    position: absolute;
    left: 50%; top: 0;
    width: 1px; height: 100%;
    background: rgba(255,255,255,0.1);
  }
  .bar-fill {
    position: absolute;
    top: 0; height: 100%;
    border-radius: 3px;
    transition: all 0.1s ease-out;
  }
  .bar-val {
    font-size: 9px;
    color: #71717a;
    width: 55px;
    text-align: right;
    flex-shrink: 0;
  }

  /* Motor indicators */
  .motor-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .motor-cell {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.015);
    border-radius: 3px;
  }
  .motor-num {
    font-size: 10px;
    font-weight: 700;
    width: 22px; height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    color: #71717a;
  }
  .motor-info {
    flex: 1;
  }
  .motor-info .motor-label {
    font-size: 8px;
    color: #3f3f46;
    letter-spacing: 0.1em;
  }
  .motor-info .motor-val {
    font-size: 12px;
    font-weight: 600;
    color: #a1a1aa;
  }

  /* Log */
  .imu-log {
    flex: 1;
    min-height: 100px;
    padding: 20px;
  }
  .imu-log-box {
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.04);
    background: #000;
    border-radius: 3px;
    font-size: 10px;
    color: #3b82f6;
    line-height: 1.7;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.05) transparent;
  }
  .imu-log-box .err { color: #ef4444; }
  .imu-log-box .ok { color: #22c55e; }

  /* Frequency badge */
  .freq-badge {
    font-size: 10px;
    padding: 4px 10px;
    border: 1px solid rgba(255,255,255,0.06);
    color: #52525b;
    letter-spacing: 0.1em;
  }

  /* Gyro color coding */
  .gx { color: #ef4444 !important; }
  .gy { color: #3b82f6 !important; }
  .gz { color: #22c55e !important; }
</style>

<div class="imu-root">
  <!-- Top Bar -->
  <div class="imu-topbar">
    <div style="display:flex;align-items:center;gap:16px;">
      <div class="imu-topbar-title">IMU <span>Diagnostics</span></div>
      <div class="status-pill">
        <div class="status-dot" id="imuStatusDot"></div>
        <span id="imuStatusText">DISCONNECTED</span>
      </div>
      <div class="freq-badge" id="freqBadge">0 Hz</div>
    </div>
    <div class="imu-topbar-right">
      <button class="imu-btn" id="btnConnect" onclick="imuConnect()">CONNECT BLE</button>
      <button class="imu-btn" id="btnCalibrate" onclick="calibrateGyro()">CALIBRATE</button>
      <a href="/prj-cl-ide.php" class="imu-btn danger">← BACK TO IDE</a>
    </div>
  </div>

  <!-- Main Content -->
  <div class="imu-content">
    <!-- 3D Viewport -->
    <div class="viewport" id="viewport3d">
      <canvas id="droneCanvas"></canvas>
      <div class="viewport-label">3D_ORIENTATION_VIEW</div>
      <div class="viewport-angles">
        <div class="angle-row roll">ROLL <span class="val" id="angRoll">0.0°</span></div>
        <div class="angle-row pitch">PITCH <span class="val" id="angPitch">0.0°</span></div>
        <div class="angle-row yaw">YAW <span class="val" id="angYaw">0.0°</span></div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="imu-panel">
      <!-- Horizon -->
      <div class="panel-section">
        <div class="panel-section-title">Artificial Horizon</div>
        <div class="horizon-container">
          <div class="horizon-bg" id="horizonBg"></div>
          <div class="horizon-center"></div>
          <div class="horizon-label">AHRS</div>
        </div>
      </div>

      <!-- Accel -->
      <div class="panel-section">
        <div class="panel-section-title">Accelerometer (g)</div>
        <div class="sensor-grid">
          <div class="sensor-cell"><div class="label">ACC_X</div><div class="value gx" id="valAx">0.000</div></div>
          <div class="sensor-cell"><div class="label">ACC_Y</div><div class="value gy" id="valAy">0.000</div></div>
          <div class="sensor-cell"><div class="label">ACC_Z</div><div class="value gz" id="valAz">0.000</div></div>
        </div>
      </div>

      <!-- Gyro Bars -->
      <div class="panel-section">
        <div class="panel-section-title">Gyroscope (°/s)</div>
        <div class="bar-row">
          <div class="bar-label gx">GX</div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGx" style="background:#ef4444;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGx">0.0</div>
        </div>
        <div class="bar-row">
          <div class="bar-label gy">GY</div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGy" style="background:#3b82f6;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGy">0.0</div>
        </div>
        <div class="bar-row">
          <div class="bar-label gz">GZ</div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGz" style="background:#22c55e;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGz">0.0</div>
        </div>
      </div>

      <!-- Motor Map -->
      <div class="panel-section">
        <div class="panel-section-title">Motor Layout</div>
        <div class="motor-grid">
          <div class="motor-cell"><div class="motor-num">1</div><div class="motor-info"><div class="motor-label">FRONT-LEFT</div><div class="motor-val" id="m1val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">2</div><div class="motor-info"><div class="motor-label">FRONT-RIGHT</div><div class="motor-val" id="m2val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">3</div><div class="motor-info"><div class="motor-label">REAR-LEFT</div><div class="motor-val" id="m3val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">4</div><div class="motor-info"><div class="motor-label">REAR-RIGHT</div><div class="motor-val" id="m4val">--</div></div></div>
        </div>
      </div>

      <!-- Misc -->
      <div class="panel-section">
        <div class="panel-section-title">System</div>
        <div class="sensor-grid">
          <div class="sensor-cell"><div class="label">TEMP</div><div class="value" id="valTemp">--.- °C</div></div>
          <div class="sensor-cell"><div class="label">BATTERY</div><div class="value" id="valBat">--.- V</div></div>
          <div class="sensor-cell"><div class="label">PACKETS</div><div class="value" id="valPkt">0</div></div>
        </div>
      </div>

      <!-- Log -->
      <div class="imu-log">
        <div class="panel-section-title">Event Log</div>
        <div class="imu-log-box" id="imuLogBox">
          <div style="color:#52525b;">// IMU Diagnostics v1.0</div>
          <div style="color:#52525b;">// Connect BLE to begin streaming</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// ============================
// BLE Configuration
// ============================
const BLE_SERVICE    = '0000fff0-0000-1000-8000-00805f9b34fb';
const BLE_CMD_CHAR   = '0000fff1-0000-1000-8000-00805f9b34fb';
const BLE_TELEM_CHAR = '0000fff2-0000-1000-8000-00805f9b34fb';

let bleDevice, bleServer, bleService, bleCmdChar, bleTelemChar;
let isConnected = false;
let packetCount = 0;
let lastPacketTime = 0;
let freqSamples = [];

// Orientation state
let roll = 0, pitch = 0, yaw = 0;
let accX = 0, accY = 0, accZ = 1;
let gyrX = 0, gyrY = 0, gyrZ = 0;

// Gyro calibration offsets
let calGx = 0, calGy = 0, calGz = 0;
let isCalibrating = false;
let calSamples = [];

// ============================
// Logging
// ============================
function imuLog(msg, type = '') {
  const box = document.getElementById('imuLogBox');
  if (!box) return;
  const ts = new Date().toLocaleTimeString([], { hour12: false, hour:'2-digit', minute:'2-digit', second:'2-digit' });
  const div = document.createElement('div');
  div.className = type;
  div.textContent = `[${ts}] ${msg}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// ============================
// BLE Connection
// ============================
async function imuConnect() {
  try {
    imuLog('Scanning for drone...');
    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [BLE_SERVICE] }]
    });

    bleDevice.addEventListener('gattserverdisconnected', () => {
      isConnected = false;
      updateConnUI(false);
      imuLog('BLE link lost', 'err');
    });

    imuLog('Connecting to ' + bleDevice.name + '...');
    bleServer = await bleDevice.gatt.connect();
    bleService = await bleServer.getPrimaryService(BLE_SERVICE);
    bleCmdChar = await bleService.getCharacteristic(BLE_CMD_CHAR);
    bleTelemChar = await bleService.getCharacteristic(BLE_TELEM_CHAR);

    await bleTelemChar.startNotifications();
    bleTelemChar.addEventListener('characteristicvaluechanged', onTelemetry);

    isConnected = true;
    updateConnUI(true);
    imuLog('Connected — streaming telemetry', 'ok');
  } catch (err) {
    imuLog('Connection failed: ' + err.message, 'err');
  }
}

function updateConnUI(connected) {
  const dot = document.getElementById('imuStatusDot');
  const txt = document.getElementById('imuStatusText');
  const btn = document.getElementById('btnConnect');
  dot.className = connected ? 'status-dot live' : 'status-dot';
  txt.textContent = connected ? 'STREAMING' : 'DISCONNECTED';
  btn.className = connected ? 'imu-btn active' : 'imu-btn';
  btn.textContent = connected ? 'LINKED' : 'CONNECT BLE';
}

// ============================
// Telemetry Parser
// ============================
function onTelemetry(event) {
  const str = new TextDecoder().decode(event.target.value);
  try {
    const d = JSON.parse(str);
    packetCount++;
    document.getElementById('valPkt').textContent = packetCount;

    // Frequency calculation
    const now = performance.now();
    if (lastPacketTime > 0) {
      freqSamples.push(1000 / (now - lastPacketTime));
      if (freqSamples.length > 20) freqSamples.shift();
      const avg = freqSamples.reduce((a, b) => a + b, 0) / freqSamples.length;
      document.getElementById('freqBadge').textContent = Math.round(avg) + ' Hz';
    }
    lastPacketTime = now;

    // Extract orientation (X/Y swapped to match IMU physical orientation)
    if (d.r !== undefined) pitch = d.r;
    if (d.p !== undefined) roll = d.p;
    if (d.y !== undefined) yaw = d.y;

    // Extract IMU
    if (d.imu) {
      if (d.imu.ax !== undefined) accY = d.imu.ax;
      if (d.imu.ay !== undefined) accX = d.imu.ay;
      if (d.imu.az !== undefined) accZ = d.imu.az;
      if (d.imu.gx !== undefined) gyrY = d.imu.gx - calGx;
      if (d.imu.gy !== undefined) gyrX = d.imu.gy - calGy;
      if (d.imu.gz !== undefined) gyrZ = d.imu.gz - calGz;
      if (d.imu.t !== undefined) document.getElementById('valTemp').textContent = d.imu.t.toFixed(1) + ' °C';

      // Collect calibration samples
      if (isCalibrating) {
        calSamples.push({ gx: d.imu.gx || 0, gy: d.imu.gy || 0, gz: d.imu.gz || 0 });
        if (calSamples.length >= 100) finishCalibration();
      }
    }

    // Battery
    if (d.bat !== undefined) document.getElementById('valBat').textContent = d.bat.toFixed(1) + ' V';

    // Motors
    if (d.m) {
      if (d.m[0] !== undefined) document.getElementById('m1val').textContent = d.m[0];
      if (d.m[1] !== undefined) document.getElementById('m2val').textContent = d.m[1];
      if (d.m[2] !== undefined) document.getElementById('m3val').textContent = d.m[2];
      if (d.m[3] !== undefined) document.getElementById('m4val').textContent = d.m[3];
    }

    // Update all UI
    updateSensorUI();
  } catch (e) { /* skip bad packets */ }
}

// ============================
// Calibration
// ============================
function calibrateGyro() {
  if (!isConnected) { imuLog('Connect first', 'err'); return; }
  imuLog('Calibrating gyro — keep drone still...');
  isCalibrating = true;
  calSamples = [];
}

function finishCalibration() {
  isCalibrating = false;
  const n = calSamples.length;
  calGx = calSamples.reduce((s, c) => s + c.gx, 0) / n;
  calGy = calSamples.reduce((s, c) => s + c.gy, 0) / n;
  calGz = calSamples.reduce((s, c) => s + c.gz, 0) / n;
  imuLog(`Calibration done — offsets: gx=${calGx.toFixed(2)} gy=${calGy.toFixed(2)} gz=${calGz.toFixed(2)}`, 'ok');
}

// ============================
// Sensor UI Updates
// ============================
function updateSensorUI() {
  // Angles
  document.getElementById('angRoll').textContent = roll.toFixed(1) + '°';
  document.getElementById('angPitch').textContent = pitch.toFixed(1) + '°';
  document.getElementById('angYaw').textContent = yaw.toFixed(1) + '°';

  // Accel
  document.getElementById('valAx').textContent = accX.toFixed(3);
  document.getElementById('valAy').textContent = accY.toFixed(3);
  document.getElementById('valAz').textContent = accZ.toFixed(3);

  // Gyro values
  document.getElementById('valGx').textContent = gyrX.toFixed(1);
  document.getElementById('valGy').textContent = gyrY.toFixed(1);
  document.getElementById('valGz').textContent = gyrZ.toFixed(1);

  // Gyro bars (±250 °/s range)
  updateBar('barGx', gyrX, 250);
  updateBar('barGy', gyrY, 250);
  updateBar('barGz', gyrZ, 250);

  // Horizon
  const hz = document.getElementById('horizonBg');
  if (hz) {
    hz.style.transform = `rotate(${roll}deg) translateY(${pitch * 1.5}px)`;
  }
}

function updateBar(id, value, maxVal) {
  const el = document.getElementById(id);
  if (!el) return;
  const pct = Math.min(Math.abs(value) / maxVal * 50, 50);
  if (value >= 0) {
    el.style.left = '50%';
    el.style.width = pct + '%';
  } else {
    el.style.left = (50 - pct) + '%';
    el.style.width = pct + '%';
  }
}

// ============================
// 3D Canvas Drone Renderer
// ============================
const canvas = document.getElementById('droneCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const vp = document.getElementById('viewport3d');
  canvas.width = vp.clientWidth;
  canvas.height = vp.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Simple 3D math
function rotateX(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1]*c - p[2]*s, p[1]*s + p[2]*c];
}
function rotateY(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0]*c + p[2]*s, p[1], -p[0]*s + p[2]*c];
}
function rotateZ(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0]*c - p[1]*s, p[0]*s + p[1]*c, p[2]];
}

function project(p, cx, cy, fov) {
  const scale = fov / (fov + p[2]);
  return [cx + p[0] * scale, cy - p[1] * scale, scale];
}

// Drone geometry — arms + body
function getDroneGeometry(size) {
  const s = size;
  const armLen = s * 1.1;
  const bodyW = s * 0.3;
  const bodyH = s * 0.08;
  const motorR = s * 0.25;
  const armAngle = Math.PI / 4; // 45°

  const arms = [
    { from: [0,0,0], to: [-armLen * Math.cos(armAngle), armLen * Math.sin(armAngle), 0], motor: 1, color: '#ef4444' },
    { from: [0,0,0], to: [ armLen * Math.cos(armAngle), armLen * Math.sin(armAngle), 0], motor: 2, color: '#3b82f6' },
    { from: [0,0,0], to: [-armLen * Math.cos(armAngle),-armLen * Math.sin(armAngle), 0], motor: 3, color: '#f59e0b' },
    { from: [0,0,0], to: [ armLen * Math.cos(armAngle),-armLen * Math.sin(armAngle), 0], motor: 4, color: '#22c55e' },
  ];

  // Body frame (rectangle)
  const body = [
    [-bodyW, -bodyW, -bodyH],
    [ bodyW, -bodyW, -bodyH],
    [ bodyW,  bodyW, -bodyH],
    [-bodyW,  bodyW, -bodyH],
    [-bodyW, -bodyW,  bodyH],
    [ bodyW, -bodyW,  bodyH],
    [ bodyW,  bodyW,  bodyH],
    [-bodyW,  bodyW,  bodyH],
  ];

  // Direction arrow (front indicator)
  const arrow = [
    [0, bodyW * 0.5, bodyH + 2],
    [0, bodyW * 1.8, bodyH + 2],
  ];

  return { arms, body, motorR, arrow };
}

function drawDrone() {
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  const gridSpacing = 40;
  for (let x = 0; x < w; x += gridSpacing) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSpacing) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const cx = w / 2, cy = h / 2;
  const fov = 400;
  const droneSize = Math.min(w, h) * 0.28;
  const geo = getDroneGeometry(droneSize);

  // Convert angles to radians
  const rRad = roll * Math.PI / 180;
  const pRad = pitch * Math.PI / 180;
  const yRad = yaw * Math.PI / 180;

  // Transform function: Yaw → Pitch → Roll + slight viewing angle
  function transform(pt) {
    let p = [...pt];
    // Apply drone rotation
    p = rotateZ(p, yRad);
    p = rotateX(p, pRad);
    p = rotateZ(p, rRad);
    // Viewing angle (tilted slightly)
    p = rotateX(p, -0.6);
    p = rotateY(p, 0.3);
    return p;
  }

  // Draw body wireframe
  const bodyPts = geo.body.map(pt => {
    const t = transform(pt);
    return project(t, cx, cy, fov);
  });

  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  // Bottom face
  ctx.beginPath();
  ctx.moveTo(bodyPts[0][0], bodyPts[0][1]);
  for (let i = 1; i < 4; i++) ctx.lineTo(bodyPts[i][0], bodyPts[i][1]);
  ctx.closePath(); ctx.stroke();
  // Top face
  ctx.beginPath();
  ctx.moveTo(bodyPts[4][0], bodyPts[4][1]);
  for (let i = 5; i < 8; i++) ctx.lineTo(bodyPts[i][0], bodyPts[i][1]);
  ctx.closePath(); ctx.stroke();
  // Verticals
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(bodyPts[i][0], bodyPts[i][1]);
    ctx.lineTo(bodyPts[i+4][0], bodyPts[i+4][1]);
    ctx.stroke();
  }

  // Fill top face with semi-transparent
  ctx.fillStyle = 'rgba(30,35,50,0.6)';
  ctx.beginPath();
  ctx.moveTo(bodyPts[4][0], bodyPts[4][1]);
  for (let i = 5; i < 8; i++) ctx.lineTo(bodyPts[i][0], bodyPts[i][1]);
  ctx.closePath(); ctx.fill();

  // Draw arms and motors
  geo.arms.forEach(arm => {
    const from3d = transform(arm.from);
    const to3d = transform(arm.to);
    const fromP = project(from3d, cx, cy, fov);
    const toP = project(to3d, cx, cy, fov);

    // Arm line
    ctx.strokeStyle = arm.color + '90';
    ctx.lineWidth = 2.5 * toP[2];
    ctx.beginPath();
    ctx.moveTo(fromP[0], fromP[1]);
    ctx.lineTo(toP[0], toP[1]);
    ctx.stroke();

    // Motor circle
    const motorRadius = geo.motorR * toP[2];
    ctx.strokeStyle = arm.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(toP[0], toP[1], motorRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Motor glow
    const grad = ctx.createRadialGradient(toP[0], toP[1], 0, toP[0], toP[1], motorRadius);
    grad.addColorStop(0, arm.color + '25');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fill();

    // Motor number label
    ctx.fillStyle = arm.color;
    ctx.font = `bold ${Math.round(11 * toP[2])}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M' + arm.motor, toP[0], toP[1]);
  });

  // Direction arrow (front)
  const arrowPts = geo.arrow.map(pt => {
    const t = transform(pt);
    return project(t, cx, cy, fov);
  });
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(arrowPts[0][0], arrowPts[0][1]);
  ctx.lineTo(arrowPts[1][0], arrowPts[1][1]);
  ctx.stroke();
  // Arrowhead
  const dx = arrowPts[1][0] - arrowPts[0][0];
  const dy = arrowPts[1][1] - arrowPts[0][1];
  const angle = Math.atan2(dy, dx);
  const headLen = 10;
  ctx.beginPath();
  ctx.moveTo(arrowPts[1][0], arrowPts[1][1]);
  ctx.lineTo(arrowPts[1][0] - headLen * Math.cos(angle - 0.4), arrowPts[1][1] - headLen * Math.sin(angle - 0.4));
  ctx.moveTo(arrowPts[1][0], arrowPts[1][1]);
  ctx.lineTo(arrowPts[1][0] - headLen * Math.cos(angle + 0.4), arrowPts[1][1] - headLen * Math.sin(angle + 0.4));
  ctx.stroke();

  // "FRONT" label
  ctx.fillStyle = 'rgba(239,68,68,0.5)';
  ctx.font = "9px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('FRONT', arrowPts[1][0], arrowPts[1][1] - 12);

  // Draw axis reference in bottom-left
  drawAxisRef(60, h - 60);

  requestAnimationFrame(drawDrone);
}

function drawAxisRef(cx, cy) {
  const len = 35;
  const rRad = roll * Math.PI / 180;
  const pRad = pitch * Math.PI / 180;
  const yRad = yaw * Math.PI / 180;

  const axes = [
    { v: [len, 0, 0], label: 'X', color: '#ef4444' },
    { v: [0, len, 0], label: 'Y', color: '#3b82f6' },
    { v: [0, 0, len], label: 'Z', color: '#22c55e' },
  ];

  axes.forEach(ax => {
    let p = [...ax.v];
    p = rotateZ(p, yRad);
    p = rotateX(p, pRad);
    p = rotateZ(p, rRad);
    p = rotateX(p, -0.6);
    p = rotateY(p, 0.3);

    const proj = project(p, cx, cy, 200);
    ctx.strokeStyle = ax.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(proj[0], proj[1]);
    ctx.stroke();

    ctx.fillStyle = ax.color;
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lx = proj[0] + (proj[0] - cx) * 0.25;
    const ly = proj[1] + (proj[1] - cy) * 0.25;
    ctx.fillText(ax.label, lx, ly);
  });
}

// ============================
// Demo mode (when not connected, subtle idle animation)
// ============================
let demoTime = 0;
function demoTick() {
  if (!isConnected) {
    demoTime += 0.01;
    roll = Math.sin(demoTime * 0.7) * 15;
    pitch = Math.sin(demoTime * 0.5 + 1) * 10;
    yaw = Math.sin(demoTime * 0.3) * 20;
    accX = Math.sin(demoTime) * 0.1;
    accY = Math.cos(demoTime * 0.8) * 0.1;
    accZ = 0.98 + Math.sin(demoTime * 1.5) * 0.02;
    gyrX = Math.sin(demoTime * 2) * 5;
    gyrY = Math.cos(demoTime * 1.5) * 5;
    gyrZ = Math.sin(demoTime * 0.8) * 3;
    updateSensorUI();
  }
  setTimeout(demoTick, 50);
}
demoTick();

// Start render loop
drawDrone();

// Hide boot loader
setTimeout(() => {
  const boot = document.getElementById('boot-loader');
  if (boot && boot.style.display !== 'none') {
    boot.classList.add('boot-hidden');
    setTimeout(() => boot.style.display = 'none', 500);
  }
}, 1000);
</script>
</body>
</html>
