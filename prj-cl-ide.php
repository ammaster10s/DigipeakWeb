<?php
$pageTitle = "DIGIPEAK OPS // CODELIFT IDE";
$pageDescription = "Real-time drone mission engineering and flight control interface.";
include __DIR__ . "/php/partials/header.php";

// Mission Persistence Mock (from Codelift study)
$user_pilot = "PILOT_01";
$saved_blocks_xml = ""; // This would be fetched from a database in a real scenario
?>

<!-- Blockly Core -->
<script src="https://unpkg.com/blockly/blockly.min.js"></script>
<script src="https://unpkg.com/blockly/javascript_compressed.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>

<!-- IDE Container: Positioned to sit below the site header (z-30) but cover all other content -->
<div class="fixed inset-0 z-10 flex flex-col pt-16 bg-zinc-950 shadow-2xl" style="width: 100vw; height: 100vh;">
  <!-- IDE Toolbar -->
  <div class="z-20 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-3 backdrop-blur-md">
    <div class="flex items-center gap-6">
      <div class="flex flex-col">
        <span class="font-mono text-[10px] uppercase tracking-widest text-zinc-500">OPERATOR_ID</span>
        <span class="font-mono text-sm font-bold text-red-500"><?php echo $user_pilot; ?></span>
      </div>
      <div class="h-8 w-[1px] bg-zinc-800"></div>
      <div class="flex flex-col">
          <span class="font-mono text-[10px] uppercase tracking-widest text-zinc-500">LINK_STATUS</span>
          <div class="flex items-center gap-2">
              <div id="statusDot" class="h-2 w-2 rounded-full bg-zinc-700"></div>
              <span id="connStatus" class="font-mono text-xs text-zinc-400 uppercase tracking-tighter">DISCONNECTED</span>
          </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button onclick="connectBLE()" class="group flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-all hover:border-white hover:text-white">
        <i data-lucide="bluetooth" class="h-3 w-3"></i>
        INITIALIZE LINK
      </button>
      <button onclick="uploadBLE()" class="group flex items-center gap-2 border border-red-900/50 bg-red-950/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-red-500 transition-all hover:bg-red-600 hover:text-white">
        <i data-lucide="upload-cloud" class="h-3 w-3"></i>
        UPLOAD MISSION
      </button>
      <button onclick="emergencyStop()" class="flex items-center gap-2 bg-red-600 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-red-700">
        <i data-lucide="octagon" class="h-3 w-3"></i>
        E-STOP
      </button>
    </div>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <!-- Blockly Workspace -->
    <div class="relative flex-1 bg-zinc-900" id="blocklyArea">
      <div id="blocklyDiv" class="absolute inset-0"></div>
      
      <!-- Toolbox Tabs / Bottom Bar -->
      <div class="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/90 p-1.5 backdrop-blur-xl shadow-2xl">
        <button onclick="workspace.zoomToFit()" class="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors" title="Fit Workspace">
            <i data-lucide="maximize" class="h-4 w-4"></i>
        </button>
        <div class="h-6 w-px bg-zinc-800/50"></div>
        <button onclick="simulate()" class="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:bg-zinc-800 transition-colors">
            <i data-lucide="play" class="h-3 w-3"></i>
            SIMULATE
        </button>
        <button onclick="saveMission()" class="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:bg-zinc-800 transition-colors">
            <i data-lucide="save" class="h-3 w-3"></i>
            SAVE CLOUD
        </button>
        <div class="h-6 w-px bg-zinc-800/50"></div>
        <button onclick="clearWorkspace()" class="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Clear All">
            <i data-lucide="trash-2" class="h-4 w-4"></i>
        </button>
      </div>
    </div>

    <!-- Right Sidebar HUD -->
    <div class="flex w-96 flex-col border-l border-zinc-800 bg-zinc-950 overflow-y-auto">
      <!-- Telemetry Dashboard -->
      <div class="border-b border-zinc-800 p-6">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 text-red-600">LIVE_TELEMETRY</h3>
          <span class="font-mono text-[10px] text-zinc-600">FRQ: 50HZ</span>
        </div>
        
        <!-- AHRS -->
        <div class="relative mb-6 flex aspect-video w-full items-center justify-center overflow-hidden border border-zinc-900 bg-zinc-950 rounded-sm">
          <div id="horizon" class="absolute h-full w-full opacity-60" style="background: linear-gradient(180deg, rgba(30, 64, 175, 0.4) 50%, rgba(120, 53, 15, 0.4) 50%);">
            <div class="absolute top-1/2 left-0 h-px w-full bg-white/40"></div>
          </div>
          <div class="z-10 h-0.5 w-12 bg-red-600 shadow-red-glow"></div>
          <div class="absolute top-2 left-2 font-mono text-[9px] text-zinc-500">AHRS_OVERLAY</div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-3">
          <div class="border border-zinc-800 bg-zinc-900 p-4">
             <div class="font-mono text-[9px] uppercase tracking-tighter text-zinc-500">BATTERY</div>
             <div id="hud-bat" class="mt-1 font-mono text-lg font-bold text-white">--.- V</div>
          </div>
          <div class="border border-zinc-800 bg-zinc-900 p-4">
             <div class="font-mono text-[9px] uppercase tracking-tighter text-zinc-500">ALTITUDE</div>
             <div id="hud-alt" class="mt-1 font-mono text-lg font-bold text-white">0.00 M</div>
          </div>
          <div class="border border-zinc-800 bg-zinc-900 p-4">
             <div class="font-mono text-[9px] uppercase tracking-tighter text-zinc-500">YAW</div>
             <div id="hud-yaw" class="mt-1 font-mono text-lg font-bold text-white">0°</div>
          </div>
          <div class="border border-zinc-800 bg-zinc-900 p-4">
             <div class="font-mono text-[9px] uppercase tracking-tighter text-zinc-500">STATUS</div>
             <div id="hud-status" class="mt-1 font-mono text-xs font-bold text-zinc-400">OFFLINE</div>
          </div>
          <div class="border border-zinc-800 bg-zinc-900 p-4">
             <div class="font-mono text-[9px] uppercase tracking-tighter text-zinc-500">CORE_TEMP</div>
             <div id="hud-temp" class="mt-1 font-mono text-xs font-bold text-white">--.- °C</div>
          </div>
        </div>
        
        <!-- IMU Detailed -->
        <div class="mt-4 grid grid-cols-3 gap-2">
            <div class="flex flex-col border border-zinc-900 bg-zinc-900/20 p-2">
                <span class="font-mono text-[8px] text-zinc-600">ACC_X</span>
                <span id="hud-ax" class="font-mono text-[10px] text-zinc-400">0.000g</span>
            </div>
            <div class="flex flex-col border border-zinc-900 bg-zinc-900/20 p-2">
                <span class="font-mono text-[8px] text-zinc-600">ACC_Y</span>
                <span id="hud-ay" class="font-mono text-[10px] text-zinc-400">0.000g</span>
            </div>
            <div class="flex flex-col border border-zinc-900 bg-zinc-900/20 p-2">
                <span class="font-mono text-[8px] text-zinc-600">ACC_Z</span>
                <span id="hud-az" class="font-mono text-[10px] text-zinc-400">0.000g</span>
            </div>
        </div>
      </div>

      <!-- Logs -->
      <div class="flex flex-1 flex-col p-6 min-h-0">
        <h3 class="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">SYSTEM_LOG</h3>
        <div class="flex-1 overflow-hidden border border-zinc-900 bg-black">
          <textarea id="simLog" readonly class="h-full w-full bg-transparent p-4 font-mono text-[10px] leading-relaxed text-blue-400 outline-none resize-none" placeholder="Awaiting system initialization..."></textarea>
        </div>
      </div>

      <!-- JSON Preview (Developer) -->
      <div class="p-6 pt-0">
        <details class="group border border-zinc-900 bg-zinc-950/30">
            <summary class="flex cursor-pointer items-center justify-between p-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:bg-zinc-900">
                <span>PROTOCOL_PREVIEW</span>
                <i data-lucide="chevron-down" class="h-3 w-3 transition-transform group-open:rotate-180"></i>
            </summary>
            <div class="p-3">
                <textarea id="jsonPreview" readonly class="w-full bg-transparent font-mono text-[10px] text-zinc-500 outline-none" rows="8"></textarea>
            </div>
        </details>
      </div>
    </div>
  </div>
