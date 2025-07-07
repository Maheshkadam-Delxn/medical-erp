'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, User, ClipboardList } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-xl font-bold text-green-600">
              <Package className="h-6 w-6 mr-2" />
              MediEase
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className={`${isActive('/features') ? 'text-green-600' : 'text-gray-500'} hover:text-green-500`}>
              Features
            </Link>
            <Link href="/pricing" className={`${isActive('/pricing') ? 'text-green-600' : 'text-gray-500'} hover:text-green-500`}>
              Pricing
            </Link>
            <Link href="/about" className={`${isActive('/about') ? 'text-green-600' : 'text-gray-500'} hover:text-green-500`}>
              About
            </Link>
            
            <div className="flex space-x-4">
              <Link href="/auth/login" className="px-2 py-2 rounded-md text-gray-600 hover:bg-green-200">
                Sign In
              </Link>
              <Link href="/auth/register" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}