import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from './contexts/ThemeContext';
import Preloader from './components/Preloader'; // Import Preloader
import './App.css';
import './styles/theme.css';

function App() {
  const [isLoading, setIsLoading] = useState(true); // Basic loading state

  useEffect(() => {
    // Simulate app loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Preloader isLoading={isLoading} />
      {/* AnimatePresence could wrap AppRouter if Preloader is outside it and we want AppRouter to animate in after Preloader */}
      {!isLoading && ( // Render AppRouter only when not loading
        <div className="App">
          <AppRouter />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
