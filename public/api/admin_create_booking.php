<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->client_name) || !isset($data->booking_date)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit();
}

try {
    $sql = "INSERT INTO `bookings` (
        tour_id, tour_title, client_name, client_phone, booking_date, 
        pax, hotel, experience, payment_type, 
        total_price, deposit_amount, payment_status, status, driver_id
    ) VALUES (
        :tour_id, :tour_title, :client_name, :client_phone, :booking_date, 
        :pax, :hotel, :experience, :payment_type, 
        :total_price, :deposit_amount, :payment_status, :status, :driver_id
    )";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':tour_id' => $data->tour_id ?? 'manual',
        ':tour_title' => $data->tour_title ?? 'Tour Manual',
        ':client_name' => $data->client_name,
        ':client_phone' => $data->client_phone ?? '',
        ':booking_date' => $data->booking_date,
        ':pax' => $data->pax ?? '2',
        ':hotel' => $data->hotel ?? '',
        ':experience' => $data->experience ?? 'comfort',
        ':payment_type' => $data->payment_type ?? 'full',
        ':total_price' => $data->total_price ?? 0,
        ':deposit_amount' => $data->deposit_amount ?? 0,
        ':payment_status' => $data->payment_status ?? 'pending',
        ':status' => $data->status ?? 'pending',
        ':driver_id' => !empty($data->driver_id) ? $data->driver_id : null
    ]);

    echo json_encode(["status" => "success", "message" => "Reserva creada", "id" => $conn->lastInsertId()]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
