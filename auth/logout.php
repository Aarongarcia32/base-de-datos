<?php
require '../utils/cors.php';
require '../utils/sesion.php';

$idUsuario = verificarSesion();
$headers = getallheaders();
preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches);
$token = $matches[1];

$pdo = conectarDB();
$stmt = $pdo->prepare("UPDATE sesion SET fecha_cierre = NOW() WHERE token = ?");
$stmt->execute([$token]);

echo json_encode(["mensaje" => "Sesión cerrada"]);