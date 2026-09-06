import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { CategoryBar } from './components/CategoryBar';
import { RestaurantList } from './components/RestaurantList';
import { RestaurantDetail } from './components/RestaurantDetail';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatus } from './components/OrderStatus';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MOCK_ORDERS } from './data/mockData';
import { api } from './api/apiClient';

export function AppContent() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'detail' | 'orders' | 'admin'
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState('customer');
  const [authMessage, setAuthMessage] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Active Order state
  const [activeOrder, setActiveOrder] = useState(MOCK_ORDERS[0]);

  // Fetch restaurants from backend API
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const data = await api.getRestaurants();
        if (data && data.length > 0) {
          setRestaurants(data);
        }
      } catch (err) {
        console.warn('Backend API offline or loading mock data:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRestaurants();
  }, []);

  const openOrdersAuth = () => {
    setAuthRole('customer');
    setAuthMessage('Please sign in to view your order history.');
    setIsAuthOpen(true);
  };

  const openCustomerAuth = (msg = '') => {
    setAuthRole('customer');
    setAuthMessage(msg);
    setIsAuthOpen(true);
  };

  const openAdminAuth = (msg = 'Admin login credentials required to access Partner Portal.') => {
    setAuthRole('admin');
    setAuthMessage(msg);
    setIsAuthOpen(true);
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (totalAmount) => {
    if (!user) {
      setIsCartOpen(false);
      openCustomerAuth('Please sign in or create an account to proceed with checkout.');
      return;
    }
    setCheckoutTotal(totalAmount);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (createdOrder) => {
    // createdOrder is the real DB record returned by CheckoutModal → api.createOrder()
    setActiveOrder(createdOrder);
    setCurrentTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      
      {/* Main Top Navigation Header */}
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => openCustomerAuth()}
        onOpenAdminAuth={() => openAdminAuth()}
        onOpenOrdersAuth={() => openOrdersAuth()}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Page Routing Views */}
      <main style={{ flex: 1 }}>
        
        {/* View 1: Customer Home / Discovery Page */}
        {currentTab === 'home' && (
          <>
            <CategoryBar 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            <RestaurantList 
              restaurants={restaurants} 
              onSelectRestaurant={handleSelectRestaurant} 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </>
        )}

        {/* View 2: Restaurant Detail & Menu View */}
        {currentTab === 'detail' && selectedRestaurant && (
          <RestaurantDetail 
            restaurant={selectedRestaurant} 
            onBack={() => setCurrentTab('home')} 
          />
        )}

        {/* View 3: Live Order Status & History — Requires Login */}
        {currentTab === 'orders' && (
          user ? (
            <OrderStatus activeOrder={activeOrder} userId={user.id} />
          ) : (
            // Redirect to home and show auth modal if someone lands here directly
            (() => { openOrdersAuth(); setCurrentTab('home'); return null; })()
          )
        )}

        {/* View 4: Restaurant Admin Dashboard */}
        {currentTab === 'admin' && (
          <AdminDashboard 
            restaurants={restaurants} 
            onOpenAdminAuth={() => openAdminAuth()}
          />
        )}

      </main>

      {/* Drawers & Modals */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedCheckout={handleProceedToCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        finalTotal={checkoutTotal}
        onOrderPlaced={handleOrderPlaced}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialRole={authRole}
        message={authMessage}
      />

      {/* Footer */}
      <footer style={{
        background: 'var(--surface-card)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '30px 24px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFF' }}>
            Crave<span style={{ color: 'var(--primary)' }}>Express</span> Food Delivery
          </div>
          <div>© 2026 CraveExpress Technologies Inc. Secured with JWT Authentication & Role Authorization.</div>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
