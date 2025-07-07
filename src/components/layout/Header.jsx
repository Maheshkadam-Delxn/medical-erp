// "use client";
// import { useState } from "react";
// import { Menu, Bell, User, LogOut } from "lucide-react";

// export default function Header({ role = "admin", onMenuClick }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications] = useState([
//     { id: 1, text: "New order received", read: false },
//     { id: 2, text: "Inventory low", read: false },
//   ]);

//   // Role-specific configurations
//   const roleConfig = {
//     admin: {
//       title: "Admin Dashboard",
//       color: "bg-green-600",
//       hoverColor: "hover:bg-green-700",
//     },
//     supplier: {
//       title: "Supplier Dashboard",
//       color: "bg-green-600",
//       hoverColor: "hover:bg-green-700",
//     },
//     chemist: {
//       title: "Chemist Portal",
//       color: "bg-green-600",
//       hoverColor: "hover:bg-green-700",
//     },
//   };

//   const currentRole = roleConfig[role] || roleConfig.admin;

//   return (
//     <header
//       className={`sticky top-0 z-20 ${currentRole.color} text-white shadow-md h-16`}
//     >
//       <div className="flex items-center justify-between h-full px-4">
//         {/* Menu Button */}
//         <button
//           onClick={onMenuClick}
//           className={`p-2 rounded-md ${currentRole.hoverColor} md:hidden`}
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         {/* Title */}
//         <h1 className="text-lg font-semibold">{currentRole.title}</h1>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {/* Notifications - only show for admin and manager */}
//           {(role === "admin" || role === "supplier") && (
//             <div className="relative">
//               <button
//                 className={`p-2 rounded-full ${currentRole.hoverColor} relative`}
//               >
//                 <Bell className="h-5 w-5" />
//                 {notifications.length > 0 && (
//                   <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                     {notifications.length}
//                   </span>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`flex items-center gap-2 p-1 rounded-full ${currentRole.hoverColor}`}
//             >
//               <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
//                 <User className="h-4 w-4" />
//               </div>
//               <span className="hidden md:inline">
//                 {role.charAt(0).toUpperCase() + role.slice(1)}
//               </span>
//             </button>

//             {isOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
//                 <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                   <p>{role.charAt(0).toUpperCase() + role.slice(1)} User</p>
//                 </div>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   Profile Settings
//                 </a>
//                 <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
//                   <LogOut className="h-4 w-4" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/layout/Header.jsx
"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Shield,
  Search,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  Globe,
  HelpCircle,
  ChevronDown,
  X,
} from "lucide-react";

export default function Header({ role = "admin", onMenuClick, isCollapsed }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [notifications] = useState([
    {
      id: 1,
      title: "New order received",
      message: "Order #12345 from John Doe",
      time: "2 min ago",
      read: false,
      type: "order",
    },
    {
      id: 2,
      title: "Low inventory alert",
      message: "Paracetamol stock running low",
      time: "5 min ago",
      read: false,
      type: "warning",
    },
    {
      id: 3,
      title: "Payment received",
      message: "₹15,000 payment confirmed",
      time: "1 hour ago",
      read: true,
      type: "payment",
    },
    {
      id: 4,
      title: "System update",
      message: "New features available",
      time: "3 hours ago",
      read: true,
      type: "system",
    },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Role-specific configurations
  const roleConfig = {
    admin: {
      title: "Admin Dashboard",
      subtitle: "System Management",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      permissions: ["full_access", "user_management", "system_settings"],
    },
    supplier: {
      title: "Supplier Dashboard",
      subtitle: "Supply Chain Management",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      permissions: ["order_management", "product_catalog"],
    },
    chemist: {
      title: "Chemist Portal",
      subtitle: "Patient Care Center",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      permissions: ["prescription_access", "inventory_view"],
    },
  };

  const currentRole = roleConfig[role] || roleConfig.admin;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return "📦";
      case "warning":
        return "⚠️";
      case "payment":
        return "💰";
      case "system":
        return "🔧";
      default:
        return "📋";
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 ${currentRole.bgColor} shadow-lg backdrop-blur-sm`}
    >
      {/* Main Header */}
      <div className="flex items-center justify-between h-16 px-6 text-white">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Title and Breadcrumb */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{currentRole.title}</h1>
              <span className="hidden sm:inline px-2 py-1 text-xs bg-white/20 rounded-full">
                {currentRole.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/60" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Button (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative dropdown">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 relative"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
                <p className="text-xs text-white/80">Online</p>
              </div>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {role.charAt(0).toUpperCase() + role.slice(1)} User
                      </p>
                      <p className="text-xs text-gray-500">user@mediease.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Privacy & Security
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </button>
                </div>

                <div className="p-2 border-t border-gray-200">
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/60" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
            />
          </div>
        </div>
      )}
    </header>
  );
}
