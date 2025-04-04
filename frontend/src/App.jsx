import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Patient/Dashboard";
import PatientProfile from "./pages/Patient/PatientProfile"; // Import the PatientProfile component

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // Check for token in localStorage
  return !!token; // Return true if token exists, otherwise false
};

// Protected Route Component for authenticated users
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

// Public Route Component (Hides Home, About, Contact when logged in)
const PublicRoute = ({ element }) => {
  return !isAuthenticated() ? element : <Navigate to="/patient-dashboard" replace />;
};

function App() {
  return (
    <Router>
      <div>
        {!isAuthenticated() && <Navbar />} {/* Hide Navbar when authenticated */}
        <Routes>
          {/* Public Routes (Hidden when authenticated) */}
          <Route path="/" element={<PublicRoute element={<Home />} />} />
          <Route path="/about" element={<PublicRoute element={<About />} />} />
          <Route path="/contact" element={<PublicRoute element={<Contact />} />} />
          
          {/* Protected Routes */}
          <Route path="/patient-dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/patient-dashboard/profile" element={<ProtectedRoute element={<PatientProfile />} />} /> {/* New Route */}

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!isAuthenticated() && <Footer />} {/* Hide Footer when authenticated */}
      </div>
    </Router>
  );
}

export default App;