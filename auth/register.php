<?php
require '../utils/cors.php';
require '../config/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$pdo = conectarDB();

// Validar que el tipo exista
$stmt = $pdo->prepare("SELECT id_tipo FROM tipo WHERE nombre = ?");
$stmt->execute([$data['tipo'] ?? 'usuario']); // "usuario" o "negocio"
$tipo = $stmt->fetch();

if (!$tipo) {
    http_response_code(400);
    echo json_encode(["error" => "Tipo de cuenta inválido"]);
    exit();
}

$stmt = $pdo->prepare("SELECT id_usuario FROM usuario WHERE correo = ?");
$stmt->execute([$data['correo']]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["error" => "Este correo ya está registrado"]);
    exit();
}

$hash = password_hash($data['contrasena'], PASSWORD_BCRYPT);

$stmt = $pdo->prepare(
    "INSERT INTO usuario (id_tipo, nombre, correo, contrasena) VALUES (?, ?, ?, ?)"
);
$stmt->execute([$tipo['id_tipo'], $data['nombre'], $data['correo'], $hash]);
$idUsuario = $pdo->lastInsertId();

// Si es negocio, crear el negocio y vincularlo (usando la columna nueva)
if (($data['tipo'] ?? '') === 'negocio' && !empty($data['negocio'])) {
    $n = $data['negocio'];
    $stmt = $pdo->prepare(
        "INSERT INTO negocio (id_usuario_propietario, nombre, descripcion, direccion, numero, latitud, longitud, estado)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')"
    );
    $stmt->execute([
        $idUsuario, $n['nombre'], $n['descripcion'] ?? null, $n['direccion'],
        $n['numero'] ?? null, $n['latitud'] ?? null, $n['longitud'] ?? null
    ]);
    $idNegocio = $pdo->lastInsertId();

    // Asignar categorías (many-to-many)
    if (!empty($n['categorias']) && is_array($n['categorias'])) {
        $stmtCat = $pdo->prepare("INSERT INTO negocio_categoria (id_negocio, id_categoria) VALUES (?, ?)");
        foreach ($n['categorias'] as $idCategoria) {
            $stmtCat->execute([$idNegocio, $idCategoria]);
        }
    }
}

http_response_code(201);
echo json_encode(["mensaje" => "Usuario creado", "id_usuario" => $idUsuario]);