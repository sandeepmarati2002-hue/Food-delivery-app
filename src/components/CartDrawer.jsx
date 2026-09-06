import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ isOpen, onClose, onProceedCheckout }) => {
  const { cartItems, activeRestaurant, updateQuantity, removeFromCart, subtotal, deliveryFee, taxes, total, itemCount, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'CRAVE50') {
      setDiscount(50);
      setPromoSuccess('₹50 Promo discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'FIRST100') {
      setDiscount(100);
      setPromoSuccess('₹100 First Order Discount applied!');
    } else {
      setPromoError('Invalid promo code. Try "CRAVE50"');
    }
  };

  const finalTotal = Math.max(0, total - discount);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      zIndex: 150,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        background: 'var(--surface-card)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-card)',
        borderLeft: '1px solid var(--border-subtle)'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag color="var(--primary)" size={22} />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Your Cart</h3>
              {activeRestaurant && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Ordering from <span style={{ color: '#FFF', fontWeight: 600 }}>{activeRestaurant.name}</span>
                </div>
              )}
            </div>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cartItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'} 
                    alt={item.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }}
                    style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{item.name}</h4>
                    {item.restaurantName && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {item.restaurantName}
                      </div>
                    )}
                    {item.selectedAddonsName && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', margin: '2px 0' }}>
                        + {item.selectedAddonsName}
                      </div>
                    )}
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-card)', padding: '4px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFF', minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo Code Input Box */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={14} color="var(--primary)" /> PROMO CODE
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text"
                    placeholder="Enter CRAVE50"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-input)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0 12px',
                      color: '#FFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button onClick={handleApplyPromo} className="btn btn-secondary" style={{ padding: '0 16px', fontSize: '0.85rem', height: '38px' }}>
                    Apply
                  </button>
                </div>
                {promoSuccess && <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>{promoSuccess}</div>}
                {promoError && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px' }}>{promoError}</div>}
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} strokeWidth={1.5} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Add delicious items from top restaurants to get started.</p>
            </div>
          )}
        </div>

        {/* Footer Bill Breakdown & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-card-hover)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Partner Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Government Taxes & Charges (5%)</span>
                <span>₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  <span>Promo Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#FFF',
                paddingTop: '8px',
                borderTop: '1px dashed var(--border-subtle)'
              }}>
                <span>To Pay</span>
                <span style={{ color: 'var(--primary)' }}>₹{finalTotal}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                onClose();
                onProceedCheckout(finalTotal);
              }}
              className="btn btn-primary"
              style={{ width: '100%', height: '48px', fontSize: '1rem', justifyContent: 'space-between' }}
            >
              <span>Proceed to Checkout</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>₹{finalTotal}</span>
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
