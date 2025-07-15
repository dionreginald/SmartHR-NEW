// AdminNavbar.jsx
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { PersonAdd, ViewList, Payment, CheckCircle, Notifications, Report } from '@mui/icons-material';

const AdminNavbar = ({ darkMode, setDarkMode }) => {
  const [anchorElEmployees, setAnchorElEmployees] = useState(null);
  const [anchorElPayroll, setAnchorElPayroll] = useState(null);
  const [anchorElLeaveRequests, setAnchorElLeaveRequests] = useState(null);

  const handleMenuClickEmployees = (event) => setAnchorElEmployees(event.currentTarget);
  const handleMenuClickPayroll = (event) => setAnchorElPayroll(event.currentTarget);
  const handleMenuClickLeaveRequests = (event) => setAnchorElLeaveRequests(event.currentTarget);
  const handleClose = () => {
    setAnchorElEmployees(null);
    setAnchorElPayroll(null);
    setAnchorElLeaveRequests(null);
  };

  const handleDarkModeToggle = () => setDarkMode(!darkMode);

  return (
    <AppBar position="sticky" className={darkMode ? "admin-dashboard-navbar admin-dashboard-navbar-dark" : "admin-dashboard-navbar"}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" className="admin-dashboard-navbar-logo-link">
            <img src="/images/smarthr-logo.png" alt="SmartHR Logo" className="admin-dashboard-navbar-logo" />
          </Link>
        </Typography>

        <div className="admin-dashboard-navbar-right">
          <div className="admin-dashboard-navbar-dropdown">
            <Button color="inherit" className="admin-dashboard-navbar-dropdown-button" onClick={handleMenuClickEmployees}>
              Employees
            </Button>
            <Menu anchorEl={anchorElEmployees} open={Boolean(anchorElEmployees)} onClose={handleClose}>
              <MenuItem><Link to="/employee-list">Employee List</Link></MenuItem>
              <MenuItem><Link to="/create-employee">Create Employee</Link></MenuItem>
              <MenuItem>Employee Reports</MenuItem>
            </Menu>
          </div>

          <div className="admin-dashboard-navbar-dropdown">
            <Button color="inherit" className="admin-dashboard-navbar-dropdown-button" onClick={handleMenuClickPayroll}>
              Payroll
            </Button>
            <Menu anchorEl={anchorElPayroll} open={Boolean(anchorElPayroll)} onClose={handleClose}>
              <MenuItem>Generate Payroll</MenuItem>
              <MenuItem>View Payroll</MenuItem>
            </Menu>
          </div>

          <div className="admin-dashboard-navbar-dropdown">
            <Button color="inherit" className="admin-dashboard-navbar-dropdown-button" onClick={handleMenuClickLeaveRequests}>
              Leave Requests
            </Button>
            <Menu anchorEl={anchorElLeaveRequests} open={Boolean(anchorElLeaveRequests)} onClose={handleClose}>
              <MenuItem>Approve Requests</MenuItem>
              <MenuItem>View Requests</MenuItem>
            </Menu>
          </div>

          <Button color="inherit" component={Link} to="/profile">Profile</Button>

          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
          <Typography variant="body2" sx={{ marginLeft: 1, color: darkMode ? "white" : "black" }}>Dark Mode</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
