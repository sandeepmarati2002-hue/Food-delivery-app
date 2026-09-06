import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart - allows items from ALL restaurants
  const addToCart = (item, restaurant) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prevItems,
        {
          ...item,
          quantity: 1,
          restaurantId: restaurant?.id || item.restaurantId,
          restaurantName: restaurant?.name || item.restaurantName,
          deliveryFee: restaurant?.deliveryFee ?? item.deliveryFee ?? 40
        }
      ];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Derive unique restaurants
  const uniqueRestaurants = Array.from(
    new Set(cartItems.map((i) => i.restaurantName).filter(Boolean))
  );

  const primaryRestaurantId = cartItems.find((i) => i.restaurantId)?.restaurantId || null;

  const activeRestaurant = cartItems.length === 0
    ? null
    : uniqueRestaurants.length <= 1
    ? {
        id: primaryRestaurantId,
        name: uniqueRestaurants[0] || 'Restaurant',
        deliveryFee: cartItems[0]?.deliveryFee ?? 40
      }
    : {
        id: primaryRestaurantId,
        name: `${uniqueRestaurants.length} Restaurants (${uniqueRestaurants.join(', ')})`,
        deliveryFee: Math.max(...cartItems.map((i) => i.deliveryFee || 40))
      };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = activeRestaurant ? activeRestaurant.deliveryFee : 0;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal > 0 ? subtotal + deliveryFee + taxes : 0;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        activeRestaurant,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        taxes,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
