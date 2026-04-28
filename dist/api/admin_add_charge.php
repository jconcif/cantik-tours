<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);

if (empty($d['booking_id']) || empty($d['amount'])) { echo json_encode(["status"=>"error","message"=>"Datos incompletos"]); exit; }
try {
    $stmt = $conn->prepare("INSERT INTO booking_charges (booking_id, concept, amount, charge_date) VALUES (:bid, :c, :a, :d)");
    $stmt->execute([':bid' => $d['booking_id'], ':c' => $d['concept'] ?? 'Cargo Extra', ':a' => $d['amount'], ':d' => $d['charge_date'] ?? date('Y-m-d')]);
    echo json_encode(["status"=>"success","message"=>"Cargo registrado"]);
} catch(PDOException $e) { echo json_encode(["status"=>"error","message"=>$e->getMessage()]); }
?>
