const API_BASE_URL = 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('crave_token');
export const setAuthToken = (token) => localStorage.setItem('crave_token', token);
export const removeAuthToken = () => localStorage.removeItem('crave_token');

export async function apiFetch(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

export const api = {
  // Auth
  signup: (userData) => apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => apiFetch('/auth/me'),

  // Restaurants & Menus
  getRestaurants: () => apiFetch('/restaurants'),
  getRestaurantById: (id) => apiFetch(`/restaurants/${id}`),
  addMenuItem: (restaurantId, itemData) => apiFetch(`/restaurants/${restaurantId}/menu`, { method: 'POST', body: JSON.stringify(itemData) }),
  deleteMenuItem: (itemId) => apiFetch(`/restaurants/menu-items/${itemId}`, { method: 'DELETE' }),

  // Orders
  createOrder: (orderData) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrders: () => apiFetch('/orders'),
  updateOrderStatus: (orderId, status) => apiFetch(`/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
};
