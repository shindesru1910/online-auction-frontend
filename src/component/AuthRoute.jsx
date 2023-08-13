import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Navigate to="/home" replace /> : <Component />
      }
    />
  );
};

export default AuthRoute;
