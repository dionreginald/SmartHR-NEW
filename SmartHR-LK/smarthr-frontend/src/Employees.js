import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './Employees.css';  // Your custom styles for the Employees page

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]); // List of employees
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Call API to fetch employees based on search query (for now, it's just a mock)
    setTimeout(() => {
      setEmployees([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="employees-container">
      <div className="employees-header">
        <Typography variant="h4">Employee Management</Typography>
        <div className="search-bar">
          <TextField
            label="Search Employees"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
        </div>
      </div>

      {/* Employee List */}
      <div className="employees-list">
        {isLoading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          employees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <Typography variant="h6">{employee.name}</Typography>
              <Typography variant="body2">{employee.email}</Typography>
              <Typography variant="body2">{employee.phone}</Typography>
              <Button component={Link} to={`/employees/${employee.id}`} variant="outlined" color="primary">
                View Profile
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Add Employee Button */}
      <div className="add-employee">
        <Button component={Link} to="/employees/add" variant="contained" color="primary">
          Add New Employee
        </Button>
      </div>
    </div>
  );
};

export default Employees;
