<?php
include_once 'db.php'; // Include the existing DB connection

// Check if POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Decode JSON data from the request
    $data = json_decode(file_get_contents("php://input"));

    // Prepare and execute the query
    $stmt = $conn->prepare("INSERT INTO employees (full_name, age, dob, address, email, phone_number, profile_picture, police_check_report, nic_copy, cv, salary) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    // Bind parameters
    $stmt->bind_param("sisssssssss", 
                      $data->full_name, 
                      $data->age, 
                      $data->dob, 
                      $data->address, 
                      $data->email, 
                      $data->phone_number, 
                      $data->profile_picture, 
                      $data->police_check_report, 
                      $data->nic_copy, 
                      $data->cv, 
                      $data->salary);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Employee created successfully']);
    } else {
        echo json_encode(['message' => 'Failed to create employee']);
    }

    $stmt->close();
    $conn->close();
}
?>
