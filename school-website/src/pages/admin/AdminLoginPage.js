import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const { error: loginError } = await login(email, password);
    if (loginError) {
      setMessage(loginError.message || 'Failed to login. Please check your credentials.');
    } else {
      // Successful login is handled by AuthContext redirecting via ProtectedRoute
      // or we can navigate explicitly if not using ProtectedRoute for initial redirect
      setMessage('Login successful! Redirecting...');
      // Navigate might be redundant if ProtectedRoute handles redirection effectively upon user state change
      navigate('/admin/dashboard', { replace: true });
    }
  };

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    backgroundColor: 'var(--card-bg-color)',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    minWidth: '300px',
  };

  const inputStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  };

  const buttonStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'var(--text-color)',
    color: 'var(--background-color)',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Admin Login</h2>
        {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
