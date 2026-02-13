# Codelift Block Documentation

This document describes all custom blocks available in the Codelift Drone IDE.

---

## 🛫 Flight Control
Blocks related to fundamental movement and power states of the drone.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `arm_drone` | **Arm Motors** | None | Initializes and arms the drone motors for flight. |
| `disarm_drone` | **Disarm Motors** | None | Safely stops and disarms motors immediately. |
| `takeoff` | **Take Off to [ALT] m** | `ALT`: 0.5 - 10 | Launches the drone to a specific altitude. |
| `land` | **Land Safely** | None | Descends and lands at the current location. |
| `rth` | **Return to Home** | None | Flies back to takeoff coordinates and lands. |
| `emergency_stop`| **EMERGENCY STOP** | None | **Critical:** Immediate motor kill. Use only in danger! |

---

## 🧭 Navigation
Blocks for precise movement and trajectory control.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `move_relative` | **Move [DIR] by [DIST] cm** | `DIR`: Direction, `DIST`: 10-500 | Relative translation from current position. |
| `move_to_waypoint`| **Go to Waypoint Lat: [L] Lng: [N] Alt: [A]** | `LAT`, `LNG`, `ALT` (Numbers) | Flies to absolute GPS coordinates. |
| `orbit_target`| **Orbit [RAD] m at speed [SPD] %** | `RADIUS`: 2-50, `SPEED`: 5-100 | Circles around the current GPS point. |
| `set_speed` | **Set Speed to [SPEED] %** | `SPEED`: 10-100 | Sets the default speed for navigation. |
| `set_altitude` | **Set Altitude to [ALT] m** | `ALT`: 0-100 | Vertical movement to absolute altitude. |
| `set_heading` | **Set Heading to [DEG] °** | `DEG`: 0-359 | Rotates the yaw to a specific angle. |

---

## 🔄 Logic
Execution flow and timing controls.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `wait` | **Wait [TIME] seconds** | `TIME`: 0.1 - 3600 | Pauses mission execution for a duration. |
| `wait_until` | **Wait until [CONDITION]** | `CONDITION` (Boolean) | Pauses until a specific sensor state is met. |
| `controls_if` | **if [COND] do [ACTIONS]** | `COND` (Boolean), `ACTIONS` (Statement) | Executes actions if condition is true. |
| `logic_compare`| **[A] [OP] [B]** | `A`, `B` (Number/Sensor), `OP`: =, <, >, etc. | Compares two values for conditional use. |
| `logic_operation`| **[A] [AND/OR] [B]** | `A`, `B` (Boolean) | Combines two conditions. |
| `logic_negate` | **not [A]** | `A` (Boolean) | Inverts a condition. |
| `logic_boolean` | **true/false** | Dropdown | Fixed boolean values. |
| `drone_value` | **value [NUM]** | `NUM` (Field) | A pink number helper for comparison blocks. |

---

## 🔁 Loops
Repetition and iterative logic control.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `controls_repeat_ext`| **repeat [NUM] times do [ACTIONS]** | `NUM` (Number), `ACTIONS` (Statement) | Repeats a set of commands multiple times. |
| `controls_whileUntil`| **repeat while/until [COND] do [ACTIONS]** | `COND` (Boolean), `ACTIONS` (Statement) | Loops based on a changing sensor or logic state. |

---

## 📡 Sensors
Access real-time telemetry from the drone's IMU, GPS, and obstacle sensors.

| Block | Visual | Output | Description |
|-------|--------|--------|-------------|
| `get_battery` | **Battery Percentage** | Number | Returns voltage (e.g., 3.82). |
| `get_altitude` | **Current Altitude** | Number | Returns inertial altitude estimate (meters). |
| `get_gps` | **Get [COORD]** | Number | Returns Lat, Lng, or Signal Strength. |
| `get_imu` | **Get IMU [AXIS]** | Number | Returns Angles (RPY), Accel (G), Gyro (dps), or Temp. |
| `detect_obstacle`| **Obstacle detected in [DIR]?** | Boolean | Returns true if object detected < 30cm. |

---

## 📷 Vision AI
High-level computer vision and camera operations.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `camera_control` | **Turn Camera [STATE]** | `STATE`: On/Off | Toggles the visual processing stream. |
| `detect_object` | **Detect [OBJ]** | `OBJ`: Target type | Boolean check for Person, Face, QR, or Car. |
| `track_object` | **Track detected object** | None | Centers the detected object in the FOV. |
| `take_photo` | **Take Photo** | None | Saves a capture to the local storage. |

---

## 🛡️ Safety
Mission fail-safes and automated protections.

| Block | Visual | Arguments | Description |
|-------|--------|-----------|-------------|
| `safety_check` | **If Safety [FAULT] Fail [ACTION]** | `FAULT`, `ACTION` | Defines emergency behavior (e.g., Signal Loss). |
| `set_altitude_limit`| **Max Altitude Limit [LIMIT] m**| `LIMIT`: 2-100 | Software ceiling to prevent fly-aways. |
| `battery_guard` | **Auto-Land if battery < [V] V**| `VOLTS`: 3.4 - 4.2 | Mandatory landing trigger for battery health. |
