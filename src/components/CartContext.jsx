import { createContext, useContext, useState, useEffect } from "react";

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
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (course, provider) => {
    if (!course || !provider) {
      console.error("Missing course or provider information");
      return;
    }

    // Calculate price with discount
    const finalPrice =
      provider.discount > 0
        ? provider.price * (1 - provider.discount / 100)
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
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price of items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Get number of items in cart
  const getCartCount = () => {
    return cartItems.length;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
