import React, { useState } from 'react';
import { X, MapPin, CreditCard, Smartphone, Banknote, CheckCircle2, ArrowRight, AlertCircle, Pencil, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../api/apiClient';

export const CheckoutModal = ({ isOpen, onClose, finalTotal, onOrderPlaced }) => {
  const { activeRestaurant, cartItems, clearCart, subtotal, deliveryFee, taxes, total } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Editable addresses state
  const [addresses, setAddresses] = useState({
    Home: 'Flat 402, Sunshine Heights, HSR Layout, Bengaluru',
    Office: 'Tech Park Tower B, Outer Ring Road, Bengaluru',
  });
  const [editingAddress, setEditingAddress] = useState(null); // 'Home' | 'Office' | null
  const [editDraft, setEditDraft] = useState('');

  if (!isOpen) return null;

  const startEdit = (label, e) => {
    e.stopPropagation();
    setEditingAddress(label);
    setEditDraft(addresses[label]);
  };

  const saveEdit = (label, e) => {
    e.stopPropagation();
    setAddresses((prev) => ({ ...prev, [label]: editDraft.trim() || prev[label] }));
    setEditingAddress(null);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    const deliveryAddress = addresses[selectedAddress];

    const paymentMethod =
      selectedPayment === 'upi' ? 'UPI (GPay / PhonePe)'
      : selectedPayment === 'card' ? 'Credit/Debit Card'
      : 'Cash on Delivery';

    try {
      const createdOrder = await api.createOrder({
        restaurantId: activeRestaurant?.id || cartItems[0]?.restaurantId,
        items: cartItems.map((i) => ({ id: i.id, quantity: i.quantity, price: i.price, name: i.name })),
        subtotal,
        deliveryFee,
        taxes,
        total,
        deliveryAddress,
        paymentMethod,
      });

      clearCart();
      setIsSubmitting(false);
      onClose();
      onOrderPlaced(createdOrder);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to place order. Please try again.');
    }
  };

  const addressCards = [
    { label: 'Home', emoji: '🏠' },
    { label: 'Office', emoji: '💼' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{
        maxWidth: '520px',
        width: '100%',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>Checkout & Pay</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete your order from {activeRestaurant?.name}</div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255,71,87,0.12)',
            border: '1px solid rgba(255,71,87,0.3)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {/* Delivery Address Selection */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="var(--primary)" /> 1. DELIVERY ADDRESS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {addressCards.map(({ label, emoji }) => {
              const isSelected = selectedAddress === label;
              const isEditing = editingAddress === label;

              return (
                <div
                  key={label}
                  onClick={() => !isEditing && setSelectedAddress(label)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(255, 71, 87, 0.12)' : 'var(--surface-input)',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                    cursor: isEditing ? 'default' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {/* Label row */}
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{emoji} {label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isSelected && !isEditing && <CheckCircle2 size={16} color="var(--primary)" />}
                      {/* Edit / Save button */}
                      {isEditing ? (
                        <button
                          onClick={(e) => saveEdit(label, e)}
                          style={{
                            background: 'var(--primary)',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#FFF',
                            cursor: 'pointer',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={12} /> Save
                        </button>
                      ) : (
                        <button
                          onClick={(e) => startEdit(label, e)}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '3px 8px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                        >
                          <Pencil size={11} /> Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Address display or edit input */}
                  {isEditing ? (
                    <input
                      autoFocus
                      value={editDraft}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditDraft(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(label, e); if (e.key === 'Escape') setEditingAddress(null); }}
                      style={{
                        marginTop: '8px',
                        width: '100%',
                        background: 'var(--surface-card)',
                        border: '1px solid var(--primary)',
                        borderRadius: '6px',
                        color: '#FFF',
                        fontSize: '0.82rem',
                        padding: '7px 10px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Enter delivery address..."
                    />
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {addresses[label]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CreditCard size={16} color="var(--primary)" /> 2. PAYMENT METHOD
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div 
              onClick={() => setSelectedPayment('upi')}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                background: selectedPayment === 'upi' ? 'rgba(255, 71, 87, 0.15)' : 'var(--surface-input)',
                border: selectedPayment === 'upi' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <Smartphone size={20} color={selectedPayment === 'upi' ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>UPI / GPay</div>
            </div>

            <div 
              onClick={() => setSelectedPayment('card')}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                background: selectedPayment === 'card' ? 'rgba(255, 71, 87, 0.15)' : 'var(--surface-input)',
                border: selectedPayment === 'card' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <CreditCard size={20} color={selectedPayment === 'card' ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>Card</div>
            </div>

            <div 
              onClick={() => setSelectedPayment('cod')}
              style={{
                padding: '12px 8px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                background: selectedPayment === 'cod' ? 'rgba(255, 71, 87, 0.15)' : 'var(--surface-input)',
                border: selectedPayment === 'cod' ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <Banknote size={20} color={selectedPayment === 'cod' ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px auto' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>Cash</div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ marginBottom: '20px', padding: '14px', background: 'var(--surface-input)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Subtotal</span><span>₹{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Delivery Fee</span><span>₹{deliveryFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <span>GST (5%)</span><span>₹{taxes}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#FFF', fontSize: '1rem', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
            <span>Total</span><span style={{ color: 'var(--primary)' }}>₹{total}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{ width: '100%', height: '48px', fontSize: '1rem' }}
        >
          {isSubmitting ? (
            <span>Processing Order...</span>
          ) : (
            <>
              <span>Pay & Place Order • ₹{total}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

      </div>
    </div>
  );
};
