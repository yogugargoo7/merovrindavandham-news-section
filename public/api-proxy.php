<?php
$backendBase = 'https://merovridavandham-ebhqffekhyhpffe6.eastasia-01.azurewebsites.net/api/';
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

$allowed = [
    'public/leads',
    'public/plots',
];

$isAllowed = false;
foreach ($allowed as $prefix) {
    if ($path === $prefix || strpos($path, $prefix . '/') === 0) {
        $isAllowed = true;
        break;
    }
}

if (!$isAllowed || strpos($path, '..') !== false) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Forbidden']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$query = $_GET;
unset($query['path']);
$url = $backendBase . $path;
if (!empty($query)) {
    $url .= '?' . http_build_query($query);
}

$headers = ['Accept: application/json'];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if ($contentType) {
    $headers[] = 'Content-Type: ' . $contentType;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 25);

if (in_array($_SERVER['REQUEST_METHOD'], ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['message' => 'CRM gateway error']);
    curl_close($ch);
    exit;
}

$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$body = substr($response, $headerSize);
curl_close($ch);

http_response_code($status);
header('Content-Type: application/json');
echo $body;
