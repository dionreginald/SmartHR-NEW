const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

dotenv.config();

// Initialize express and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests only from React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(express.json());  // Parse incoming JSON requests
app.use(cors(corsOptions));  // Enable CORS for the app

// Log every incoming request (for debugging)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.stack);
    process.exit(1);  // Terminate server if DB connection fails
  }
  console.log("Connected to the database.");
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Endpoint to register a new admin
app.post("/register", (req, res) => {
  const { name, email, password, contactNumber, address } = req.body;

  // Validate input fields
  if (!name || !email || !password || !contactNumber || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const query = "INSERT INTO admins (name, email, password, contactNumber, address) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, contactNumber, address], (err, result) => {
      if (err) {
        console.error("Error inserting into DB:", err);
        return res.status(500).json({ message: "Registration failed. Please try again later." });
      }
      res.status(201).json({ message: "Registration successful" });
    });
  });
});

// Endpoint to login an admin
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find the admin in the database by email
  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the password with the hashed password stored in the database
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (isMatch) {
        res.status(200).json({ message: "Login successful", user: results[0] });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  });
});

// Endpoint to fetch profile data of admin (for Profile page)
app.get("/getProfile", (req, res) => {
  const adminId = req.query.id;  // Assuming the ID is passed as a query parameter

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  db.query("SELECT id, name, email, contactNumber, address FROM admins WHERE id = ?", [adminId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(results[0]);  // Send the admin profile data
  });
});

// Endpoint to update admin profile
app.put("/SmartHR-LK/smarthr-backend/api/updateProfile.php", (req, res) => {
  const { id, name, email, contactNumber, address, password } = req.body;

  // Validate input fields
  if (!id || !name || !email || !contactNumber || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // If password is provided, hash it
  const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

  const query = "UPDATE admins SET name = ?, email = ?, contactNumber = ?, address = ?, password = ? WHERE id = ?";

  db.query(query, [name, email, contactNumber, address, hashedPassword || null, id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Failed to update profile" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
});

// Endpoint to update admin password
app.put("/SmartHR-LK/smarthr-backend/api/updatePassword.php", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "Admin ID and password are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "UPDATE admins SET password = ? WHERE id = ?";

  db.query(query, [hashedPassword, id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Failed to update password" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  });
});
