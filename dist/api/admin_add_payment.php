<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->booking_id) || !isset($data->amount)) {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
    exit();
}

try {
    // 1. Insertamos el pago
    $sql = "INSERT INTO booking_payments (booking_id, amount, payment_method, notes) 
            VALUES (:bid, :amt, :meth, :notes)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':bid' => $data->booking_id,
        ':amt' => $data->amount,
        ':meth' => $data->payment_method ?? 'Efectivo/Transferencia',
        ':notes' => $data->notes ?? 'Pago manual desde Admin'
    ]);

    // 2. Opcional: Actualizar el estado de la reserva si ya está pagado al 100%
    // Calculamos el total pagado hasta ahora
    $sum_sql = "SELECT SUM(amount) as total_paid FROM booking_payments WHERE booking_id = :id";
    $sum_stmt = $conn->prepare($sum_sql);
    $sum_stmt->execute([':id' => $data->booking_id]);
    $paid = $sum_stmt->fetch(PDO::FETCH_ASSOC)['total_paid'];

    // Obtenemos el total de la reserva
    $book_sql = "SELECT total_price FROM bookings WHERE id = :id";
    $book_stmt = $conn->prepare($book_sql);
    $book_stmt->execute([':id' => $data->booking_id]);
    $total = $book_stmt->fetch(PDO::FETCH_ASSOC)['total_price'];

    if ($paid >= $total) {
        $upd = $conn->prepare("UPDATE bookings SET payment_status = 'paid', is_paid = 1 WHERE id = :id");
        $upd->execute([':id' => $data->booking_id]);
    } else {
        $upd = $conn->prepare("UPDATE bookings SET payment_status = 'reserved' WHERE id = :id");
        $upd->execute([':id' => $data->booking_id]);
    }

    echo json_encode(["status" => "success", "message" => "Pago registrado. Total pagado: " . $paid]);

} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
