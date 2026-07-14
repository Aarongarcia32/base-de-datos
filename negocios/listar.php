<?php
require '../utils/cors.php';
require '../config/db.php';

$pdo = conectarDB();

$sql = "
    SELECT 
        n.id_negocio, n.nombre, n.descripcion, n.direccion, n.numero,
        n.latitud, n.longitud, n.calificacion_promedio, n.estado, n.fecha_ultima_resena,
        GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
    FROM negocio n
    LEFT JOIN negocio_categoria nc ON nc.id_negocio = n.id_negocio
    LEFT JOIN categoria c ON c.id_categoria = nc.id_categoria
    WHERE n.estado = 'activo'
    GROUP BY n.id_negocio
";

$negocios = $pdo->query($sql)->fetchAll();
echo json_encode($negocios);