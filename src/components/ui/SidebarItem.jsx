// src/components/dashboard/SidebarItem.jsx
'use client';

export default function SidebarItem({ 
  icon, 
  children, 
  active, 
  onClick, 
  isCollapsed, 
  badge,
  tooltip,
  disabled = false 
}) {
  const buttonContent = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 group relative ${
        active 
          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 shadow-sm border border-emerald-100 transform scale-[1.02]' 
          : disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-sm hover:transform hover:scale-[1.01]'
      } ${isCollapsed ? 'justify-center' : 'gap-3'}`}
    >
      {/* Icon */}
      <span className={`transition-all duration-300 ${
        active 
          ? 'text-emerald-500 transform scale-110' 
          : disabled
          ? 'text-gray-400'
          : 'text-gray-500 group-hover:text-emerald-500 group-hover:transform group-hover:scale-110'
      }`}>
        {icon}
      </span>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex items-center justify-between flex-1">
          <span className="text-sm font-medium">{children}</span>
          {badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
              badge === 'new' 
                ? 'bg-emerald-100 text-emerald-700 animate-pulse' 
                : typeof badge === 'number' && badge > 0
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700 group-hover:bg-emerald-100 group-hover:text-emerald-700'
            }`}>
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Active indicator */}
      {active && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-r-full" />
      )}

      {/* Hover effect */}
      {!active && !disabled && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-emerald-50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
      )}
    </button>
  );

  // Tooltip for collapsed sidebar
  if (isCollapsed && tooltip) {
    return (
      <div className="relative group">
        {buttonContent}
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900" />
        </div>
      </div>
    );
  }

  return buttonContent;
}