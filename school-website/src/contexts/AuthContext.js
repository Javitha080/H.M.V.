import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient'; // Your Supabase client

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing session on initial load
    const getSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (e) {
        console.error("Error getting session:", e);
        // setError(e); // You might want to handle this differently
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth state changes (login, logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          setLoading(true);
          setUser(session?.user ?? null);
        } catch (e) {
          console.error("Error on auth state change:", e);
        } finally {
          setLoading(false);
        }
      }
    );

    // Cleanup listener on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) throw loginError;
      setUser(data.user);
      return { user: data.user, error: null };
    } catch (e) {
      console.error('Login error:', e);
      setError(e.message || 'Failed to login');
      return { user: null, error: e };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;
      setUser(null); // Clear user state
    } catch (e) {
      console.error('Logout error:', e);
      setError(e.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isUserAdmin: !!user // Basic check, can be enhanced with roles later
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
