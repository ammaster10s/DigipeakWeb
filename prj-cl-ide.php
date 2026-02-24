<?php
$pageTitle = "DIGIPEAK OPS // CODELIFT IDE";
$pageDescription = "Real-time drone mission engineering and flight control interface.";
include __DIR__ . "/php/partials/header.php";
?>
</main> <!-- Close main tag from header.php to avoid layout issues in full-screen IDE -->
<script src="/php/assets/site.js"></script> <!-- Load early to handle boot-loader -->
<?php
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
        <button onclick="smartZoomToFit()" class="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors" title="Fit Workspace">
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

      <!-- Protocol / Developer Terminal -->
      <div class="p-6 pt-0">
        <div class="border border-zinc-900 bg-zinc-950/30">
          <!-- Tab Header -->
          <div class="flex border-b border-zinc-900">
            <button id="tabPreviewBtn" onclick="switchDevTab('preview')" class="flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-white bg-zinc-900/50 border-b-2 border-red-600 transition-all">
              <i data-lucide="code" class="h-3 w-3"></i>
              PROTOCOL_PREVIEW
            </button>
            <button id="tabDevBtn" onclick="switchDevTab('dev')" class="flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/30 border-b-2 border-transparent transition-all">
              <i data-lucide="terminal" class="h-3 w-3"></i>
              DEV_TERMINAL
            </button>
          </div>

          <!-- Protocol Preview Panel -->
          <div id="panelPreview" class="p-3">
            <textarea id="jsonPreview" readonly class="w-full bg-transparent font-mono text-[10px] text-zinc-500 outline-none resize-none" rows="8"></textarea>
          </div>

          <!-- Developer Terminal Panel -->
          <div id="panelDev" class="hidden">
            <!-- Terminal Header -->
            <div class="flex items-center justify-between px-3 py-2 border-b border-zinc-900 bg-zinc-900/20">
              <div class="flex items-center gap-2">
                <div id="devPulseDot" class="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
                <span class="font-mono text-[9px] uppercase tracking-widest text-zinc-500">BLE_COMMAND_INTERFACE</span>
              </div>
              <button onclick="clearDevLog()" class="font-mono text-[9px] uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors">CLEAR</button>
            </div>

            <!-- Log Output -->
            <div id="devLog" class="h-40 overflow-y-auto p-3 font-mono text-[10px] leading-relaxed scroll-smooth" style="scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.05) transparent;">
              <div class="text-zinc-600">// CODELIFT DEV_TERMINAL v1.0</div>
              <div class="text-zinc-600">// Type command + ENTER to transmit via BLE</div>
              <div class="text-zinc-600">// ↑↓ arrows for CMD_HISTORY</div>
              <div class="text-zinc-800">─────────────────────────────────────</div>
            </div>

            <!-- Command Input -->
            <div class="flex items-center border-t border-zinc-900 bg-zinc-950">
              <span class="pl-3 pr-1 font-mono text-xs text-red-600 font-bold select-none">▸</span>
              <input type="text" id="devCmdInput"
                     class="flex-1 bg-transparent py-2.5 font-mono text-[11px] text-zinc-300 outline-none placeholder:text-zinc-800"
                     placeholder='SET_MOTOR,1,500 or {"cmd":"disarm"}'
                     onkeydown="handleDevKey(event)" autocomplete="off" spellcheck="false">
              <button onclick="sendDevCmd()" class="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 px-3 py-1.5 m-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white transition-all active:scale-95">
                <i data-lucide="send" class="h-2.5 w-2.5"></i>
                TX
              </button>
            </div>

            <!-- Quick Commands -->
            <div class="border-t border-zinc-900 bg-zinc-950/50 p-2">
              <div class="font-mono text-[8px] uppercase tracking-widest text-zinc-800 mb-1.5">MOTOR_TEST</div>
              <div class="flex flex-wrap gap-1">
                <button onclick="quickCmd('SET_MOTOR,1,500')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M1_25%</button>
                <button onclick="quickCmd('SET_MOTOR,2,500')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M2_25%</button>
                <button onclick="quickCmd('SET_MOTOR,1,1000')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M1_50%</button>
                <button onclick="quickCmd('SET_MOTOR,2,1000')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M2_50%</button>
                <button onclick="quickCmd('SET_MOTOR,1,0')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M1_OFF</button>
                <button onclick="quickCmd('SET_MOTOR,2,0')" class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">M2_OFF</button>
              </div>
            </div>
            <div class="border-t border-zinc-900/50 bg-zinc-950/50 p-2 pt-1">
              <div class="font-mono text-[8px] uppercase tracking-widest text-zinc-800 mb-1.5">SAFETY_CMD</div>
              <div class="flex flex-wrap gap-1">
                <button onclick='quickCmd("{\"cmd\":\"arm\"}")' class="border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[9px] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all">{arm}</button>
                <button onclick='quickCmd("{\"cmd\":\"disarm\"}")' class="border border-red-900/30 bg-red-950/10 px-2 py-1 font-mono text-[9px] text-red-700 hover:border-red-700 hover:text-red-500 transition-all">{disarm}</button>
                <button onclick='quickCmd("{\"cmd\":\"estop\"}")' class="border border-red-900/30 bg-red-950/10 px-2 py-1 font-mono text-[9px] text-red-700 hover:border-red-700 hover:text-red-500 transition-all">{estop}</button>
                <button onclick='quickCmd("{\"cmd\":\"land\"}")' class="border border-red-900/30 bg-red-950/10 px-2 py-1 font-mono text-[9px] text-red-700 hover:border-red-700 hover:text-red-500 transition-all">{land}</button>
              </div>
            </div>
          </div>
        </div>
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
        --bg-dark: #09090b; /* Zinc 950 */
        --border-color: rgba(255,255,255,0.08);
      }
      
      /* 1. Main Toolbox Container */
      .blocklyToolboxDiv, .blocklyToolbox {
        background-color: var(--bg-dark) !important;
        border-right: 1px solid var(--border-color) !important;
        color: #fff !important;
        padding-top: 10px !important;
        /* Ensure it covers the full height and doesn't shrink */
        height: 100% !important; 
        box-sizing: border-box !important;
      }
      
      /* 2. THE FIX: Hide Blockly's SVG Scrollbars (The White/Grey Line) */
      .blocklyScrollbarVertical, 
      .blocklyScrollbarHorizontal, 
      .blocklyScrollbarBackground, 
      .blocklyScrollbarHandle {
        display: none !important;
        visibility: hidden !important;
        fill-opacity: 0 !important;
        stroke: none !important;
      }

      /* 3. Hide Browser Scrollbars */
      .blocklyToolboxDiv::-webkit-scrollbar {
        display: none !important;
        width: 0px !important;
      }

      /* 4. Toolbox Rows (Categories) */
      .blocklyTreeRow {
        height: 42px !important; /* Slightly taller for better touch targets */
        line-height: 42px !important;
        margin: 4px 8px !important;
        padding: 0 12px !important;
        border-radius: 6px !important;
        background-color: transparent !important;
        border: none !important;
        display: flex !important;
        align-items: center !important;
        cursor: pointer !important;
        position: relative !important;
      }

      /* Hover Effect */
      .blocklyTreeRow:not(.blocklyTreeSelected):hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
      }

      /* Selected Active State */
      .blocklyTreeSelected {
        background-color: var(--accent-blue) !important;
      }

      /* 5. Text Labels */
      .blocklyTreeLabel {
        font-family: 'Outfit', sans-serif !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        color: #a1a1aa !important; /* Muted text */
        margin-left: 0px !important; /* Reset margins */
      }

      .blocklyTreeSelected .blocklyTreeLabel {
        color: #fff !important;
        font-weight: 600 !important;
      }

      /* 6. The Flyout (Popup Menu) Background */
      .blocklyFlyoutBackground {
        fill: #18181b !important; /* Slightly lighter than toolbox for contrast */
        fill-opacity: 0.98 !important;
        stroke: var(--border-color) !important;
        stroke-width: 1px !important;
      }

      /* 7. Main Workspace Background */
      .blocklyMainBackground {
        fill: #09090b !important; /* Matches main bg */
        stroke: none !important;
      }
      
      /* 8. Text Inside Blocks */
      .blocklyText {
        fill: #fff !important;
        font-family: 'Outfit', sans-serif !important;
        font-weight: 500 !important;
      }

      /* Hide Default Folder Icons */
      .blocklyTreeIcon { display: none !important; }
      
      /* Color Categories */
      .blocklyToolboxCategory[id*="blockly-0"] .blocklyTreeRow { border-left: 3px solid #3b82f6 !important; }
      .blocklyToolboxCategory[id*="blockly-1"] .blocklyTreeRow { border-left: 3px solid #06b6d4 !important; }
      .blocklyToolboxCategory[id*="blockly-2"] .blocklyTreeRow { border-left: 3px solid #8b5cf6 !important; }
      .blocklyToolboxCategory[id*="blockly-3"] .blocklyTreeRow { border-left: 3px solid #10b981 !important; }
      .blocklyToolboxCategory[id*="blockly-4"] .blocklyTreeRow { border-left: 3px solid #f59e0b !important; }
      .blocklyToolboxCategory[id*="blockly-5"] .blocklyTreeRow { border-left: 3px solid #ef4444 !important; }
    `;
    document.head.appendChild(style);
  };
  injectStyles();

  // Smart Zoom to Fit - Prevents toolbox zoom and limits scale
  function smartZoomToFit() {
    if (typeof workspace === 'undefined') return;
    
    const metrics = workspace.getMetrics();
    const contentWidth = metrics.contentWidth;
    const contentHeight = metrics.contentHeight;
    const viewWidth = metrics.viewWidth;
    const viewHeight = metrics.viewHeight;
    
    // Don't zoom if workspace is empty
    if (contentWidth === 0 || contentHeight === 0) {
      workspace.scrollCenter();
      return;
    }
    
    // Calculate scale to fit with padding
    const scaleX = (viewWidth * 0.9) / contentWidth;
    const scaleY = (viewHeight * 0.9) / contentHeight;
    let targetScale = Math.min(scaleX, scaleY);
    
    // Limit scale to reasonable bounds (0.5x to 1.2x)
    targetScale = Math.max(0.5, Math.min(1.2, targetScale));
    
    workspace.setScale(targetScale);
    workspace.scrollCenter();
  }

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

  // CRITICAL FIX: Decouple Flyout zoom from Workspace zoom
  // This keeps the block picker menu at a fixed readable size
  window.addEventListener('load', function() {
    if (typeof Blockly !== 'undefined') {
      // Override for Vertical Flyout (most common)
      if (Blockly.VerticalFlyout) {
        Blockly.VerticalFlyout.prototype.getFlyoutScale = function() {
          return 1; // Always return scale 1.0 (100%)
        };
      }
      
      // Fallback for different Blockly versions
      if (Blockly.Flyout) {
        Blockly.Flyout.prototype.getFlyoutScale = function() {
          return 1;
        };
      }
      
      // Force refresh if workspace already exists
      if (typeof workspace !== 'undefined' && workspace.getFlyout) {
        workspace.getFlyout().reflow();
      }
    }
  });

  // ============================================
  // === DEVELOPER TERMINAL ===
  // ============================================

  let devCmdHistory = [];
  let devHistoryIdx = -1;

  // --- Tab Switching ---
  function switchDevTab(tab) {
    const previewBtn = document.getElementById('tabPreviewBtn');
    const devBtn = document.getElementById('tabDevBtn');
    const previewPanel = document.getElementById('panelPreview');
    const devPanel = document.getElementById('panelDev');

    if (tab === 'preview') {
      previewBtn.className = 'flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-white bg-zinc-900/50 border-b-2 border-red-600 transition-all';
      devBtn.className = 'flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/30 border-b-2 border-transparent transition-all';
      previewPanel.classList.remove('hidden');
      devPanel.classList.add('hidden');
    } else {
      devBtn.className = 'flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-white bg-zinc-900/50 border-b-2 border-red-600 transition-all';
      previewBtn.className = 'flex-1 flex items-center justify-center gap-2 p-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900/30 border-b-2 border-transparent transition-all';
      devPanel.classList.remove('hidden');
      previewPanel.classList.add('hidden');
      setTimeout(() => {
        const input = document.getElementById('devCmdInput');
        if (input) input.focus();
      }, 100);
    }
    if (window.lucide) lucide.createIcons();
  }

  // --- Dev Log ---
  function devLog(msg, type) {
    const log = document.getElementById('devLog');
    if (!log) return;
    const ts = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entry = document.createElement('div');

    const colors = {
      sent: 'text-amber-500',
      recv: 'text-emerald-500',
      err:  'text-red-500',
      info: 'text-zinc-600'
    };
    entry.className = colors[type] || 'text-zinc-500';
    entry.innerHTML = `<span class="text-zinc-800 mr-2">${ts}</span>${escapeHtml(msg)}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function clearDevLog() {
    const log = document.getElementById('devLog');
    if (log) log.innerHTML = '<div class="text-zinc-600">// log cleared</div>';
  }

  // --- BLE Send ---
  async function sendRawBLE(cmdString) {
    if (!bleIsConnected || !bleCmdChar) {
      devLog('ERR: NO_BLE_LINK — Initialize link first', 'err');
      logToTerminal('DEV: Cannot send — not connected', true);
      return false;
    }
    try {
      const data = new TextEncoder().encode(cmdString + '\n');
      const mtu = 200;
      for (let i = 0; i < data.length; i += mtu) {
        await bleCmdChar.writeValue(data.slice(i, i + mtu));
      }
      devLog('TX → ' + cmdString, 'sent');
      logToTerminal('DEV TX: ' + cmdString);
      return true;
    } catch (err) {
      devLog('TX_FAIL: ' + err.message, 'err');
      logToTerminal('DEV TX Error: ' + err.message, true);
      return false;
    }
  }

  function sendDevCmd() {
    const input = document.getElementById('devCmdInput');
    if (!input) return;
    const cmd = input.value.trim();
    if (!cmd) return;

    if (devCmdHistory.length === 0 || devCmdHistory[devCmdHistory.length - 1] !== cmd) {
      devCmdHistory.push(cmd);
    }
    devHistoryIdx = -1;
    sendRawBLE(cmd);
    input.value = '';
    input.focus();
  }

  function quickCmd(cmd) {
    devLog('QUICK → ' + cmd, 'info');
    sendRawBLE(cmd);
  }

  // --- History Navigation ---
  function handleDevKey(e) {
    const input = document.getElementById('devCmdInput');
    if (!input) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      sendDevCmd();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (devCmdHistory.length === 0) return;
      if (devHistoryIdx === -1) {
        devHistoryIdx = devCmdHistory.length - 1;
      } else if (devHistoryIdx > 0) {
        devHistoryIdx--;
      }
      input.value = devCmdHistory[devHistoryIdx];
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (devHistoryIdx === -1) return;
      if (devHistoryIdx < devCmdHistory.length - 1) {
        devHistoryIdx++;
        input.value = devCmdHistory[devHistoryIdx];
      } else {
        devHistoryIdx = -1;
        input.value = '';
      }
    }
  }

  // --- Forward telemetry to dev log (throttled) ---
  const _origUpdateHUD = updateHUD;
  let _lastDevTelemTime = 0;

  updateHUD = function(data) {
    _origUpdateHUD(data);
    const now = Date.now();
    if (now - _lastDevTelemTime > 2000) {
      _lastDevTelemTime = now;
      const devPanel = document.getElementById('panelDev');
      if (devPanel && !devPanel.classList.contains('hidden')) {
        const parts = [];
        if (data.bat !== undefined) parts.push('bat:' + data.bat.toFixed(1) + 'V');
        if (data.alt !== undefined) parts.push('alt:' + data.alt.toFixed(2) + 'm');
        if (data.y !== undefined) parts.push('yaw:' + Math.round(data.y) + '°');
        if (data.st !== undefined) parts.push(data.st ? 'ARMED' : 'DISARMED');
        if (parts.length > 0) {
          devLog('RX ← ' + parts.join(' | '), 'recv');
        }
      }
    }
  };

  // Global exports
  window.switchDevTab = switchDevTab;
  window.sendDevCmd = sendDevCmd;
  window.quickCmd = quickCmd;
  window.handleDevKey = handleDevKey;
  window.clearDevLog = clearDevLog;

</script>
<!-- Safety: Ensure boot loader vanishes even if site.js has issues -->
<script>
  setTimeout(() => {
    const boot = document.getElementById('boot-loader');
    if (boot && boot.style.display !== 'none') {
      boot.classList.add('boot-hidden');
      setTimeout(() => boot.style.display = 'none', 500);
    }
  }, 3000);
</script>
<!-- Note: Site footer is omitted for full-screen IDE experience to prevent layout shifts -->
</body>
</html>