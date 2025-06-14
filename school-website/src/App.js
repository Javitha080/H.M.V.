import React, { useState, useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Preloader from './components/Preloader';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import './App.css';
import './styles/theme.css';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary> {/* Wrap the entire application or key parts */}
      <ThemeProvider>
        <AuthProvider>
          <Preloader isLoading={isAppLoading} />
          {!isAppLoading && (
            <div className="App">
              <AppRouter />
            </div>
          )}
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
