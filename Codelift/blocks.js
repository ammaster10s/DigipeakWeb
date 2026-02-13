/**
 * Codelift Drone Block Definitions
 * Includes Flight, Navigation, Sensors, Vision AI, Safety, and Logic
 */

// Safety Limits (shared with generator and app)
const SAFETY_LIMITS = {
  MAX_DISTANCE_CM: 500,
  MAX_ALTITUDE_M: 100,
  MAX_SPEED_PERCENT: 100,
  MIN_BATTERY_V: 3.5,
  MAX_PROGRAM_SIZE: 1000
};

Blockly.defineBlocksWithJsonArray([
  // --- FLIGHT CONTROL ---
  {
    "type": "arm_drone",
    "message0": "Arm Motors",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3b82f6",
    "tooltip": "Initialize and arm the drone motors"
  },
  {
    "type": "disarm_drone",
    "message0": "Disarm Motors",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3b82f6",
    "tooltip": "Safely stop and disarm motors"
  },
  {
    "type": "takeoff",
    "message0": "Take Off to %1 m",
    "args0": [
      {
        "type": "field_number",
        "name": "ALT",
        "value": 1.5,
        "min": 0.5,
        "max": 10
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3b82f6",
    "tooltip": "Launch the drone to target altitude"
  },
  {
    "type": "land",
    "message0": "Land Safely",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3b82f6",
    "tooltip": "Descend and land at current location"
  },
  {
    "type": "rth",
    "message0": "Return to Home",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3b82f6",
    "tooltip": "Return to takeoff coordinates and land"
  },
  {
    "type": "emergency_stop",
    "message0": "EMERGENCY STOP",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ef4444",
    "tooltip": "IMMEDIATE MOTOR KILL (Use with caution!)"
  },

  // --- NAVIGATION ---
  {
    "type": "move_relative",
    "message0": "Move %1 by %2 cm",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          ["Forward", "forward"],
          ["Backward", "backward"],
          ["Left", "left"],
          ["Right", "right"],
          ["Up", "up"],
          ["Down", "down"]
        ]
      },
      {
        "type": "field_number",
        "name": "DIST",
        "value": 100,
        "min": 10,
        "max": 500
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4",
    "tooltip": "Move relative to current orientation"
  },
  {
    "type": "move_to_waypoint",
    "message0": "Go to Waypoint Lat: %1 Lng: %2 Alt: %3",
    "args0": [
      { "type": "input_value", "name": "LAT", "check": "Number" },
      { "type": "input_value", "name": "LNG", "check": "Number" },
      { "type": "input_value", "name": "ALT", "check": "Number" }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4",
    "tooltip": "Fly to specific GPS coordinates"
  },
  {
    "type": "orbit_target",
    "message0": "Orbit target with radius %1 m at speed %2 %",
    "args0": [
      { "type": "field_number", "name": "RADIUS", "value": 5, "min": 2, "max": 50 },
      { "type": "field_number", "name": "SPEED", "value": 20, "min": 5, "max": 100 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4",
    "tooltip": "Fly in a circle around current point"
  },
  {
    "type": "set_speed",
    "message0": "Set Speed to %1 %",
    "args0": [{ "type": "field_number", "name": "SPEED", "value": 50, "min": 10, "max": 100 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4"
  },
  {
    "type": "set_altitude",
    "message0": "Set Altitude to %1 m",
    "args0": [{ "type": "field_number", "name": "ALT", "value": 2, "min": 0, "max": 100 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4"
  },
  {
    "type": "set_heading",
    "message0": "Set Heading to %1 °",
    "args0": [{ "type": "field_angle", "name": "DEG", "angle": 0 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#06b6d4"
  },

  // --- LOGIC ---
  {
    "type": "wait",
    "message0": "Wait %1 seconds",
    "args0": [{ "type": "field_number", "name": "TIME", "value": 1, "min": 0.1, "max": 3600 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8b5cf6"
  },
  {
    "type": "wait_until",
    "message0": "Wait until %1",
    "args0": [{ "type": "input_value", "name": "CONDITION", "check": "Boolean" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8b5cf6"
  },

  // --- SENSORS ---
  {
    "type": "get_battery",
    "message0": "Battery Percentage",
    "output": "Number",
    "colour": "#10b981"
  },
  {
    "type": "get_altitude",
    "message0": "Current Altitude",
    "output": "Number",
    "colour": "#10b981"
  },
  {
    "type": "get_gps",
    "message0": "Get %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COORD",
        "options": [["Latitude", "lat"], ["Longitude", "lng"], ["Signal Strength", "sat"]]
      }
    ],
    "output": "Number",
    "colour": "#10b981"
  },
  {
    "type": "get_imu",
    "message0": "Get IMU %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "AXIS",
        "options": [
          ["Roll Angle", "r"],
          ["Pitch Angle", "p"],
          ["Yaw Heading", "y"],
          ["Accel X (g)", "ax"],
          ["Accel Y (g)", "ay"],
          ["Accel Z (g)", "az"],
          ["Gyro X (°/s)", "gx"],
          ["Gyro Y (°/s)", "gy"],
          ["Gyro Z (°/s)", "gz"],
          ["Temperature (°C)", "t"]
        ]
      }
    ],
    "output": "Number",
    "colour": "#10b981"
  },
  {
    "type": "detect_obstacle",
    "message0": "Obstacle detected in %1 ?",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [["Front", "front"], ["Back", "back"], ["Left", "left"], ["Right", "right"]]
      }
    ],
    "output": "Boolean",
    "colour": "#10b981"
  },

  // --- VISION AI ---
  {
    "type": "camera_control",
    "message0": "Turn Camera %1",
    "args0": [{ "type": "field_dropdown", "name": "STATE", "options": [["On", "on"], ["Off", "off"]] }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#f59e0b"
  },
  {
    "type": "detect_object",
    "message0": "Detect %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OBJ",
        "options": [["Person", "person"], ["Face", "face"], ["QR Code", "qr"], ["Car", "car"]]
      }
    ],
    "output": "Boolean",
    "colour": "#f59e0b"
  },
  {
    "type": "track_object",
    "message0": "Track detected object",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#f59e0b"
  },
  {
    "type": "take_photo",
    "message0": "Take Photo",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#f59e0b"
  },

  // --- SAFETY ---
  {
    "type": "safety_check",
    "message0": "If Safety %1 Fail %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "CHECK",
        "options": [["Signal Loss", "signal"], ["Low Battery", "battery"], ["Out of Bounds", "bounds"]]
      },
      {
        "type": "input_statement",
        "name": "ACTION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ef4444"
  },
  {
    "type": "set_altitude_limit",
    "message0": "Set Max Altitude Limit %1 m",
    "args0": [{ "type": "field_number", "name": "LIMIT", "value": 30, "min": 2, "max": 100 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ef4444"
  },
  {
    "type": "battery_guard",
    "message0": "Auto-Land if battery < %1 V",
    "args0": [{ "type": "field_number", "name": "VOLTS", "value": 3.6, "min": 3.4, "max": 4.2 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ef4444"
  },
  {
    "type": "drone_value",
    "message0": "value %1",
    "args0": [{ "type": "field_number", "name": "NUM", "value": 0 }],
    "output": "Number",
    "colour": "#ec4899",
    "tooltip": "A numeric value for comparisons"
  }
]);