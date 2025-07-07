// Example: How to add new features to the sidebar and header

// 1. Adding a new navigation item to the sidebar
// In components/layout/Sidebar.jsx, update the roleConfig:

const roleConfig = {
  admin: {
    title: "Admin Portal",
    version: "v2.0",
    logo: { icon: "💊", text: "MediEase", gradient: "from-emerald-500 to-teal-600" },
    navItems: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", badge: "3" },
      { title: "Inventory", icon: Package, path: "/admin/inventory", badge: "12" },
      { title: "User Management", icon: Users, path: "/admin/users" },
      
      // NEW ITEM: Add analytics with subitems
      { 
        title: "Analytics", 
        icon: TrendingUp, // Import from lucide-react
        path: "/admin/analytics",
        subItems: [
          { title: "Sales Analytics", path: "/admin/analytics/sales" },
          { title: "User Behavior", path: "/admin/analytics/users" },
          { title: "Performance", path: "/admin/analytics/performance" }
        ]
      },
      
      // NEW ITEM: Add messaging system
      { 
        title: "Messages", 
        icon: MessageCircle, // Import from lucide-react
        path: "/admin/messages", 
        badge: "new" 
      },
      
      { title: "Orders", icon: ShoppingCart, path: "/admin/orders", badge: "5" },
      { title: "Settings", icon: Settings, path: "/admin/settings" }
    ]
  }
};

// 2. Adding a new header button/feature
// In components/layout/Header.jsx, add to the right section:

// Add import
import { MessageCircle, Globe } from "lucide-react";

// Add state for new features
const [isMessagesOpen, setIsMessagesOpen] = useState(false);
const [currentLanguage, setCurrentLanguage] = useState('en');

// Add in the right section of header:
{/* Language Selector */}
<div className="relative dropdown">
  <button
    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
    className="flex items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
  >
    <Globe className="h-4 w-4" />
    <span className="text-xs hidden sm:inline">EN</span>
  </button>
  
  {isLanguageOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-2">
        {['English', 'हिंदी', 'मराठी'].map((lang) => (
          <button
            key={lang}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setCurrentLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  )}
</div>

{/* Quick Messages */}
<button
  onClick={() => setIsMessagesOpen(!isMessagesOpen)}
  className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 relative"
>
  <MessageCircle className="h-5 w-5" />
  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
</button>

// 3. Adding custom styling themes
// Create a theme configuration:

const themeConfig = {
  emerald: {
    primary: "from-emerald-500 to-teal-600",
    secondary: "from-emerald-50 to-teal-50",
    accent: "emerald-500",
    text: "emerald-600"
  },
  blue: {
    primary: "from-blue-500 to-indigo-600",
    secondary: "from-blue-50 to-indigo-50",
    accent: "blue-500",
    text: "blue-600"
  },
  purple: {
    primary: "from-purple-500 to-pink-600",
    secondary: "from-purple-50 to-pink-50",
    accent: "purple-500",
    text: "purple-600"
  }
};

// 4. Adding a status indicator to sidebar
// In Sidebar.jsx, add to the footer section:

{/* Enhanced Status Section */}
{!isCollapsed && (
  <div className="p-4 border-t border-gray-200/50 bg-white/90 space-y-3">
    {/* System Status */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-gray-600">System Online</span>
      </div>
      <Activity className="h-4 w-4 text-gray-400" />
    </div>
    
    {/* Storage Usage */}
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>Storage</span>
        <span>75%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: '75%' }}></div>
      </div>
    </div>
    
    {/* Quick Actions */}
    <div className="flex items-center justify-between">
      <button className="text-xs text-gray-600 hover:text-gray-900">
        Backup
      </button>
      <button className="text-xs text-gray-600 hover:text-gray-900">
        Updates
      </button>
    </div>
  </div>
)}

// 5. Adding keyboard shortcuts
// In Layout.jsx, add keyboard shortcuts:

useEffect(() => {
  const handleKeyDown = (e) => {
    // Toggle sidebar with Ctrl + B
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
    
    // Open search with Ctrl + K
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      // Focus search input
      document.querySelector('input[placeholder*="Search"]')?.focus();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);

// 6. Adding breadcrumb navigation
// In Header.jsx, add breadcrumb component:

const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm text-white/80">
    {items.map((item, index) => (
      <div key={index} className="flex items-center">
        {index > 0 && <span className="mx-2">/</span>}
        <span className={index === items.length - 1 ? 'text-white font-medium' : 'hover:text-white cursor-pointer'}>
          {item.title}
        </span>
      </div>
    ))}
  </nav>
);

// Usage:
<Breadcrumb items={[
  { title: 'Dashboard', path: '/admin/dashboard' },
  { title: 'Users', path: '/admin/users' },
  { title: 'Profile', path: '/admin/users/profile' }
]} />

// 7. Adding custom animations
// Add these CSS classes to your global styles:

.slide-in-right {
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// 8. Adding role-based feature toggles
// In your components, use role-based rendering:

const hasPermission = (requiredPermission) => {
  return currentRole.permissions.includes(requiredPermission);
};

// Usage in JSX:
{hasPermission('user_management') && (
  <SidebarItem icon={<Users />} path="/admin/users">
    User Management
  </SidebarItem>
)}

// 9. Adding real-time updates
// Use WebSocket or Server-Sent Events for real-time features:

useEffect(() => {
  const eventSource = new EventSource('/api/notifications');
  
  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    setNotifications(prev => [notification, ...prev]);
  };
  
  return () => eventSource.close();
}, []);

// 10. Adding custom hooks for reusable logic
// Create hooks/useLocalStorage.js:

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Usage:
const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage('sidebar-collapsed', false);