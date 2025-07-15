import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    salary: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in employee) {
      if (employee[key] === "") {
        setError("Please fill all fields before submitting.");
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    axios
      .post("http://localhost/SmartHR-LK/smarthr-backend/api/createEmployee.php", employee, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setSuccess("Employee created successfully!");
          setTimeout(() => navigate("/employee-list"), 2000);
        } else {
          setError(response.data.message || "An unknown error occurred.");
        }
      })
      .catch((err) => {
        setError("Error creating employee. Please check your connection.");
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Create New Employee
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          required
          name="full_name"
          value={employee.full_name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          name="email"
          value={employee.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          required
          name="phone_number"
          value={employee.phone_number}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          required
          name="address"
          value={employee.address}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Salary"
          variant="outlined"
          fullWidth
          required
          name="salary"
          type="number"
          value={employee.salary}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          name="password"
          type="password"
          value={employee.password}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        {success && <Typography color="success.main">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" size="large">
              Create Employee
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateEmployee;
