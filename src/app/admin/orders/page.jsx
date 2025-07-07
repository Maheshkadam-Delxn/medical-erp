"use client"
import React, { useState } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaPrint,
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt
} from "react-icons/fa";

const OrderManagement = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    { id: 1001, customer: "John Doe", date: "2023-06-15", status: "Completed", total: 125.75, items: 5, payment: "Credit Card" },
    { id: 1002, customer: "Jane Smith", date: "2023-06-14", status: "Processing", total: 89.50, items: 3, payment: "Cash" },
    { id: 1003, customer: "Robert Johnson", date: "2023-06-14", status: "Shipped", total: 210.25, items: 8, payment: "Credit Card" },
    { id: 1004, customer: "Emily Davis", date: "2023-06-13", status: "Pending", total: 45.90, items: 2, payment: "Mobile Payment" },
    { id: 1005, customer: "Michael Brown", date: "2023-06-12", status: "Cancelled", total: 76.30, items: 4, payment: "Credit Card" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toString().includes(searchTerm);
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    const matchesDate = dateFilter === "All" || order.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Status options
  const statusOptions = ["All", "Pending", "Processing", "Shipped", "Completed", "Cancelled"];

  // Date options
  const dateOptions = ["All", "2023-06-15", "2023-06-14", "2023-06-13", "2023-06-12"];

  // Stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === "Completed").length;
  const revenue = orders.filter(order => order.status === "Completed").reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <FaShoppingCart className="inline mr-2 text-green-600" />
          Order Management
        </h1>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPrint /> Print Reports
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-green-700">{totalOrders}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-700">{completedOrders}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <h3 className="text-gray-600 font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-700">${revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-green-600" />
            <input
              type="text"
              placeholder="Search orders by customer or ID..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-400"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 focus:border-green-400"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            {dateOptions.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-green-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-green-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Completed" ? "bg-green-100 text-green-800" :
                      order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                      order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50">
                        <FaEye title="View Details" />
                      </button>
                      {order.status === "Pending" && (
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50">
                          <FaCheckCircle title="Process Order" />
                        </button>
                      )}
                      {order.status === "Processing" && (
                        <button className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-50">
                          <FaTruck title="Mark as Shipped" />
                        </button>
                      )}
                      {order.status !== "Completed" && order.status !== "Cancelled" && (
                        <button className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50">
                          <FaTimesCircle title="Cancel Order" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <FaCalendarAlt className="text-green-600" /> Today's Orders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders
            .filter(order => order.date === "2023-06-15")
            .map(order => (
              <div key={order.id} className="p-3 bg-green-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Completed" ? "bg-green-100 text-green-800" :
                    order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>${order.total.toFixed(2)}</span>
                  <span>{order.items} items</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;