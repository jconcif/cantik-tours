<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = "localhost";
$db_name = "u923682107_reviews";
$username = "u923682107_jconcif";
$password = "7&gZ>VvwDh!J";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8");
} catch(PDOException $exception) {
    echo json_encode(["status" => "error", "message" => "Connection error: " . $exception->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->comment)) {
    try {
        $puntuacion = round(($data->rating_booking + $data->rating_logistics + $data->rating_route + $data->rating_driver + $data->rating_vehicle + $data->rating_price) / 6);
        
        $query = "INSERT INTO reviews (
                    nombre, tour_id, driver_name, find_us, 
                    rating_booking, rating_logistics, rating_route, 
                    rating_driver, rating_vehicle, rating_price, 
                    comentario, comentario_en, ig_user, pais, 
                    autorizacion_fotos, aprobado, puntuacion
                  ) 
                  VALUES (
                    :nombre, :tour_id, :driver_name, :find_us, 
                    :rating_booking, :rating_logistics, :rating_route, 
                    :rating_driver, :rating_vehicle, :rating_price, 
                    :comentario, :comentario_en, :ig_user, :pais, 
                    :autorizacion_fotos, :aprobado, :puntuacion
                  )";
        
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":nombre", $data->name);
        $stmt->bindParam(":tour_id", $data->tour_type);
        $stmt->bindParam(":driver_name", $data->driver_name);
        $stmt->bindParam(":find_us", $data->find_us);
        
        $stmt->bindParam(":rating_booking", $data->rating_booking, PDO::PARAM_INT);
        $stmt->bindParam(":rating_logistics", $data->rating_logistics, PDO::PARAM_INT);
        $stmt->bindParam(":rating_route", $data->rating_route, PDO::PARAM_INT);
        $stmt->bindParam(":rating_driver", $data->rating_driver, PDO::PARAM_INT);
        $stmt->bindParam(":rating_vehicle", $data->rating_vehicle, PDO::PARAM_INT);
        $stmt->bindParam(":rating_price", $data->rating_price, PDO::PARAM_INT);

        $stmt->bindParam(":comentario", $data->comment);
        
        $comentario_en = (isset($data->lang) && strpos($data->lang, 'en') === 0) ? $data->comment : null;
        $stmt->bindParam(":comentario_en", $comentario_en);
        
        $stmt->bindParam(":ig_user", $data->ig_user);
        $pais = !empty($data->country) ? $data->country : 'es';
        $stmt->bindParam(":pais", $pais);
        $stmt->bindParam(":autorizacion_fotos", $data->auth, PDO::PARAM_BOOL);
        $aprobado = 0; 
        $stmt->bindParam(":aprobado", $aprobado, PDO::PARAM_INT);
        $stmt->bindParam(":puntuacion", $puntuacion, PDO::PARAM_INT);

        if($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["status" => "success", "message" => "Review saved successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["status" => "error", "message" => "Unable to save review."]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Incomplete data."]);
}
?>
