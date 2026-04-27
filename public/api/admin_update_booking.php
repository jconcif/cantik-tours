<?php
require_once 'admin_config.php';
handleCors();
checkAuth();
header('Content-Type: application/json');

$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }

try {
    $sql = "UPDATE bookings SET
        client_name=:cn, client_phone=:cp, booking_date=:bd,
        hotel=:ho, tour_title=:tt, total_price=:tp,
        deposit_amount=:da, pax=:px, payment_status=:ps,
        driver_id=:di, experience=:ex
        WHERE id=:id";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':cn' => $d['client_name']    ?? '',
        ':cp' => $d['client_phone']   ?? '',
        ':bd' => $d['booking_date']   ?? date('Y-m-d'),
        ':ho' => $d['hotel']          ?? '',
        ':tt' => $d['tour_title']     ?? '',
        ':tp' => $d['total_price']    ?? 0,
        ':da' => $d['deposit_amount'] ?? 0,
        ':px' => $d['pax']            ?? 2,
        ':ps' => $d['payment_status'] ?? 'pending',
        ':di' => !empty($d['driver_id']) ? $d['driver_id'] : null,
        ':ex' => $d['experience']     ?? 'comfort',
        ':id' => $d['id'],
    ]);
    echo json_encode(["status"=>"success","message"=>"Reserva #{$d['id']} actualizada","rows"=>$stmt->rowCount()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
