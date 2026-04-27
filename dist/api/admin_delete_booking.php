<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

if (!isset($_GET['id'])) {
    echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
    exit();
}

try {
    $stmt = $conn->prepare("DELETE FROM `bookings` WHERE id = :id");
    $stmt->execute([':id' => $_GET['id']]);

    echo json_encode(["status" => "success", "message" => "Reserva eliminada"]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
