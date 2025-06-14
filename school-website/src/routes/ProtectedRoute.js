import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can show a global loader here, or a simple text
    return <div>Loading authentication state...</div>;
  }

  if (!user) {
    // Redirect them to the /admin/login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the admin dashboard.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If using <Outlet /> for nested routes within the ProtectedRoute in AppRouter:
  // return children ? children : <Outlet />;
  // For wrapping a component directly as in <ProtectedRoute><AdminLayout /></ProtectedRoute>
  return children;
};

export default ProtectedRoute;
