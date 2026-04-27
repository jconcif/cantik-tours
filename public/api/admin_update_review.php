<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }
try {
    $stmt = $conn->prepare("UPDATE reviews SET nombre=:n, comentario=:c, comentario_en=:ce, puntuacion=:p, aprobado=:a WHERE id=:id");
    $stmt->execute([
        ':n'  => $d['nombre'] ?? 'Anónimo',
        ':c'  => $d['comentario'] ?? '',
        ':ce' => $d['comentario_en'] ?? '',
        ':p'  => $d['puntuacion'] ?? 5,
        ':a'  => isset($d['aprobado']) ? (int)$d['aprobado'] : 0,
        ':id' => $d['id'],
    ]);
    echo json_encode(["status"=>"success","message"=>"Reseña actualizada","rows"=>$stmt->rowCount()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
