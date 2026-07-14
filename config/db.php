<?php
function conectarDB(): PDO {
    $host = "127.0.0.1";
    $db   = "ojo_al_negocio";
    $user = "root";
    $pass = ""; // vacío por defecto en Laragon

    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $opciones = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        return new PDO($dsn, $user, $pass, $opciones);
    } catch (PDOException $e) {
        http_response_code(500);
        die(json_encode(["error" => "Error de conexión: " . $e->getMessage()]));
    }
}