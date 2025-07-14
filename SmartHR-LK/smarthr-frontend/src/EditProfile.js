import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import './EditProfile.css';

const EditProfile = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  // State to hold the employee data
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    salary: "",
    password: "" // Adding password field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employee data based on employeeId
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost/SmartHR-LK/smarthr-backend/api/getEmployeeById.php?id=${employeeId}`)
      .then(response => {
        if (response.data) {
          setEmployee(response.data);  // Set employee data
        } else {
          setError("Employee not found");
        }
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching employee data");
        setLoading(false);
        console.log(error);
      });
  }, [employeeId]);

  // Handle form field changes
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!employee.full_name || !employee.email || !employee.phone_number || !employee.address || !employee.salary || !employee.password) {
      setError("Please fill all fields before submitting");
      return;
    }

    setLoading(true);
    setError(""); // Reset error if any field was invalid

    axios.put('http://localhost/SmartHR-LK/smarthr-backend/api/updateEmployee.php', employee)
      .then(response => {
        alert("Employee updated successfully!");
        navigate("/employee-list");  // Redirect to employee list after saving
      })
      .catch(error => {
        setError("Error updating employee data");
        console.log(error);
        setLoading(false);
      });
  };

  // Conditional rendering: wait until employee data is available
  if (loading) {
    return <CircularProgress />; // Show loading spinner while fetching data
  }

  if (!employee) {
    return <Typography variant="body1" color="error">Employee not found or data is unavailable.</Typography>;
  }

  return (
    <div className="edit-profile-container">
      <Typography variant="h4" gutterBottom>Edit Employee Profile</Typography>

      {/* Display error if there's any */}
      {error && <Typography variant="body1" color="error" style={{ marginBottom: '20px' }}>{error}</Typography>}

      {/* Form to Edit Employee Details */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          name="full_name"
          value={employee.full_name}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phone_number"
          value={employee.phone_number}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="address"
          value={employee.address}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          name="salary"
          value={employee.salary}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          value={employee.password}
          onChange={handleInputChange}
          style={{ marginBottom: '20px' }}
          type="password"
        />

        {/* Show loading spinner while data is being processed */}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Save Changes
          </Button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
