import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, Search, Plus, Minus, Check, Flame, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const RestaurantDetail = ({ restaurant, onBack }) => {
  // Guard against missing data (e.g., during initial render)
  if (!restaurant) {
    return <div style={{ padding: '24px', color: '#FFF' }}>Loading restaurant details...</div>;
  }
  if (!restaurant.menu) {
    return <div style={{ padding: '24px', color: '#FFF' }}>No menu data available.</div>;
  }
  const { addToCart, cartItems } = useCart();
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [activeCustomizingItem, setActiveCustomizingItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  const DEFAULT_BANNER_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80';
  const DEFAULT_LOGO_IMAGE = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80';

  // Filter menu items by search (menu is guaranteed to exist here)
  const filteredMenu = (restaurant.menu || []).map((cat) => {
    const items = (cat.items || []).filter((item) =>
      (item.name || '').toLowerCase().includes(menuSearch.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(menuSearch.toLowerCase())
    );
    return { ...cat, items };
  }).filter((cat) => cat.items.length > 0);

  const getItemCartQuantity = (itemId) => {
    const found = cartItems.find((i) => i.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleOpenCustomization = (item) => {
    if (item.customizations && item.customizations.length > 0) {
      setActiveCustomizingItem(item);
      setSelectedAddons([]);
    } else {
      addToCart(item, restaurant);
    }
  };

  const handleConfirmCustomization = () => {
    if (!activeCustomizingItem) return;
    const totalExtraPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const customizedItem = {
      ...activeCustomizingItem,
      price: activeCustomizingItem.price + totalExtraPrice,
      selectedAddonsName: selectedAddons.map((a) => a.name).join(', ')
    };
    addToCart(customizedItem, restaurant);
    setActiveCustomizingItem(null);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto 60px auto', padding: '20px 24px' }} className="animate-fade-in">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="btn btn-secondary"
        style={{ marginBottom: '20px', padding: '8px 16px', fontSize: '0.85rem' }}
      >
        <ArrowLeft size={16} /> Back to Restaurants
      </button>

      {/* Restaurant Header Hero Banner */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        marginBottom: '30px'
      }}>
        <img 
          src={restaurant.bannerImage || DEFAULT_BANNER_IMAGE} 
          alt={restaurant.name}
          onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_BANNER_IMAGE; }}
          style={{ width: '100%', height: '240px', objectFit: 'cover' }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 17, 23, 0.95) 10%, rgba(15, 17, 23, 0.4) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <img 
              src={restaurant.logoImage || DEFAULT_LOGO_IMAGE} 
              alt="Logo"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_LOGO_IMAGE; }}
              style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--primary)' }}
            />
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF' }}>{restaurant.name}</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(' • ') : restaurant.cuisine}</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            <div className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '4px 10px' }}>
              <Star size={14} fill="var(--accent-amber)" />
              <span>{restaurant.rating} ({restaurant.reviewCount} ratings)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} color="var(--primary)" />
              <span>{restaurant.deliveryTime}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="var(--text-muted)" />
              <span>{restaurant.address}</span>
            </div>

            <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              ₹{restaurant.deliveryFee} Delivery Fee
            </div>
          </div>
        </div>
      </div>

      {/* Search inside Menu Bar */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text"
          placeholder={`Search dishes in ${restaurant.name}...`}
          value={menuSearch}
          onChange={(e) => setMenuSearch(e.target.value)}
          style={{
            width: '100%',
            height: '46px',
            paddingLeft: '46px',
            paddingRight: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            color: '#FFF',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Menu Categories Accordion & Items */}
      {filteredMenu.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: '36px' }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#FFF',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{cat.categoryName}</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>({cat.items.length})</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cat.items.map((item) => {
              const qty = getItemCartQuantity(item.id);
              return (
                <div 
                  key={item.id}
                  style={{
                    background: 'var(--surface-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    alignItems: 'center',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      {/* Veg / Non-Veg Icon */}
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: `1.5px solid ${item.isVeg ? '#2ED573' : '#FF4757'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '3px'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: item.isVeg ? '#2ED573' : '#FF4757'
                        }} />
                      </div>

                      {item.isBestseller && (
                        <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Bestseller</span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>{item.name}</h4>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>₹{item.price}</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, maxWidth: '540px' }}>{item.description}</p>
                  </div>

                  {/* Right Image + Add Button */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <img 
                      src={item.image || DEFAULT_FOOD_IMAGE} 
                      alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_FOOD_IMAGE; }}
                      style={{ width: '120px', height: '100px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                    />
                    
                    <button
                      onClick={() => handleOpenCustomization(item)}
                      className="btn btn-primary"
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        padding: '6px 18px',
                        fontSize: '0.85rem',
                        height: '34px',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-glow)'
                      }}
                    >
                      {qty > 0 ? (
                        <>Added ({qty})</>
                      ) : (
                        <><Plus size={14} /> ADD</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Customization Modal */}
      {activeCustomizingItem && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '20px'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            maxWidth: '480px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            background: 'var(--surface-card)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>
              Customize "{activeCustomizingItem.name}"
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Select optional add-ons to customize your dish:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {(activeCustomizingItem.customizations || []).map((addon, idx) => {
                const isChecked = selectedAddons.some((a) => a.name === addon.name);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isChecked) {
                        setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
                      } else {
                        setSelectedAddons([...selectedAddons, addon]);
                      }
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isChecked ? 'rgba(255, 71, 87, 0.12)' : 'var(--surface-input)',
                      border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isChecked ? '#FFF' : 'var(--text-secondary)' }}>
                      {addon.name}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                      +₹{addon.price}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setActiveCustomizingItem(null)} 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmCustomization} 
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                Add Item (₹{activeCustomizingItem.price + selectedAddons.reduce((sum, a) => sum + a.price, 0)})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
