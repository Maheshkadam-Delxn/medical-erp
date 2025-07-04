'use client';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header stays fixed on top */}
      <Header role={role} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar + Page Content */}
      <div className="flex flex-1 bg-gray-50">
        {/* Sidebar */}
        <Sidebar role={role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
