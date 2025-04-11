import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user information
  const [role, setRole] = useState(null); // Stores user role (patient, admin, doctor)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status
  const navigate = useNavigate();

  // Check authentication and role on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
      setUser({ token, role: userRole });
    } else {
      setIsAuthenticated(false);
      setRole(null);
      setUser(null);
    }
  }, []);

  // Login function
  const login = (token, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
    setUser({ token, role: userRole });

    // Redirect based on role
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (userRole === 'doctor') {
      navigate('/doctor-dashboard');
    } else {
      navigate('/patient-dashboard');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
    navigate('/'); // Redirect to login or home page
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};