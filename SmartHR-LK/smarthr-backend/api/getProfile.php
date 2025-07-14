<?php
// Set CORS headers to allow React app to access this API
header("Access-Control-Allow-Origin: http://localhost:3000");  // Allow React app to access this API
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers

// Handle preflight OPTIONS requests (necessary for browsers to check CORS before sending actual requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);  // Respond with a 200 status code for preflight checks
    exit();
}

// Include the database connection file
include_once 'db.php';  // Ensure the path to db.php is correct

// Check if the 'id' parameter is provided in the request
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["message" => "Admin ID is required"]);
    http_response_code(400);  // Bad Request
    exit;
}

// Sanitize the ID input (ensure the ID is an integer)
$adminId = intval($_GET['id']);  // Ensures the ID is an integer

// Prepare the SQL query to fetch profile details by admin ID
$sql = "SELECT id, name, email, contactNumber, address FROM admins WHERE id = ?";
$stmt = $conn->prepare($sql);

// Check if the statement preparation was successful
if ($stmt === false) {
    echo json_encode(["message" => "Error preparing statement"]);
    http_response_code(500); // Internal Server Error
    exit;
}

// Bind the ID parameter to the query
$stmt->bind_param("i", $adminId);

// Execute the query
if ($stmt->execute()) {
    $result = $stmt->get_result();

    // Check if a result was returned
    if ($result->num_rows > 0) {
        // Fetch the data and return as JSON
        $admin = $result->fetch_assoc();
        echo json_encode($admin);  // Return the profile data as JSON
    } else {
        // Admin not found
        echo json_encode(["message" => "Admin not found"]);
        http_response_code(404);  // Not Found
    }
} else {
    // Query execution error
    echo json_encode(["message" => "Error executing query"]);
    http_response_code(500); // Internal Server Error
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();
?>
