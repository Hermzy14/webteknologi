import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext();

/**
 * Custom hook to use the CartContext.
 * This hook provides access to the cart context value.
 * It should be used within a CartProvider component.
 * @returns {object} The context value.
 */
export function useCart() {
  return useContext(CartContext);
}

/**
 * CartProvider component to provide cart context to its children.
 * It manages the cart state and provides functions to manipulate the cart.
 * @param {object} children - The child components that will have access to the cart context.
 * @returns {JSX.Element} The CartProvider component.
 */
export function CartProvider({ children }) {
  // Load cart from local storage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    // Parse the saved cart from local storage or return an empty array if not found
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add a course to the cart.
   * @param {object} course - The course to add to the cart.
   * @param {object} provider - The provider of the course.
   */
  function addToCart(course, provider) {
    // Set the selected provider, if not provided, use the first provider from the course
    const selectedProvider =
      provider || (course.providers && course.providers[0]);
    if (!selectedProvider) {
      console.error("No provider found for the course.");
      return;
    }

    // Set cart items
    setCartItems((prevItems) => {
      // Check if the course is already in the cart
      const existingItem = prevItems.find(
        (item) =>
          item.course.id === course.id &&
          item.provider.id === selectedProvider.id
      );
      // If it exists, just return the existing items
      if (existingItem) {
        return prevItems;
      } else {
        // If it doesn't exist, add the new item to the cart
        return [...prevItems, { course, provider: selectedProvider }];
      }
    });
  }

  /**
   * Get the cart item count.
   * @returns {number} The number of items in the cart.
   */
  function getCartItemCount() {
    return cartItems.length;
  }

  const value = {
    cartItems,
    addToCart,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
