// 'use client';
// import { useState } from 'react';
// import Header from './Header';
// import Sidebar from './Sidebar';

// export default function Layout({ children, role  }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar 
//         role={role} 
//         isOpen={sidebarOpen} 
//         onClose={() => setSidebarOpen(false)} 
//       />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header 
//           role={role}
//           onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
//         />
        
//         <main className="flex-1 overflow-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// components/layout/Layout.jsx
'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, role = "admin" }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'
            }`
          : `relative transition-all duration-300 ease-in-out ${
              sidebarCollapsed ? 'w-16' : 'w-72'
            }`
      }`}>
        <Sidebar 
          role={role} 
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          role={role}
          onMenuClick={toggleSidebar}
          isCollapsed={sidebarCollapsed}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>© 2024 MediEase. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Version 2.0.1</span>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <button className="hover:text-gray-900 transition-colors">Privacy</button>
              <button className="hover:text-gray-900 transition-colors">Terms</button>
              <button className="hover:text-gray-900 transition-colors">Support</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}