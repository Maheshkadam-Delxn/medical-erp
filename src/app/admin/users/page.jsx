"use client"
import React, { useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaUserEdit,
  FaUserLock,
  FaSearch,
  FaFilter,
  FaTrash,
  FaKey,
  FaUserShield
} from "react-icons/fa";

const UserManagement = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@pharmacy.com", role: "Admin", status: "Active", lastLogin: "2023-06-15" },
    { id: 2, name: "Pharmacist 1", email: "pharm1@pharmacy.com", role: "Pharmacist", status: "Active", lastLogin: "2023-06-14" },
    { id: 3, name: "Cashier 1", email: "cashier1@pharmacy.com", role: "Cashier", status: "Active", lastLogin: "2023-06-10" },
    { id: 4, name: "Inventory Manager", email: "inventory@pharmacy.com", role: "Inventory", status: "Inactive", lastLogin: "2023-05-28" },
    { id: 5, name: "Pharmacist 2", email: "pharm2@pharmacy.com", role: "Pharmacist", status: "Active", lastLogin: "2023-06-12" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Roles for filtering
  const roles = ["All", "Admin", "Pharmacist", "Cashier", "Inventory"];

  // Status options
  const statusOptions = ["All", "Active", "Inactive"];

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === "Active").length;
  const adminUsers = users.filter(user => user.role === "Admin").length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <FaUsers className="inline mr-2 text-green-600" />
          User Management
        </h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaUserPlus /> Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-green-700">{totalUsers}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-green-700">{activeUsers}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Admin Users</h3>
          <p className="text-3xl font-bold text-green-700">{adminUsers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-green-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin" ? "bg-green-100 text-green-800" :
                      user.role === "Pharmacist" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
                        <FaUserEdit title="Edit User" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50">
                        <FaKey title="Reset Password" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50">
                        <FaTrash title="Delete User" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-green-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
          <FaUserShield className="text-green-600" /> Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaUserPlus className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">New user created</p>
              <p className="text-sm text-gray-600">Pharmacist 2 was added by Admin User</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaKey className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Password reset</p>
              <p className="text-sm text-gray-600">Cashier 1 reset their password</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;