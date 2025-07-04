// components/layout/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Users, Settings,
  ClipboardList, ShoppingCart, IndianRupee,
  Calendar, Truck, FileText, ClipboardCheck
} from "lucide-react";

const roleConfig = {
  admin: {
    title: "Admin Portal v1.0",
    logo: { icon: "💊", text: "Mediease" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { title: "Inventory", icon: Package, path: "/admin/inventory" },
      { title: "User Management", icon: Users, path: "/admin/users" },
      { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
      { title: "Reports", icon: ClipboardList, path: "/admin/reports" },
      { title: "Finance", icon: IndianRupee, path: "/admin/finance" },
      { title: "Settings", icon: Settings, path: "/admin/settings" }
    ]
  },
  chemist: {
    title: "Chemist Panel v1.0",
    logo: { icon: "💊", text: "Mediease" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/chemist/dashboard" },
      { title: "Appointments", icon: Calendar, path: "/chemist/appointments" },
      { title: "Prescriptions", icon: ClipboardCheck, path: "/chemist/prescriptions" },
      { title: "Inventory", icon: Package, path: "/chemist/inventory" },
      { title: "Settings", icon: Settings, path: "/chemist/settings" }
    ]
  },
  supplier: {
    title: "Supplier Panel v1.0",
    logo: { icon: "🚚", text: "MediEaseSupply" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/supplier/dashboard" },
      { title: "Orders", icon: ShoppingCart, path: "/supplier/orders" },
      { title: "Products", icon: Package, path: "/supplier/products" },
      { title: "Deliveries", icon: Truck, path: "/supplier/deliveries" },
      { title: "Settings", icon: Settings, path: "/supplier/settings" }
    ]
  }
};

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const { logo, navItems, title } = roleConfig[role];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">{logo.icon}</span>
          <span className="text-xl font-bold text-gray-800">{logo.text}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.title}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition 
                ${
                  isActive
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        {title}
      </div>
    </div>
  );
}