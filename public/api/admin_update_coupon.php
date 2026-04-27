<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }
try {
    $stmt = $conn->prepare("UPDATE coupons SET code=:c,discount_type=:t,discount_value=:v,max_uses=:m,active=:a WHERE id=:id");
    $stmt->execute([':c'=>strtoupper($d['code']??''),':t'=>$d['discount_type']??'percent',':v'=>$d['discount_value']??10,':m'=>$d['max_uses']??0,':a'=>isset($d['active'])?(int)$d['active']:1,':id'=>$d['id']]);
    echo json_encode(["status"=>"success","message"=>"Cupón actualizado"]);
} catch(PDOException $e) { echo json_encode(["status"=>"error","message"=>$e->getMessage()]); }
