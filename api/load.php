<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['status' => 'error', 'message' => 'Não autenticado']);
    exit;
}

define('THIS_STRING_IS_SECRET_LOL_I_WILL_CHANGE_IT', true);
$config = require __DIR__ . '/env.php';
$pdo = new PDO("mysql:host={$config['DB_HOST']};dbname={$config['DB_NAME']};charset=utf8mb4", $config['DB_USER'], $config['DB_PASS']);

$stmt = $pdo->prepare("SELECT save_data FROM users WHERE username = ?");
$stmt->execute([$_SESSION['user']]);
$user = $stmt->fetch();
$data = $user ? json_decode($user['save_data'], true) : [];

echo json_encode(['status' => 'ok', 'playerData' => $data]);
?>