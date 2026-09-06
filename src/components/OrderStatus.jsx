import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Package, ShieldCheck, Truck, Utensils, Star, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../api/apiClient';

const STATUS_STEPS = ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

const STATUS_ICONS = {
  'Placed': CheckCircle2,
  'Preparing': Utensils,
  'Out for Delivery': Truck,
  'Delivered': ShieldCheck,
};

const STATUS_COLOR = {
  'Placed': 'var(--accent-amber)',
  'Preparing': '#60A5FA',
  'Out for Delivery': 'var(--primary)',
  'Delivered': '#34D399',
};

function LiveTracker({ order }) {
  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div style={{
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-active)',
      padding: '24px',
      marginBottom: '30px',
      boxShadow: 'var(--shadow-glow)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="badge badge-amber" style={{ margin: '0 auto 8px auto', display: 'inline-flex' }}>
          <Clock size={14} /> LIVE TRACKING
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
          {order.status === 'Delivered' ? '🎉 Order Delivered!' : `Arriving in ~20 mins`}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Order <span style={{ color: '#FFF', fontWeight: 700 }}>#{order.id.slice(-8).toUpperCase()}</span>
          {' • '}{order.restaurant?.name || 'Restaurant'}
        </p>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {STATUS_STEPS.map((step, idx) => {
          const Icon = STATUS_ICONS[step];
          const isDone = idx <= stepIndex;
          const isCurrent = idx === stepIndex;
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: isDone ? 'linear-gradient(135deg, #FF4757, #E8334A)' : 'var(--surface-input)',
                border: isCurrent ? '2px solid #FFF' : '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isDone ? 'var(--shadow-glow)' : 'none'
              }}>
                <Icon size={18} color={isDone ? '#FFF' : 'var(--text-muted)'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: isDone ? '#FFF' : 'var(--text-muted)', fontSize: '0.95rem' }}>{step}</div>
              </div>
              {isCurrent && (
                <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>In Progress</span>
              )}
              {idx < stepIndex && (
                <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>✓ Done</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Items Summary */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--border-subtle)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
          {(order.orderItems || order.items || []).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>{item.quantity}× {item.menuItem?.name || item.name}</span>
              <span style={{ color: '#FFF', fontWeight: 600 }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#FFF', fontSize: '1rem' }}>
          <span>Total Paid</span>
          <span style={{ color: 'var(--primary)' }}>₹{order.total}</span>
        </div>
      </div>
    </div>
  );
}

function OrderHistoryCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = STATUS_COLOR[order.status] || 'var(--text-muted)';

  return (
    <div style={{
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding: '18px',
      marginBottom: '14px',
      cursor: 'pointer',
      transition: 'var(--transition)'
    }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '1rem' }}>
            {order.restaurant?.name || 'Restaurant'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Order #{order.id.slice(-8).toUpperCase()} • {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.05rem' }}>₹{order.total}</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: statusColor, marginTop: '2px' }}>
            ● {order.status}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px dashed var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(order.orderItems || []).map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>{item.quantity}× {item.menuItem?.name || 'Item'}</span>
                <span style={{ color: '#FFF' }}>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={12} /> {order.deliveryAddress}
          </div>
        </div>
      )}
    </div>
  );
}

export const OrderStatus = ({ activeOrder }) => {
  const [orders, setOrders] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const fetchOrders = async () => {
    setFetchLoading(true);
    setFetchError('');
    try {
      const data = await api.getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError('Could not load orders. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeOrder]); // Re-fetch whenever a new order is placed

  // The most recent non-delivered order is the "live" one
  const liveOrder = orders.find(o => o.status !== 'Delivered') || null;
  const pastOrders = orders.filter(o => o !== liveOrder);

  return (
    <div style={{ maxWidth: '760px', margin: '40px auto', padding: '0 24px' }} className="animate-fade-in">

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF' }}>
            <Package size={24} style={{ marginRight: '10px', verticalAlign: 'middle', color: 'var(--primary)' }} />
            My Orders
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Your personal order history
          </p>
        </div>
        <button onClick={fetchOrders} className="btn btn-secondary" style={{ height: '38px', padding: '0 14px', fontSize: '0.85rem' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Loading State */}
      {fetchLoading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏳</div>
          <p>Loading your orders...</p>
        </div>
      )}

      {/* Error State */}
      {!fetchLoading && fetchError && (
        <div style={{
          padding: '16px', borderRadius: 'var(--radius-md)',
          background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)',
          color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'
        }}>
          <AlertCircle size={18} /> {fetchError}
        </div>
      )}

      {/* No orders */}
      {!fetchLoading && !fetchError && orders.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍽️</div>
          <h3 style={{ color: '#FFF', fontWeight: 700, marginBottom: '8px' }}>No orders yet!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Explore restaurants and place your first order.
          </p>
        </div>
      )}

      {/* Live Tracker for most recent active order */}
      {!fetchLoading && liveOrder && (
        <>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
            🔴 ACTIVE ORDER
          </div>
          <LiveTracker order={liveOrder} />
        </>
      )}

      {/* Past Orders History */}
      {!fetchLoading && pastOrders.length > 0 && (
        <>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
            📋 ORDER HISTORY ({pastOrders.length})
          </div>
          {pastOrders.map(order => (
            <OrderHistoryCard key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
};
