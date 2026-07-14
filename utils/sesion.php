<?php
require_once __DIR__ . '/../config/db.php';

function verificarSesion(): int {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    
    if (!preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
        http_response_code(401);
        die(json_encode(["error" => "Token no proporcionado"]));
    }
    
    $token = $matches[1];
    $pdo = conectarDB();
    
    $stmt = $pdo->prepare(
        "SELECT id_usuario FROM sesion 
         WHERE token = ? AND fecha_expiracion > NOW() AND fecha_cierre IS NULL"
    );
    $stmt->execute([$token]);
    $sesion = $stmt->fetch();
    
    if (!$sesion) {
        http_response_code(401);
        die(json_encode(["error" => "Sesión inválida o expirada"]));
    }
    
    return (int) $sesion['id_usuario'];
}