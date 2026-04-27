<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

if (!isset($_GET['id'])) {
    echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
    exit();
}

try {
    $id = $_GET['id'];
    
    // 1. Primero desasignamos al conductor de cualquier reserva para evitar errores de clave foránea
    $upd = $conn->prepare("UPDATE bookings SET driver_id = NULL WHERE driver_id = :id");
    $upd->execute([':id' => $id]);

    // 2. Ahora sí borramos al conductor
    $stmt = $conn->prepare("DELETE FROM drivers WHERE id = :id");
    $stmt->execute([':id' => $id]);

    echo json_encode([
        "status" => "success", 
        "message" => "Conductor eliminado y reservas desasignadas"
    ]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
