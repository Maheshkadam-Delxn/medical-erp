"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  PackageSearch,
  Settings,
} from "lucide-react";

export default function ChemistSidebar({ currentPath }) {
  const navItems = [
    { title: "Dashboard", path: "/chemist/dashboard", icon: <LayoutDashboard /> },
    { title: "Appointments", path: "/chemist/appointments", icon: <ClipboardList /> },
    { title: "Prescriptions", path: "/chemist/prescriptions", icon: <PackageSearch /> },
    { title: "Inventory", path: "/chemist/inventory", icon: <PackageSearch /> },
    { title: "Settings", path: "/chemist/settings", icon: <Settings /> },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">💊</span>
          <span className="text-xl font-bold text-gray-800">Mediease</span>
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
        Chemist Panel v1.0
      </div>
    </div>
  );
}
