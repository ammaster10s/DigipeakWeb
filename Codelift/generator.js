/**
 * JSON Generator for Codelift Drone
 * bridge between Blockly and Drone JSON Protocol
 */

// Initialize the generator
if (!Blockly.JavaScript) {
  console.error('FATAL: Blockly.JavaScript not found.');
}

// Global separator for command streaming
const SEP = '~';

// Helper: Wrap value in order atomic
const atomic = (code) => [code, Blockly.JavaScript.ORDER_ATOMIC];

// --- FLIGHT CONTROL ---
Blockly.JavaScript.forBlock['arm_drone'] = () => JSON.stringify({ cmd: 'arm' }) + SEP;
Blockly.JavaScript.forBlock['disarm_drone'] = () => JSON.stringify({ cmd: 'disarm' }) + SEP;
Blockly.JavaScript.forBlock['takeoff'] = (block) => {
  const alt = block.getFieldValue('ALT');
  return JSON.stringify({ cmd: 'takeoff', alt: parseFloat(alt) }) + SEP;
};
Blockly.JavaScript.forBlock['land'] = () => JSON.stringify({ cmd: 'land' }) + SEP;
Blockly.JavaScript.forBlock['rth'] = () => JSON.stringify({ cmd: 'rth' }) + SEP;
Blockly.JavaScript.forBlock['emergency_stop'] = () => JSON.stringify({ cmd: 'estop' }) + SEP;

// --- NAVIGATION ---
Blockly.JavaScript.forBlock['move_relative'] = (block) => {
  const dir = block.getFieldValue('DIR');
  const dist = block.getFieldValue('DIST');
  return JSON.stringify({ cmd: 'move', dir, val: parseInt(dist) }) + SEP;
};

Blockly.JavaScript.forBlock['move_to_waypoint'] = (block) => {
  const lat = Blockly.JavaScript.valueToCode(block, 'LAT', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  const lng = Blockly.JavaScript.valueToCode(block, 'LNG', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  const alt = Blockly.JavaScript.valueToCode(block, 'ALT', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  return JSON.stringify({ cmd: 'goto', lat: parseFloat(lat), lng: parseFloat(lng), alt: parseFloat(alt) }) + SEP;
};

Blockly.JavaScript.forBlock['orbit_target'] = (block) => {
  const radius = block.getFieldValue('RADIUS');
  const speed = block.getFieldValue('SPEED');
  return JSON.stringify({ cmd: 'orbit', rad: parseInt(radius), spd: parseInt(speed) }) + SEP;
};

Blockly.JavaScript.forBlock['set_speed'] = (block) => {
  return JSON.stringify({ cmd: 'spd', val: parseInt(block.getFieldValue('SPEED')) }) + SEP;
};

Blockly.JavaScript.forBlock['set_altitude'] = (block) => {
  return JSON.stringify({ cmd: 'alt', val: parseFloat(block.getFieldValue('ALT')) }) + SEP;
};

Blockly.JavaScript.forBlock['set_heading'] = (block) => {
  return JSON.stringify({ cmd: 'hdg', val: parseInt(block.getFieldValue('DEG')) }) + SEP;
};

// --- SENSORS ---
Blockly.JavaScript.forBlock['get_battery'] = () => atomic('__TELEMETRY__.bat');
Blockly.JavaScript.forBlock['get_altitude'] = () => atomic('__TELEMETRY__.alt');
Blockly.JavaScript.forBlock['get_gps'] = (block) => {
  const coord = block.getFieldValue('COORD');
  return atomic(`__TELEMETRY__.gps.${coord}`);
};
Blockly.JavaScript.forBlock['get_imu'] = (block) => {
  const axis = block.getFieldValue('AXIS');
  if (['r', 'p', 'y'].includes(axis)) {
    return atomic(`__TELEMETRY__.${axis}`);
  }
  return atomic(`__TELEMETRY__.imu.${axis}`);
};
Blockly.JavaScript.forBlock['detect_obstacle'] = (block) => {
  const dir = block.getFieldValue('DIR');
  return atomic(`__TELEMETRY__.sensor.${dir} < 30`); // 30cm threshold
};

// --- VISION AI ---
Blockly.JavaScript.forBlock['camera_control'] = (block) => {
  return JSON.stringify({ cmd: 'cam', state: block.getFieldValue('STATE') }) + SEP;
};
Blockly.JavaScript.forBlock['detect_object'] = (block) => {
  return atomic(`__VISION__.detect == "${block.getFieldValue('OBJ')}"`);
};
Blockly.JavaScript.forBlock['track_object'] = () => JSON.stringify({ cmd: 'track' }) + SEP;
Blockly.JavaScript.forBlock['take_photo'] = () => JSON.stringify({ cmd: 'photo' }) + SEP;

// --- LOGIC & SYSTEM ---
Blockly.JavaScript.forBlock['controls_if'] = (block) => {
  let n = 0;
  let code = '';
  const condition = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  const branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);

  const obj = {
    cmd: 'if',
    cond: condition,
    then: parseNestedCommands(branch)
  };

  // Handle else if (not fully implemented in drone, but we can nested them)
  // For now, simplicity: single if
  return JSON.stringify(obj) + SEP;
};

Blockly.JavaScript.forBlock['logic_compare'] = (block) => {
  const opMap = { 'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' };
  const op = opMap[block.getFieldValue('OP')];
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return atomic(`${a} ${op} ${b}`);
};

Blockly.JavaScript.forBlock['logic_operation'] = (block) => {
  const op = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  return atomic(`(${a} ${op} ${b})`);
};

Blockly.JavaScript.forBlock['logic_boolean'] = (block) => {
  return atomic(block.getFieldValue('BOOL') == 'TRUE' ? 'true' : 'false');
};

Blockly.JavaScript.forBlock['drone_value'] = (block) => {
  return atomic(block.getFieldValue('NUM'));
};

Blockly.JavaScript.forBlock['wait'] = (block) => {
  return JSON.stringify({ cmd: 'wait', val: parseFloat(block.getFieldValue('TIME')) }) + SEP;
};

Blockly.JavaScript.forBlock['wait_until'] = (block) => {
  const cond = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'true';
  return JSON.stringify({ cmd: 'wait_until', cond }) + SEP;
};

Blockly.JavaScript.forBlock['safety_check'] = (block) => {
  const check = block.getFieldValue('CHECK');
  const action = Blockly.JavaScript.statementToCode(block, 'ACTION');
  // Wrap nested actions in helper if needed
  return JSON.stringify({ event: `on_${check}`, actions: parseNestedCommands(action) }) + SEP;
};

Blockly.JavaScript.forBlock['set_altitude_limit'] = (block) => {
  return JSON.stringify({ cmd: 'limit_alt', val: parseInt(block.getFieldValue('LIMIT')) }) + SEP;
};

Blockly.JavaScript.forBlock['battery_guard'] = (block) => {
  return JSON.stringify({ cmd: 'guard_bat', val: parseFloat(block.getFieldValue('VOLTS')) }) + SEP;
};

/**
 * Enhanced Nested Command Parser
 * Converts Blockly JavaScript statements back into JSON arrays for the drone
 */
function parseNestedCommands(code) {
  if (!code) return [];
  return code.split(SEP)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      try { return JSON.parse(s); }
      catch (e) { return { cmd: 'error', raw: s }; }
    });
}

// Bridge core logic/math blocks if needed
// (Blockly's default JavaScript generators usually return actual JS code)
// Our executor handles JS-like expressions for 'wait_until' and sensor comparisons