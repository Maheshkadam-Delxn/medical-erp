'use client';
import { useState } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';

export default function Header({ role, onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New order received', read: false },
    { id: 2, text: 'Inventory low', read: false }
  ]);

  return (
    <header className="sticky top-0 z-20 bg-green-600 text-white shadow-md h-16 ">
      <div className="flex items-center justify-between h-full px-4">
        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-green-700 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-green-700 relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-green-700"
            >
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p>Admin User</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile Settings
                </a>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}