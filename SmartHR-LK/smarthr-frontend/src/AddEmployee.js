import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import './AddEmployee.css';  // Your custom styles for the Add Employee page

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we're just logging the data, but you should send this to your backend API
    console.log({ name, email, phone });
    history.push('/employees');  // Redirect back to employees list after submission
  };

  return (
    <div className="add-employee-container">
      <Typography variant="h4">Add New Employee</Typography>
      <form onSubmit={handleSubmit} className="add-employee-form">
        <TextField
          label="Full Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
