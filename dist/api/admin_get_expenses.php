<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');

$booking_id = $_GET['booking_id'] ?? null;

try {
    // Asegurar que la tabla existe
    $conn->exec("CREATE TABLE IF NOT EXISTS `booking_expenses` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `booking_id` int(11) NOT NULL,
        `concept` varchar(255) NOT NULL,
        `amount` decimal(10,2) NOT NULL,
        `expense_date` date NOT NULL,
        `category` varchar(50) DEFAULT 'Otros', -- Combustible, Chofer, Entradas, Comida
        PRIMARY KEY (`id`),
        FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    if ($booking_id) {
        $stmt = $conn->prepare("SELECT * FROM booking_expenses WHERE booking_id = :bid ORDER BY expense_date DESC");
        $stmt->execute([':bid' => $booking_id]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["status" => "success", "data" => $data]);
    } else {
        echo json_encode(["status" => "error", "message" => "Booking ID requerido"]);
    }
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
