// // components/layout/Sidebar.jsx
// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard, Package, Users, Settings,
//   ClipboardList, ShoppingCart, IndianRupee,
//   Calendar, Truck, FileText, ClipboardCheck
// } from "lucide-react";
// import SidebarItem from "../ui/SidebarItem";

// const roleConfig = {
//   admin: {
//     title: "Admin Portal v1.0",
//     logo: { icon: "💊", text: "MediEase" },
//     navItems: [
//       { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
//       { title: "Inventory", icon: Package, path: "/admin/inventory" },
//       { title: "User Management", icon: Users, path: "/admin/users" },
//       { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
//       { title: "Reports", icon: ClipboardList, path: "/admin/reports" },
//       { title: "Finance", icon: IndianRupee, path: "/admin/finance" },
//       { title: "Settings", icon: Settings, path: "/admin/settings" }
//     ]
//   },
//   chemist: {
//     title: "Chemist Panel v1.0",
//     logo: { icon: "💊", text: "MediEase" },
//     navItems: [
//       { title: "Dashboard", icon: LayoutDashboard, path: "/chemist/dashboard" },
//       { title: "Appointments", icon: Calendar, path: "/chemist/appointments" },
//       { title: "Prescriptions", icon: ClipboardCheck, path: "/chemist/prescriptions" },
//       { title: "Inventory", icon: Package, path: "/chemist/inventory" },
//       { title: "Settings", icon: Settings, path: "/chemist/settings" }
//     ]
//   },
//   supplier: {
//     title: "Supplier Panel v1.0",
//     logo: { icon: "🚚", text: "MediEaseSupply" },
//     navItems: [
//       { title: "Dashboard", icon: LayoutDashboard, path: "/supplier/dashboard" },
//       { title: "Orders", icon: ShoppingCart, path: "/supplier/orders" },
//       { title: "Products", icon: Package, path: "/supplier/products" },
//       { title: "Deliveries", icon: Truck, path: "/supplier/deliveries" },
//       { title: "Settings", icon: Settings, path: "/supplier/settings" }
//     ]
//   }
// };

// export default function Sidebar({ role, isCollapsed = false }) {
//   const pathname = usePathname();
//   const { logo, navItems, title } = roleConfig[role];

//   return (
//     <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${isCollapsed ? 'w-16' : 'w-64'}`}>
//       {/* Logo */}
//       <div className="flex items-center h-16 px-6 border-b border-gray-200">
//         <div className="flex items-center gap-2">
//           <span className="text-green-600 text-2xl">{logo.icon}</span>
//           {!isCollapsed && (
//             <span className="text-xl font-bold text-gray-800">{logo.text}</span>
//           )}
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         {navItems.map((item) => {
//           const isActive = pathname.startsWith(item.path);
//           const Icon = item.icon;
          
//           return (
//             <Link
//               key={item.title}
//               href={item.path}
//               className="block mb-1 last:mb-0"
//             >
//               <SidebarItem
//                 icon={<Icon className="h-4 w-4" />}
//                 active={isActive}
//                 isCollapsed={isCollapsed}
//               >
//                 {item.title}
//               </SidebarItem>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       {!isCollapsed && (
//         <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
//           {title}
//         </div>
//       )}
//     </div>
//   );
// }



// components/layout/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Package, Users, Settings,
  ClipboardList, ShoppingCart, IndianRupee,
  Calendar, Truck, FileText, ClipboardCheck,
  ChevronDown, ChevronRight, Activity
} from "lucide-react";
import SidebarItem from "../ui/SidebarItem";

const roleConfig = {
  admin: {
    title: "Admin Portal",
    version: "v2.0",
    logo: { icon: "💊", text: "MediEase", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", badge: "3" },
      { title: "Inventory", icon: Package, path: "/admin/inventory", badge: "12" },
      { title: "User Management", icon: Users, path: "/admin/users" },
      { title: "Orders", icon: ShoppingCart, path: "/admin/orders", badge: "5" },
      { 
        title: "Reports", 
        icon: ClipboardList, 
        path: "/admin/reports",
        subItems: [
          { title: "Sales Reports", path: "/admin/reports/sales" },
          { title: "Inventory Reports", path: "/admin/reports/inventory" },
          { title: "User Analytics", path: "/admin/reports/analytics" }
        ]
      },
      { title: "Finance", icon: IndianRupee, path: "/admin/finance" },
      { title: "Settings", icon: Settings, path: "/admin/settings" }
    ]
  },
  chemist: {
    title: "Chemist Panel",
    version: "v2.0",
    logo: { icon: "💊", text: "MediEase", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/chemist/dashboard" },
      {title: "Purches Order", icon: ClipboardList, path: "/chemist/purchaseorder"},
      { title: "Sales Report", icon: Calendar, path: "/chemist/salesreport", badge: "8" },
      { title: "Prescriptions", icon: ClipboardCheck, path: "/chemist/prescriptions", badge: "new" },
      { title: "Inventory", icon: Package, path: "/chemist/inventory" },
      { title: "Settings", icon: Settings, path: "/chemist/settings" }
    ]
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
      { title: "Settings", icon: Settings, path: "/supplier/settings" }
    ]
  }
};

export default function Sidebar({ role, isCollapsed = false, onToggle }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const { logo, navItems, title, version } = roleConfig[role] || roleConfig.admin;

  const toggleExpanded = (itemTitle) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle);
    } else {
      newExpanded.add(itemTitle);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = pathname.startsWith(item.path);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.has(item.title);
    const Icon = item.icon;

    return (
      <div key={item.title} className={`${isSubItem ? 'ml-4' : ''}`}>
        {hasSubItems && !isCollapsed ? (
          <div>
            <button
              onClick={() => toggleExpanded(item.title)}
              className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-gradient-to-r from-green-50 to-gray-50 text-green-600 shadow-sm border border-green-100' 
                  : 'text-gray-600 hover:bg-green-50 hover:text-green-900'
              }`}
            >
              <span className={`transition-colors duration-300 ${isActive ? 'text-green-500' : 'text-gray-500 group-hover:text-green-700'}`}>
                <Icon className="h-5 w-5" />
              </span>
              {!isCollapsed && (
                <>
                  <span className="ml-3 text-sm font-medium flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.badge === 'new' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="ml-2 transition-transform duration-300">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                </>
              )}
            </button>
            {isExpanded && !isCollapsed && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.title} href={subItem.path}>
                    <div className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                      pathname === subItem.path
                        ? 'bg-green-50 text-green-600 border-l-2 border-green-500'
                        : 'text-green-600 hover:bg-green-50 hover:text-green-900'
                    }`}>
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
              isCollapsed={isCollapsed}
              badge={item.badge}
            >
              {item.title}
            </SidebarItem>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-white/80 backdrop-blur-sm border-r border-gray-200/50 shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      {/* Logo Section */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200/50 bg-white/90">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-r ${logo.gradient} flex items-center justify-center shadow-lg`}>
            <span className="text-white text-lg font-bold">
              {logo.icon}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">{logo.text}</span>
              <span className="text-xs text-gray-500">{title} {version}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="space-y-2">
          {navItems.map((item) => renderNavItem(item))}
        </div>
      </nav>

      {/* Status Indicator */}
      {!isCollapsed && (
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
    </div>
  );
}