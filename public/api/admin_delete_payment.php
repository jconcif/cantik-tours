<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Falta ID de pago"]);
    exit();
}

try {
    $stmt = $conn->prepare("DELETE FROM booking_payments WHERE id = :id");
    $stmt->execute([':id' => $id]);

    echo json_encode(["status" => "success", "message" => "Pago eliminado"]);
} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
