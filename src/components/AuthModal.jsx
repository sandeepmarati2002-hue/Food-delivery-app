import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, User, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialRole = 'customer', message = '' }) => {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(initialRole); // 'customer' or 'admin'
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form inputs & errors whenever modal opens or initialRole changes
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setErrorMessage('');
      setRole(initialRole);
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setEmail('');
    setPassword('');
    setName('');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (isSignup) {
        await signup(email, password, name || email.split('@')[0], role.toUpperCase());
      } else {
        await login(email, password, role);
      }
      setIsSubmitting(false);
      // Clear form inputs after successful authentication
      setEmail('');
      setPassword('');
      setName('');
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 250,
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
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border-subtle)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>
              {isSignup ? 'Create Account' : 'Security Sign In'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Valid credentials required to proceed
            </p>
          </div>
          <button onClick={handleCloseModal} className="btn btn-secondary btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Custom Context Warning Banner if provided */}
        {message && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 165, 2, 0.15)',
            border: '1px solid rgba(255, 165, 2, 0.3)',
            color: 'var(--accent-amber)',
            fontSize: '0.85rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{message}</span>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 71, 87, 0.15)',
            border: '1px solid rgba(255, 71, 87, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Toggle Switch */}
        <div style={{
          display: 'flex',
          background: 'var(--surface-input)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            onClick={() => { setRole('customer'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: role === 'customer' ? 'var(--primary)' : 'transparent',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <User size={14} /> Customer
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setErrorMessage(''); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: role === 'admin' ? 'var(--accent-amber)' : 'transparent',
              color: role === 'admin' ? '#0F172A' : '#FFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Shield size={14} /> Restaurant Admin
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {isSignup && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  required
                  placeholder="Sandeep Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    paddingLeft: '38px',
                    paddingRight: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-input)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                placeholder={role === 'admin' ? 'admin@craveexpress.com' : 'sandeep@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '38px',
                  paddingRight: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '38px',
                  paddingRight: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary" 
            style={{ height: '44px', marginTop: '10px' }}
          >
            {isSubmitting ? 'Authenticating...' : isSignup ? 'Create Account' : `Sign In as ${role === 'admin' ? 'Admin' : 'Customer'}`}
          </button>
        </form>

        {/* Demo Credential Hint */}
        <div style={{
          marginTop: '16px',
          padding: '10px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--surface-input)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          <div>💡 <strong>Seeded Test Credentials:</strong></div>
          <div>Customer: <code>sandeep@example.com</code> / <code>123456</code></div>
          <div>Admin: <code>admin@craveexpress.com</code> / <code>123456</code></div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => { setIsSignup(!isSignup); setErrorMessage(''); }} 
            style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </span>
        </div>

      </div>
    </div>
  );
};
