<?php
/**
 * Codelift IDE - PHP Wrapper
 * Handles mission persistence and user context
 */

// Mock Database / User Session
session_start();
$user = [
    'name' => 'DronePilot_01',
    'missions_saved' => 12,
    'last_flight' => date('Y-m-d H:i')
];

// Mock mission loading (In a real app, this would come from MySQL)
$saved_blocks_xml = ''; // Could be fetched via $_GET['id']
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Codelift IDE | <?php echo $user['name']; ?></title>
  
  <!-- Fonts & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Blockly Core -->
  <script src="https://unpkg.com/blockly/blockly.min.js"></script>
  
  <style>
    :root {
      --bg-dark: #0f111a;
      --bg-card: #1a1d2e;
      --accent-blue: #3b82f6;
      --accent-purple: #8b5cf6;
      --accent-cyan: #06b6d4;
      --accent-danger: #ef4444;
      --accent-success: #10b981;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --glass-bg: rgba(26, 29, 46, 0.8);
      --glass-border: rgba(255, 255, 255, 0.1);
      --card-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }

    * { box-sizing: border-box; }
    
    body {
      margin: 0;
      font-family: 'Outfit', sans-serif;
      background: var(--bg-dark);
      color: var(--text-main);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Header Styling */
    header {
      padding: 12px 24px;
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-container h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 16px;
      background: rgba(255,255,255,0.05);
      border-radius: 999px;
      border: 1px solid var(--glass-border);
      font-size: 13px;
    }

    /* Main Content Layout */
    main {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 0;
      position: relative;
    }

    #blocklyArea {
      position: relative;
      height: 100%;
      border-right: 1px solid var(--glass-border);
    }

    #blocklyDiv {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    /* Sidebar / HUD */
    aside {
      background: var(--bg-card);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      border-left: 1px solid var(--glass-border);
    }

    .sidebar-section {
      padding: 20px;
      border-bottom: 1px solid var(--glass-border);
    }

    .section-title {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hud-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .hud-card {
      background: rgba(255,255,255,0.03);
      padding: 12px;
      border-radius: 12px;
      border: 1px solid var(--glass-border);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .hud-label {
      font-size: 11px;
      color: var(--text-muted);
    }

    .hud-value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      font-weight: 600;
    }

    /* Control Buttons */
    .btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .btn {
      flex: 1;
      min-width: 100px;
      padding: 10px 16px;
      border-radius: 8px;
      border: 1px solid var(--glass-border);
      background: rgba(255,255,255,0.05);
      color: var(--text-main);
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-1px);
    }

    .btn.primary {
      background: var(--accent-blue);
      border-color: var(--accent-blue);
      color: white;
    }

    .btn.danger {
      background: rgba(239, 68, 68, 0.1);
      border-color: var(--accent-danger);
      color: var(--accent-danger);
    }

    /* --- AGGRESSIVE BLOCKLY DARK THEME OVERRIDE --- */
    .blocklyToolboxDiv { background-color: #111420 !important; border-right: 1px solid rgba(255,255,255,0.05) !important; color: #fff !important; }
    .blocklyTreeRow { height: 38px !important; margin: 4px 12px !important; border-radius: 8px !important; background: transparent !important; }
    .blocklyTreeSelected { background: var(--accent-blue) !important; }
    .blocklyTreeLabel { font-family: 'Outfit', sans-serif !important; font-size: 13px !important; font-weight: 600 !important; color: #94a3b8 !important; }
    .blocklyFlyoutBackground { fill: #161b2b !important; fill-opacity: 0.98 !important; }
    .blocklyMainBackground { fill: #0f111a !important; }
    .blocklyScrollbarHandle { fill: rgba(255,255,255,0.1) !important; }

    /* Action Bar */
    .action-bar {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      padding: 8px 16px;
      border-radius: 999px;
      display: flex;
      gap: 12px;
      box-shadow: var(--card-shadow);
      z-index: 50;
    }

    .instruments {
      height: 120px;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      border-radius: 12px;
      position: relative;
      border: 1px solid var(--glass-border);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .artificial-horizon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(180deg, #38bdf8 50%, #78350f 50%);
      border: 2px solid white;
      position: relative;
      transition: transform 0.1s ease-out;
    }

    .horizon-line { position: absolute; top: 50%; left: -10%; width: 120%; height: 1px; background: white; }

    .terminal-container { background: #000; border-radius: 8px; overflow: hidden; margin-top: 8px; }
    textarea { width: 100%; background: transparent; border: 0; color: #7dd3fc; font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 12px; resize: vertical; outline: none; }
  </style>
</head>
<body>

<header>
  <div class="logo-container">
    <i data-lucide="navigation-2" style="color: var(--accent-cyan)"></i>
    <h1>Codelift</h1>
    <div class="user-pill">
        <i data-lucide="user" size="14"></i>
        <span><?php echo $user['name']; ?></span>
    </div>
  </div>
  
  <div class="btn-group" style="margin-top: 0">
    <button class="btn" onclick="connectBLE()"><i data-lucide="bluetooth"></i> Connect</button>
    <button class="btn primary" onclick="uploadBLE()"><i data-lucide="arrow-up-circle"></i> Upload Program</button>
    <button class="btn danger" onclick="emergencyStop()"><i data-lucide="octagon"></i> E-STOP</button>
  </div>
</header>

<main>
  <div id="blocklyArea">
    <div id="blocklyDiv"></div>
    <div class="action-bar">
      <button class="btn" onclick="workspace.zoomToFit()"><i data-lucide="maximize"></i> Fit</button>
      <button class="btn" onclick="saveMission()"><i data-lucide="cloud-save"></i> Save Cloud</button>
      <button class="btn" onclick="simulate()"><i data-lucide="play"></i> Simulate</button>
      <button class="btn" onclick="clearWorkspace()"><i data-lucide="trash-2"></i> Clear</button>
    </div>
  </div>

  <aside>
    <section class="sidebar-section">
      <div class="section-title"><i data-lucide="gauge"></i> Telemetry HUD</div>
      <div class="instruments">
        <div id="horizon" class="artificial-horizon"><div class="horizon-line"></div></div>
      </div>
      <div class="hud-grid" style="margin-top: 16px;">
        <div class="hud-card"><span class="hud-label">BATTERY</span><span class="hud-value" id="hud-bat">--.- V</span></div>
        <div class="hud-card"><span class="hud-label">ALTITUDE</span><span class="hud-value" id="hud-alt">0.00 M</span></div>
        <div class="hud-card"><span class="hud-label">YAW</span><span class="hud-value" id="hud-yaw">0°</span></div>
        <div class="hud-card"><span class="hud-label">ACCEL X</span><span class="hud-value" id="hud-ax">0.000 g</span></div>
      </div>
    </section>

    <section class="sidebar-section">
      <div class="section-title"><i data-lucide="terminal"></i> Simulation & Log</div>
      <div class="terminal-container">
        <textarea id="simLog" readonly placeholder="System logs will appear here..."></textarea>
      </div>
    </section>

    <section class="sidebar-section">
      <div class="section-title"><i data-lucide="code"></i> Generated Payload</div>
      <div class="terminal-container">
        <textarea id="jsonPreview" readonly placeholder="No blocks detected."></textarea>
      </div>
    </section>
  </aside>
</main>

<!-- Blockly Toolbox -->
<xml id="toolbox" style="display:none">
  <category name="Flight" colour="#3b82f6">
    <block type="arm_drone"></block><block type="disarm_drone"></block>
    <sep gap="12"></sep>
    <block type="takeoff"></block><block type="land"></block><block type="rth"></block>
  </category>
  <category name="Navigation" colour="#06b6d4">
    <block type="move_relative"></block><block type="orbit_target"></block>
    <block type="set_speed"></block><block type="set_altitude"></block>
  </category>
  <category name="Logic" colour="#8b5cf6">
    <block type="controls_if"></block><block type="logic_compare"></block>
    <block type="drone_value"></block><block type="wait"></block><block type="wait_until"></block>
  </category>
  <category name="Sensors" colour="#10b981">
    <block type="get_battery"></block><block type="get_altitude"></block><block type="get_imu"></block>
  </category>
</xml>

<script src="blocks.js"></script>
<script src="generator.js"></script>
<script src="app.js"></script>

<script>
  lucide.createIcons();
  
  // Mission Persistence Helper
  function saveMission() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    
    fetch('api/save_mission.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'xml=' + encodeURIComponent(xmlText)
    })
    .then(r => r.json())
    .then(data => {
        if(data.success) logToTerminal("✓ Mission Saved to Cloud");
    });
  }

  // Load Mission from PHP context
  const initialXml = `<?php echo $saved_blocks_xml; ?>`;
  if (initialXml) {
    const xml = Blockly.utils.xml.textToDom(initialXml);
    Blockly.Xml.domToWorkspace(xml, workspace);
  }

  window.addEventListener('resize', () => Blockly.svgResize(workspace), false);
</script>

</body>
</html>
