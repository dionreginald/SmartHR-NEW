<?php
include_once 'db.php'; // Include the existing DB connection

// Check if DELETE request
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Decode JSON data from the request
    $data = json_decode(file_get_contents("php://input"));

    // Prepare and execute the delete query
    $stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
    $stmt->bind_param("i", $data->id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Employee deleted successfully']);
    } else {
        echo json_encode(['message' => 'Failed to delete employee']);
    }

    $stmt->close();
    $conn->close();
}
?>
