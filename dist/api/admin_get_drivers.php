<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

try {
    $stmt = $conn->query("SELECT * FROM `drivers` ORDER BY name ASC");
    $drivers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $drivers
    ]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
