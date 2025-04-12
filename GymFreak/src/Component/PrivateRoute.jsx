import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = true; // Replace this with real authentication logic
  const isAdmin = true; // Replace this with real admin check

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && isAdmin ? <Component /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
