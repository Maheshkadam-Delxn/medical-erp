'use client';

import React from 'react';
import { CheckCircle, UserX, Plus, FileDown, Users, UserCheck, Clock, Shield, Eye, Mail, Calendar } from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const stats = [
    { label: 'Total Suppliers', value: 124, icon: Users, color: 'from-green-500 to-emerald-600' },
    { label: 'Medical Admins', value: 48, icon: UserCheck, color: 'from-green-600 to-green-700' },
    { label: 'Pending Approvals', value: 7, icon: Clock, color: 'from-amber-500 to-orange-600' },
    { label: 'Blocked Accounts', value: 3, icon: Shield, color: 'from-red-500 to-red-600' },
  ];

  const pending = [
    { 
      name: 'Asha Pharma', 
      role: 'Supplier', 
      email: 'contact@ashapharma.com',
      date: '2025-07-15',
      status: 'Document Review',
      priority: 'High'
    },
    { 
      name: 'Dr. Rajesh Kumar', 
      role: 'Medical Admin', 
      email: 'dr.rajesh@hospital.com',
      date: '2025-07-14',
      status: 'Verification',
      priority: 'Medium'
    },
    { 
      name: 'MedSupply Co.', 
      role: 'Supplier', 
      email: 'info@medsupply.com',
      date: '2025-07-13',
      status: 'License Check',
      priority: 'Low'
    },
  ];

  const recent = [
    { 
      name: 'BioLab Inc.', 
      role: 'Supplier', 
      email: 'admin@biolab.com',
      date: '2025-07-16',
      approvedBy: 'Admin John'
    },
    { 
      name: 'Dr. Meena Sharma', 
      role: 'Medical Admin', 
      email: 'dr.meena@clinic.com',
      date: '2025-07-16',
      approvedBy: 'Admin Sarah'
    },
    { 
      name: 'PharmaCorp Ltd.', 
      role: 'Supplier', 
      email: 'contact@pharmacorp.com',
      date: '2025-07-15',
      approvedBy: 'Admin Mike'
    },
  ];

  const blocked = [
    { 
      name: 'Old Supplier Co.', 
      role: 'Supplier', 
      email: 'old@supplier.com',
      reason: 'License expired',
      blockedDate: '2025-07-10',
      severity: 'High'
    },
    { 
      name: 'Dr. Unverified', 
      role: 'Medical Admin', 
      email: 'unverified@email.com',
      reason: 'Repeated login failures',
      blockedDate: '2025-07-12',
      severity: 'Medium'
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        
<div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    <h1 className="text-3xl font-bold text-green-800">Super Admin Dashboard</h1>
    <p className="text-green-600 text-sm">Manage users, approvals, and system oversight</p>
  </div>
  <div className="flex gap-4">
  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base font-semibold">
    <Plus size={20} /> Add Admin
  </button>
  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base font-semibold">
    <Plus size={20} /> Add Supplier
  </button>
</div>

</div>


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Eye className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Pending Approvals */}
       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Approvals
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                User Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pending.map((user, i) => (
              <tr key={i} className="hover:bg-green-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {user.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-center">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors">
                      <UserX size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


        {/* Recently Added Users */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Recently Added Users
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Approved By</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-800 uppercase tracking-wider">Date Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recent.map((user, i) => (
                  <tr key={i} className="hover:bg-emerald-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{user.approvedBy}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Blocked Users
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Reason</th>
                 
                  <th className="px-6 py-4 text-left text-xs font-semibold text-red-800 uppercase tracking-wider">Blocked Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blocked.map((user, i) => (
                  <tr key={i} className="hover:bg-red-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 italic">{user.reason}</span>
                    </td>
                   
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {user.blockedDate}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}