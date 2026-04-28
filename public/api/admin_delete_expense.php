<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');

$id = $_GET['id'] ?? null;
if (!$id) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }

try {
    $stmt = $conn->prepare("DELETE FROM booking_expenses WHERE id = :id");
    $stmt->execute([':id' => $id]);
    echo json_encode(["status"=>"success","message"=>"Gasto eliminado"]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
