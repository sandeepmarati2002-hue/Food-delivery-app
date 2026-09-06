import React from 'react';
import { FOOD_CATEGORIES } from '../data/mockData';

export const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div style={{ maxWidth: '1280px', margin: '20px auto 0 auto', padding: '0 24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '10px',
        scrollbarWidth: 'none'
      }}>
        {FOOD_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: isSelected ? 'var(--primary)' : 'var(--surface-card)',
                color: isSelected ? '#FFF' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'var(--transition)',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'none'
              }}
            >
              {cat.image && (
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'; }}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                />
              )}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
