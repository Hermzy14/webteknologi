import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "../tools/cookies";
import { asyncApiRequest } from "../tools/requests";

// Create the cart context
const CartContext = createContext(null);

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Cart provider component
export function CartProvider({ children }) {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Load bought courses from localStorage
  const [boughtCourses, setBoughtCourses] = useState(() => {
    try {
      const savedBought = localStorage.getItem("boughtCourses");
      return savedBought ? JSON.parse(savedBought) : [];
    } catch (error) {
      console.error("Error loading bought courses from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Save bought courses to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("boughtCourses", JSON.stringify(boughtCourses));
    } catch (error) {
      console.error("Error saving bought courses to localStorage:", error);
    }
  }, [boughtCourses]);

  // Add item to cart
  const addToCart = (course, provider) => {
    if (!course || !provider) {
      console.error("Missing course or provider information");
      return;
    }

    const finalPrice =
      provider.discount > 0
        ? Math.round(provider.price * (1 - provider.discount / 100))
        : provider.price;

    const newItem = {
      id: Date.now().toString(),
      courseId: course.id,
      providerId: provider.id,
      title: course.title,
      price: finalPrice,
      currency: provider.currency,
      providerName: provider.name,
      imagePath: course.imagePath || "default-image.jpg",
      discount: provider.discount || 0,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Checkout: process cart items and create orders in database
  const checkout = async () => {
    try {
      // Check if cart is empty
      if (cartItems.length === 0) {
        return { success: false, message: "Cart is empty" };
      }

      // Check if user is logged in
      const jwt = getCookie("jwt");
      if (!jwt) {
        return {
          success: false,
          message: "Please log in to complete your purchase",
        };
      }

      // Get username from AuthContext or cookies
      const username = getCookie("current_username");
      if (!username) {
        return {
          success: false,
          message: "User information not found",
        };
      }

      // Process each cart item as a separate order
      const orderPromises = cartItems.map(async (item) => {
        // Create order object to match backend entity
        console.log("Creating order for item:", item);
        const order = {
          orderDate: new Date().toISOString().split("T")[0],
          price: item.price,
          discount: item.discount || 0,
          course: {
            id: item.courseId,
          },
          // Don't send user - backend will determine from JWT
        };

        // Send order to backend
        return await asyncApiRequest(`/orders/${username}`, "POST", order);
      });

      // Wait for all orders to complete
      const results = await Promise.all(orderPromises);

      // Check if all orders were successful
      const allSuccessful = results.every((result) => result);

      if (allSuccessful) {
        setBoughtCourses((prev) => [...prev, ...cartItems]);
        setCartItems([]);
        return { success: true, message: "Orders placed successfully" };
      } else {
        throw new Error("Some orders failed to process");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      return {
        success: false,
        message: error.message || "Failed to process your order",
      };
    }
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Get item count
  const getCartCount = () => {
    return cartItems.length;
  };

  const value = {
    cartItems,
    boughtCourses,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
