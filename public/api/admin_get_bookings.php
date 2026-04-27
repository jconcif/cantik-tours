<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

try {
    // Consulta ultra-directa con la marca de versión final
    $stmt = $conn->query("SELECT * FROM `bookings` ORDER BY id DESC");
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Limpiar datos para asegurar JSON válido
    $clean_bookings = array_map(function($row) {
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
