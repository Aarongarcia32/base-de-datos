<?php
require '../utils/cors.php';
require '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$pdo = conectarDB();

$stmt = $pdo->prepare("SELECT * FROM usuario WHERE correo = ?");
$stmt->execute([$data['correo'] ?? '']);
$usuario = $stmt->fetch();

if (!$usuario || !password_verify($data['contrasena'] ?? '', $usuario['contrasena'])) {
    http_response_code(401);
    echo json_encode(["error" => "Correo o contraseña incorrectos"]);
    exit();
}

if ($usuario['estado'] !== 'activo') {
    http_response_code(403);
    echo json_encode(["error" => "Cuenta suspendida o baneada"]);
    exit();
}

$token = bin2hex(random_bytes(32));
$recordar = !empty($data['recordar_sesion']);
$expiracion = $recordar
    ? date('Y-m-d H:i:s', strtotime('+30 days'))
    : date('Y-m-d H:i:s', strtotime('+1 day'));

$stmt = $pdo->prepare(
    "INSERT INTO sesion (id_usuario, token, recordar_sesion, fecha_expiracion) VALUES (?, ?, ?, ?)"
);
$stmt->execute([$usuario['id_usuario'], $token, $recordar ? 1 : 0, $expiracion]);

unset($usuario['contrasena']);
echo json_encode(["token" => $token, "usuario" => $usuario]);