import React, { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'; // Import custom LoginPage CSS

const LoginPage = () => {
  const [username, setUsername] = useState('');  // 'username' is for email input field
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // To show error messages
  const [isLoading, setIsLoading] = useState(false);  // Loading state for the button
  const navigate = useNavigate();  // Using useNavigate for navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!username || !password) {
      setError("Both fields are required");
      setIsLoading(false);
      return;
    }

    // Prepare the data to send to the backend (assuming backend uses 'email' for login)
    const formData = {
      email: username,  // Sending 'email' for login (ensure backend matches)
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {  // Ensure the backend URL is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check for successful response
      const result = await response.json();

      // Log the response for debugging
      console.log("Login response:", result);

      if (response.ok) {
        // Save user data (like userId or JWT token) in localStorage after successful login
        localStorage.setItem("userId", result.user.id); // Adjust based on response structure
        setError('');  // Clear error message
        navigate("/admin-dashboard");  // Redirect to the Admin Dashboard page
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loading spinner after the request is done
    }
  };

  return (
    <div className="page-body">
      {/* Background Video */}
      <div className="page-background-video">
        <video autoPlay loop muted>
          <source src="https://videos.pexels.com/video-files/8303104/8303104-hd_1920_1080_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Navbar */}
      <header className="navbar-container">
        <Link to="/" className="navbar-logo-container">
          <img src="/images/smarthr-logo.png" alt="SmartHR Logo" style={{ height: "60px" }} />
        </Link>
      </header>

      {/* Login Form */}
      <div className="login-form-container">
        <Typography variant="h4" className="login-form-heading">Login to SmartHR</Typography>

        {/* Display error if any */}
        {error && <Typography color="error" className="error-message">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <TextField
              variant="outlined"
              label="Email or Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-wrapper">
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-actions">
            <Button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </div>
        </form>

        {/* Forgot Password & Register Links */}
        <div className="links-section">
          <Link to="#">Forgot password?</Link>
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
