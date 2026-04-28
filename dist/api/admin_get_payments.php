<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$booking_id = $_GET['booking_id'] ?? null;

if (!$booking_id) {
    echo json_encode(["status" => "error", "message" => "Falta ID de reserva"]);
    exit();
}

try {
    $stmt = $conn->prepare("SELECT * FROM `booking_payments` WHERE booking_id = :bid ORDER BY payment_date DESC, id DESC");
    $stmt->execute([':bid' => $booking_id]);
    $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $payments
    ]);
} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
