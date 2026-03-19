# Codelift Block Documentation

This document describes all custom blocks available in the Codelift Drone IDE.

---

## 🛫 Flight Control
Blocks related to fundamental movement and power states of the drone.

| Block | Visual | Arguments | Generated JSON | Description |
|-------|--------|-----------|----------------|-------------|
| `arm_drone` | **Arm Motors** | None | `{"cmd": "arm"}` | Initializes and arms the drone motors for flight. |
| `disarm_drone` | **Disarm Motors** | None | `{"cmd": "disarm"}` | Safely stops and disarms motors immediately. |
| `takeoff` | **Take Off to [ALT] m** | `ALT`: 0.5 - 10 | `{"cmd": "takeoff", "alt": ALT}` | Launches the drone to a specific altitude. |
| `land` | **Land Safely** | None | `{"cmd": "land"}` | Descends and lands at the current location. |
| `rth` | **Return to Home** | None | `{"cmd": "rth"}` | Flies back to takeoff coordinates and lands. |
| `emergency_stop`| **EMERGENCY STOP** | None | `{"cmd": "estop"}` | **Critical:** Immediate motor kill. Use only in danger! |

---

## 🧭 Navigation
Blocks for precise movement and trajectory control.

| Block | Visual | Arguments | Generated JSON | Description |
|-------|--------|-----------|----------------|-------------|
| `move_relative` | **Move [DIR] by [DIST] cm** | `DIR`: Direction, `DIST`: 10-500 | `{"cmd": "move", "dir": DIR, "val": DIST}` | Relative translation from current position. |
| `move_to_waypoint`| **Go to Waypoint Lat: [L] Lng: [N] Alt: [A]** | `LAT`, `LNG`, `ALT` (Numbers) | `{"cmd": "goto", "lat": LAT, "lng": LNG, "alt": ALT}` | Flies to absolute GPS coordinates. |
| `orbit_target`| **Orbit [RAD] m at speed [SPD] %** | `RADIUS`: 2-50, `SPEED`: 5-100 | `{"cmd": "orbit", "rad": RAD, "spd": SPD}` | Circles around the current GPS point. |
| `set_speed` | **Set Speed to [SPEED] %** | `SPEED`: 10-100 | `{"cmd": "spd", "val": SPEED}` | Sets the default speed for navigation. |
| `set_altitude` | **Set Altitude to [ALT] m** | `ALT`: 0-100 | `{"cmd": "alt", "val": ALT}` | Vertical movement to absolute altitude. |
| `set_heading` | **Set Heading to [DEG] °** | `DEG`: 0-359 | `{"cmd": "hdg", "val": DEG}` | Rotates the yaw to a specific angle. |

---

## 🔄 Logic
Execution flow and timing controls.

| Block | Visual | Arguments | Generated JSON / Expression | Description |
|-------|--------|-----------|-----------------------------|-------------|
| `wait` | **Wait [TIME] seconds** | `TIME`: 0.1 - 3600 | `{"cmd": "wait", "val": TIME}` | Pauses mission execution for a duration. |
| `wait_until` | **Wait until [CONDITION]** | `CONDITION` (Boolean) | `{"cmd": "wait_until", "cond": CONDITION}` | Pauses until a specific sensor state is met. |
| `controls_if` | **if [COND] do [ACTIONS]** | `COND` (Boolean), `ACTIONS` (Statement) | `{"cmd": "if", "cond": COND, "then": [ACTIONS]}` | Executes actions if condition is true. |
| `logic_compare`| **[A] [OP] [B]** | `A`, `B` (Number/Sensor), `OP`: =, <, >, etc. | `A OP B` (Evaluated string) | Compares two values for conditional use. |
| `logic_operation`| **[A] [AND/OR] [B]** | `A`, `B` (Boolean) | `(A &&/\|\| B)` (Evaluated string) | Combines two conditions. |
| `logic_negate` | **not [A]** | `A` (Boolean) | `(!A)` (Evaluated string) | Inverts a condition. |
| `logic_boolean` | **true/false** | Dropdown | `true` / `false` (Evaluated string) | Fixed boolean values. |
| `drone_value` | **value [NUM]** | `NUM` (Field) | `NUM` (Evaluated string) | A pink number helper for comparison blocks. |

---

## 🔁 Loops
Repetition and iterative logic control.

| Block | Visual | Arguments | Generated JSON | Description |
|-------|--------|-----------|----------------|-------------|
| `controls_repeat_ext`| **repeat [NUM] times do [ACTIONS]** | `NUM` (Number), `ACTIONS` (Statement) | *Client-side loop expansion* | Repeats a set of commands multiple times. |
| `controls_whileUntil`| **repeat while/until [COND] do [ACTIONS]** | `COND` (Boolean), `ACTIONS` (Statement) | *Client-side loop expansion* | Loops based on a changing sensor or logic state. |

---

## 📡 Sensors
Access real-time telemetry from the drone's IMU, GPS, and obstacle sensors.

| Block | Visual | Output | Generated Expression | Description |
|-------|--------|--------|----------------------|-------------|
| `get_battery` | **Battery Percentage** | Number | `__TELEMETRY__.bat` | Returns voltage (e.g., 3.82). |
| `get_altitude` | **Current Altitude** | Number | `__TELEMETRY__.alt` | Returns inertial altitude estimate (meters). |
| `get_gps` | **Get [COORD]** | Number | `__TELEMETRY__.gps.COORD` | Returns Lat, Lng, or Signal Strength. |
| `get_imu` | **Get IMU [AXIS]** | Number | `__TELEMETRY__.AXIS` (or `__TELEMETRY__.imu.AXIS`) | Returns Angles (RPY), Accel (G), Gyro (dps), or Temp. |
| `detect_obstacle`| **Obstacle detected in [DIR]?** | Boolean | `__TELEMETRY__.sensor.DIR < 30` | Returns true if object detected < 30cm. |

---

## 📷 Vision AI
High-level computer vision and camera operations.

| Block | Visual | Arguments | Generated JSON / Expression | Description |
|-------|--------|-----------|-----------------------------|-------------|
| `camera_control` | **Turn Camera [STATE]** | `STATE`: On/Off | `{"cmd": "cam", "state": STATE}` | Toggles the visual processing stream. |
| `detect_object` | **Detect [OBJ]** | `OBJ`: Target type | `__VISION__.detect == "OBJ"` | Boolean check for Person, Face, QR, or Car. |
| `track_object` | **Track detected object** | None | `{"cmd": "track"}` | Centers the detected object in the FOV. |
| `take_photo` | **Take Photo** | None | `{"cmd": "photo"}` | Saves a capture to the local storage. |

---

## 🛡️ Safety
Mission fail-safes and automated protections.

| Block | Visual | Arguments | Generated JSON | Description |
|-------|--------|-----------|----------------|-------------|
| `safety_check` | **If Safety [FAULT] Fail [ACTION]** | `FAULT`, `ACTION` | `{"event": "on_FAULT", "actions": [ACTION]}` | Defines emergency behavior (e.g., Signal Loss). |
| `set_altitude_limit`| **Max Altitude Limit [LIMIT] m**| `LIMIT`: 2-100 | `{"cmd": "limit_alt", "val": LIMIT}` | Software ceiling to prevent fly-aways. |
| `battery_guard` | **Auto-Land if battery < [V] V**| `VOLTS`: 3.4 - 4.2 | `{"cmd": "guard_bat", "val": VOLTS}` | Mandatory landing trigger for battery health. |
