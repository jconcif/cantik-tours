<?php
require_once 'admin_config.php';
handleCors();
checkAuth();
header('Content-Type: application/json');

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if (!$id) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }

try {
    $stmt = $conn->prepare("DELETE FROM reviews WHERE id=:id");
    $stmt->execute([':id'=>$id]);
    echo json_encode(["status"=>"success","message"=>"Reseña eliminada"]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
