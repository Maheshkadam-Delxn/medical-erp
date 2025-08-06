"use client"
import Layout from '@/components/layout/Layout';
import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChemistLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    console.log('ChemistLayout - User:', user, 'Loading:', loading);
    
    if (!loading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        setShouldRedirect(true);
      } else if (user.role !== 'chemist') {
        console.log('User role is not chemist:', user.role, 'redirecting to login');
        setShouldRedirect(true);
      } else {
        console.log('User authenticated as chemist:', user.email);
      }
    }
  }, [user, loading]);

  useEffect(() => {
    if (shouldRedirect) {
      console.log('Redirecting to login from chemist layout');
      window.location.replace('/auth/login');
    }
  }, [shouldRedirect]);

  // Show loading while session is being fetched
  if (loading) {
    console.log('ChemistLayout - Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated or wrong role
  if (!user || user.role !== 'chemist' || shouldRedirect) {
    console.log('ChemistLayout - Not rendering, user:', user?.email, 'role:', user?.role, 'shouldRedirect:', shouldRedirect);
    return null;
  }

  console.log('ChemistLayout - Rendering dashboard for chemist:', user.email);
  return <Layout role="chemist">{children}</Layout>;
}