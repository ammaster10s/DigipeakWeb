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

  /* 2D Viewport */
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
      <a href="/Codelift-IDE" class="imu-btn danger">← BACK TO IDE</a>
    </div>
  </div>

  <!-- Main Content -->
  <div class="imu-content">
    <!-- 3D Viewport -->
    <div class="viewport" id="viewport3d">
      <canvas id="droneCanvas"></canvas>
      <div class="viewport-label">2D_TOP_VIEW</div>
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

      <!-- Accel (raw chip axes — X→Roll, Y/Z→Pitch per MPU6050 mounting) -->
      <div class="panel-section">
        <div class="panel-section-title">Accelerometer (g)</div>
        <div class="sensor-grid">
          <div class="sensor-cell"><div class="label">AX <span style="color:#52525b;font-size:7px;">→ROLL</span></div><div class="value gx" id="valAx">0.000</div></div>
          <div class="sensor-cell"><div class="label">AY <span style="color:#52525b;font-size:7px;">→PITCH</span></div><div class="value gy" id="valAy">0.000</div></div>
          <div class="sensor-cell"><div class="label">AZ <span style="color:#52525b;font-size:7px;">→PITCH</span></div><div class="value gz" id="valAz">0.000</div></div>
        </div>
      </div>

      <!-- Gyro Bars (chip axes — GX→Pitch rate, GY→Roll rate, GZ→Yaw rate) -->
      <div class="panel-section">
        <div class="panel-section-title">Gyroscope (°/s)</div>
        <div class="bar-row">
          <div class="bar-label gx">GX<span style="color:#3f3f46;font-size:7px;display:block;">PITCH</span></div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGx" style="background:#ef4444;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGx">0.0</div>
        </div>
        <div class="bar-row">
          <div class="bar-label gy">GY<span style="color:#3f3f46;font-size:7px;display:block;">ROLL</span></div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGy" style="background:#3b82f6;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGy">0.0</div>
        </div>
        <div class="bar-row">
          <div class="bar-label gz">GZ<span style="color:#3f3f46;font-size:7px;display:block;">YAW</span></div>
          <div class="bar-track"><div class="bar-center"></div><div class="bar-fill" id="barGz" style="background:#22c55e;left:50%;width:0;"></div></div>
          <div class="bar-val" id="valGz">0.0</div>
        </div>
      </div>

      <!-- Motor Map -->
      <div class="panel-section">
        <div class="panel-section-title">Motor Layout</div>
        <div class="motor-grid">
          <div class="motor-cell"><div class="motor-num">1</div><div class="motor-info"><div class="motor-label">FL · GPIO4 · CW ↻</div><div class="motor-val" id="m1val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">2</div><div class="motor-info"><div class="motor-label">FR · GPIO5 · CCW ↺</div><div class="motor-val" id="m2val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">3</div><div class="motor-info"><div class="motor-label">RL · GPIO6 · CCW ↺</div><div class="motor-val" id="m3val">--</div></div></div>
          <div class="motor-cell"><div class="motor-num">4</div><div class="motor-info"><div class="motor-label">RR · GPIO7 · CW ↻</div><div class="motor-val" id="m4val">--</div></div></div>
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

    // Firmware sends computed drone axes: r=roll, p=pitch, y=yaw
    // Roll: +right side down | Pitch: +nose up | Yaw: +clockwise from above
    if (d.r !== undefined) roll = d.r;
    if (d.p !== undefined) pitch = d.p;
    if (d.y !== undefined) yaw = -d.y; // TEMP: negate — firmware yaw sign inverted, fix in FW then remove

    // Raw IMU chip values (no swap — display as chip axes)
    // MPU6050 mapping: gx→pitch rate, gy→roll rate, gz→yaw rate
    // Accel: ax→roll angle, ay+az→pitch angle
    if (d.imu) {
      if (d.imu.ax !== undefined) accX = d.imu.ax;
      if (d.imu.ay !== undefined) accY = d.imu.ay;
      if (d.imu.az !== undefined) accZ = d.imu.az;
      if (d.imu.gx !== undefined) gyrX = d.imu.gx - calGx;
      if (d.imu.gy !== undefined) gyrY = d.imu.gy - calGy;
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

  // Horizon — negate roll for correct visual (right tilt = horizon tilts left visually)
  // Negate pitch: nose-up (+pitch) = horizon drops down = see more sky
  const hz = document.getElementById('horizonBg');
  if (hz) {
    hz.style.transform = `rotate(${-roll}deg) translateY(${pitch * 1.5}px)`;
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
// 2D Canvas Drone Renderer (Top-Down View)
// ============================
const canvas = document.getElementById('droneCanvas');
const ctx = canvas.getContext('2d');
let propAngle = 0; // For spinning prop animation

function resizeCanvas() {
  const vp = document.getElementById('viewport3d');
  canvas.width = vp.clientWidth;
  canvas.height = vp.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawDrone() {
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2, cy = h / 2;
  const droneSize = Math.min(w, h) * 0.3;

  // --- Background dot grid ---
  ctx.fillStyle = 'rgba(255,255,255,0.025)';
  const gridSpacing = 30;
  for (let x = gridSpacing; x < w; x += gridSpacing) {
    for (let y = gridSpacing; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Compass ring ---
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, droneSize * 1.6, 0, Math.PI * 2);
  ctx.stroke();

  // Compass ticks
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.font = "9px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const dirs = ['N', 'E', 'S', 'W'];
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI / 2) - Math.PI / 2;
    const r = droneSize * 1.6;
    const tx = cx + Math.cos(a) * (r + 14);
    const ty = cy + Math.sin(a) * (r + 14);
    ctx.fillText(dirs[i], tx, ty);
    // Small tick
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
    ctx.lineTo(cx + Math.cos(a) * (r + 4), cy + Math.sin(a) * (r + 4));
    ctx.stroke();
  }

  // --- Save context and apply yaw rotation ---
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(yaw * Math.PI / 180);

  const armLen = droneSize * 1.0;
  const bodySize = droneSize * 0.22;
  const motorR = droneSize * 0.2;

  // Motor positions (X layout — 45° diagonals) per hardware spec
  // M1=FL(CW) GPIO4, M2=FR(CCW) GPIO5, M3=RL(CCW) GPIO6, M4=RR(CW) GPIO7
  const motors = [
    { x: -armLen * 0.707, y: -armLen * 0.707, label: 'M1', sub: 'CW', color: '#ef4444' },
    { x:  armLen * 0.707, y: -armLen * 0.707, label: 'M2', sub: 'CCW', color: '#3b82f6' },
    { x: -armLen * 0.707, y:  armLen * 0.707, label: 'M3', sub: 'CCW', color: '#f59e0b' },
    { x:  armLen * 0.707, y:  armLen * 0.707, label: 'M4', sub: 'CW', color: '#22c55e' },
  ];

  // --- Draw arms ---
  motors.forEach(m => {
    ctx.strokeStyle = m.color + '50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();

    // Arm glow
    ctx.strokeStyle = m.color + '15';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
  });

  // --- Draw center body ---
  ctx.fillStyle = 'rgba(25,28,40,0.9)';
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  const br = 4; // border radius
  ctx.roundRect(-bodySize, -bodySize, bodySize * 2, bodySize * 2, br);
  ctx.fill();
  ctx.stroke();

  // Center cross
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-bodySize * 0.6, 0); ctx.lineTo(bodySize * 0.6, 0);
  ctx.moveTo(0, -bodySize * 0.6); ctx.lineTo(0, bodySize * 0.6);
  ctx.stroke();

  // --- Draw motors ---
  propAngle += 0.15;
  motors.forEach((m, i) => {
    // Motor circle
    ctx.strokeStyle = m.color + 'aa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(m.x, m.y, motorR, 0, Math.PI * 2);
    ctx.stroke();

    // Inner glow
    const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, motorR);
    grad.addColorStop(0, m.color + '18');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(m.x, m.y, motorR, 0, Math.PI * 2);
    ctx.fill();

    // Spinning prop lines (2 blades) — correct spin per spec: M1 CW, M2 CCW, M3 CCW, M4 CW
    const spinDir = [1, -1, -1, 1][i]; // CW=+1, CCW=-1
    const pAngle = propAngle * spinDir;
    ctx.strokeStyle = m.color + '40';
    ctx.lineWidth = 2;
    for (let b = 0; b < 2; b++) {
      const ba = pAngle + b * Math.PI;
      ctx.beginPath();
      ctx.moveTo(m.x + Math.cos(ba) * motorR * 0.3, m.y + Math.sin(ba) * motorR * 0.3);
      ctx.lineTo(m.x + Math.cos(ba) * motorR * 0.85, m.y + Math.sin(ba) * motorR * 0.85);
      ctx.stroke();
    }

    // Motor label + rotation indicator
    ctx.fillStyle = m.color;
    ctx.font = `bold 11px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(m.label, m.x, m.y - 6);
    ctx.font = `8px 'JetBrains Mono', monospace`;
    ctx.globalAlpha = 0.5;
    ctx.fillText(m.sub, m.x, m.y + 7);
    ctx.globalAlpha = 1.0;
  });

  // --- Front direction arrow ---
  const arrowStart = -bodySize - 6;
  const arrowEnd = -armLen * 0.35;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, arrowStart);
  ctx.lineTo(0, arrowEnd);
  ctx.stroke();

  // Arrowhead
  const headLen = 10;
  ctx.beginPath();
  ctx.moveTo(0, arrowEnd);
  ctx.lineTo(-headLen * 0.5, arrowEnd + headLen);
  ctx.moveTo(0, arrowEnd);
  ctx.lineTo(headLen * 0.5, arrowEnd + headLen);
  ctx.stroke();

  // FRONT label
  ctx.fillStyle = 'rgba(239,68,68,0.6)';
  ctx.font = "bold 10px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('FRONT', 0, arrowEnd - 10);

  ctx.restore(); // End yaw rotation

  // =========================================
  // Roll & Pitch tilt indicator bars (fixed, not rotated)
  // =========================================

  // --- Roll bar (bottom, horizontal) ---
  const barLen = droneSize * 1.4;
  const barY = cy + droneSize * 1.85;
  const rollPx = (roll / 45) * (barLen / 2); // ±45° maps to bar width

  // Track
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - barLen / 2, barY);
  ctx.lineTo(cx + barLen / 2, barY);
  ctx.stroke();

  // Center tick
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath();
  ctx.moveTo(cx, barY - 5);
  ctx.lineTo(cx, barY + 5);
  ctx.stroke();

  // Fill
  ctx.fillStyle = '#ef4444';
  const rollBarW = Math.abs(rollPx);
  const rollBarX = rollPx >= 0 ? cx : cx - rollBarW;
  ctx.fillRect(rollBarX, barY - 3, rollBarW, 6);

  // Indicator dot
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(cx + rollPx, barY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Label
  ctx.fillStyle = '#ef4444';
  ctx.font = "bold 9px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('ROLL', cx, barY + 20);

  // --- Pitch bar (left side, vertical) ---
  const pitchBarX = cx - droneSize * 1.85;
  const pitchPx = (pitch / 45) * (barLen / 2);

  // Track
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pitchBarX, cy - barLen / 2);
  ctx.lineTo(pitchBarX, cy + barLen / 2);
  ctx.stroke();

  // Center tick
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath();
  ctx.moveTo(pitchBarX - 5, cy);
  ctx.lineTo(pitchBarX + 5, cy);
  ctx.stroke();

  // Fill
  ctx.fillStyle = '#3b82f6';
  const pitchBarH = Math.abs(pitchPx);
  const pitchBarY = pitchPx >= 0 ? cy : cy - pitchBarH;
  ctx.fillRect(pitchBarX - 3, pitchBarY, 6, pitchBarH);

  // Indicator dot
  ctx.fillStyle = '#3b82f6';
  ctx.shadowColor = '#3b82f6';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(pitchBarX, cy + pitchPx, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Label
  ctx.save();
  ctx.translate(pitchBarX - 18, cy);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#3b82f6';
  ctx.font = "bold 9px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('PITCH', 0, 0);
  ctx.restore();

  // --- Yaw indicator (top) ---
  ctx.fillStyle = '#22c55e';
  ctx.font = "bold 9px 'JetBrains Mono', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('YAW ' + yaw.toFixed(1) + '°', cx, cy - droneSize * 1.85);

  requestAnimationFrame(drawDrone);
}

// ============================
// Demo mode (when not connected, subtle idle animation)
// ============================
let demoTime = 0;
function demoTick() {
  if (!isConnected) {
    demoTime += 0.01;
    // Realistic demo values matching actual sensor ranges
    // Roll: ±15° gentle sway (right side down = +)
    roll = Math.sin(demoTime * 0.7) * 8;
    // Pitch: ±10° gentle sway (nose up = +)
    pitch = Math.sin(demoTime * 0.5 + 1) * 5;
    // Yaw: slow heading drift (clockwise = +)
    yaw = demoTime * 3 % 360;
    // Accel: near-level with slight movement
    accX = Math.sin(demoTime * 0.7) * 0.05;   // ax → roll component
    accY = Math.sin(demoTime * 0.5) * 0.03;   // ay → pitch component
    accZ = 0.98 + Math.sin(demoTime * 1.5) * 0.01; // az ≈ 1g at rest
    // Gyro: small angular rates (°/s)
    gyrX = Math.sin(demoTime * 0.5) * 2;  // gx → pitch rate
    gyrY = Math.sin(demoTime * 0.7) * 3;  // gy → roll rate
    gyrZ = Math.sin(demoTime * 0.3) * 1;  // gz → yaw rate
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
