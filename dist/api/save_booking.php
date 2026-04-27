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
        client_name,
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
        :client_name,
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
    $booking_date = date('Y-m-d', strtotime($data->date));

    $stmt->execute([
        ':tour_id' => $data->tour_id,
        ':tour_title' => $data->tour_title,
        ':client_name' => $data->client_name ?? '',
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

    $booking_id = $conn->lastInsertId();

    // REGISTRO AUTOMÁTICO DE PAGO
    if ($data->deposit_amount > 0) {
        $pay_sql = "INSERT INTO booking_payments (booking_id, amount, payment_method, notes) 
                    VALUES (:bid, :amt, :meth, :notes)";
        $pay_stmt = $conn->prepare($pay_sql);
        $pay_stmt->execute([
            ':bid' => $booking_id,
            ':amt' => $data->deposit_amount,
            ':meth' => $data->is_paid ? 'PayPal' : 'Pendiente Verificación',
            ':notes' => 'Pago inicial / Reserva desde la web'
        ]);
    }

    echo json_encode([
        "status" => "success", 
        "message" => "Reserva guardada y pago registrado correctamente",
        "id" => $booking_id
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    // IMPORTANTE: Esto te dirá el error real en la consola del navegador
    echo json_encode(["status" => "error", "message" => "Error MySQL: " . $e->getMessage()]);
}
?>
