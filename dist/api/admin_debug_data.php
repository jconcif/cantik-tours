<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

try {
    $stmt = $conn->query("SELECT * FROM `bookings` LIMIT 2");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
