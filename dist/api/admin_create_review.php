<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['nombre'])) { echo json_encode(["status"=>"error","message"=>"Nombre requerido"]); exit; }
try {
    $stmt = $conn->prepare("INSERT INTO reviews (tour_id, nombre, comentario, comentario_en, puntuacion, aprobado, fecha) VALUES (:tid, :n, :c, :ce, :p, :a, NOW())");
    $stmt->execute([
        ':tid' => $d['tour_id'] ?? 'custom',
        ':n'   => $d['nombre'],
        ':c'   => $d['comentario'] ?? '',
        ':ce'  => $d['comentario_en'] ?? '',
        ':p'   => $d['puntuacion'] ?? 5,
        ':a'   => isset($d['aprobado']) ? (int)$d['aprobado'] : 1,
    ]);
    echo json_encode(["status"=>"success","message"=>"Reseña creada","id"=>$conn->lastInsertId()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
