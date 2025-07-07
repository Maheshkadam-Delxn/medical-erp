"use client"
import React from "react";
import { FaUsers, FaUserClock, FaUserCheck, FaUserPlus } from "react-icons/fa";

const UserAnalytics = () => {
  return (
    <div className="bg-gray">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-800 flex items-center">
          <FaUsers className="mr-2" /> User Analytics
        </h2>
        <div className="flex gap-3">
          <select className="border border-green-200 rounded-lg px-4 py-2">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-green-700">24</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">↑ 2 from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 font-medium">Active Now</h3>
              <p className="text-2xl font-bold text-blue-700">5</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserClock className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 font-medium">Active Today</h3>
              <p className="text-2xl font-bold text-purple-700">12</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUserCheck className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 font-medium">New This Month</h3>
              <p className="text-2xl font-bold text-orange-700">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FaUserPlus className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-green-200">
          <p className="text-gray-500">User activity chart will appear here</p>
        </div>
        <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-green-200">
          <p className="text-gray-500">User role distribution will appear here</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-green-800 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg -white rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaUserPlus className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-sm text-gray-600">Pharmacist account created for Sarah Johnson</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaUserCheck className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Login activity</p>
              <p className="text-sm text-gray-600">Admin user logged in from 192.168.1.45</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;