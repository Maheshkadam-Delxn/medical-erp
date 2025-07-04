// src/components/dashboard/StatCard.jsx
'use client';
import { ArrowUp, ArrowDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const StatCard = ({ title, value, change, trend, icon }) => {
  const LucideIcon = dynamic(() => 
    import('lucide-react').then(mod => mod[icon]), 
    { ssr: false }
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          {LucideIcon && <LucideIcon className="w-5 h-5" />}
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <div className={`flex items-center text-sm ${
          trend === 'up' ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {change}
          {trend === 'up' ? (
            <ArrowUp className="w-4 h-4 ml-1" />
          ) : (
            <ArrowDown className="w-4 h-4 ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;