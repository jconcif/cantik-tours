<?php
require_once 'admin_config.php';

// Manejar CORS y Seguridad
handleCors();
checkAuth();

try {
    // Consultar todas las reservas, las más recientes primero
    $stmt = $conn->prepare("SELECT * FROM bookings ORDER BY created_at DESC");
    $stmt->execute();
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($bookings);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al consultar: " . $e->getMessage()]);
}
?>
