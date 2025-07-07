"use client"
import React from "react";
import { FaBoxes, FaFileExport, FaSearch, FaExclamationTriangle } from "react-icons/fa";

const InventoryReport = () => {
  return (
    <div className="bg-gray">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-800 flex items-center">
          <FaBoxes className="mr-2" /> Inventory Report
        </h2>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaFileExport /> Export
          </button>
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-10 pr-4 py-2 border border-green-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border border-green-100">
          <h3 className="text-gray-600 font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-green-700">428</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-yellow-100">
          <h3 className="text-gray-600 font-medium">Low Stock Items</h3>
          <p className="text-2xl font-bold text-yellow-700">18</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-red-100">
          <h3 className="text-gray-600 font-medium">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-700">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <h3 className="text-gray-600 font-medium">Expiring Soon</h3>
          <p className="text-2xl font-bold text-blue-700">12</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-green-800 mb-3 flex items-center">
          <FaExclamationTriangle className="text-yellow-500 mr-2" />
          Stock Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
            <div className="flex justify-between">
              <h4 className="font-medium">Paracetamol 500mg</h4>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">LOW STOCK</span>
            </div>
            <p className="text-sm">Current: 8 | Reorder: 15</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
            <div className="flex justify-between">
              <h4 className="font-medium">Amoxicillin 250mg</h4>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">OUT OF STOCK</span>
            </div>
            <p className="text-sm">Current: 0 | Reorder: 20</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-green-800 mb-3">Inventory Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Paracetamol 500mg</td>
                <td className="px-6 py-4 whitespace-nowrap">OTC</td>
                <td className="px-6 py-4 whitespace-nowrap">8</td>
                <td className="px-6 py-4 whitespace-nowrap">15</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Low</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Amoxicillin 250mg</td>
                <td className="px-6 py-4 whitespace-nowrap">Prescription</td>
                <td className="px-6 py-4 whitespace-nowrap">0</td>
                <td className="px-6 py-4 whitespace-nowrap">20</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Out of Stock</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;