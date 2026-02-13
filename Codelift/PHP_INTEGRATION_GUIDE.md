# Codelift PHP Integration Guide

This document explains how to integrate the Codelift Drone IDE into a PHP-based web environment. It details the separation of concerns between JavaScript (Real-time Flight) and PHP (Data Management).

---

## 🏗️ Architectural Overview

Codelift uses a **Hybrid Architecture**:

1.  **Client-Side (JavaScript)**: 
    *   **Responsibility**: Blockly Workspace, BLE Communication, Real-Time HUD, Mission Simulation.
    *   **Hardware Access**: Only JavaScript has access to the user's Bluetooth hardware via the Web Bluetooth API.
2.  **Server-Side (PHP)**:
    *   **Responsibility**: User Authentication, Mission Database (MySQL), Telemetry Archiving, Personalization.
    *   **Persistence**: PHP manages the permanent storage of blocks so users can access missions across different devices.

---

## 📦 File Structure for PHP

When hosting on a PHP server (XAMPP, Nginx, Apache), organize your files as follows:

```text
/htdocs/codelift/
├── index.php           <-- Main entry point (renamed from index.html)
├── app.js              <-- BLE & HUD logic
├── blocks.js           <-- Drone block definitions
├── generator.js        <-- JSON Protocol generator
├── api/
│   └── save_mission.php <-- Endpoint for cloud saving
└── missions/           <-- (Optional) Directory for stored XML files
```

---

## 💾 Mission Persistence (Cloud Save/Load)

### 1. Saving to Cloud
In `index.php`, the `saveMission()` function converts the visual blocks into an XML string and sends it to the server.

**JavaScript (index.php):**
```javascript
function saveMission() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    
    fetch('api/save_mission.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'xml=' + encodeURIComponent(xmlText)
    });
}
```

**PHP Backend (api/save_mission.php):**
```php
<?php
$xml = $_POST['xml'];
// Save $xml string to MySQL 'missions' table for the current user
echo json_encode(['success' => true]);
?>
```

### 2. Loading from Cloud
When the page loads, PHP fetches the XML from the database and "injects" it into a JavaScript variable.

**PHP/JS (index.php):**
```php
<?php $saved_xml = $db->getMission(123); ?>

<script>
  // PHP prints the string directly into the script tag
  const initialXml = `<?php echo $saved_xml; ?>`;
  
  if (initialXml) {
    const dom = Blockly.utils.xml.textToDom(initialXml);
    Blockly.Xml.domToWorkspace(dom, workspace);
  }
</script>
```

---

## 👤 User Personalization

You can use standard PHP session management to secure the IDE and display user-specific data in the HUD.

**Example `index.php` Header:**
```php
<?php
session_start();
if (!isset($_SESSION['pilot_id'])) {
    header("Location: login.php");
    exit();
}
?>
<div class="user-pill">
    <span>PILOT: <?php echo $_SESSION['pilot_name']; ?></span>
</div>
```

---

## 📡 Future Extensions: Telemetry Logging

You can record flight history by essentially "pinging" a PHP log endpoint whenever telemetry is received in `app.js`.

**In `app.js`:**
```javascript
function updateHUD(data) {
    // ... update gauges ...
    
    // Every 5 seconds, send a snapshot to PHP for the flight log
    if (Date.now() % 5000 < 100) {
        fetch('api/log_telemetry.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
```

---

## ⚠️ Important Considerations

1.  **HTTPS Requirement**: The Web Bluetooth API (BLE) **requires** a secure connection (HTTPS) unless you are developing on `localhost`.
2.  **Cross-Origin (CORS)**: Ensure your API folder permissions allow the frontend to make `POST` requests.
3.  **Sanitization**: Always sanitize the XML input in PHP before saving to a database to prevent XSS or Injection attacks.
