<?php
session_start();
header('Content-Type: application/json');

define('THIS_STRING_IS_SECRET_LOL_I_WILL_CHANGE_IT', true);
$config = require __DIR__ . '/env.php';
$host = $config['DB_HOST'];
$db   = $config['DB_NAME'];
$user = $config['DB_USER'];
$pass = $config['DB_PASS'];
$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass);
} catch (PDOException $e){
    echo json_encode(['status' => 'error', 'message' => 'Erro na conexão com banco']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $input['action'] ?? '';
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';

if($action === 'register'){
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if($stmt->fetch()){
        echo json_encode(['status' => 'error', 'message' => 'Usuário já existe.']);
        exit;
    }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->execute([$username, $hash]);
    echo json_encode(['status' => 'ok', 'message' => 'Cadastro realizado.']);
}

if($action === 'login'){
    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if($user && password_verify($password, $user['password'])){
        $_SESSION['user'] = $username;
        echo json_encode(['status' => 'ok', 'message' => 'Login com sucesso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Login inválido.']);
    }
}
?>