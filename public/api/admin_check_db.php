<?php
require_once 'admin_config.php';
handleCors();
checkAuth();

try {
    $tables = $conn->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    $result = [
        "status" => "success",
        "database" => $db_name,
        "tables" => $tables,
        "counts" => []
    ];

    foreach ($tables as $table) {
        $count = $conn->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
        $result["counts"][$table] = $count;
    }

    echo json_encode($result);
} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
