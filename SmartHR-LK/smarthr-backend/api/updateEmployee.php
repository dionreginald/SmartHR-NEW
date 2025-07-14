<?php
include_once 'db.php'; // Include the existing DB connection

// Allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:3000"); // Adjust the origin as needed
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Decode JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Check if the necessary data is available
    if (isset($data->full_name, $data->age, $data->dob, $data->address, $data->email, $data->phone_number, $data->salary, $data->id)) {

        // Initialize the query string and parameters
        $query = "UPDATE employees SET full_name = ?, age = ?, dob = ?, address = ?, email = ?, phone_number = ?, salary = ? WHERE id = ?";

        // Initialize the parameters and types
        $params = [
            $data->full_name, 
            $data->age, 
            $data->dob, 
            $data->address, 
            $data->email, 
            $data->phone_number, 
            $data->salary,
            $data->id
        ];
        $types = "sissssssi"; // The types of the parameters (without password)

        // Check if a password is being updated
        if (isset($data->password) && !empty($data->password)) {
            // Hash the password before saving it
            $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

            // Add password to the query and the parameters
            $query = "UPDATE employees SET full_name = ?, age = ?, dob = ?, address = ?, email = ?, phone_number = ?, salary = ?, password = ? WHERE id = ?";
            $params[] = $hashedPassword;  // Add the hashed password to the parameters
            $types = "sisssssssi"; // Include password in the parameter types
        }

        // Prepare and execute the update query
        $stmt = $conn->prepare($query);
        $stmt->bind_param($types, ...$params);  // Correctly bind parameters

        // Execute the query and check the result
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Employee updated successfully']);
        } else {
            echo json_encode(['message' => 'Failed to update employee']);
        }

        $stmt->close();
    } else {
        echo json_encode(['message' => 'Missing required fields']);
    }

    $conn->close();
}
?>
