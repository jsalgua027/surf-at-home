<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
header('Content-Type: application/json; charset=utf-8');


// Conexión a la base de datos
$host = 'localhost';
$dbname = 'bd_surfathome';
$username = 'jose';
$password = 'josefa';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Error al conectar con la base de datos: ' . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

// Manejar preflight
if ($method == "OPTIONS") {
    http_response_code(200);
    exit();
}
// Definir el enum de estados de pedido 
abstract class EstadoPedido
{
    const PENDIENTE = 'pendiente';
    const COMPLETADO = 'completado';
    const CANCELADO = 'cancelado';
}

// Manejar diferentes métodos HTTP
switch ($method) {
    case 'GET':
        // Obtener todos los pedidos
        try {
            $query = 'SELECT * FROM pedido';
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($pedidos);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'POST':
        // Generar un nuevo pedido
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            // Insertar en la tabla pedido
            $estado_pedido = EstadoPedido::PENDIENTE;
            $query = 'INSERT INTO pedido (fecha, hora, estado_pedido, id_usuario, total) VALUES (CURDATE(), CURTIME(), :estado_pedido, :id_usuario, :total)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':estado_pedido', $estado_pedido);
            $stmt->bindParam(':id_usuario', $data['id_usuario']);
            $stmt->bindParam(':total', $data['total']);
            $stmt->execute();
            $id_pedido = $conn->lastInsertId(); // Obtener el ID del pedido insertado

            // Insertar en la tabla pedido_producto
            foreach ($data['productos'] as $producto) {
                $query = 'INSERT INTO pedido_producto (id_pedido, id_producto, cantidad, precio_unitario) VALUES (:id_pedido, :id_producto, :cantidad, :precio_unitario)';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':id_pedido', $id_pedido);
                $stmt->bindParam(':id_producto', $producto['id_producto']);
                $stmt->bindParam(':cantidad', $producto['cantidad']);
                $stmt->bindParam(':precio_unitario', $producto['precio_unitario']);
                $stmt->execute();
            }
            echo json_encode(['message' => 'Pedido creado exitosamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Cambiar el estado de un pedido
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            $estado_pedido = EstadoPedido::COMPLETADO;
            $query = 'UPDATE pedido SET estado_pedido = :estado_pedido WHERE id_pedido = :id_pedido';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':estado_pedido', $estado_pedido);
            $stmt->bindParam(':id_pedido', $data['id_pedido']);
            $stmt->execute();
            echo json_encode(['message' => 'Estado del pedido actualizado exitosamente']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método no permitido']);
        break;
}