</div>

<!-- Blockly Toolbox Definitions (consistent with Codelift) -->
<xml id="toolbox" style="display:none">
  <category name="Flight" colour="#3b82f6">
    <block type="arm_drone"></block>
    <block type="disarm_drone"></block>
    <sep gap="12"></sep>
    <block type="takeoff"></block>
    <block type="land"></block>
    <block type="rth"></block>
  </category>
  <category name="Navigation" colour="#06b6d4">
    <block type="move_relative"></block>
    <block type="orbit_target"></block>
    <block type="set_speed"></block>
    <block type="set_altitude"></block>
  </category>
  <category name="Logic" colour="#8b5cf6">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="drone_value"></block>
    <block type="wait"></block>
    <block type="wait_until"></block>
  </category>
  <category name="Sensors" colour="#10b981">
    <block type="get_battery"></block>
    <block type="get_altitude"></block>
    <block type="get_imu"></block>
  </category>
  <category name="AI & Vision" colour="#f59e0b">
    <block type="camera_control"></block>
    <block type="detect_object"></block>
    <block type="track_object"></block>
    <block type="take_photo"></block>
  </category>
  <category name="Safety" colour="#ef4444">
    <block type="safety_check"></block>
    <block type="set_altitude_limit"></block>
    <block type="battery_guard"></block>
  </category>
</xml>

<!-- Application Scripts -->
<script src="/Codelift/blocks.js"></script>
<script src="/Codelift/generator.js"></script>
<script src="/Codelift/app.js"></script>

