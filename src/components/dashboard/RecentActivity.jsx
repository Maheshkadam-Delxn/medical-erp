// src/components/dashboard/RecentActivity.jsx
'use client';
import { Clock, User, Package, ShoppingCart } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: 'New order placed',
      user: 'Dr. Sharma',
      time: '10 mins ago',
      icon: <ShoppingCart className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 2,
      action: 'Inventory updated',
      user: 'Pharmacist Patel',
      time: '25 mins ago',
      icon: <Package className="w-4 h-4 text-blue-500" />
    },
    {
      id: 3,
      action: 'New user registered',
      user: 'Nurse Gupta',
      time: '1 hour ago',
      icon: <User className="w-4 h-4 text-purple-500" />
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="mt-1 p-2 rounded-full bg-gray-100">
            {activity.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.action}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3" />
              <span>{activity.time} • by {activity.user}</span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full mt-4 text-sm text-green-600 hover:text-emerald-700 font-medium flex items-center justify-center gap-2">
        View all activity
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}