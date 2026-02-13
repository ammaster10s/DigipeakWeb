# Blockly Drone - JSON-Only Implementation

A visual drone programming system using Blockly with direct JSON command execution on ESP32.

## Architecture

```
Blockly UI → Generator → JSON Array → Serial → ESP32 → Drone Hardware
                                                ↓
                                         Validation & Execution
```

## System Components

### 1. Frontend (Web Browser)
- **index.html** - UI with Blockly editor, preview panels
- **blocks.js** - Block definitions with safety limits
- **generator.js** - JSON code generation with validation
- **app.js** - Workspace management, upload logic, simulation

### 2. ESP32 Firmware
- **esp32_executor.cpp** - JSON parser and command executor
- **drone_hal.h** - Hardware abstraction layer (implement for your hardware)

## Safety Limits (Hard-Coded)

These limits are enforced at multiple levels and **cannot be overridden**:

| Limit | Value | Enforced By |
|-------|-------|-------------|
| Max movement distance | 300 cm | Blocks (UI limit) + Generator (validation) + Executor |
| Max altitude | 50 m | Executor validation |
| Max speed | 100% | Blocks (UI limit) + Executor |
| Max hover/wait time | 60 s | Blocks (UI limit) + Executor |
| Max program duration | 3600 s (1 hour) | Executor |
| Max program size | 500 commands | Blocks (soft limit) + Executor |

## JSON Protocol

### Format
Commands are separated by `~` during generation, then converted to JSON array for upload:

```javascript
// Raw from Blockly generator:
{"cmd":"takeoff"}~{"cmd":"move","dir":"forward","value":100}~...

// After processing:
[
  {"cmd":"takeoff"},
  {"cmd":"move","dir":"forward","value":100},
  ...
]

// Sent over serial with newline terminator
```

### Command Reference

#### Flight Control
```json
{"cmd":"takeoff"}                          // Launch and hover
{"cmd":"land"}                             // Descend and disarm
{"cmd":"hover","time":2.5}                 // Maintain position (seconds)
{"cmd":"wait","time":1.0}                  // Pause (seconds)
```

#### Movement
```json
{"cmd":"move","dir":"forward","value":150}     // 150 cm forward
{"cmd":"move","dir":"backward","value":100}    // 100 cm backward
{"cmd":"move","dir":"left","value":50}         // 50 cm left
{"cmd":"move","dir":"right","value":75}        // 75 cm right
{"cmd":"move","dir":"up","value":200}          // 200 cm up
{"cmd":"move","dir":"down","value":100}        // 100 cm down
```

#### Rotation & Heading
```json
{"cmd":"rotate","angle":90}                // Rotate 90° (yaw)
{"cmd":"set_heading","value":180}          // Face south (0=north)
```

#### Altitude & Speed
```json
{"cmd":"set_altitude","value":10.5}        // Climb to 10.5 meters
{"cmd":"speed","value":75}                 // Set speed to 75%
```

#### Aerobatics
```json
{"cmd":"flip","dir":"forward"}             // Forward flip
{"cmd":"flip","dir":"backward"}            // Backward flip
{"cmd":"flip","dir":"left"}                // Left flip
{"cmd":"flip","dir":"right"}               // Right flip
```

#### Events (QR Detection)
```json
{"event":"qr_detected","action":"[...]"}   // When QR code enters view
{"event":"qr_lost","action":"[...]"}       // When QR code leaves view
```

## Blockly Block Types

### Flight Category
- **Take off** - Launch drone
- **Land** - Safe landing sequence
- **Hover** - Maintain position (0.1-60s)
- **Flip** - Acrobatic maneuver

### Motion Category
- **Move forward/backward/left/right** - Horizontal movement (10-300cm)
- **Ascend/Descend** - Vertical movement (5-1000cm)
- **Rotate** - Yaw rotation (0-360°)

### Control Category
- **Set speed** - Adjust movement velocity (10-100%)
- **Set altitude** - Climb to absolute height (0.5-50m)
- **Set heading** - Face direction (0-360°)
- **Wait** - Pause execution (0.1-60s)

