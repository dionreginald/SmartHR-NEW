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

// Get raw POST data
$rawData = file_get_contents("php://input");

// Log the raw data for debugging
error_log("Raw data received: " . $rawData);

// Decode the incoming JSON data
$data = json_decode($rawData);

// Check for JSON decode errors
if ($data === null) {
    error_log("Failed to decode JSON. Error: " . json_last_error_msg());
    echo json_encode(["message" => "Invalid JSON data"]);
    http_response_code(400); // Bad request
    exit();
}

// Check if the data contains the required fields
if (!isset($data->id) || !isset($data->name) || !isset($data->email) || !isset($data->contactNumber) || !isset($data->address)) {
    echo json_encode(["message" => "Missing required fields"]);
    http_response_code(400); // Bad request
    exit();
}

// Sanitize input to prevent SQL injection
$id = $data->id;
$name = $data->name;
$email = $data->email;
$contactNumber = $data->contactNumber;
$address = $data->address;
$password = isset($data->password) ? $data->password : '';  // Password is optional

// If password is provided, hash it
if (!empty($password)) {
    $password = password_hash($password, PASSWORD_BCRYPT);
}

// Prepared statement to prevent SQL injection
$query = "UPDATE admins SET name = ?, email = ?, contactNumber = ?, address = ?";

// Add password to the query if provided
if (!empty($password)) {
    $query .= ", password = ?";
}

$query .= " WHERE id = ?"; // Update the profile based on the provided ID

// Prepare and execute the SQL statement
if ($stmt = $conn->prepare($query)) {
    // Bind parameters dynamically
    if (!empty($password)) {
        $stmt->bind_param("sssssi", $name, $email, $contactNumber, $address, $password, $id);
    } else {
        $stmt->bind_param("sssss", $name, $email, $contactNumber, $address, $id);
    }

    // Execute the query and check if successful
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['message' => 'Failed to update profile']);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo json_encode(['message' => 'Database query preparation failed']);
}

// Close the database connection
$conn->close();
?>
