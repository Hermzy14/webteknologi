import React from 'react';
import "../css/global-styles.css";
import "../css/cart.css";
import { useCart } from "../components/CartContext";

function ShoppingCart() {
  const { cartItems, getCartCount, clearCart, removeFromCart, getCartTotal, checkout } = useCart();

  return (
    <>
      <main>
        <section id="Shopping-cart">
          <h2>Shopping Cart</h2>
          <h3>{getCartCount()} Courses in cart</h3>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h4>Your cart is empty</h4>
              <a href="/explore" className="cart-btn" title="Keep shopping">
                Keep shopping
              </a>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={`/course-images/${item.imagePath}`} 
                      alt={item.title} 
                      className="course-image-cart"
                    />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p className="provider">{item.providerName}</p>
                      <p className="price">{item.price} {item.currency}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <p className="total-price">
                  Total: {getCartTotal()} {cartItems[0]?.currency}
                </p>
                <div className="cart-buttons">
                <button 
                  className="clear-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

                <button
                  className="checkout-btn"
                  onClick = {checkout}
                  >
                  Checkout
                </button>
                </div>
                
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;