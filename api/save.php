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

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$playerData = $input['playerData'] ?? null;

if (!$playerData) {
    echo json_encode(['status' => 'error', 'message' => 'Dados inválidos']);
    exit;
}

$stmt = $pdo->prepare("UPDATE users SET save_data = ? WHERE username = ?");
$stmt->execute([json_encode($playerData), $_SESSION['user']]);

echo json_encode(['status' => 'ok', 'message' => 'Progresso salvo!']);
?>