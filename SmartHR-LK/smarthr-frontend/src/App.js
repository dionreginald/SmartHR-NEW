import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Import Routes and Route components
import HomePage from "./HomePage";  // Import HomePage component
import LoginPage from "./LoginPage";  // Import LoginPage component
import RegisterPage from "./RegisterPage";  // Import RegisterPage component
import AdminDashboard from "./AdminDashboard";  // Import AdminDashboard component
import ProfilePage from "./ProfilePage";  // Corrected import for ProfilePage component
import EmployeeList from "./EmployeeList";  // Import EmployeeList component
import EditProfile from "./EditProfile";  // Import EditProfile component
import CreateEmployee from "./CreateEmployee";  // Import CreateEmployee component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routes Section */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/edit-profile/:employeeId" element={<EditProfile />} />
          <Route path="/create-employee" element={<CreateEmployee />} /> {/* Add CreateEmployee Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
