import React, { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages
  const [showSuccess, setShowSuccess] = useState(false); // State to show success popup
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrorMessage('');
    setIsLoading(true);

    // Prepare the data to send to the backend
    const formData = {
      name,
      email,
      password,
      contactNumber,
      address,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful registration
        }, 3000);
      } else {
        setErrorMessage(result.message || "Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="register-section">
      {/* Navbar - Logo only */}
      <header className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/images/smarthr-logo.png" alt="SmartHR Logo" style={{ height: "60px" }} />
        </Link>
      </header>

      {/* Left side - Image */}
      <div className="image-container">
        <img src="/images/hr-image.png" alt="HR" className="login-image" />
      </div>

      {/* Right side - Register Form */}
      <div className="register-container">
        <Typography variant="h4" className="register-title">Create an Account</Typography>
        <br></br>
        <br></br>
        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <TextField
              variant="outlined"
              label="Contact Number"
              type="tel"
              fullWidth
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <TextField
              variant="outlined"
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <Button 
              type="submit" 
              className="cta-btn" 
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </div>
        </form>

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Success Popup Message */}
        {showSuccess && (
          <div className="success-popup">
            <Typography variant="h6" color="primary">
              Registration Successful! Redirecting to login...
            </Typography>
          </div>
        )}

        {/* Already have an account link */}
        <div className="links">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
