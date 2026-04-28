<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);

if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }

try {
    $stmt = $conn->prepare("UPDATE booking_expenses SET concept=:c, amount=:a, expense_date=:d, category=:cat WHERE id=:id");
    $stmt->execute([
        ':c'   => $d['concept'],
        ':a'   => $d['amount'],
        ':d'   => $d['expense_date'],
        ':cat' => $d['category'],
        ':id'  => $d['id']
    ]);
    echo json_encode(["status"=>"success","message"=>"Gasto actualizado"]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