<script>
  // Initialize Lucide Icons
  lucide.createIcons();

  // Override Codelift Styles to match Digipeak theme
  // We can do this via JS or by adding a style tag
  const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --accent-blue: #3b82f6;
      }
      
      /* Main Toolbox Container */
      .blocklyToolboxDiv, .blocklyToolbox {
        background-color: #111420 !important;
        border-right: 1px solid rgba(255,255,255,0.05) !important;
        color: #fff !important;
        padding-top: 10px !important;
        width: 210px !important; /* Increased width significantly to prevent text clipping */
        scrollbar-width: none !important; /* Firefox */
        -ms-overflow-style: none !important;  /* IE and Edge */
      }
      
      .blocklyToolboxDiv::-webkit-scrollbar {
        display: none !important; /* Chrome, Safari and Opera */
      }

      /* Toolbox Rows (Categories) */
      .blocklyTreeRow {
        height: 38px !important;
        line-height: 38px !important;
        margin: 4px 12px !important;
        padding: 0 10px !important;
        border-radius: 8px !important;
        background-color: transparent !important;
        border: none !important;
        transition: background 0.2s !important;
        display: flex !important;
        align-items: center !important;
      }

      .blocklyTreeRow:not(.blocklyTreeSelected):hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
      }

      .blocklyTreeSelected {
        background-color: var(--accent-blue) !important;
      }

      .blocklyTreeLabel {
        font-family: 'Outfit', sans-serif !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        color: #94a3b8 !important; 
        margin-left: 8px !important;
        white-space: nowrap !important; /* Prevent text wrapping/clipping */
        overflow: visible !important;   /* Ensure text is fully visible */
      }

      .blocklyTreeSelected .blocklyTreeLabel {
        color: #fff !important;
      }

      /* Category Specific Coloring */
      .blocklyToolboxCategory[id*="blockly-0"] .blocklyToolboxCategoryLabel { color: #60a5fa !important; } /* Flight */
      .blocklyToolboxCategory[id*="blockly-1"] .blocklyToolboxCategoryLabel { color: #22d3ee !important; } /* Nav */
      .blocklyToolboxCategory[id*="blockly-2"] .blocklyToolboxCategoryLabel { color: #a78bfa !important; } /* Logic */
      .blocklyToolboxCategory[id*="blockly-3"] .blocklyToolboxCategoryLabel { color: #34d399 !important; } /* Sensors */
      .blocklyToolboxCategory[id*="blockly-4"] .blocklyToolboxCategoryLabel { color: #fbbf24 !important; } /* AI */
      .blocklyToolboxCategory[id*="blockly-5"] .blocklyToolboxCategoryLabel { color: #f87171 !important; } /* Safety */

      /* Flyout & Workspace */
      .blocklyFlyoutBackground {
        fill: #161b2b !important;
        fill-opacity: 0.98 !important;
      }

      .blocklyMainBackground {
        fill: #0f111a !important;
      }

      /* Aggressively hide ALL scrollbars and handles */
      .blocklyScrollbarVertical,
      .blocklyScrollbarHorizontal,
      .blocklyScrollbarHandle,
      .blocklyScrollbarBackground {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      .blocklyFlyoutBackground {
        fill: #161b2b !important;
        fill-opacity: 0.98 !important;
        stroke: none !important;
      }
      
      .blocklyTreeIcon { display: none !important; }
    `;
    document.head.appendChild(style);
  };
  injectStyles();

  // Mission Persistence Helper (Root Version)
  function saveMission() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    
    // Using the existing API structure
    fetch('/Codelift/api/save_mission.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'xml=' + encodeURIComponent(xmlText)
    })
    .then(r => r.json())
    .then(data => {
        if(data.success) logToTerminal("MISSION LOGGED TO OPS_CLOUD");
    })
    .catch(err => logToTerminal("CLOUD_SAVE_ERROR: " + err.message, true));
  }

  // Handle Resize
  window.addEventListener('resize', () => {
     if (typeof workspace !== 'undefined') {
        Blockly.svgResize(workspace);
     }
  });

  // Status Overrides
  const originalSetStatus = window.setStatus;
  window.setStatus = (text, isConnected) => {
      const dot = document.getElementById('statusDot');
      if (dot) {
          dot.className = isConnected ? 'h-2 w-2 rounded-full bg-red-600 shadow-red-glow' : 'h-2 w-2 rounded-full bg-zinc-700';
      }
      const statusEl = document.getElementById('connStatus');
      if (statusEl) {
          statusEl.textContent = text;
          statusEl.className = isConnected ? 'font-mono text-xs text-white uppercase tracking-tighter' : 'font-mono text-xs text-zinc-500 uppercase tracking-tighter';
      }
      bleIsConnected = isConnected;
  };
</script>
<!-- Note: Site footer is omitted for full-screen IDE experience to prevent layout shifts -->
</body>
</html>
