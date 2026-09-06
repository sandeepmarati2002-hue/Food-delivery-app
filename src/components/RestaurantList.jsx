import React, { useState } from 'react';
import { RestaurantCard } from './RestaurantCard';
import { Filter, Star, Zap, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const RestaurantList = ({ restaurants, onSelectRestaurant, selectedCategory, searchQuery }) => {
  const { addToCart, cartItems } = useCart();
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [highRatingFilter, setHighRatingFilter] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Extract all drink items from restaurants for the Drinks Block
  const drinkItems = [];
  restaurants.forEach((r) => {
    (r.menu || []).forEach((cat) => {
      const catName = (cat.categoryName || '').toLowerCase();
      if (
        catName.includes('drink') ||
        catName.includes('shake') ||
        catName.includes('beverage') ||
        catName.includes('juice') ||
        catName.includes('smoothie') ||
        catName.includes('chai') ||
        catName.includes('coffee') ||
        catName.includes('cooler') ||
        catName.includes('mocktail') ||
        catName.includes('boba')
      ) {
        (cat.items || []).forEach((item) => {
          drinkItems.push({
            ...item,
            restaurant: r
          });
        });
      }
    });
  });

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((r) => {
    // Category filter
    if (selectedCategory !== 'all') {
      const isBeverages = selectedCategory === 'beverages';
      const isDesserts = selectedCategory === 'desserts';
      const isSushi = selectedCategory === 'sushi';
      const isBiryani = selectedCategory === 'biryani';
      const isTacos = selectedCategory === 'tacos';

      const directCategoryMatch = r.category === selectedCategory ||
        (isBeverages && (r.category === 'beverages' || r.category === 'cafe')) ||
        (isDesserts && (r.category === 'desserts' || r.category === 'bakery')) ||
        (isSushi && (r.category === 'sushi' || r.category === 'chinese')) ||
        (isBiryani && (r.category === 'biryani' || r.category === 'south-indian')) ||
        (isTacos && (r.category === 'tacos' || r.category === 'mexican'));

      const menuHasCategory = (r.menu || []).some((cat) => {
        const catName = (cat.categoryName || '').toLowerCase();
        if (isBeverages) {
          return catName.includes('drink') || catName.includes('shake') || catName.includes('beverage') || catName.includes('chai') || catName.includes('coffee') || catName.includes('juice') || catName.includes('smoothie');
        }
        if (isDesserts) {
          return catName.includes('dessert') || catName.includes('sweet') || catName.includes('cake') || catName.includes('bakery') || catName.includes('sundae') || catName.includes('waffle');
        }
        if (isTacos) {
          return catName.includes('taco') || catName.includes('burrito') || catName.includes('mexican') || catName.includes('quesadilla') || catName.includes('nacho');
        }
        return catName.includes(selectedCategory.toLowerCase());
      });

      if (!directCategoryMatch && !menuHasCategory) return false;
    }
    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = (r.name || '').toLowerCase().includes(q);
      const cuisineMatch = Array.isArray(r.cuisine) && r.cuisine.some((c) => c.toLowerCase().includes(q));
      const menuMatch = (r.menu || []).some((cat) =>
        (cat.categoryName || '').toLowerCase().includes(q) ||
        (cat.items || []).some((item) =>
          (item.name || '').toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q)
        )
      );
      if (!nameMatch && !cuisineMatch && !menuMatch) return false;
    }
    // Pure Veg filter
    if (vegOnlyFilter && !r.isVegOnly) return false;
    // Rating filter
    if (highRatingFilter && r.rating < 4.5) return false;

    return true;
  });

  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'deliveryTime') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    if (sortBy === 'deliveryFee') return a.deliveryFee - b.deliveryFee;
    return 0; // default relevance
  });

  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'Popular Restaurants';
    if (selectedCategory === 'beverages') return 'Drinks & Shakes Spots';
    if (selectedCategory === 'desserts') return 'Desserts & Sweet Treats';
    if (selectedCategory === 'burgers') return 'Gourmet Burgers';
    if (selectedCategory === 'pizza') return 'Artisan Pizzas';
    if (selectedCategory === 'biryani') return 'Biryani & Royal Indian';
    if (selectedCategory === 'sushi') return 'Sushi & Pan-Asian';
    if (selectedCategory === 'tacos') return 'Mexican Tacos & Bites';
    return `${selectedCategory.toUpperCase()} Spots`;
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '30px auto', padding: '0 24px' }}>
      
      {/* Header & Filter Controls Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF' }}>
            {getCategoryTitle()}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Showing {sortedRestaurants.length} top-rated restaurants near you
          </p>
        </div>

        {/* Filter Badges & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          <button
            onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
            className={`btn ${vegOnlyFilter ? 'badge-emerald' : 'btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: '0.85rem', height: '36px' }}
          >
            <Flame size={14} color={vegOnlyFilter ? 'var(--accent-emerald)' : 'var(--text-muted)'} />
            Pure Veg Only
          </button>

          <button
            onClick={() => setHighRatingFilter(!highRatingFilter)}
            className={`btn ${highRatingFilter ? 'badge-amber' : 'btn-secondary'}`}
            style={{ padding: '6px 14px', fontSize: '0.85rem', height: '36px' }}
          >
            <Star size={14} color={highRatingFilter ? 'var(--accent-amber)' : 'var(--text-muted)'} />
            Ratings 4.5+
          </button>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Filter size={14} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--surface-card)',
                color: '#FFF',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="rating">Sort by: Rating (High to Low)</option>
              <option value="deliveryTime">Sort by: Fastest Delivery</option>
              <option value="deliveryFee">Sort by: Low Delivery Fee</option>
            </select>
          </div>

        </div>
      </div>

      {/* Drinks Block */}
      {(selectedCategory === 'beverages' || selectedCategory === 'all') && drinkItems.length > 0 && (
        <div style={{
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.08) 0%, rgba(20, 24, 33, 0.95) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 71, 87, 0.3)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.5rem' }}>🥤</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>
                  {selectedCategory === 'beverages' ? 'All Drinks, Shakes & Coolers' : 'Trending Drinks & Shakes Collection'}
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Handcrafted Thickshakes, Cold-Pressed Juices, Smoothies, Boba & Specialty Iced Brews ({drinkItems.length} items available)
              </p>
            </div>

            <div className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <Sparkles size={14} /> Instant Refreshment
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '18px'
          }}>
            {(selectedCategory === 'beverages' ? drinkItems : drinkItems.slice(0, 8)).map((item) => {
              const qty = (cartItems.find((ci) => ci.id === item.id) || {}).quantity || 0;
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--surface-card)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80'}
                      alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'rgba(15, 17, 23, 0.85)',
                      backdropFilter: 'blur(4px)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#FFF'
                    }}>
                      {item.restaurant?.name}
                    </span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFF', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.3, marginBottom: '10px' }}>
                        {item.description ? item.description.slice(0, 68) + (item.description.length > 68 ? '...' : '') : ''}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)' }}>
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => addToCart(item, item.restaurant)}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem', height: '30px', borderRadius: 'var(--radius-full)' }}
                      >
                        {qty > 0 ? `Added (${qty})` : '+ ADD'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid of Restaurant Cards */}
      {sortedRestaurants.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={onSelectRestaurant}
            />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-subtle)'
        }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No restaurants found</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Try adjusting your search or filters to see more results.</p>
        </div>
      )}

    </div>
  );
};
