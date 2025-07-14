<?php
// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the database connection file
include_once 'db.php';

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$password = $data->password;

// Validate fields
if (!isset($id) || !isset($password)) {
    echo json_encode(["message" => "Admin ID and password are required"]);
    http_response_code(400); // Bad Request
    exit();
}

// Hash the new password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepared statement to prevent SQL injection
$query = "UPDATE admins SET password = ? WHERE id = ?";

if ($stmt = $conn->prepare($query)) {
    // Bind parameters to the query
    $stmt->bind_param("si", $hashedPassword, $id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Password updated successfully']);
    } else {
        echo json_encode(['message' => 'Failed to update password']);
    }
    $stmt->close();
} else {
    echo json_encode(['message' => 'Database query preparation failed']);
}

$conn->close();
?>
