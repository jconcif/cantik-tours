<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name)) {
    echo json_encode(["status" => "error", "message" => "Nombre requerido"]);
    exit();
}

try {
    $sql = "INSERT INTO `drivers` (name, phone, car_model, active) 
            VALUES (:name, :phone, :car_model, 1)";
            
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':name' => $data->name,
        ':phone' => $data->phone ?? '',
        ':car_model' => $data->car_model ?? ''
    ]);

    echo json_encode(["status" => "success", "message" => "Conductor añadido", "id" => $conn->lastInsertId()]);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
