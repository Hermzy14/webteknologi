import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

// Create context
const AuthContext = createContext(null);

/**
 * AuthProvider component to provide authentication context to the application.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const user = getAuthenticatedUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Logout function
  const logout = () => {
    deleteAuthorizationCookies();
    setCurrentUser(null);
  };

  // Refresh user data (to be called after login)
  const refreshUser = () => {
    const user = getAuthenticatedUser();
    setCurrentUser(user);
  };

  const value = {
    currentUser,
    logout,
    refreshUser,
    isAuthenticated: !!currentUser,
    isAdmin:
      currentUser && currentUser.roles && currentUser.roles.includes("ADMIN"),
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
