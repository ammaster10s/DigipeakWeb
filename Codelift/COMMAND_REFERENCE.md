# Codelift Generated Command Reference

This document provides the exact JSON output for every Blockly block in the Codelift IDE. These commands are separated by `~` and streamed to the drone.

---

## 🛫 Flight Control

| Block Type | Generated JSON Command |
|------------|------------------------|
| `arm_drone` | `{"cmd":"arm"}~` |
| `disarm_drone` | `{"cmd":"disarm"}~` |
| `takeoff` | `{"cmd":"takeoff","alt":1.5}~` |
| `land` | `{"cmd":"land"}~` |
| `rth` | `{"cmd":"rth"}~` |
| `emergency_stop` | `{"cmd":"estop"}~` |

---

## 🧭 Navigation

| Block Type | Generated JSON Command | Notes |
|------------|------------------------|-------|
| `move_relative` | `{"cmd":"move","dir":"forward","val":100}~` | `dir`: forward/backward/left/right/up/down |
| `move_to_waypoint`| `{"cmd":"goto","lat":0,"lng":0,"alt":0}~` | Uses absolute GPS coordinates |
| `orbit_target` | `{"cmd":"orbit","rad":5,"spd":20}~` | `rad` in meters, `spd` in % |
| `set_speed` | `{"cmd":"spd","val":50}~` | Percentage (10-100) |
| `set_altitude` | `{"cmd":"alt","val":2}~` | Absolute meters |
| `set_heading` | `{"cmd":"hdg","val":90}~` | Degrees (0-359) |

---

## 🔄 Logic & Loops

| Block Type | Generated JSON Command | Notes |
|------------|------------------------|-------|
| `controls_if` | `{"cmd":"if","cond":"...","then":[...]}~` | `then` is a nested array of commands |
| `logic_compare` | `[ "__TELEMETRY__.bat < 3.6", 0 ]` | Generated internal to an `if` or `wait_until` |
| `wait` | `{"cmd":"wait","val":1}~` | `val` in seconds |
| `wait_until` | `{"cmd":"wait_until","cond":"..."}~` | `cond` is a JS-like sensor expression |
| `drone_value` | `[ 10.5, 0 ]` | Raw numeric value for comparisons |

---

## 📡 Sensors (Atomic Values)
These blocks do not generate full commands but rather **expressions** used inside logic/if blocks.

| Block Type | Generated Key | Example Usage |
|------------|---------------|---------------|
| `get_battery` | `__TELEMETRY__.bat` | Battery voltage |
| `get_altitude` | `__TELEMETRY__.alt` | Inertial altitude |
| `get_gps` | `__TELEMETRY__.gps.lat` | `lat`, `lng`, `sat` |
| `get_imu` | `__TELEMETRY__.imu.ax` | `r`, `p`, `y`, `ax`, `ay`, `az`, `gx`, `gy`, `gz`, `t` |
| `detect_obstacle`| `__TELEMETRY__.sensor.front < 30`| Returns boolean |

---

## 📷 Vision AI

| Block Type | Generated JSON Command | Notes |
|------------|------------------------|-------|
| `camera_control` | `{"cmd":"cam","state":"on"}~` | `state`: on/off |
| `detect_object` | `[ "__VISION__.detect == \"person\"", 0 ]` | Boolean expression |
| `track_object` | `{"cmd":"track"}~` | High-level tracking command |
| `take_photo` | `{"cmd":"photo"}~` | Capture trigger |

---

## 🛡️ Safety Fail-safes

| Block Type | Generated JSON Command | Notes |
|------------|------------------------|-------|
| `safety_check` | `{"event":"on_signal","actions":[...]}~` | Triggers when specific fault occurs |
| `set_altitude_limit`| `{"cmd":"limit_alt","val":30}~` | Software ceiling |
| `battery_guard` | `{"cmd":"guard_bat","val":3.6}~` | Auto-land threshold |

---

## 💡 Protocol Formatting
*   **Atomic Values**: These use `Blockly.JavaScript.ORDER_ATOMIC`. They are returned as an array `[code, order]` and are automatically inserted into comparison strings like `"__TELEMETRY__.bat < 3.5"`.
*   **Separators**: The `~` character tells the drone firmware that a JSON object is complete and ready for parsing.
