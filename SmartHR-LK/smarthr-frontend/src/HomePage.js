import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './HomePage.css';  // Import custom CSS

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true); // Set scrolled to true when scrolled down
    } else {
      setScrolled(false); // Reset when at the top
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage">
      {/* Navbar */}
      <AppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Toolbar>
          {/* SmartHR Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <img src="/images/smarthr-logo.png" alt="SmartHR Logo" style={{ height: '40px' }} />
            </Link>
          </Typography>

          {/* Navbar Links */}
          <div className="navbar-links">
            <Button color="inherit" component={Link} to="#features">Features</Button>
            <Button color="inherit" component={Link} to="#about">About</Button>
            <Button color="inherit" component={Link} to="#contact">Contact</Button>
            <Button color="secondary" variant="contained" component={Link} to="/login" className="cta-btn">
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-text">
          <h1>The Simple HR Solution</h1>
          <p>Say goodbye to messy spreadsheets and paperwork – get the HR tools large companies use, without the big price tag.</p>
          <Button variant="contained" color="primary" component={Link} to="/register" style={{ marginTop: '20px' }}>
            Start Today
          </Button>
        </div>
        <div className="hero-image">
          <img src="/images/hr-image.png" alt="HR" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <Typography variant="h4" gutterBottom>
          Everything Small & Medium Businesses Need to Manage HR
        </Typography>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="/images/employee-records.png" alt="Employee Records" />
            <Typography variant="h6">Employee Records</Typography>
            <p>Store employee contact information, files, reviews, and more in one secure, accessible place.</p>
          </div>
          <div className="feature-card">
            <img src="/images/leave-management.png" alt="Leave Management" />
            <Typography variant="h6">Leave Management</Typography>
            <p>Handle leave requests, accruals, and approvals efficiently. Let your employees track their leave balance in real time.</p>
          </div>
          <div className="feature-card">
            <img src="/images/payroll.png" alt="Payroll Tracking" />
            <Typography variant="h6">Payroll Tracking</Typography>
            <p>Process payroll automatically with employee-specific pay, deductions, and bonuses, all calculated with precision.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 SmartHR.lk. All rights reserved.</p>
        <ul>
          <li><Link href="#">Privacy Policy</Link></li>
          <li><Link href="#">Terms & Conditions</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
