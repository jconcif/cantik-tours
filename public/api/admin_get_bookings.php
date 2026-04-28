<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

try {
    // Consulta con subquery para obtener el total pagado, total gastos y total cargos por reserva
    $sql = "SELECT b.*, 
            COALESCE((SELECT SUM(amount) FROM booking_payments WHERE booking_id = b.id), 0) as total_paid,
            COALESCE((SELECT SUM(amount) FROM booking_expenses WHERE booking_id = b.id), 0) as total_expenses,
            COALESCE((SELECT SUM(amount) FROM booking_charges WHERE booking_id = b.id), 0) as total_charges
            FROM `bookings` b 
            ORDER BY b.id DESC";
    $stmt = $conn->query($sql);
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Limpiar datos para asegurar JSON válido
    $clean_bookings = array_map(function($row) {
        // Aseguramos que los valores sean numéricos
        $row['total_paid'] = (float)$row['total_paid'];
        $row['total_expenses'] = (float)$row['total_expenses'];
        $row['total_charges'] = (float)$row['total_charges'];
        $row['total_price'] = (float)$row['total_price'];
        return array_map(function($value) {
            return is_string($value) ? mb_convert_encoding($value, 'UTF-8', 'UTF-8') : $value;
        }, $row);
    }, $bookings);

    echo json_encode([
        "status" => "success",
        "version" => "VER-2.0-FINAL",
        "data" => $clean_bookings,
        "count" => count($clean_bookings)
    ]);

} catch(Exception $e) {
    echo json_encode([
        "status" => "error", 
        "message" => "Error SQL: " . $e->getMessage(),
        "version" => "VER-2.0-ERROR"
    ]);
}
?>
