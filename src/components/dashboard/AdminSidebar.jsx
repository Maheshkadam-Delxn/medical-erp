// "use client";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   Settings,
//   ClipboardList,
//   ShoppingCart,
//   IndianRupee,
// } from "lucide-react";
// import SidebarItem from "../ui/SidebarItem";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function AdminSidebar({ currentPath }) {
//   const navItems = [
//     { title: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
//     { title: "Inventory", icon: <Package />, path: "/admin/inventory" },
//     { title: "User Management", icon: <Users />, path: "/admin/users" },
//     { title: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
//     { title: "Reports", icon: <ClipboardList />, path: "/admin/reports" },
//     { title: "Finance", icon: <IndianRupee />, path: "/admin/finance" },
//     { title: "Settings", icon: <Settings />, path: "/admin/settings" },
//   ];

//   return (
//     <div className="flex flex-col h-full">
//       {/* Logo */}
    
//       <div className="flex items-center h-16 px-6 border-b border-gray-200">
//         <div className="flex items-center gap-2">
//           <span className="text-green-600 text-2xl">💊</span>
//           <span className="text-xl font-bold text-gray-800">Mediease</span>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         {navItems.map((item) => {
//           const Icon = item.icon.type ? item.icon.type : item.icon;
//           const isActive = currentPath === item.path;
//           return (
//             <Link
//               key={item.title}
//               href={item.path}
//               className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition 
//                 ${
//                   isActive
//                     ? "bg-purple-100 text-purple-700 font-semibold"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }
//               `}
//             >
//               {typeof Icon === "function" ? (
//                 <Icon className="h-4 w-4" />
//               ) : (
//                 item.icon
//               )}
//               {item.title}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
//         Admin Portal v1.0
//       </div>
//     </div>
//   );
// }
