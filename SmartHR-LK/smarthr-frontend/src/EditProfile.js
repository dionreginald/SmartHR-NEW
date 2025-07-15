import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import './EditProfile.css';

const EditProfile = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    salary: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost/SmartHR-LK/smarthr-backend/api/getEmployeeById.php?id=${employeeId}`)
      .then(response => {
        console.log("Fetched employee:", response.data);
        
        // Check if response data is structured as expected
        if (response.data && typeof response.data === "object") {
          if (response.data.status === "success" && response.data.employee) {
            setEmployee(response.data.employee);
          } else {
            setError(response.data.message || "Employee not found");
          }
        } else {
          setError("Invalid response from server.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Error fetching employee data");
        setLoading(false);
      });
  }, [employeeId]);

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { full_name, email, phone_number, address, salary, password } = employee;

    if (!full_name || !email || !phone_number || !address || !salary || !password) {
      setError("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    axios.put('http://localhost/SmartHR-LK/smarthr-backend/api/updateEmployee.php', employee)
      .then(response => {
        if (response.data.status === 'success') {
          alert("Employee updated successfully!");
          navigate("/employee-list");
        } else {
          setError(response.data.message || "Update failed.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Update error:", err);
        setError("Error updating employee data");
        setLoading(false);
      });
  };

  return (
    <div className="edit-profile-container">
      <Typography variant="h4" gutterBottom>Edit Employee Profile</Typography>

      {error && <Typography variant="body1" color="error" style={{ marginBottom: '20px' }}>{error}</Typography>}

      {loading && !employee.full_name ? (
        <CircularProgress />
      ) : (
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
            type="tel"
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
            type="number"
            value={employee.salary}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={employee.password}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />

          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Save Changes
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditProfile;
