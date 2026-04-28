<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'admin_config.php';

if (!isset($_GET['ref'])) {
    echo json_encode(["status" => "error", "message" => "Referencia no proporcionada"]);
    exit();
}

$ref = $_GET['ref'];
$id = str_replace('CT-', '', $ref);

try {
    // 1. Obtenemos los datos de la reserva
    $sql = "SELECT b.*, d.name as driver_name, d.phone as driver_phone, d.car_model 
            FROM bookings b 
            LEFT JOIN drivers d ON b.driver_id = d.id 
            WHERE b.id = :id";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([':id' => $id]);
    $booking = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$booking) {
        echo json_encode(["status" => "error", "message" => "No se encontró la reserva"]);
        exit();
    }

    // 2. Obtenemos el historial de pagos
    $pay_sql = "SELECT * FROM booking_payments WHERE booking_id = :id ORDER BY payment_date ASC";
    $pay_stmt = $conn->prepare($pay_sql);
    $pay_stmt->execute([':id' => $id]);
    $payments = $pay_stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Obtenemos el historial de cargos extra
    $charge_sql = "SELECT * FROM booking_charges WHERE booking_id = :id ORDER BY charge_date ASC";
    $charge_stmt = $conn->prepare($charge_sql);
    $charge_stmt->execute([':id' => $id]);
    $charges = $charge_stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $booking,
        "payments" => $payments,
        "charges" => $charges
    ]);

} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
