<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
header('Content-Type: application/json; charset=utf-8');

//include 'db.php';
$host = 'localhost';
$dbname = 'bd_surfathome';
$username = 'jose'; // Cambia esto si tu usuario de MySQL es diferente
$password = 'josefa'; // Cambia esto si tienes una contraseña para MySQL
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Error al conectar con la base de datos: ' . $e->getMessage());
}


$method = $_SERVER['REQUEST_METHOD'];

// Manejar preflight
if ($method == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Función para generar la ruta de la imagen del producto
function generarRutaImagen($categoria, $tipo, $modelo, $nombreArchivo)
{
    return $categoria . '/' . $tipo . '/' . $modelo . '/' . $nombreArchivo;
}

// Manejar diferentes métodos HTTP
switch ($method) {
    case 'GET':
        try {
            if (isset($_GET['categoria'])) {
                $categoria = $_GET['categoria'];
                $query = 'SELECT * FROM producto WHERE id_categoria = :categoria';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':categoria', $categoria, PDO::PARAM_INT);
            } else {
                $query = 'SELECT * FROM producto';
                $stmt = $conn->prepare($query);
            }

            $stmt->execute();
            $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($productos);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    case 'POST':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $rutaImagen = generarRutaImagen($data['categoria'], $data['tipo'], $data['modelo'], $data['nombreArchivo']);
            $query = 'INSERT INTO producto (marca_producto, precio, foto_producto, id_categoria, stock, descripcion) VALUES (:marca_producto, :precio, :foto_producto, :id_categoria, :stock, :descripcion)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':marca_producto', $data['marca_producto']);
            $stmt->bindParam(':precio', $data['precio']);
            $stmt->bindParam(':foto_producto', $rutaImagen);
            $stmt->bindParam(':id_categoria', $data['id_categoria']);
            $stmt->bindParam(':stock', $data['stock']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->execute();
            echo json_encode(['message' => 'Producto agregado exitosamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    case 'PUT':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $query = 'UPDATE producto SET 
                      marca_producto = :marca_producto, 
                      precio = :precio, 
                      foto_producto = :foto_producto, 
                      id_categoria = :id_categoria, 
                      stock = :stock, 
                      descripcion = :descripcion 
                      WHERE id_producto = :id_producto';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':marca_producto', $data['marca_producto']);
            $stmt->bindParam(':precio', $data['precio']);
            $stmt->bindParam(':foto_producto', $data['foto_producto']);
            $stmt->bindParam(':id_categoria', $data['id_categoria']);
            $stmt->bindParam(':stock', $data['stock']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':id_producto', $data['id_producto']);
            $stmt->execute();
            echo json_encode(['message' => 'Producto actualizado exitosamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    case 'DELETE':
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $query = 'DELETE FROM producto WHERE id_producto = :id_producto';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':id_producto', $data['id_producto']);
            $stmt->execute();
            echo json_encode(['message' => 'Producto eliminado exitosamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método no permitido']);
        exit();
}
