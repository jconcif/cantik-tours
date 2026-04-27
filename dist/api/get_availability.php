<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once 'admin_config.php';

try {
    // Solo devolvemos la fecha y el conteo, nada de datos privados de clientes
    $sql = "SELECT booking_date, COUNT(*) as total FROM bookings 
            WHERE booking_date >= CURDATE() 
            AND payment_status IN ('reserved', 'paid', 'pending')
            GROUP BY booking_date";
    
    $stmt = $conn->query($sql);
    $availability = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $formatted = [];
    foreach ($availability as $row) {
        $formatted[$row['booking_date']] = (int)$row['total'];
    }

    echo json_encode([
        "status" => "success",
        "data" => $formatted
    ]);

} catch(Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
