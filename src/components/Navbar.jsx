import React, { useState } from 'react';
import { ShoppingBag, MapPin, Search, User, Utensils, Shield, ChevronDown, LogOut, CheckCircle2, Pencil, Check, X as XIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenCart, onOpenAuth, onOpenAdminAuth, currentTab, setCurrentTab, selectedCategory, onSelectCategory, searchQuery, setSearchQuery, onOpenOrdersAuth }) => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [addresses, setAddresses] = useState({
    Home: 'Flat 402, Sunshine Heights, HSR Layout',
    Office: 'Tech Park Tower B, Outer Ring Road',
  });
  const [editingNavAddress, setEditingNavAddress] = useState(null);
  const [navEditDraft, setNavEditDraft] = useState('');

  const isAdmin = user && user.role && user.role.toUpperCase() === 'ADMIN';

  return (
    <header className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setCurrentTab('home');
            if (onSelectCategory) onSelectCategory('all');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF4757, #FF6B81)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Utensils color="#FFF" size={20} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              Crave<span style={{ color: 'var(--primary)' }}>Express</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
              Instant Delivery
            </div>
          </div>
        </div>

        {/* Deliver To Address Picker */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button 
            onClick={() => setShowAddressDropdown(!showAddressDropdown)}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem', height: '38px', whiteSpace: 'nowrap' }}
          >
            <MapPin size={15} color="var(--primary)" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1 }}>Deliver to</div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                HSR Layout <ChevronDown size={12} />
              </div>
            </div>
          </button>

          {showAddressDropdown && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '44px',
              left: 0,
              width: '280px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-card)',
              zIndex: 20
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-secondary)' }}>
                SAVED ADDRESSES
              </div>

              {[{ label: 'Home', emoji: '🏠', bg: 'var(--surface-card-hover)' }, { label: 'Office', emoji: '💼', bg: 'transparent' }].map(({ label, emoji, bg }) => (
                <div key={label} style={{ marginBottom: '8px' }}>
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: bg,
                  }}>
                    {/* Label + Edit/Save button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#FFF' }}>{emoji} {label}</div>
                      {editingNavAddress === label ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); setAddresses(prev => ({ ...prev, [label]: navEditDraft.trim() || prev[label] })); setEditingNavAddress(null); }}
                            style={{ background: 'var(--primary)', border: 'none', borderRadius: '5px', color: '#FFF', cursor: 'pointer', padding: '2px 7px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}
                          ><Check size={10} /> Save</button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditingNavAddress(null); }}
                            style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '5px', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 6px', fontSize: '0.7rem', display: 'flex', alignItems: 'center' }}
                          ><XIcon size={10} /></button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingNavAddress(label); setNavEditDraft(addresses[label]); }}
                          style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '5px', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px 7px', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
                        ><Pencil size={10} /> Edit</button>
                      )}
                    </div>

                    {/* Address text or input */}
                    {editingNavAddress === label ? (
                      <input
                        autoFocus
                        value={navEditDraft}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNavEditDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { setAddresses(prev => ({ ...prev, [label]: navEditDraft.trim() || prev[label] })); setEditingNavAddress(null); }
                          if (e.key === 'Escape') setEditingNavAddress(null);
                        }}
                        style={{ width: '100%', background: 'var(--surface-card)', border: '1px solid var(--primary)', borderRadius: '5px', color: '#FFF', fontSize: '0.75rem', padding: '5px 8px', outline: 'none', boxSizing: 'border-box', marginTop: '4px' }}
                        placeholder="Enter address..."
                      />
                    ) : (
                      <div
                        onClick={() => setShowAddressDropdown(false)}
                        style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >{addresses[label]}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: 1, minWidth: '150px', maxWidth: '360px', position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search food, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '36px',
              paddingRight: '12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--surface-input)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'var(--transition)'
            }}
          />
        </div>

        {/* Actions (Navigation, Cart, Auth & Admin Switch) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          <button 
            onClick={() => {
              setCurrentTab('home');
              if (onSelectCategory) onSelectCategory('all');
            }}
            className={`btn ${currentTab === 'home' ? 'btn-secondary' : ''}`}
            style={{
              background: currentTab === 'home' ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: 'none',
              color: '#FFF',
              padding: '6px 12px',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            Explore
          </button>

          <button 
            onClick={() => {
              if (!user) {
                onOpenOrdersAuth();
              } else {
                setCurrentTab('orders');
              }
            }}
            className={`btn ${currentTab === 'orders' ? 'btn-secondary' : ''}`}
            style={{
              background: currentTab === 'orders' ? 'rgba(255,255,255,0.08)' : 'transparent',
              border: 'none',
              color: '#FFF',
              padding: '6px 12px',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            My Orders
          </button>

          {/* Admin Switch Link */}
          <button 
            onClick={() => {
              if (isAdmin) {
                setCurrentTab('admin');
              } else {
                onOpenAdminAuth();
              }
            }}
            className="badge badge-amber"
            style={{ cursor: 'pointer', padding: '6px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <Shield size={13} /> {isAdmin ? 'Admin' : 'Partner'}
          </button>

          {/* Shopping Cart Button */}
          <button 
            onClick={onOpenCart}
            className="btn btn-primary"
            style={{ position: 'relative', height: '38px', padding: '0 14px', fontSize: '0.85rem', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <ShoppingBag size={16} />
            <span>Cart</span>
            {itemCount > 0 && (
              <span style={{
                background: '#FFF',
                color: 'var(--primary)',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 800,
                marginLeft: '4px'
              }}>
                {itemCount}
              </span>
            )}
          </button>

          {/* User Auth Profile / Dropdown */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--surface-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}>
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>{user.name}</span>
                  <span style={{ fontSize: '0.65rem', color: isAdmin ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                    {isAdmin ? 'ADMIN' : 'CUSTOMER'}
                  </span>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>

              {showUserDropdown && (
                <div className="glass-panel" style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '220px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-card)',
                  zIndex: 120
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', wordBreak: 'break-all' }}>
                    {user.email}
                  </div>
                  <button 
                    onClick={() => { logout(); setShowUserDropdown(false); }}
                    className="btn btn-secondary"
                    style={{ width: '100%', height: '36px', fontSize: '0.85rem', color: 'var(--primary)' }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onOpenAuth} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <User size={16} /> Sign In
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
