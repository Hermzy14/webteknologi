import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import { asyncApiRequest } from "../tools/requests";

const FavoritesContext = createContext();

/**
 * FavoritesProvider component to provide favorite courses context to the application.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // Function to fetch favorite courses when user is authenticated
  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      asyncApiRequest(`/users/${currentUser.username}/favorites`, "GET")
        .then((response) => {
          setFavorites(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          setIsLoading(false);
        });
    } else {
      setFavorites([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  // Function to add a course to favorites
  const addToFavorites = async (courseId) => {
    if (!currentUser) return false;

    try {
      await asyncApiRequest(
        `/users/${currentUser.username}/favorites/${courseId}`,
        "POST"
      );
      setFavorites([...favorites, { courseId }]);
      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      if (error.message.includes("409")) {
        // It's already a favorite, so ensure it's in our local state
        if (!favorites.some((fav) => fav.courseId === courseId)) {
          setFavorites([...favorites, { courseId }]);
        }
      }
      return false;
    }
  };

  // Function to remove a course from favorites
  const removeFromFavorites = async (courseId) => {
    if (!currentUser) return false;

    try {
      await asyncApiRequest(
        `/users/${currentUser.username}/favorites/${courseId}`,
        "DELETE"
      );
      setFavorites(favorites.filter((fav) => fav.courseId !== courseId));
      return true;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return false;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isLoading, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Custom hook to use favorites context.
 */
export function useFavorites() {
  return useContext(FavoritesContext);
}
