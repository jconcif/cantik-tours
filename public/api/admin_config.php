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
    
    // 1. Check Authorization header (Standard)
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

    // 2. Fallback: Check Query Parameter (if header is blocked by hosting)
    if (empty($auth) && isset($_GET['token'])) {
        $auth = $_GET['token'];
    }

    // 3. Fallback: Check POST parameter (for multipart/form-data or regular POST)
    if (empty($auth) && isset($_POST['token'])) {
        $auth = $_POST['token'];
    }

    // 4. Fallback: Check JSON POST body
    if (empty($auth)) {
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->token)) {
            $auth = $data->token;
        }
    }

    if (empty($auth) || $auth !== $access_token) { 
        sleep(1); // Basic rate limiting / delay
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Acceso no autorizado"]);
        exit();
    }
}
?>
