"use client"
import React from "react";
import { FaChartLine, FaFileExport, FaFilter, FaCalendarAlt } from "react-icons/fa";

const SalesReport = () => {
  return (
    <div className="bg-gray   ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-green-800 flex items-center">
          <FaChartLine className="mr-2" /> Sales Report
        </h2>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaFileExport /> Export
          </button>
          <button className="border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center">
          <FaCalendarAlt className="text-green-600 mr-2" />
          <span className="text-sm text-gray-600">Date Range:</span>
          <select className="ml-2 border border-green-200 rounded px-3 py-1 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border border-green-100">
          <h3 className="text-gray-600 font-medium">Total Sales</h3>
          <p className="text-2xl font-bold text-green-700">$24,580.75</p>
          <p className="text-sm text-green-600">↑ 12% from last period</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-100">
          <h3 className="text-gray-600 font-medium">Transactions</h3>
          <p className="text-2xl font-bold text-green-700">428</p>
          <p className="text-sm text-green-600">↑ 8% from last period</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-100">
          <h3 className="text-gray-600 font-medium">Avg. Order Value</h3>
          <p className="text-2xl font-bold text-green-700">$57.43</p>
          <p className="text-sm text-green-600">↑ 3.5% from last period</p>
        </div>
      </div>

      {/* Placeholder for chart */}
      <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-green-200">
        <p className="text-gray-500">Sales chart visualization will appear here</p>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-green-800 mb-3">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase">% of Sales</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Paracetamol 500mg</td>
                <td className="px-6 py-4 whitespace-nowrap">320</td>
                <td className="px-6 py-4 whitespace-nowrap">$1,920.00</td>
                <td className="px-6 py-4 whitespace-nowrap">7.8%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Amoxicillin 250mg</td>
                <td className="px-6 py-4 whitespace-nowrap">280</td>
                <td className="px-6 py-4 whitespace-nowrap">$3,500.00</td>
                <td className="px-6 py-4 whitespace-nowrap">14.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Vitamin D3</td>
                <td className="px-6 py-4 whitespace-nowrap">195</td>
                <td className="px-6 py-4 whitespace-nowrap">$1,950.00</td>
                <td className="px-6 py-4 whitespace-nowrap">7.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;