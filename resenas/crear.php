<?php
require '../utils/cors.php';
require '../utils/sesion.php';
require '../config/db.php';

$idUsuario = verificarSesion();
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_negocio']) || !isset($data['calificacion'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan datos requeridos (id_negocio, calificacion)"]);
    exit();
}

if ($data['calificacion'] < 1 || $data['calificacion'] > 5) {
    http_response_code(400);
    echo json_encode(["error" => "La calificación debe estar entre 1 y 5"]);
    exit();
}

$pdo = conectarDB();

try {
    $stmt = $pdo->prepare(
        "INSERT INTO resena (id_usuario, id_negocio, calificacion, comentario) VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([
        $idUsuario,
        $data['id_negocio'],
        $data['calificacion'],
        $data['comentario'] ?? null
    ]);
    // Los triggers trg_resena_after_insert ya actualizaron negocio.calificacion_promedio automáticamente
    http_response_code(201);
    echo json_encode(["mensaje" => "Reseña agregada correctamente"]);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // violación de UNIQUE (uq_resena_usuario_negocio)
        http_response_code(409);
        echo json_encode(["error" => "Ya dejaste una reseña para este negocio"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al guardar la reseña"]);
    }
}