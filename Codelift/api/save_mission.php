<?php
/**
 * Mock Save Mission API
 */
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $xml = $_POST['xml'] ?? '';

    if (!empty($xml)) {
        // In a real app, you would save this to a database
        // file_put_contents('mission_data.xml', $xml);
        
        echo json_encode([
            'success' => true,
            'message' => 'Mission stored successfully',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Empty XML payload']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
