"use client"
import Layout from '@/components/layout/Layout';
import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SupplierLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useSession();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    console.log('SupplierLayout - User:', user, 'Loading:', loading);
    
    if (!loading) {
      if (!user) {
        console.log('No user found, redirecting to login');
        setShouldRedirect(true);
      } else if (user.role !== 'supplier') {
        console.log('User role is not supplier:', user.role, 'redirecting to login');
        setShouldRedirect(true);
      } else {
        console.log('User authenticated as supplier:', user.email);
      }
    }
  }, [user, loading]);

  useEffect(() => {
    if (shouldRedirect) {
      console.log('Redirecting to login from supplier layout');
      window.location.replace('/auth/login');
    }
  }, [shouldRedirect]);

  // Show loading while session is being fetched
  if (loading) {
    console.log('SupplierLayout - Showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated or wrong role
  if (!user || user.role !== 'supplier' || shouldRedirect) {
    console.log('SupplierLayout - Not rendering, user:', user?.email, 'role:', user?.role, 'shouldRedirect:', shouldRedirect);
    return null;
  }

  console.log('SupplierLayout - Rendering dashboard for supplier:', user.email);
  return <Layout role="supplier">{children}</Layout>;
}