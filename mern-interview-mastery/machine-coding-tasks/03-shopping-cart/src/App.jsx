import { useState, useEffect } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 101, name: 'Nova Keyboard Pro', price: 149.99, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60', description: 'RGB mechanical keyboard with quiet linear switches.' },
  { id: 102, name: 'Aero Wireless Mouse', price: 79.99, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=60', description: 'Lightweight mouse with pixel-perfect optical sensor.' },
  { id: 103, name: 'Iris Studio Monitor', price: 299.99, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=150&auto=format&fit=crop&q=60', description: 'Professional active nearfield studio speaker monitors.' },
  { id: 104, name: 'Helios Noise Cancelling Headphones', price: 199.99, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60', description: 'Over-ear headphones with hybrid active noise cancellation.' }
];

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mern_shopping_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('idle'); // idle | processing | success

  useEffect(() => {
    localStorage.setItem('mern_shopping_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    if (window.confirm('Remove this item from your cart?')) {
      setCart(prev => prev.filter(item => item.id !== id));
    }
  };

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'MERN20') {
      setDiscountPercent(20);
      setAppliedPromo('MERN20');
      setPromoCode('');
    } else if (promoCode.trim().toUpperCase() === 'EXPERT') {
      setDiscountPercent(30);
      setAppliedPromo('EXPERT');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code');
    }
  };

  const removePromo = () => {
    setDiscountPercent(0);
    setAppliedPromo('');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStatus('processing');
    setTimeout(() => {
      setCheckoutStatus('success');
      setCart([]);
      setDiscountPercent(0);
      setAppliedPromo('');
    }, 2000);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingCost = subtotal > 250 || subtotal === 0 ? 0 : 15;
  const total = subtotal - discountAmount + shippingCost;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-container">
      <header className="cart-header">
        <div className="brand">
          <span className="logo-icon">🛒</span>
          <div>
            <h1>CartFlow</h1>
            <p className="subtitle">MERN Level - Premium Shopping Checkout Experience</p>
          </div>
        </div>
        <div className="cart-indicator">
          <span>Cart status:</span>
          <strong className="badge-total">{totalItems} {totalItems === 1 ? 'item' : 'items'}</strong>
        </div>
      </header>

      {checkoutStatus === 'success' ? (
        <div className="success-state card">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your business. Your payment was verified and processed securely.</p>
          <button className="btn btn-primary" onClick={() => setCheckoutStatus('idle')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-grid">
          {/* Products Catalog section */}
          <section className="catalog-section">
            <h2>Featured Products</h2>
            <div className="products-grid">
              {PRODUCTS.map(p => (
                <div key={p.id} className="catalog-card card">
                  <img src={p.imageUrl} alt={p.name} className="catalog-img" />
                  <div className="catalog-info">
                    <span className="catalog-cat">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="catalog-footer">
                      <span className="price">${p.price.toFixed(2)}</span>
                      <button className="btn btn-secondary btn-sm" onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cart Details & Checkout panel */}
          <section className="cart-details-section">
            <h2>Your Shopping Cart</h2>
            
            {cart.length === 0 ? (
              <div className="empty-cart-state card">
                <span className="empty-icon">🛒</span>
                <h3>Your cart is empty</h3>
                <p>Select products from the catalog to add items to your cart.</p>
              </div>
            ) : (
              <div className="cart-layout">
                {/* Cart list */}
                <div className="cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item card">
                      <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <span className="unit-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="quantity-controls">
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <div className="item-total-col">
                        <span className="item-total-val">${(item.price * item.quantity).toFixed(2)}</span>
                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary panel */}
                <div className="cart-summary card">
                  <h3>Order Summary</h3>
                  
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="summary-row promo-discount">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>

                  <hr className="summary-divider" />

                  <div className="summary-row total-row">
                    <span>Total Amount</span>
                    <span className="total-price-val">${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Form */}
                  <form onSubmit={applyPromo} className="promo-form">
                    <input
                      type="text"
                      placeholder="Promo Code (MERN20, EXPERT)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
                  </form>
                  {promoError && <p className="promo-error-msg">{promoError}</p>}
                  {appliedPromo && (
                    <div className="applied-promo-tag">
                      <span>Applied: {appliedPromo} ({discountPercent}% Off)</span>
                      <button type="button" onClick={removePromo}>×</button>
                    </div>
                  )}

                  <button 
                    className="btn btn-primary btn-block checkout-btn" 
                    onClick={handleCheckout}
                    disabled={checkoutStatus === 'processing'}
                  >
                    {checkoutStatus === 'processing' ? 'Processing Transaction...' : `Proceed to Checkout ($${total.toFixed(2)})`}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
