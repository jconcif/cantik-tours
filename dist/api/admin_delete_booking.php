<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

if (!isset($_GET['id'])) {
    echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
    exit();
}

try {
    $id = $_GET['id'];
    
    // Eliminar registros dependientes primero para evitar error de clave foránea
    $conn->prepare("DELETE FROM `booking_payments` WHERE booking_id = :id")->execute([':id' => $id]);
    $conn->prepare("DELETE FROM `booking_charges` WHERE booking_id = :id")->execute([':id' => $id]);
    $conn->prepare("DELETE FROM `booking_expenses` WHERE booking_id = :id")->execute([':id' => $id]);

    $stmt = $conn->prepare("DELETE FROM `bookings` WHERE id = :id");
    $stmt->execute([':id' => $id]);

    echo json_encode(["status" => "success", "message" => "Reserva eliminada"]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
