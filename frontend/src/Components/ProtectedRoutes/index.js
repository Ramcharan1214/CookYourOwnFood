import React from 'react';
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  let authenticated = localStorage.getItem("isAuthenticated");
  return authenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute