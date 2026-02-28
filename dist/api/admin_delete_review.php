<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "admin_config.php";

handleCors();
checkAuth();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        $query = "DELETE FROM reviews WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $data->id, PDO::PARAM_INT);

        if($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Review deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Unable to delete review"]);
        }
    } catch(PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No ID provided"]);
}
?>