### Events (QR Codes)
- **On QR detected** - Triggered when QR code detected
- **On QR lost** - Triggered when QR code disappears

## Implementation Guide

### Step 1: Implement Hardware Abstraction Layer

Edit `drone_hal.h` and implement the functions for your specific hardware:

```cpp
void drone_move_forward(int distance_cm) {
  // Your implementation: set motor speeds, wait for completion
  // Use IMU/odometry to verify distance traveled
  // Example for DJI Tello:
  tello.move_forward(distance_cm / 100.0f);  // Convert to meters
}
```

### Step 2: Configure Serial Communication

Ensure ESP32 is configured for 115200 baud:

```cpp
Serial.begin(115200);  // In setup()
```

### Step 3: Compile and Upload

1. Use Arduino IDE or PlatformIO
2. Include ArduinoJson library (v6.x)
3. Upload `esp32_executor.cpp` to your ESP32
4. Ensure `drone_hal.h` is in the same directory

### Step 4: Test Connection

1. Open Blockly in browser
2. Click "Connect" button
3. Select ESP32 serial port
4. Should see "Connected" status

### Step 5: Create & Run Programs

1. Drag blocks from toolbox
2. Preview generated JSON
3. Click "Simulate" to test logic
4. Click "Upload" to send to ESP32

## Validation Flow

```
User builds program
    ↓
Generator creates JSON (validates each command)
    ↓
App validates against safety limits
    ↓
Simulation shows command sequence
    ↓
User clicks Upload
    ↓
JSON sent to ESP32 (newline terminated)
    ↓
ESP32 parses JSON
    ↓
ESP32 validates full program
    ↓
Executor runs commands with safety checks
```

## Error Handling

### Web Client
- JSON syntax validation
- Safety limit checks
- Program size limits
- Feedback in UI

### ESP32
- JSON parse errors
- Command validation
- Safety limit enforcement
- Serial response codes

Example error response:
```
ERROR: Distance 350 exceeds max 300
ERROR: Altitude 75.5 exceeds max 50.0
ERROR: Program exceeds 500 commands
```

## Serial Protocol

### Upload Command
Client sends:
```
[{"cmd":"takeoff"},{"cmd":"move",...}]\n
```

### ESP32 Response
Success:
```
Received: 234 bytes
Executing program with 5 commands
[1/5] EXEC: TAKEOFF
[2/5] EXEC: MOVE forward 100
...
Program complete: 12.5 seconds
SUCCESS
```

Error:
```
ERROR: Distance 350 exceeds max 300
FAILED
```

## Advanced Features

### QR Code Tracking
1. Implement QR detection in HAL
2. When detected, ESP32 triggers `qr_detected` handler
3. Can execute movement relative to QR code
4. When lost, executes `qr_lost` handler

### Autonomous Missions
Programs are completely self-contained. No external control required after upload.

### Safety Watchdog
Max 1-hour program limit prevents infinite loops and battery drain.

## Debugging

### View Simulation Log
- Click "Simulate" button
- See timeline of all commands
- Verify speed/altitude/duration

### Serial Monitor
- Open Arduino IDE Serial Monitor
- Set to 115200 baud
- See executor debug output

### JSON Preview
- Side panel shows generated JSON
- Syntax errors highlighted
- Program size shown

## Dependencies

### Web
- [Blockly 6.x](https://developers.google.com/blockly)
- Modern browser with Web Serial API

### ESP32
- [ArduinoJson 6.x](https://github.com/bblanchon/ArduinoJson)
- Arduino IDE or PlatformIO

## PHP Integration

The Codelift IDE is wrapped with PHP to provide server-side context and mission persistence.

### 🚀 Getting Started (PHP)
1. **Server**: Requires a PHP-enabled server (XAMPP, MAMP, or Nginx with PHP-FPM).
2. **Setup**: Place the files in your web root (`htdocs` or `/var/www/html`).
3. **Run**: Access `index.php` in your browser.

### ☁️ Cloud Features
- **Mission Saving**: Click "Save Cloud" to send your blocks to `api/save_mission.php`.
- **User Context**: `index.php` demonstrates basic session management and personalizing the IDE for specific pilots.

---

## License

MIT
