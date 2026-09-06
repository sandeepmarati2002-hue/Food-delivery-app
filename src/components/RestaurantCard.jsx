import React from 'react';
import { Star, Clock, MapPin, Sparkles } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div 
      onClick={() => onClick(restaurant)}
      className="animate-fade-in"
      style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'var(--transition)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(255, 71, 87, 0.4)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Banner Image */}
      <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={restaurant.bannerImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'} 
          alt={restaurant.name}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Overlay Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          {restaurant.isPromoted && (
            <span className="badge badge-primary">
              <Sparkles size={12} /> Promoted
            </span>
          )}
          {restaurant.isVegOnly && (
            <span className="badge badge-emerald">
              100% Pure Veg
            </span>
          )}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(15, 17, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Clock size={14} color="var(--primary)" />
          {restaurant.deliveryTime}
        </div>
      </div>

      {/* Details Body */}
      <div style={{ padding: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFF' }}>{restaurant.name}</h3>
          
          {/* Rating Badge */}
          <div className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '4px 8px' }}>
            <Star size={14} fill="var(--accent-amber)" />
            <span>{restaurant.rating}</span>
            <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({restaurant.reviewCount})</span>
          </div>
        </div>

        {/* Cuisine Pills */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {restaurant.cuisine.join(' • ')}
        </div>

        {/* Footer Meta: Distance, Fee, Min Order */}
        <div style={{
          paddingTop: '12px',
          borderTop: '1px dashed var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} color="var(--text-muted)" />
            <span>{restaurant.distance}</span>
          </div>

          <div>
            ₹{restaurant.deliveryFee} Delivery Fee
          </div>

          <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
            Min ₹{restaurant.minOrder}
          </div>
        </div>
      </div>
    </div>
  );
};
