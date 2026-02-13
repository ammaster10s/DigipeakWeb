# Codelift Drone JSON Protocol Specification

This document defines the communication protocol between the Codelift IDE and the drone execution firmware (ESP32/ROS/MAVLink).

## Architecture Overview
The IDE generates a JSON array of command objects. This payload is streamed via BLE (MTU 200 bytes) or Serial (115200 baud).

- **Format**: JSON Array `[...]`
- **Terminator**: Newline `\n`
- **Separator (Generation)**: `~` (Internal to generator only)

---

## 1. Safety Limits & Constraints

These values are enforced in the UI and must be validated by the drone firmware.

| Parameter | Recommended Range | Max Limit | Description |
|-----------|-------------------|-----------|-------------|
| **Altitude** | 0.5 - 10.0 m | 100.0 m | Absolute height from takeoff point. |
| **Distance** | 10 - 300 cm | 500 cm | Movement per single instruction. |
| **Speed** | 10 - 60 % | 100 % | Percentage of maximum motor output. |
| **Battery** | 3.6 - 4.2 V | N/A | Low-voltage landing trigger at 3.5V. |
| **Timeout** | 0.1 - 60.0 s | 3600 s | Max duration for any single 'wait'. |

---

## 2. Command Reference

### Flight Control
| Command | JSON Payload | Description |
|---------|--------------|-----------|
| **Arm** | `{"cmd": "arm"}` | Power up ESCs and engage motor idle. |
| **Disarm** | `{"cmd": "disarm"}` | Cut power to motors immediately (disengaged status). |
| **ESTOP** | `{"cmd": "estop"}` | **Priority Kill.** Immediate motor stop. Drone will fall. |
| **Takeoff** | `{"cmd": "takeoff", "alt": 1.5}` | Auto-launch to specified altitude in meters. |
| **Land** | `{"cmd": "land"}` | Slow descent and auto-disarm upon touchdown. |
| **RTH** | `{"cmd": "rth"}` | Return to home GPS coordinates and land. |

### Navigation
| Command | JSON Payload | Specification |
|---------|--------------|---------------|
| **Move** | `{"cmd": "move", "dir": "forward", "val": 100}` | `dir`: "forward", "backward", "left", "right", "up", "down". `val`: cm. |
| **Go To** | `{"cmd": "goto", "lat": 0.0, "lng": 0.0, "alt": 1.5}` | Fly to absolute GPS coordinates. |
| **Orbit** | `{"cmd": "orbit", "rad": 5, "spd": 20}` | Circle current point. `rad`: radius in meters, `spd`: speed %. |
| **Set Speed**| `{"cmd": "spd", "val": 50}` | Global speed setting for subsequent moves (%). |
| **Set Heading**| `{"cmd": "hdg", "val": 90}` | Rotate yaw to absolute degree (0-359). |

### Sensors & Logic
| Command | JSON Payload | Description |
|---------|--------------|-----------|
| **Wait** | `{"cmd": "wait", "val": 2.5}` | Pause execution for `val` seconds. |
| **Wait Until**| `{"cmd": "wait_until", "cond": "..."}` | Pause until JS expression (sensor data) is true. |
| **If (Logic)**| `{"cmd": "if", "cond": "...", "then": [...]}` | Execute `then` array if `cond` is true. |
| **Limit Alt** | `{"cmd": "limit_alt", "val": 30}` | Set active software ceiling (meters). |
| **Guard Bat** | `{"cmd": "guard_bat", "val": 3.6}` | Trigger auto-land if voltage < `val`. |

### Vision AI & Camera
| Command | JSON Payload | Description |
|---------|--------------|-----------|
| **Camera** | `{"cmd": "cam", "state": "on"}` | Toggle camera power/stream. |
| **Track** | `{"cmd": "track"}` | Engage visual object tracking (centralizes object in FOV). |
| **Photo** | `{"cmd": "photo"}` | Capture high-res image to SD/Flash. |

---

## 3. Telemetry Feedback (Drone -> App)

The drone should stream this JSON object every **100ms - 200ms**.

```json
{
  "bat": 3.82,     // Battery Voltage (V)
  "alt": 1.45,     // Altitude (m) [Inertial Estimate - see ALTITUDE_ESTIMATION.md]
  "r": 0.5,        // Roll angle (deg) - Calculated from IMU
  "p": -1.2,       // Pitch angle (deg) - Calculated from IMU
  "y": 180,        // Yaw heading (deg) - Calculated from IMU/Mag
  "st": true,      // Arm Status (true=Armed)
  "imu": {
    "ax": 0.012,   // Accelerometer X (g)
    "ay": -0.045,  // Accelerometer Y (g)
    "az": 1.002,   // Accelerometer Z (g)
    "gx": 0.1,     // Gyro X (°/s)
    "gy": -0.2,    // Gyro Y (°/s)
    "gz": 0.0,     // Gyro Z (°/s)
    "t": 32.5      // Core Temperature (°C)
  },
  "gps": {
    "lat": 0.0,
    "lng": 0.0,
    "sat": 12      // Satellite count
  },
  "sensor": {
    "front": 150,  // Ultrasonic/Lidar distance in cm
    "back": 300,
    "left": 80,
    "right": 80
  }
}
```

---

## 4. Event System

Events allow the drone to handle asynchronous triggers during a mission.

```json
{
  "event": "on_signal",
  "actions": [
    {"cmd": "rth"}
  ]
}
```

### Example: Nested Conditional Logic
```json
[
  { "cmd": "arm" },
  { "cmd": "move", "dir": "forward", "val": 100 },
  {
    "cmd": "if",
    "cond": "__TELEMETRY__.alt == 0.5",
    "then": [
      { "cmd": "move", "dir": "forward", "val": 100 }
    ]
  }
]
```

**Supported Event Types:**
- `on_signal`: Triggered on connection loss.
- `on_battery`: Triggered on voltage threshold.
- `on_bounds`: Triggered on geofence breach.
- `on_qr`: Triggered when QR data is detected.
