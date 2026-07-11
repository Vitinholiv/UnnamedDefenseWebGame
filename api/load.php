<?php
session_start();
header('Content-Type: application/json');

$config = require __DIR__ . '/autoload.php';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

$secret_res = $input['secret'] ?? '';

if($secret_res !== ($config['SECRET_STR'] ?? '')){
    echo json_encode(['status' => 'error', 'message' => 'Unable to Load: Invalid Secret Key']);
    exit;
}

if(!isset($_SESSION['user'])){
    echo json_encode(['status' => 'error', 'message' => 'Unable to Load: Not Authenticated']);
    exit;
}

$pdo = new PDO("mysql:host={$config['DB_HOST']};dbname={$config['DB_NAME']};charset=utf8mb4", $config['DB_USER'], $config['DB_PASS']);
$stmt = $pdo->prepare("SELECT save_data FROM users WHERE username = ?");
$stmt->execute([$_SESSION['user']]);
$user = $stmt->fetch();
$data = $user ? json_decode($user['save_data'], true) : [];

echo json_encode(['status' => 'ok', 'playerData' => $data]);
?>