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
function generarRutaImagen($categoria, $nombreArchivo)
{

    return  $categoria . '/' . $nombreArchivo;
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
        try { // Capturar los datos del formulario
            $data = $_POST;
            // Capturar el archivo enviado
            if (isset($_FILES['file'])) {
                $archivo = $_FILES['file'];
                $nombreArchivo = $archivo['name'];

                // Generar la ruta de la imagen
                $categoria = $data['id_categoria'];
                $rutaImagen = generarRutaImagen($categoria, $nombreArchivo);
                // Insertar el producto en la base de datos
                $query = 'INSERT INTO producto (marca_producto, precio, foto_producto, id_categoria, stock, descripcion) VALUES (:marca_producto, :precio, :foto_producto, :id_categoria, :stock, :descripcion)';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':marca_producto', $data['marca_producto']);
                $stmt->bindParam(':precio', $data['precio']);
                $stmt->bindParam(':foto_producto', $rutaImagen);
                $stmt->bindParam(':id_categoria', $data['id_categoria']);
                $stmt->bindParam(':stock', $data['stock']);
                $stmt->bindParam(':descripcion', $data['descripcion']);
                $stmt->execute();

                // Mover el archivo a la carpeta correspondiente después de la inserción 
                if ($stmt->rowCount() > 0 && !empty($nombreArchivo)) {
                    $categoriaPath = 'Productos/' . $categoria;
                    // Mover el archivo a la carpeta correspondiente
                    $sourcePath = $archivo['tmp_name'];
                    $destinationPath = '../src/assets/' . $categoriaPath . '/' . $nombreArchivo;
                    move_uploaded_file($sourcePath, $destinationPath);
                    if (move_uploaded_file($sourcePath, $destinationPath)) {
                        error_log('Archivo movido exitosamente: ' . $destinationPath);
                    } else {
                        error_log('Error al mover el archivo.');
                        http_response_code(500);
                        echo json_encode(['error' => 'Error al mover el archivo.']);
                        exit();
                    }
                }
                echo json_encode(['message' => 'Producto agregado exitosamente']);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'No se proporcionó el archivo.']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
        }
        exit();

    case 'PUT':
        try {
            // Manejar datos enviados a través de `multipart/form-data`
            if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
            // parse_str(file_get_contents("php://input"), $data);
             $data = $_POST;
                error_log('Datos recibidos en $_POST  API: ' . print_r($data, true));
                error_log('Archivos recibidos en $_FILES  API : ' . print_r($_FILES, true));
                if (!isset($data['id_producto'])) {
                    http_response_code(400);
                    echo json_encode(['error' => 'ID de producto no proporcionado  API ']);
                    exit();
                }
            }

            $query = 'UPDATE producto SET 
                      marca_producto = :marca_producto, 
                      precio = :precio, 
                      id_categoria = :id_categoria, 
                      stock = :stock, 
                      descripcion = :descripcion 
                      WHERE id_producto = :id_producto';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':marca_producto', $data['marca_producto']);
            $stmt->bindParam(':precio', $data['precio']);
            $stmt->bindParam(':id_categoria', $data['id_categoria']);
            $stmt->bindParam(':stock', $data['stock']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':id_producto', $data['id_producto']);
            $stmt->execute();

            /***
             *   if (isset($_FILES['file'])) {
                $archivo = $_FILES['file'];
                $nombreArchivo = $archivo['name'];
                $sourcePath = $archivo['tmp_name'];
                // Generar la ruta de la imagen 
                $categoria = $data['id_categoria'];
                $rutaImagen = generarRutaImagen($categoria, $nombreArchivo);
                $destinationPath = '../src/assets/' . $categoriaPath . '/' . $nombreArchivo;
                move_uploaded_file($sourcePath, $destinationPath);
            }
            if (move_uploaded_file($sourcePath, $destinationPath)) {
                // Actualizar la ruta de la imagen en la base de datos
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
             */

            echo json_encode(['message' => 'Producto actualizado exitosamente MENSAJE API']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }


    case 'DELETE':
        try {
            if (isset($_GET['id_producto'])) {
                $id_producto = $_GET['id_producto'];
                $query = 'DELETE FROM producto WHERE id_producto = :id_producto';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':id_producto', $id_producto, PDO::PARAM_INT);
                $stmt->execute();
                echo json_encode(['message' => 'Producto eliminado exitosamente']);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de producto no proporcionado']);
            }
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
