<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
try {
    $stmt = $conn->query("SELECT * FROM coupons ORDER BY id DESC");
    echo json_encode(["status"=>"success","data"=>$stmt->fetchAll(PDO::FETCH_ASSOC)]);
} catch(PDOException $e) { echo json_encode(["status"=>"error","message"=>$e->getMessage()]); }
