import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const AdminLayout = () => {
  const { logout, loading } = useAuth(); // Use auth context
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login'); // Redirect to login after logout
  };

  const layoutStyle = { /* ... same as before ... */ };
  const sidebarStyle = { /* ... same as before ... */ };
  const navLinkStyle = { /* ... same as before ... */ };
  const activeNavLinkStyle = { /* ... same as before ... */ };
  const contentStyle = { /* ... same as before ... */ };

  // Copying styles from previous definition to ensure they are present
  layoutStyle.display = 'flex';
  layoutStyle.minHeight = 'calc(100vh - 0px)'; // Adjusted for no explicit admin header/footer
  layoutStyle.backgroundColor = 'var(--background-color)';
  layoutStyle.color = 'var(--text-color)';

  sidebarStyle.width = '220px';
  sidebarStyle.backgroundColor = 'var(--card-bg-color)';
  sidebarStyle.padding = '1rem';
  sidebarStyle.borderRight = '1px solid var(--border-color)';
  sidebarStyle.display = 'flex'; // Added for flex column
  sidebarStyle.flexDirection = 'column'; // Added for flex column

  const navContainerStyle = { // Added to make nav take available space
      flexGrow: 1,
  };

  navLinkStyle.display = 'block';
  navLinkStyle.padding = '0.5rem 0';
  navLinkStyle.color = 'var(--text-color)';
  navLinkStyle.textDecoration = 'none';
  navLinkStyle.marginBottom = '0.5rem';

  activeNavLinkStyle.fontWeight = 'bold';

  contentStyle.flexGrow = 1;
  contentStyle.padding = '1rem 2rem';
  contentStyle.overflowY = 'auto'; // Ensure content area scrolls if needed

  const isActive = (path) => window.location.pathname.startsWith(path); // Changed to startsWith for nested routes

  const logoutButtonStyle = {
    ...navLinkStyle, // Reuse some styling
    background: 'transparent',
    border: 'none',
    color: 'var(--text-color)',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '0.5rem 0', // Ensure padding is applied
    width: '100%', // Make it full width of sidebar area
  };

  return (
    <div style={layoutStyle}>
      <aside style={sidebarStyle}>
        <h3>Admin Menu</h3>
        <nav style={navContainerStyle}>
          <Link to="/admin/dashboard" style={{...navLinkStyle, ...(isActive('/admin/dashboard') && activeNavLinkStyle)}}>Dashboard</Link>
          <Link to="/admin/news" style={{...navLinkStyle, ...(isActive('/admin/news') && activeNavLinkStyle)}}>Manage News</Link>
          <Link to="/admin/events" style={{...navLinkStyle, ...(isActive('/admin/events') && activeNavLinkStyle)}}>Manage Events</Link>
        </nav>
        <div> {/* Container for bottom items */}
          <hr style={{borderColor: 'var(--border-color)', margin: '1rem 0'}} />
          <Link to="/" style={navLinkStyle}>Back to Site</Link>
          <button onClick={handleLogout} disabled={loading} style={logoutButtonStyle}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
