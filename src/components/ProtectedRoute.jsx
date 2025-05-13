import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * ProtectedRoute component to protect routes based on authentication and role.
 *
 * @returns {JSX.Element} The rendered component
 */
export function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
