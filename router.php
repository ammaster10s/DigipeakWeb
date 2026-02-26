<?php
/**
 * DIGIPEAK Router — Clean URL Mapping
 * Usage: php -S 127.0.0.1:8000 router.php
 *
 * Maps clean URLs to PHP files:
 *   /                 → index.php
 *   /PRJ-GT           → prj-gt.php
 *   /PRJ-CL           → prj-cl.php
 *   /Codelift-IDE     → prj-cl-ide.php
 *   /Codelift-IMU     → prj-cl-imu.php
 *   /MOR-AI           → prj-mrt.php
 *   /LOG-3DS          → prj-3ds.php
 *   /Privacy          → privacy.php
 *   /ToS              → tos.php
 */

// Clean URL → file mapping (case-insensitive keys)
$routes = [
    '/'              => 'index.php',
    '/prj-gt'        => 'prj-gt.php',
    '/prj-cl'        => 'prj-cl.php',
    '/codelift-ide'  => 'prj-cl-ide.php',
    '/codelift-imu'  => 'prj-cl-imu.php',
    '/mor-ai'        => 'prj-mrt.php',
    '/log-3ds'       => 'prj-3ds.php',
    '/privacy'       => 'privacy.php',
    '/tos'           => 'tos.php',
];

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriLower = strtolower(rtrim($uri, '/')) ?: '/';

// 1. Check clean URL routes
if (isset($routes[$uriLower])) {
    $file = __DIR__ . '/' . $routes[$uriLower];
    if (file_exists($file)) {
        include $file;
        return true;
    }
}

// 2. Serve existing files directly (CSS, JS, images, old .php URLs)
$filePath = __DIR__ . $uri;
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    // Let PHP's built-in server handle static files
    $ext = pathinfo($filePath, PATHINFO_EXTENSION);
    $mimeTypes = [
        'css'  => 'text/css',
        'js'   => 'application/javascript',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'svg'  => 'image/svg+xml',
        'webp' => 'image/webp',
        'ico'  => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2'=> 'font/woff2',
        'ttf'  => 'font/ttf',
        'json' => 'application/json',
        'mp4'  => 'video/mp4',
        'webm' => 'video/webm',
    ];

    if (isset($mimeTypes[$ext])) {
        header('Content-Type: ' . $mimeTypes[$ext]);
        readfile($filePath);
        return true;
    }

    // PHP files — include them
    if ($ext === 'php') {
        include $filePath;
        return true;
    }

    // Other files — let built-in server handle
    return false;
}

// 3. Not found
http_response_code(404);
echo '<!DOCTYPE html><html><head><title>404 — DIGIPEAK</title>';
echo '<style>body{background:#000;color:#fff;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}';
echo '.c{text-align:center;}.e{color:#ef4444;font-size:48px;font-weight:bold;}.m{color:#52525b;margin-top:12px;font-size:14px;}a{color:#ef4444;}</style></head>';
echo '<body><div class="c"><div class="e">404</div><div class="m">ROUTE_NOT_FOUND: ' . htmlspecialchars($uri) . '</div>';
echo '<div class="m" style="margin-top:24px"><a href="/">← RETURN TO BASE</a></div></div></body></html>';
return true;


