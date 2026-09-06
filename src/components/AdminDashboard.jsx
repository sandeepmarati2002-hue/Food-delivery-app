import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Clock, Shield, ShoppingBag, Utensils, Lock, AlertTriangle, LogOut } from 'lucide-react';
import { RESTAURANTS, MOCK_ORDERS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/apiClient';

export const AdminDashboard = ({ onOpenAdminAuth }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  const [ordersList, setOrdersList] = useState([
    ...MOCK_ORDERS,
    {
      id: 'ORD-88192',
      createdAt: '2026-09-06T17:05:00.000Z',
      restaurantName: 'Burger & Co. Craft House',
      items: [{ name: 'Classic Margherita DOC', quantity: 2, price: 429 }],
      total: 917,
      status: 'Placed',
      customerName: 'Anita Roy'
    },
    {
      id: 'ORD-77410',
      createdAt: '2026-09-06T16:50:00.000Z',
      restaurantName: 'Burger & Co. Craft House',
      items: [{ name: 'Hyderabadi Chicken Dum Biryani', quantity: 1, price: 329 }],
      total: 398,
      status: 'Preparing',
      customerName: 'Vikram Seth'
    }
  ]);

  const [restaurantData, setRestaurantData] = useState(RESTAURANTS[0]);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemVeg, setNewItemVeg] = useState(true);

  // STRICT SECURITY CHECK: User must be logged in AND have ADMIN role
  const isAdmin = user && user.role && user.role.toUpperCase() === 'ADMIN';

  if (!user || !isAdmin) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }} className="animate-fade-in">
        <div style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '40px 28px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255, 165, 2, 0.15)',
            border: '1px solid rgba(255, 165, 2, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <Lock size={32} color="var(--accent-amber)" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
            {user ? 'Admin Privileges Required' : 'Admin Authentication Required'}
          </h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
            {user ? (
              <>
                You are currently signed in as <strong style={{ color: '#FFF' }}>{user.email}</strong> (Role: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>CUSTOMER</span>). Accessing restaurant order boards and menu management requires an <strong>ADMIN</strong> account.
              </>
            ) : (
              'You must be authenticated with valid Admin credentials to access the Restaurant Partner Portal.'
            )}
          </p>

          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-input)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            🔑 <strong>Admin Test Credentials:</strong><br />
            Email: <code>admin@craveexpress.com</code><br />
            Password: <code>123456</code>
          </div>

          <button 
            onClick={onOpenAdminAuth}
            className="btn btn-primary"
            style={{ width: '100%', height: '46px', fontSize: '0.95rem' }}
          >
            <Shield size={18} /> Sign In with Admin Credentials
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      await api.updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.warn('Updated order status locally:', err.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItem = {
      id: 'item-' + Math.floor(Math.random() * 1000),
      name: newItemName,
      price: Number(newItemPrice),
      description: newItemDesc,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      isVeg: newItemVeg,
      rating: 4.8
    };

    setRestaurantData(prev => {
      const updatedMenu = [...prev.menu];
      updatedMenu[0].items.unshift(newItem);
      return { ...prev, menu: updatedMenu };
    });

    try {
      await api.addMenuItem(restaurantData.id, newItem);
    } catch (err) {
      console.warn('Saved menu item locally:', err.message);
    }

    setNewItemName('');
    setNewItemPrice('');
    setNewItemDesc('');
    setShowAddItemModal(false);
  };

  const handleDeleteItem = async (itemId) => {
    setRestaurantData(prev => {
      const updatedMenu = prev.menu.map(cat => ({
        ...cat,
        items: cat.items.filter(i => i.id !== itemId)
      }));
      return { ...prev, menu: updatedMenu };
    });

    try {
      await api.deleteMenuItem(itemId);
    } catch (err) {
      console.warn('Deleted menu item locally:', err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }} className="animate-fade-in">
      
      {/* Admin Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 165, 2, 0.15)',
            border: '1px solid rgba(255, 165, 2, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={24} color="var(--accent-amber)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF' }}>
              Restaurant Partner Portal
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Logged in as <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{user.email}</span> (ADMIN)
            </p>
          </div>
        </div>

        {/* Tab Switcher & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('orders')}
            className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ height: '40px', padding: '0 18px', fontSize: '0.85rem' }}
          >
            <ShoppingBag size={16} /> Live Orders ({ordersList.length})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`btn ${activeTab === 'menu' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ height: '40px', padding: '0 18px', fontSize: '0.85rem' }}
          >
            <Utensils size={16} /> Menu Management
          </button>

          <button 
            onClick={logout} 
            className="btn btn-secondary btn-icon"
            title="Sign Out Admin"
            style={{ color: 'var(--primary)' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '30px'
      }}>
        <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', padding: '18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TODAY'S REVENUE</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>₹12,480</div>
        </div>
        <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', padding: '18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE ORDERS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>{ordersList.filter(o => o.status !== 'Delivered').length}</div>
        </div>
        <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', padding: '18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL MENU ITEMS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginTop: '4px' }}>
            {restaurantData.menu.reduce((sum, cat) => sum + cat.items.length, 0)}
          </div>
        </div>
      </div>

      {/* Content View 1: Orders Management */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Incoming Live Orders</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ordersList.map((order) => (
              <div 
                key={order.id}
                style={{
                  background: 'var(--surface-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFF' }}>{order.id}</span>
                    <span className={`badge ${order.status === 'Placed' ? 'badge-primary' : order.status === 'Preparing' ? 'badge-amber' : 'badge-emerald'}`}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Customer: <span style={{ color: '#FFF', fontWeight: 600 }}>{order.customerName || 'Sandeep Sharma'}</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>₹{order.total}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online Paid</div>
                  </div>

                  {/* Status Action Buttons */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {order.status === 'Placed' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        Accept & Prepare
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'Out for Delivery')}
                        className="badge badge-amber"
                        style={{ padding: '8px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Dispatch Driver
                      </button>
                    )}
                    {order.status === 'Out for Delivery' && (
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                        className="badge badge-emerald"
                        style={{ padding: '8px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content View 2: Menu Management */}
      {activeTab === 'menu' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Manage Restaurant Menu Items</h3>
            <button 
              onClick={() => setShowAddItemModal(true)} 
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> Add New Dish
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {restaurantData.menu.map((cat, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '12px' }}>{cat.categoryName}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cat.items.map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        background: 'var(--surface-card)',
                        borderRadius: 'var(--radius-md)',
                        padding: '14px 18px',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'} 
                          alt={item.name} 
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'; }}
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFF' }}>{item.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>₹{item.price}</div>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="btn btn-secondary btn-icon"
                        style={{ color: 'var(--primary)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
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
            maxWidth: '440px',
            width: '100%',
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>Add Dish to Menu</h3>
            
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dish Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Garlic Cheese Bread"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price (₹)</label>
                <input 
                  type="number" 
                  required
                  placeholder="199"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  style={{ width: '100%', height: '40px', padding: '0 12px', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea 
                  required
                  placeholder="Short description of ingredients..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  style={{ width: '100%', height: '70px', padding: '8px 12px', background: 'var(--surface-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: '#FFF', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddItemModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add to Menu</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
