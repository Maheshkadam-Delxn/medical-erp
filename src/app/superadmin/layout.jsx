"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Package, Clock, Activity } from "lucide-react" // Changed ClockFading to Clock
import Header from "@/components/layout/Header" // Assuming Header is in components/layout/Header.jsx

const superadminNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/superadmin" },
  { title: "Suppliers", icon: ShoppingCart, path: "/superadmin/supplier" },
  { title: "Medical Admins", icon: Package, path: "/superadmin/medical_admin" },
  { title: "Pending Approval", icon: Clock, path: "/superadmin/pending_approval" },
]

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  const handleOverlayClick = () => {
    if (isMobile) setSidebarCollapsed(true)
  }

  const renderNavItem = (item) => {
    const isActive = pathname.startsWith(item.path)
    const Icon = item.icon
    return (
      <Link key={item.title} href={item.path}>
        <div
          className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-green-50 to-gray-50 text-green-600 shadow-sm border border-green-100"
              : "text-gray-600 hover:bg-green-50 hover:text-green-900"
          }`}
        >
          <Icon className="h-5 w-5" />
          {!sidebarCollapsed && <span className="ml-3 text-sm font-medium">{item.title}</span>}
        </div>
      </Link>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
              }`
            : `relative transition-all duration-300 ease-in-out ${sidebarCollapsed ? "w-16" : "w-72"}`
        } bg-white/80 backdrop-blur-sm border-r border-gray-200/50 shadow-lg`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200/50 bg-white/90">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg`}
            >
              <span className="text-white text-lg font-bold">🧑‍💻</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">MediEaseSuperAdmin</span>
                <span className="text-xs text-gray-500">Superadmin Panel v2.0</span>
              </div>
            )}
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-2">
          {superadminNavItems.map((item) => renderNavItem(item))}
        </nav>
        {/* Status */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200/50 bg-white/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">System Online</span>
              </div>
              <Activity className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={handleOverlayClick} />
      )}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header role="superadmin" onMenuClick={toggleSidebar} />
        {/* Main Area */}
        <main className="flex-1 overflow-auto p-6 space-y-6">{children}</main>
        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>© 2025 MediEase. All rights reserved.</span>
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
  )
}
