"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  ClipboardList,
  ShoppingCart,
  IndianRupee,
  Calendar,
  Truck,
  ClipboardCheck,
  ChevronDown,
  ChevronRight,
  Activity,
  ClockIcon as ClockFading,
} from "lucide-react"
import SidebarItem from "../ui/SidebarItem"

const roleConfig = {
  admin: {
    title: "Admin Portal",
    version: "v2.0",
    logo: { icon: "💊", text: "MediEase", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { title: "Inventory", icon: Package, path: "/admin/inventory" },
      { title: "Staff", icon: Users, path: "/admin/staff" },
      { title: "User Management", icon: Users, path: "/admin/users" },
      { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
      {
        title: "Reports",
        icon: ClipboardList,
        path: "/admin/reports",
        subItems: [
          { title: "Sales Reports", path: "/admin/reports/sales" },
          { title: "Inventory Reports", path: "/admin/reports/inventory" },
          { title: "User Analytics", path: "/admin/reports/analytics" },
        ],
      },
      { title: "Finance", icon: IndianRupee, path: "/admin/finance" },
      { title: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
  chemist: {
    title: "Chemist Panel",
    version: "v2.0",
    logo: { icon: "💊", text: "MediEase", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/chemist/dashboard" },
      { title: "Purches Order", icon: ClipboardList, path: "/chemist/purchaseorder" },
      { title: "Sales Report", icon: Calendar, path: "/chemist/salesreport", badge: "8" },
      { title: "Prescriptions", icon: ClipboardCheck, path: "/chemist/prescriptions", badge: "new" },
      { title: "Inventory", icon: Package, path: "/chemist/inventory" },
      { title: "Settings", icon: Settings, path: "/chemist/settings" },
    ],
  },
  supplier: {
    title: "Supplier Panel",
    version: "v2.0",
    logo: { icon: "🚚", text: "MediEaseSupply", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/supplier/dashboard" },
      { title: "Orders", icon: ShoppingCart, path: "/supplier/orders", badge: "7" },
      { title: "Products", icon: Package, path: "/supplier/products" },
      { title: "Deliveries", icon: Truck, path: "/supplier/deliveries" },
      { title: "Settings", icon: Settings, path: "/supplier/settings" },
    ],
  },
  superadmin: {
    title: "Superadmin Panel",
    version: "v2.0",
    logo: { icon: "🚚", text: "MediEaseSupply", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/superadmin" },
      { title: "Suppliers", icon: ShoppingCart, path: "/superadmin/supplier" },
      { title: "Medical Admins", icon: Package, path: "/superadmin/medical_admin" },
      { title: "Pending Approval", icon: ClockFading, path: "/superadmin/pending_approval" },
    ],
  },
}

export default function Sidebar({ role, isCollapsed = false, onToggle }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const [internalCollapsed, setInternalCollapsed] = useState(isCollapsed)

  const { logo, navItems, title, version } = roleConfig[role] || roleConfig.admin

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)

      // Auto-collapse on mobile, auto-expand on desktop
      if (mobile) {
        setInternalCollapsed(true)
      } else {
        // On desktop, restore to the prop value or expand by default
        setInternalCollapsed(false)
      }
    }

    // Check initial screen size
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Update internal state when prop changes (for manual toggle)
  useEffect(() => {
    if (!isMobile) {
      setInternalCollapsed(isCollapsed)
    }
  }, [isCollapsed, isMobile])

  const toggleExpanded = (itemTitle) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle)
    } else {
      newExpanded.add(itemTitle)
    }
    setExpandedItems(newExpanded)
  }

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = pathname.startsWith(item.path)
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems.has(item.title)
    const Icon = item.icon

    return (
      <div key={item.title} className={`${isSubItem ? "ml-4" : ""}`}>
        {hasSubItems && !internalCollapsed ? (
          <div>
            <button
              onClick={() => toggleExpanded(item.title)}
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-green-50 to-gray-50 text-green-600 shadow-sm border border-green-100"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-900"
              }`}
            >
              <span
                className={`transition-colors duration-300 ${
                  isActive ? "text-green-500" : "text-gray-500 group-hover:text-green-700"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {!internalCollapsed && (
                <>
                  <span className="ml-3 text-sm font-medium flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.badge === "new" ? "bg-green-100 text-green-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <span className="ml-2 transition-transform duration-300">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </span>
                </>
              )}
            </button>
            {isExpanded && !internalCollapsed && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.title} href={subItem.path}>
                    <div
                      className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                        pathname === subItem.path
                          ? "bg-green-50 text-green-600 border-l-2 border-green-500"
                          : "text-green-600 hover:bg-green-50 hover:text-green-900"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current opacity-50 mr-3" />
                      <span className="text-sm font-medium">{subItem.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link href={item.path}>
            <SidebarItem
              icon={<Icon className="h-5 w-5" />}
              active={isActive}
              isCollapsed={internalCollapsed}
              badge={item.badge}
            >
              {item.title}
            </SidebarItem>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col h-full bg-white/80 backdrop-blur-sm border-r border-gray-200/50 shadow-lg transition-all duration-300 ${
        internalCollapsed ? "w-16" : "w-72"
      } ${isMobile ? "fixed left-0 top-0 z-40" : "relative"}`}
    >
      {/* Logo Section */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200/50 bg-white/90">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl bg-gradient-to-r ${logo.gradient} flex items-center justify-center shadow-lg`}
          >
            <span className="text-white text-lg font-bold">{logo.icon}</span>
          </div>
          {!internalCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">{logo.text}</span>
              <span className="text-xs text-gray-500">
                {title} {version}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-2">{navItems.map((item) => renderNavItem(item))}</div>
      </nav>

      {/* Status Indicator */}
      {!internalCollapsed && (
        <div className="p-4 border-t border-gray-200/50 bg-white/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-600">System Online</span>
            </div>
            <Activity className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && !internalCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setInternalCollapsed(true)} />
      )}
    </div>
  )
}
