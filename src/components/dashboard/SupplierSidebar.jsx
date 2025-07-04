"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardCheck,
  Settings,
} from "lucide-react";

export default function SupplierSidebar({ currentPath }) {
  const navItems = [
    { title: "Dashboard", path: "/supplier/dashboard", icon: <LayoutDashboard /> },
    { title: "Orders", path: "/supplier/orders", icon: <ShoppingCart /> },
    { title: "Products", path: "/supplier/products", icon: <Package /> },
    { title: "Deliveries", path: "/supplier/deliveries", icon: <ClipboardCheck /> },
    { title: "Settings", path: "/supplier/settings", icon: <Settings /> },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">🚚</span>
          <span className="text-xl font-bold text-gray-800">MediEaseSupply</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon.type ? item.icon.type : item.icon;
          const isActive = currentPath === item.path;

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
              {typeof Icon === "function" ? (
                <Icon className="h-4 w-4" />
              ) : (
                item.icon
              )}
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        Supplier Panel v1.0
      </div>
    </div>
  );
}
