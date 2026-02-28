<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "admin_config.php";

handleCors();
checkAuth();

try {
    // Insert a blank/draft review
    $query = "INSERT INTO reviews (nombre, tour_id, estrellas, aprobado, fecha) 
              VALUES ('Nuevo Viajero', 'custom', 5, 0, NOW())";
    
    $stmt = $conn->prepare($query);
    
    if($stmt->execute()) {
        $last_id = $conn->lastInsertId();
        echo json_encode(["status" => "success", "message" => "Review created", "id" => $last_id]);
    } else {
        echo json_encode(["status" => "error", "message" => "Unable to create review"]);
    }
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
