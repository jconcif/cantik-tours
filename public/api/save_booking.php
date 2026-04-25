<?php
require_once 'admin_config.php';

// Manejar CORS
handleCors();

// Recibir datos JSON
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No se recibieron datos"]);
    exit();
}

try {
    $sql = "INSERT INTO bookings (
        tour_id, 
        tour_title, 
        booking_date, 
        pax, 
        hotel, 
        experience, 
        payment_type, 
        total_price, 
        deposit_amount, 
        is_paid, 
        coupon
    ) VALUES (
        :tour_id, 
        :tour_title, 
        :booking_date, 
        :pax, 
        :hotel, 
        :experience, 
        :payment_type, 
        :total_price, 
        :deposit_amount, 
        :is_paid, 
        :coupon
    )";

    $stmt = $conn->prepare($sql);
    
    // Formatear la fecha para MySQL (YYYY-MM-DD)
    // El frontend enviará la fecha en formato ISO o string
    $booking_date = date('Y-m-d', strtotime($data->date));

    $stmt->execute([
        ':tour_id' => $data->tour_id,
        ':tour_title' => $data->tour_title,
        ':booking_date' => $booking_date,
        ':pax' => $data->pax,
        ':hotel' => $data->hotel,
        ':experience' => $data->experience,
        ':payment_type' => $data->payment_type,
        ':total_price' => $data->total_price,
        ':deposit_amount' => $data->deposit_amount,
        ':is_paid' => $data->is_paid ? 1 : 0,
        ':coupon' => $data->coupon ?? null
    ]);

    echo json_encode([
        "status" => "success", 
        "message" => "Reserva guardada correctamente",
        "id" => $conn->lastInsertId()
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al guardar: " . $e->getMessage()]);
}
?>
