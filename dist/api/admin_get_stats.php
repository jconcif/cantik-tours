<?php
require_once 'admin_config.php';
handleCors(); checkAuth();
header('Content-Type: application/json');

try {
    // 1. Revenue & Profit Stats
    $stmt = $conn->query("SELECT SUM(amount) as total FROM booking_payments");
    $revenue = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    $stmt = $conn->query("SELECT SUM(amount) as total FROM booking_expenses");
    $expenses = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

    $profit = $revenue - $expenses;

    // 2. Booking Status Distribution
    $stmt = $conn->query("SELECT payment_status as status, COUNT(*) as count FROM bookings GROUP BY payment_status");
    $status_dist = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Driver Performance Analysis
    $stmt = $conn->query("SELECT 
        driver_name, 
        COUNT(*) as total_reviews,
        AVG(rating_driver) as avg_rating,
        AVG(rating_vehicle) as avg_vehicle
        FROM reviews 
        WHERE driver_name IS NOT NULL AND driver_name != ''
        GROUP BY driver_name
        ORDER BY avg_rating DESC");
    $driver_stats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 4. Overall Service Quality (Last 100 reviews)
    $stmt = $conn->query("SELECT 
        AVG(rating_booking) as booking,
        AVG(rating_logistics) as logistics,
        AVG(rating_route) as route,
        AVG(rating_driver) as driver,
        AVG(rating_vehicle) as vehicle,
        AVG(rating_price) as price
        FROM (SELECT * FROM reviews ORDER BY id DESC LIMIT 100) as recent");
    $service_quality = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => [
            "revenue" => (float)$revenue,
            "expenses" => (float)$expenses,
            "profit" => (float)$profit,
            "status_distribution" => $status_dist,
            "driver_performance" => $driver_stats,
            "service_quality" => $service_quality
        ]
    ]);

} catch(PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
