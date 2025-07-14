<?php
include_once 'db.php'; // Include the existing DB connection

// Query to select all employees
$query = "SELECT * FROM employees";
$result = $conn->query($query);

// Check if any employee data exists
if ($result->num_rows > 0) {
    // Fetch all employees and return as JSON
    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
    echo json_encode($employees);
} else {
    echo json_encode([]);
}

// Close the connection
$conn->close();
?>
