<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);

if (empty($d['booking_id']) || empty($d['amount'])) {
    echo json_encode(["status"=>"error","message"=>"Datos incompletos"]); exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO booking_expenses (booking_id, concept, amount, expense_date, category) VALUES (:bid, :c, :a, :d, :cat)");
    $stmt->execute([
        ':bid' => $d['booking_id'],
        ':c'   => $d['concept'] ?? 'Sin concepto',
        ':a'   => $d['amount'],
        ':d'   => $d['expense_date'] ?? date('Y-m-d'),
        ':cat' => $d['category'] ?? 'Otros'
    ]);
    echo json_encode(["status"=>"success","message"=>"Gasto registrado","id"=>$conn->lastInsertId()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
