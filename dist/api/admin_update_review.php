<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "admin_config.php";

handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        $query = "UPDATE reviews SET 
                    aprobado = :aprobado, 
                    comentario = :comentario, 
                    comentario_en = :comentario_en,
                    nombre = :nombre,
                    estrellas = :estrellas,
                    tour_id = :tour_id,
                    ig_user = :ig_user,
                    pais = :pais,
                    autorizacion_fotos = :autorizacion_fotos
                  WHERE id = :id";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":aprobado", $data->aprobado, PDO::PARAM_INT);
        $stmt->bindParam(":comentario", $data->comentario, PDO::PARAM_STR);
        $stmt->bindParam(":comentario_en", $data->comentario_en, PDO::PARAM_STR);
        $stmt->bindParam(":nombre", $data->nombre, PDO::PARAM_STR);
        $stmt->bindParam(":estrellas", $data->estrellas, PDO::PARAM_INT);
        $stmt->bindParam(":tour_id", $data->tour_id, PDO::PARAM_STR);
        $stmt->bindParam(":ig_user", $data->ig_user, PDO::PARAM_STR);
        $stmt->bindParam(":pais", $data->pais, PDO::PARAM_STR);
        $stmt->bindParam(":autorizacion_fotos", $data->autorizacion_fotos, PDO::PARAM_INT);
        $stmt->bindParam(":id", $data->id, PDO::PARAM_INT);

        if($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Review updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Unable to update review"]);
        }
    } catch(PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data"]);
}
?>
