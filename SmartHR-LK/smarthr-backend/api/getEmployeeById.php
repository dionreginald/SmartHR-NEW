<?php
include_once 'db.php'; // Include the existing DB connection

// Add CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if it's a preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the employee ID from the URL parameter
if (isset($_GET['id'])) {
    $employeeId = $_GET['id'];

    // Query to select the employee based on the ID
    $query = "SELECT * FROM employees WHERE id = ?";
    
    // Prepare the SQL statement to avoid SQL injection
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param('i', $employeeId); // Bind the ID parameter as an integer
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if the employee was found
        if ($result->num_rows > 0) {
            $employee = $result->fetch_assoc();
            echo json_encode($employee);  // Return the employee data as JSON
        } else {
            echo json_encode([]);  // Return an empty array if no employee found
        }

        $stmt->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare query']);
    }
} else {
    echo json_encode(['error' => 'No employee ID provided']);
}

// Close the database connection
$conn->close();
?>
