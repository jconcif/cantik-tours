<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "admin_config.php";

handleCors();
checkAuth();

if (isset($_FILES['photo']) && isset($_POST['id'])) {
    $id = $_POST['id'];
    $file = $_FILES['photo'];
    $info = getimagesize($file['tmp_name']);
    
    if (!$info) {
        echo json_encode(["status" => "error", "message" => "El archivo no es una imagen válida"]);
        exit;
    }

    $upload_dir = "../images/clientes/";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    // Definimos el nuevo nombre (siempre .jpg para optimizar)
    $new_filename = "review_" . $id . "_" . time() . ".jpg";
    $target_path = $upload_dir . $new_filename;
    $relative_path = "/images/clientes/" . $new_filename;

    // --- PROCESAMIENTO DE IMAGEN (Redimensión y Compresión) ---
    $src_width = $info[0];
    $src_height = $info[1];
    $type = $info[2];
    
    // Crear recurso de imagen según el tipo original
    switch ($type) {
        case IMAGETYPE_JPEG: $src_img = imagecreatefromjpeg($file['tmp_name']); break;
        case IMAGETYPE_PNG:  $src_img = imagecreatefrompng($file['tmp_name']); break;
        case IMAGETYPE_WEBP: $src_img = imagecreatefromwebp($file['tmp_name']); break;
        default:
            echo json_encode(["status" => "error", "message" => "Formato no compatible (usa JPG, PNG o WEBP)"]);
            exit;
    }

    // Queremos un cuadrado de 400x400 para los perfiles
    $thumb_size = 400;
    $dst_img = imagecreatetruecolor($thumb_size, $thumb_size);

    // Ajustar para recorte cuadrado central
    if ($src_width > $src_height) {
        $src_x = ($src_width - $src_height) / 2;
        $src_y = 0;
        $src_w = $src_h = $src_height;
    } else {
        $src_x = 0;
        $src_y = ($src_height - $src_width) / 2;
        $src_w = $src_h = $src_width;
    }

    // Redimensionar y recortar
    imagecopyresampled($dst_img, $src_img, 0, 0, $src_x, $src_y, $thumb_size, $thumb_size, $src_w, $src_h);

    // Guardar como JPG con calidad 80 (equilibrio perfecto peso/calidad)
    if (imagejpeg($dst_img, $target_path, 80)) {
        try {
            $query = "UPDATE reviews SET foto_url = :foto_url WHERE id = :id";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":foto_url", $relative_path);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            
            echo json_encode(["status" => "success", "url" => $relative_path]);
        } catch(PDOException $e) {
            echo json_encode(["status" => "error", "message" => "Error al actualizar la base de datos"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Error al procesar la imagen"]);
    }

    // Liberar memoria
    imagedestroy($src_img);
    imagedestroy($dst_img);

} else {
    echo json_encode(["status" => "error", "message" => "Faltan datos o archivo"]);
}
?>
