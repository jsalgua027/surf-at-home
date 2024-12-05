<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
header('Content-Type: application/json; charset=utf-8');
// Conexión a la base de datos
$host = 'localhost';
$dbname = 'bd_surfathome';
$username = 'jose'; // Cambia esto si tu usuario de MySQL es diferente
$password = 'josefa'; // Cambia esto si tienes una contraseña para MySQL
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
    header('Content-Type: application/json; charset=utf-8');
    die(json_encode(['error' => 'Error al conectar con la base de datos: ' . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

// Manejar preflight
if ($method == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Función para generar un token
function generateToken()
{
    return bin2hex(random_bytes(16)); // Genera un token de 32 caracteres
}

// Manejar diferentes métodos HTTP
switch ($method) {
    case 'GET':
        // Lógica para obtener datos del usuario (logueo)
        try {
            if (isset($_GET['email']) && isset($_GET['password'])) {
                $email = $_GET['email'];
                $password = md5($_GET['password']);
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
        } catch (Exception $e) {
            // Cabeceras de CORS en caso de error en GET
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    case 'POST':
        // Lógica para crear un nuevo usuario
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['email']) && isset($data['password']) && isset($data['nombre']) && isset($data['direccion']) && isset($data['telefono']) && isset($data['tipo'])) {
                $password = md5($data['password']);
                // Mensajes de depuración 
                error_log("Email recibido: " . $data['email']);
                 error_log("Password recibido (MD5): " . $password);
                $query = 'INSERT INTO usuario (email, password, nombre, direccion, telefono, tipo) VALUES (:email, :password, :nombre, :direccion, :telefono, :tipo)';
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $data['email']);
                $stmt->bindParam(':password', $data['password']);
                $stmt->bindParam(':nombre', $data['nombre']);
                $stmt->bindParam(':direccion', $data['direccion']);
                $stmt->bindParam(':telefono', $data['telefono']);
                $stmt->bindParam(':tipo', $data['tipo']);
                $stmt->execute();
                echo json_encode(['message' => 'Usuario creado exitosamente']);
            } else {
                http_response_code(400);
                echo json_encode(['message' => 'Faltan parámetros en el cuerpo de la solicitud']);
            }
        } catch (Exception $e) {
            // Cabeceras de CORS en caso de error en POST 
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();

    default:
       // Cabeceras de CORS en caso de error en POST 
       header("Access-Control-Allow-Origin: *");
       header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
       header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, token, cache-control");
       header('Content-Type: application/json; charset=utf-8');
       http_response_code(405);
       echo json_encode(['error' => $e->getMessage()]);
        exit();
}
