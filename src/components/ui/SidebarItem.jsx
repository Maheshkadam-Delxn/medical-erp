// src/components/dashboard/SidebarItem.jsx
'use client';

export default function SidebarItem({ icon, children, active, onClick, isCollapsed }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100'
      } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
    >
      <span className={`${active ? 'text-emerald-500' : 'text-gray-500'}`}>
        {icon}
      </span>
      {!isCollapsed && (
        <span className="text-sm font-medium">{children}</span>
      )}
    </button>
  );
}