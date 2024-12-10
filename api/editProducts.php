<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
header('Content-Type: application/json; charset=utf-8');

//include 'db.php';
$host = 'localhost';
$dbname = 'bd_surfathome';
$username = 'jose'; 
$password = 'josefa'; 
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Error al conectar con la base de datos: ' . $e->getMessage());
}

// Función para generar la ruta de la imagen del producto
function generarRutaImagen($categoria, $nombreArchivo)
{
    return  $categoria . '/' . $nombreArchivo;
}




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = $_POST;
        $files = $_FILES;
        // Mostrar los datos recibidos para depuración
        error_log('Datos recibidos en $_POST API: ' . print_r($data, true));
        error_log('Archivos recibidos en $_FILES API: ' . print_r($files, true));
        // Verificar si se proporciona el ID del producto
        if (!isset($data['id_producto'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID de producto no proporcionado']);
            exit();
        }
        // Actualizar datos del producto en la base de datos 
        $query = 'UPDATE producto SET marca_producto = :marca_producto, precio = :precio, id_categoria = :id_categoria, stock = :stock, descripcion = :descripcion WHERE id_producto = :id_producto';
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':marca_producto', $data['marca_producto']);
        $stmt->bindParam(':precio', $data['precio']);
        $stmt->bindParam(':id_categoria', $data['id_categoria']);
        $stmt->bindParam(':stock', $data['stock']);
        $stmt->bindParam(':descripcion', $data['descripcion']);
        $stmt->bindParam(':id_producto', $data['id_producto']);
        $stmt->execute(); 
        // Manejar la actualización de la imagen si se ha enviado una
        if (isset($files['file']) && !empty($files['file']['tmp_name'])) {
            $archivo = $files['file'];
            $nombreArchivo = $archivo['name'];
            $sourcePath = $archivo['tmp_name'];
            $categoria = $data['id_categoria'];
            $categoriaPath = 'Productos/' . $categoria;
            $rutaImagen = generarRutaImagen($categoria, $nombreArchivo);
            $destinationPath = 'assets/' . $categoriaPath . '/' . $nombreArchivo;
           
             move_uploaded_file($sourcePath, $destinationPath);
            if (move_uploaded_file($sourcePath, $destinationPath)) { 
                $query = 'UPDATE producto SET foto_producto = :foto_producto WHERE id_producto = :id_producto';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':foto_producto', $rutaImagen);
                $stmt->bindParam(':id_producto', $data['id_producto']);
                $stmt->execute();
                error_log('Archivo movido exitosamente: ' . $destinationPath);
            } else {
                error_log('Error al mover el archivo.');
                http_response_code(500);
                echo json_encode(['error' => 'Error al mover el archivo.']);
                exit();
            }
        }
        echo json_encode(['message' => 'Producto actualizado exitosamente']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
exit();
