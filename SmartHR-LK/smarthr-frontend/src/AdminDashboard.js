import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, TextField, Menu, MenuItem, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { PersonAdd, ViewList, Payment, CheckCircle, Notifications, Report } from '@mui/icons-material'; // Add icons
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, BarElement, LinearScale } from "chart.js";
import './AdminDashboard.css';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, BarElement, LinearScale);

const AdminDashboard = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [anchorElEmployees, setAnchorElEmployees] = useState(null); // For Employees dropdown
  const [anchorElPayroll, setAnchorElPayroll] = useState(null); // For Payroll dropdown
  const [anchorElLeaveRequests, setAnchorElLeaveRequests] = useState(null); // For Leave Requests dropdown
  const [darkMode, setDarkMode] = useState(false);  // State for dark mode toggle

  // Employee Data (example)
  const employeeData = [
    { id: 1, name: "John Doe", role: "Manager", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Developer", email: "jane@example.com" },
    { id: 3, name: "Jim Brown", role: "Designer", email: "jim@example.com" },
    { id: 4, name: "Sally White", role: "HR", email: "sally@example.com" },
    { id: 5, name: "Mary Johnson", role: "Engineer", email: "mary@example.com" },
    { id: 6, name: "David Lee", role: "Sales", email: "david@example.com" },
  ];

  // Chart data for leave breakdown
  const leaveChartData = {
    labels: ["Sick", "Vacation", "Casual", "Other"],
    datasets: [
      {
        label: "Leave Types",
        data: [40, 25, 20, 15],
        backgroundColor: ["#FF9900", "#4CAF50", "#2196F3", "#F44336"],
      },
    ],
  };

  // Chart data for payroll overview
  const payrollChartData = {
    labels: ["Employee 1", "Employee 2", "Employee 3", "Employee 4"],
    datasets: [
      {
        label: "Payroll Stats",
        data: [4000, 3200, 2800, 3500],
        backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"],
      },
    ],
  };

  // Handle navbar scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  // Handle dropdown menu clicks
  const handleMenuClickEmployees = (event) => {
    setAnchorElEmployees(event.currentTarget);
  };
  const handleMenuClickPayroll = (event) => {
    setAnchorElPayroll(event.currentTarget);
  };
  const handleMenuClickLeaveRequests = (event) => {
    setAnchorElLeaveRequests(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElEmployees(null);
    setAnchorElPayroll(null);
    setAnchorElLeaveRequests(null);
  };

  // Handle Dark Mode Toggle
  const handleDarkModeToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`admin-dashboard-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* Navbar */}
      <AppBar position="sticky" className={scrolled ? "admin-dashboard-navbar-scrolled" : "admin-dashboard-navbar"}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" className="admin-dashboard-navbar-logo-link">
              <img src="/images/smarthr-logo.png" alt="SmartHR Logo" className="admin-dashboard-navbar-logo" />
            </Link>
          </Typography>

          <div className="admin-dashboard-navbar-right">
            {/* Employees Dropdown */}
            <div className="admin-dashboard-navbar-dropdown">
              <Button
                color="inherit"
                className="admin-dashboard-navbar-dropdown-button"
                onClick={handleMenuClickEmployees}
              >
                Employees
              </Button>
              <Menu
                anchorEl={anchorElEmployees}
                open={Boolean(anchorElEmployees)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link to="/employee-list">Employee List</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/create-employee">Create Employee</Link> {/* Link to Create Employee Page */}
                </MenuItem>
                <MenuItem>Employee Reports</MenuItem>
              </Menu>
            </div>

            {/* Payroll Dropdown */}
            <div className="admin-dashboard-navbar-dropdown">
              <Button
                color="inherit"
                className="admin-dashboard-navbar-dropdown-button"
                onClick={handleMenuClickPayroll}
              >
                Payroll
              </Button>
              <Menu
                anchorEl={anchorElPayroll}
                open={Boolean(anchorElPayroll)}
                onClose={handleClose}
              >
                <MenuItem>Generate Payroll</MenuItem>
                <MenuItem>View Payroll</MenuItem>
              </Menu>
            </div>

            {/* Leave Requests Dropdown */}
            <div className="admin-dashboard-navbar-dropdown">
              <Button
                color="inherit"
                className="admin-dashboard-navbar-dropdown-button"
                onClick={handleMenuClickLeaveRequests}
              >
                Leave Requests
              </Button>
              <Menu
                anchorEl={anchorElLeaveRequests}
                open={Boolean(anchorElLeaveRequests)}
                onClose={handleClose}
              >
                <MenuItem>Approve Requests</MenuItem>
                <MenuItem>View Requests</MenuItem>
              </Menu>
            </div>

            {/* Profile */}
            <Button color="inherit" component={Link} to="/profile">Profile</Button>

            {/* Dark Mode Toggle */}
            <Switch checked={darkMode} onChange={handleDarkModeToggle} />
            <Typography variant="body2" sx={{ marginLeft: 1, color: darkMode ? "white" : "black" }}>Dark Mode</Typography>
          </div>
        </Toolbar>
      </AppBar>

      {/* Welcome and Date/Time Section */}
      <section className="admin-dashboard-welcome-section">
        <div className="admin-dashboard-welcome-left">
          <Typography variant="h5">Welcome, Admin</Typography>
        </div>
        <div className="admin-dashboard-welcome-right">
          <Typography variant="body1">{currentTime}</Typography>
          <Typography variant="body1">New York</Typography>
        </div>
      </section>

      {/* Employee Search and Quick Actions */}
      <section className="admin-dashboard-search-and-actions">
        <div className="admin-dashboard-search-container">
          <TextField
            label="Search Employees"
            variant="outlined"
            fullWidth
            onChange={handleSearch}
            className="admin-dashboard-search-input"
            InputProps={{
              startAdornment: <i className="fas fa-search" style={{ marginRight: 10 }}></i>,
            }}
          />
        </div>

        <div className="admin-dashboard-quick-actions">
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<PersonAdd />}>Add Employee</Button>
          </div>
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<ViewList />}>View Employees</Button>
          </div>
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<Payment />}>Payroll</Button>
          </div>
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<CheckCircle />}>Approve Leaves</Button>
          </div>
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<Notifications />}>Send Notification</Button>
          </div>
          <div className="admin-dashboard-quick-action-button">
            <Button variant="contained" color="primary" startIcon={<Report />}>Generate Reports</Button>
          </div>
        </div>
      </section>

      {/* Employees Table Section */}
      <section className="admin-dashboard-employee-table-section">
        <div className="admin-dashboard-employee-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employeeData
                .filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.role}</td>
                    <td>{emp.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Charts Section */}
      <section className="admin-dashboard-charts-container">
        <div className="admin-dashboard-chart-wrapper">
          <Typography variant="h6" className="admin-dashboard-chart-heading">Leave Types Breakdown</Typography>
          <div className="admin-dashboard-chart-box">
            <Pie data={leaveChartData} />
          </div>
        </div>
        <div className="admin-dashboard-chart-wrapper">
          <Typography variant="h6" className="admin-dashboard-chart-heading">Payroll Overview</Typography>
          <div className="admin-dashboard-chart-box">
            <Bar data={payrollChartData} />
          </div>
        </div>
      </section>

      <footer className="admin-dashboard-footer">
        <p>&copy; 2024 SmartHR.lk. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
