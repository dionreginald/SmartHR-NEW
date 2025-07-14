import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import './EditProfile.css';

const EditProfile = () => {
  const { employeeId } = useParams();  // Get employeeId from URL params
  const navigate = useNavigate();  // To navigate to other pages

  // State to hold the employee data
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    salary: ""
  });

  // States for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employee data based on employeeId
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost/SmartHR-LK/smarthr-backend/api/getEmployeeById.php?id=${employeeId}`)
      .then(response => {
        setEmployee(response.data[0]);
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

  // Handle form submit to update employee data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!employee.full_name || !employee.email || !employee.phone_number || !employee.address || !employee.salary) {
      setError("Please fill all fields before submitting");
      return;
    }

    setLoading(true);
    setError(""); // Reset error if any field was invalid

    // Send updated data to backend API
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
