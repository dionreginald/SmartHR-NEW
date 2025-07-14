<?php
// db.php - Database connection

// Database credentials (change these as necessary)
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "smarthr"; // Your database name

// Create a new mysqli instance to handle the connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    // Log the error (optional: store errors in a log file for better troubleshooting in production)
    error_log("Connection failed: " . $conn->connect_error);  // Logs error to server's error log

    // Show a user-friendly message (do not expose raw error in production)
    die("Database connection failed. Please try again later.");
}

// Optionally, set the character set for the connection to handle multi-byte characters like UTF-8
$conn->set_charset("utf8");

?>
