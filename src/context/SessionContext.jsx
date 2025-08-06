// src/context/SessionContext.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSession = async () => {
    try {
      console.log('Fetching session...');
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      const data = await res.json();
      console.log('Session data received:', data);
      if (data?.user) {
        console.log('Setting user in session:', data.user);
        setUser(data.user);
      } else {
        console.log('No user data in session response');
      }
    } catch (error) {
      console.error('Session fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const login = async ({ email, password, role }) => {
    try {
      console.log('Attempting login for:', email, 'role:', role);
      
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const data = await res.json();
      console.log('Login response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      console.log('Login successful, fetching session...');
      await fetchSession(); // Refresh user data
      
      console.log('Session updated, redirecting...');
      
      // Simple direct redirect
      let redirectPath;
      switch (role) {
        case 'chemist':
          redirectPath = '/chemist/dashboard';
          break;
        case 'supplier':
          redirectPath = '/supplier/dashboard';
          break;
        case 'superadmin':
          redirectPath = '/superadmin';
          break;
        default:
          redirectPath = '/auth/login';
      }
      
      console.log('Redirecting to:', redirectPath);
      
      // Force redirect
      window.location.replace(redirectPath);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        credentials: 'include'
      });
      setUser(null);
      window.location.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};