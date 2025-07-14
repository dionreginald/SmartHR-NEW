import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Switch, TextField, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate for the back button
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [anchorElEmployees, setAnchorElEmployees] = useState(null);
  const [anchorElPayroll, setAnchorElPayroll] = useState(null);
  const [anchorElLeaveRequests, setAnchorElLeaveRequests] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();  // useNavigate for the back button

  useEffect(() => {
    axios.get('http://localhost/SmartHR-LK/smarthr-backend/api/getEmployees.php')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleBackButtonClick = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  const handleEditProfile = (employeeId) => {
    navigate(`/edit-profile/${employeeId}`);  // Navigate to the edit profile page (you need to create it)
  };

  const handleMenuClickEmployees = (event) => setAnchorElEmployees(event.currentTarget);
  const handleMenuClickPayroll = (event) => setAnchorElPayroll(event.currentTarget);
  const handleMenuClickLeaveRequests = (event) => setAnchorElLeaveRequests(event.currentTarget);
  const handleCloseMenus = () => {
    setAnchorElEmployees(null);
    setAnchorElPayroll(null);
    setAnchorElLeaveRequests(null);
  };

  const handleDarkModeToggle = () => setDarkMode(prevMode => !prevMode);

  return (
    <div className={`employee-list-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Navbar */}
      <AppBar position="sticky" className={scrolled ? "navbar-scrolled" : "navbar"}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className="navbar-logo-link">
              <img src="/images/smarthr-logo.png" alt="SmartHR Logo" className="navbar-logo" />
            </Link>
          </Typography>

          <div className="navbar-right">
            {/* Employees Dropdown */}
            <div className="navbar-dropdown">
              <Button
                color="inherit"
                className="navbar-dropdown-button"
                onClick={handleMenuClickEmployees}
              >
                Employees
              </Button>
              <Menu
                anchorEl={anchorElEmployees}
                open={Boolean(anchorElEmployees)}
                onClose={handleCloseMenus}
              >
                <MenuItem>
                  <Link to="/employee-list">Employee List</Link> {/* Link added here */}
                </MenuItem>
                <MenuItem>Create Employee</MenuItem>
                <MenuItem>Employee Reports</MenuItem>
              </Menu>
            </div>

            {/* Payroll Dropdown */}
            <div className="navbar-dropdown">
              <Button
                color="inherit"
                className="navbar-dropdown-button"
                onClick={handleMenuClickPayroll}
              >
                Payroll
              </Button>
              <Menu
                anchorEl={anchorElPayroll}
                open={Boolean(anchorElPayroll)}
                onClose={handleCloseMenus}
              >
                <MenuItem>Generate Payroll</MenuItem>
                <MenuItem>View Payroll</MenuItem>
              </Menu>
            </div>

            {/* Leave Requests Dropdown */}
            <div className="navbar-dropdown">
              <Button
                color="inherit"
                className="navbar-dropdown-button"
                onClick={handleMenuClickLeaveRequests}
              >
                Leave Requests
              </Button>
              <Menu
                anchorEl={anchorElLeaveRequests}
                open={Boolean(anchorElLeaveRequests)}
                onClose={handleCloseMenus}
              >
                <MenuItem>Approve Requests</MenuItem>
                <MenuItem>View Requests</MenuItem>
              </Menu>
            </div>

            {/* Dark Mode Toggle */}
            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
            <Typography variant="body2" sx={{ marginLeft: 1, color: darkMode ? 'white' : 'black' }}>
              Dark Mode
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      {/* Employee List Section */}
      <section className="employee-list-section">
        <div className="employee-list-search-container">
          <TextField
            label="Search Employees"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
            value={searchTerm}
            style={{ marginBottom: '20px' }}
          />
        </div>

        {/* Employee Table */}
        <div className="employee-list-table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees
                .filter(employee =>
                  employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  employee.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.full_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone_number}</td>
                    <td>
                      <Button variant="contained" color="primary" onClick={() => handleOpen(employee)}>
                        View Profile
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEditProfile(employee.id)}
                        style={{ marginLeft: '10px' }}
                      >
                        Edit Profile
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal to View Employee Details */}
      <Modal open={open} onClose={handleClose}>
        <div className="modal-content">
          <Typography variant="h6">{selectedEmployee?.full_name}</Typography>
          <Typography variant="body1">Email: {selectedEmployee?.email}</Typography>
          <Typography variant="body1">Phone: {selectedEmployee?.phone_number}</Typography>
          <Typography variant="body1">Address: {selectedEmployee?.address}</Typography>
          <Typography variant="body1">Salary: {selectedEmployee?.salary}</Typography>
          <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SmartHR.lk. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EmployeeList;
