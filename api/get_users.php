<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

// Función para generar un token
function generateToken() {
    return bin2hex(random_bytes(16));
}

// Lógica para manejar las solicitudes POST
if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['action'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Acción no especificada']);
        exit();
    }

    $action = $data['action'];
    
    switch ($action) {
        case 'login':
            // Lógica para obtener datos del usuario (logueo)
            if (isset($data['email']) && isset($data['password'])) {
                $email = $data['email'];
                $password = md5($data['password']);
                $query = 'SELECT * FROM usuario WHERE email = :email AND password = :password';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $password);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($user) {
                    $user['token'] = generateToken(); // Generar y agregar token al usuario
                    echo json_encode($user);
                } else {
                    http_response_code(401);
                    echo json_encode(['message' => 'Credenciales incorrectas']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Faltan parámetros de email o password']);
            }
            break;

        case 'createUser':
            // Lógica para crear un nuevo usuario
            if (isset($data['email']) && isset($data['password']) && isset($data['nombre']) && isset($data['direccion']) && isset($data['telefono'])) {
                $password = md5($data['password']);
                $token = ''; // Crear el campo token vacío
                $tipo = 'cliente'; //solo se pueden hacer desde el front clientes
                $query = 'INSERT INTO usuario (email, password, nombre, direccion, telefono, tipo, token) VALUES (:email, :password, :nombre, :direccion, :telefono, :tipo, :token)';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $data['email']);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':nombre', $data['nombre']);
                $stmt->bindParam(':direccion', $data['direccion']);
                $stmt->bindParam(':telefono', $data['telefono']);
                $stmt->bindParam(':tipo', $tipo);
                $stmt->bindParam(':token', $token);
                $stmt->execute();
                echo json_encode(['message' => 'Usuario creado exitosamente']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Faltan parámetros en el cuerpo de la solicitud']);
            }
            break;

        // Agrega otros casos según sea necesario

        default:
            http_response_code(400);
            echo json_encode(['message' => 'Acción desconocida']);
            break;
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido']);
}
?>
