import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './CreateEmployee.css';

const CreateEmployee = () => {
  const navigate = useNavigate();

  // State to hold employee data
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    salary: "",
    password: "" // Password field to create new employee
  });

  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to track error messages

  // Handle form field changes
  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit (POST request to create employee)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!employee.full_name || !employee.email || !employee.phone_number || !employee.address || !employee.salary || !employee.password) {
      setError("Please fill all fields before submitting");
      return;
    }

    setLoading(true);
    setError(""); // Reset error if any field was invalid

    // Send POST request to create employee
    axios
      .post("http://localhost/SmartHR-LK/smarthr-backend/api/createEmployee.php", employee, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Employee created successfully!");
          navigate("/employee-list"); // Redirect to employee list after creating
        } else {
          setError(response.data.message); // Show specific error message
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error creating employee data");
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="create-employee-container">
      <Typography variant="h4" gutterBottom>Create New Employee</Typography>

      {/* Display error if there's any */}
      {error && (
        <Typography variant="body1" color="error" style={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {/* Form to Create New Employee */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          name="full_name"
          value={employee.full_name}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phone_number"
          value={employee.phone_number}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="address"
          value={employee.address}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          name="salary"
          value={employee.salary}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          value={employee.password}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
          type="password"
        />

        {/* Show loading spinner while data is being processed */}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Create Employee
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreateEmployee;
