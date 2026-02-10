<?php
// Configuración de Administrador
$access_token = "javiperty2026"; 

// Database credentials
$host = "localhost";
$db_name = "u923682107_reviews";
$username = "u923682107_jconcif";
$password = "7&gZ>VvwDh!J";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8");
} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "DB Error: " . $exception->getMessage()]);
    exit();
}

function handleCors() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, UPDATE");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

function checkAuth() {
    global $access_token;
    
    $auth = '';
    
    // Check various sources for the Authorization header
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $auth = $headers['Authorization'];
        }
    }

    if (empty($auth) || $auth !== $access_token) { 
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Acceso no autorizado"]);
        exit();
    }
}
?>
