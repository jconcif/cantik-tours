<?php
require_once 'admin_config.php';
handleCors();
checkAuth();
header('Content-Type: application/json');

$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }

try {
    $stmt = $conn->prepare("UPDATE drivers SET name=:n, phone=:p, car_model=:c WHERE id=:id");
    $stmt->execute([':n'=>$d['name']??'', ':p'=>$d['phone']??'', ':c'=>$d['car_model']??'', ':id'=>$d['id']]);
    echo json_encode(["status"=>"success","message"=>"Conductor actualizado","rows"=>$stmt->rowCount()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
