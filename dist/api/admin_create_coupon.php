<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['code'])) { echo json_encode(["status"=>"error","message"=>"Código requerido"]); exit; }
try {
    $stmt = $conn->prepare("INSERT INTO coupons (code,discount_type,discount_value,max_uses,active) VALUES (:c,:t,:v,:m,:a)");
    $stmt->execute([':c'=>strtoupper($d['code']),':t'=>$d['discount_type']??'percent',':v'=>$d['discount_value']??10,':m'=>$d['max_uses']??0,':a'=>1]);
    echo json_encode(["status"=>"success","message"=>"Cupón creado","id"=>$conn->lastInsertId()]);
} catch(PDOException $e) { echo json_encode(["status"=>"error","message"=>$e->getMessage()]); }
