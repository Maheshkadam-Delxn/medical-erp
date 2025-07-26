"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, Bell, User, LogOut, Settings, Shield, Search, HelpCircle, ChevronDown, X, Loader2 } from "lucide-react"

export default function Header({ role = "admin", onMenuClick, isCollapsed }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
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
  ])

  const router = useRouter()

  const handleClickprofile = () => {
    router.push("profile")
    setIsProfileOpen(false)
  }

  const handleClickaccount = () => {
    router.push("account")
    setIsProfileOpen(false)
  }

  // Logout functionality
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      // Clear authentication data
      // Remove tokens from localStorage
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userData")

      // Clear session storage
      sessionStorage.clear()

      // Clear cookies (if you're using cookies for auth)
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=")
        const name = eqPos > -1 ? c.substr(0, eqPos) : c
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
      })

      // Call logout API endpoint (if you have one)
      try {
        await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      } catch (apiError) {
        console.warn("Logout API call failed:", apiError)
        // Continue with logout even if API call fails
      }

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to login page
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
      // Even if there's an error, redirect to login for security
      router.push("/auth/login")
    } finally {
      setIsLoggingOut(false)
      setShowLogoutConfirm(false)
      setIsProfileOpen(false)
    }
  }

  const confirmLogout = () => {
    setShowLogoutConfirm(true)
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsProfileOpen(false)
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Role-specific configurations
  const roleConfig = {
    superadmin: {
      title: "SuperAdmin Dashboard",
      subtitle: "System Management",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      permissions: ["full_access", "user_management", "system_settings"],
    },
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
  }

  const currentRole = roleConfig[role] || roleConfig.admin
  const unreadNotifications = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return "📦"
      case "warning":
        return "⚠️"
      case "payment":
        return "💰"
      case "system":
        return "🔧"
      default:
        return "📋"
    }
  }

  return (
    <>
      <header className={`sticky top-0 z-30 ${currentRole.bgColor} shadow-lg backdrop-blur-sm`}>
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
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
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
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
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
                  <p className="text-sm font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
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
                    <button
                      onClick={handleClickprofile}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </button>
                    <button
                      onClick={handleClickaccount}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    >
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
                    <button
                      onClick={confirmLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                      {isLoggingOut ? "Logging out..." : "Logout"}
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <p className="text-sm text-gray-600">Are you sure you want to logout?</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              You will be redirected to the login page and will need to sign in again to access your account.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoggingOut && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
