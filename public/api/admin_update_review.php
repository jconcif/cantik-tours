<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');
$d = json_decode(file_get_contents("php://input"), true);
if (empty($d['id'])) { echo json_encode(["status"=>"error","message"=>"ID requerido"]); exit; }
try {
    $stmt = $conn->prepare("UPDATE reviews SET 
        nombre=:n, 
        tour_id=:tid,
        driver_name=:dn,
        find_us=:fu,
        comentario=:c, 
        comentario_en=:ce, 
        ig_user=:ig,
        pais=:p,
        puntuacion=:score,
        rating_booking=:r_b,
        rating_logistics=:r_l,
        rating_route=:r_ro,
        rating_driver=:r_d,
        rating_vehicle=:r_v,
        rating_price=:r_p,
        aprobado=:a 
        WHERE id=:id");
        
    $stmt->execute([
        ':n'    => $d['nombre'] ?? '',
        ':tid'  => $d['tour_id'] ?? '',
        ':dn'   => $d['driver_name'] ?? '',
        ':fu'   => $d['find_us'] ?? '',
        ':c'    => $d['comentario'] ?? '',
        ':ce'   => $d['comentario_en'] ?? '',
        ':ig'   => $d['ig_user'] ?? '',
        ':p'    => $d['pais'] ?? '',
        ':score' => $d['puntuacion'] ?? 5,
        ':r_b'  => $d['rating_booking'] ?? 5,
        ':r_l'  => $d['rating_logistics'] ?? 5,
        ':r_ro' => $d['rating_route'] ?? 5,
        ':r_d'  => $d['rating_driver'] ?? 5,
        ':r_v'  => $d['rating_vehicle'] ?? 5,
        ':r_p'  => $d['rating_price'] ?? 5,
        ':a'    => isset($d['aprobado']) ? (int)$d['aprobado'] : 0,
        ':id'   => $d['id'],
    ]);
    echo json_encode(["status"=>"success","message"=>"Reseña actualizada","rows"=>$stmt->rowCount()]);
} catch(PDOException $e) {
    echo json_encode(["status"=>"error","message"=>$e->getMessage()]);
}
?>
