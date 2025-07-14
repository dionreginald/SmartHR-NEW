import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCurrentDetails, setShowCurrentDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const getLoggedInUserId = () => {
    return localStorage.getItem("userId");
  };

  const fetchProfileData = useCallback(async () => {
    const loggedInUserId = getLoggedInUserId();
    if (!loggedInUserId) {
      setErrorMessage("User not logged in.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost/SmartHR-LK/smarthr-backend/api/getProfile.php?id=${loggedInUserId}`);
      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
        setContactNumber(data.contactNumber);
        setAddress(data.address);
      } else {
        setErrorMessage(data.message || "Error fetching profile data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error fetching profile data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showCurrentDetails) {
      fetchProfileData();
    }
  }, [showCurrentDetails, fetchProfileData]);  // Adding fetchProfileData as a dependency

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const profileData = { name, email, contactNumber, address };

    try {
      const response = await fetch("http://localhost/SmartHR-LK/smarthr-backend/api/updateProfile.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setErrorMessage(result.message || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = () => {
    setChangePassword(!changePassword);
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const passwordData = { password };

    try {
      const response = await fetch("http://localhost/SmartHR-LK/smarthr-backend/api/updatePassword.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        setErrorMessage(result.message || "Failed to update password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = () => {
    setShowCurrentDetails(!showCurrentDetails);
  };

  return (
    <div className="profile-container">
      <header className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/images/smarthr-logo.png" alt="SmartHR Logo" className="navbar-logo-img" />
        </Link>
      </header>

      <div className="profile-content">
        <Typography variant="h4" className="profile-heading">
          Update Profile
        </Typography>

        <Button onClick={handleViewDetails} variant="outlined" color="secondary">
          {showCurrentDetails ? "Hide Current Details" : "View Current Details"}
        </Button>

        {showCurrentDetails && (
          <div className="current-details">
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <Typography variant="h6">Name: {name}</Typography>
                <Typography variant="h6">Email: {email}</Typography>
                <Typography variant="h6">Contact Number: {contactNumber}</Typography>
                <Typography variant="h6">Address: {address}</Typography>
              </>
            )}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="profile-form">
          <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Save Profile Changes"}
          </Button>
        </form>

        <Button onClick={handlePasswordChange} variant="outlined" color="secondary">
          {changePassword ? "Cancel Password Change" : "Change Password"}
        </Button>

        {changePassword && (
          <div className="password-change-section">
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleSavePassword} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : "Save Password"}
            </Button>
          </div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {showSuccess && <div className="success-message">Profile updated successfully!</div>}
      </div>
    </div>
  );
};

export default ProfilePage;
