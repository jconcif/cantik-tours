<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "Falta ID de pago"]);
    exit();
}

try {
    $sql = "UPDATE booking_payments SET 
            amount = :amt, 
            payment_date = :pdate, 
            payment_method = :meth, 
            notes = :notes 
            WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':amt' => $data->amount,
        ':pdate' => $data->payment_date,
        ':meth' => $data->payment_method,
        ':notes' => $data->notes,
        ':id' => $data->id
    ]);

    echo json_encode(["status" => "success", "message" => "Pago actualizado"]);
} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
