<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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

try {
    $tour_id = isset($_GET['tour_id']) ? $_GET['tour_id'] : null;
    
    // Only fetch approved reviews
    $query = "SELECT id, nombre, estrellas, tour_id, comentario, comentario_en, ig_user, foto_url, pais, autorizacion_fotos, fecha 
              FROM reviews 
              WHERE aprobado = 1";
              
    if ($tour_id) {
        $query .= " AND (tour_id = :tour_id OR tour_id = 'all' OR tour_id = '')";
    }
    
    $query .= " ORDER BY fecha DESC";
    
    $stmt = $conn->prepare($query);
    
    if ($tour_id) {
        $stmt->bindParam(':tour_id', $tour_id);
    }
    
    $stmt->execute();

    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["status" => "success", "data" => $reviews]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
