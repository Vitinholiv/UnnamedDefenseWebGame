<?php
session_start();
header('Content-Type: application/json');

$config = require __DIR__ . '/autoload.php';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

if(!isset($_SESSION['user'])){
    echo json_encode(['status' => 'error', 'message' => 'Unable to Save: Not Authenticated']);
    exit;
}

$pdo = new PDO("mysql:host={$config['DB_HOST']};dbname={$config['DB_NAME']};charset=utf8mb4", $config['DB_USER'], $config['DB_PASS']);
$playerData = $input['playerData'] ?? null;

if(!$playerData){
    echo json_encode(['status' => 'error', 'message' => 'Unable to Save: Invalid Data']);
    exit;
}

$stmt = $pdo->prepare("UPDATE users SET save_data = ? WHERE username = ?");
$stmt->execute([json_encode($playerData), $_SESSION['user']]);

echo json_encode(['status' => 'ok', 'message' => 'Saved Progress']);
?>