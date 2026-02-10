<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "admin_config.php";

handleCors();
checkAuth();

try {
    $query = "SELECT * FROM reviews ORDER BY fecha DESC";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "data" => $reviews]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
