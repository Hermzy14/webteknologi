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

  // Checkout: move all cart items to boughtCourses
  const checkout = () => {
    setBoughtCourses((prev) => [...prev, ...cartItems]);
    setCartItems([]);
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
