import React from 'react';
import "../css/global-styles.css";
import "../css/cart.css";

function ShoppingCart() {
  // This would typically come from your state management (like Redux or Context)
  const cartItemCount = 0; // Replace with actual cart count from your state

  return (
    <>
      {/* Main content */}
      <main>
        {/* Empty shopping cart */}
        <section id="Shopping-cart">
          <h2>Shopping Cart</h2>
          <h3>{cartItemCount} Courses in cart</h3>
          <div className="empty-cart">
            <h4>Your cart is empty</h4>
            <a href="/explore" className="cart-btn" title="Keep shopping">
              Keep shopping
            </a>
          </div>
        </section>

        {/* Cart - This would be conditionally rendered when there are items */}
        <div className="Box">
          <div className="Item">
            <div className="Image"></div>
            <div className="Description"></div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;