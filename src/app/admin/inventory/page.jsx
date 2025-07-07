"use client"
import React, { useState, useEffect } from "react";
import { 
  FaBoxes, 
  FaExclamationTriangle, 
  FaSearch, 
  FaFilter,
  FaPlus,
  FaFileExport,
  FaChartLine
} from "react-icons/fa";

const InventoryDashboard = () => {
  // Sample Inventory Data
  const [inventory, setInventory] = useState([
    { id: 1, name: "Paracetamol 500mg", category: "OTC", stock: 45, reorderLevel: 50, status: "low", price: 5.99, supplier: "MediCorp" },
    { id: 2, name: "Amoxicillin 250mg", category: "Prescription", stock: 120, reorderLevel: 60, status: "good", price: 12.50, supplier: "PharmaPlus" },
    { id: 3, name: "Vitamin D3", category: "Wellness", stock: 15, reorderLevel: 30, status: "urgent", price: 9.99, supplier: "HealthSupplies" },
    { id: 4, name: "Ibuprofen 200mg", category: "OTC", stock: 80, reorderLevel: 40, status: "good", price: 6.25, supplier: "MediCorp" },
    { id: 5, name: "Omeprazole 20mg", category: "Prescription", stock: 25, reorderLevel: 50, status: "low", price: 8.75, supplier: "PharmaPlus" },
    { id: 6, name: "Bandages (Pack of 10)", category: "First Aid", stock: 60, reorderLevel: 30, status: "good", price: 4.50, supplier: "FirstAid Ltd" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockStatus, setStockStatus] = useState("All");

  // Filter inventory based on search, category, and stock status
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesStockStatus = 
      stockStatus === "All" || 
      (stockStatus === "low" && item.status === "low") ||
      (stockStatus === "urgent" && item.status === "urgent") ||
      (stockStatus === "good" && item.status === "good");
    
    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  // Categories for filtering
  const categories = ["All", "OTC", "Prescription", "Wellness", "First Aid"];

  // Stock status options
  const stockStatusOptions = ["All", "good", "low", "urgent"];

  // Summary Stats
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.status === "low" || item.status === "urgent").length;
  const outOfStockItems = inventory.filter(item => item.stock === 0).length;

  return (
    <div className=" bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 font-medium">Total Products</h3>
          <p className="text-3xl font-bold">{totalItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 font-medium">Low Stock Items</h3>
          <p className="text-3xl font-bold text-yellow-600">{lowStockItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 font-medium">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-600">{outOfStockItems}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 ">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border  rounded-lg px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value)}
          >
            {stockStatusOptions.map(status => (
              <option key={status} value={status}>
                {status === "good" ? "In Stock" : status === "low" ? "Low Stock" : status === "urgent" ? "Urgent" : "All Status"}
              </option>
            ))}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.reorderLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "urgent" ? "bg-red-100 text-red-800" :
                      item.status === "low" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {item.status === "urgent" ? "Urgent" : item.status === "low" ? "Low" : "In Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Alerts Section */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" /> Stock Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory
            .filter(item => item.status === "urgent" || item.status === "low")
            .map(item => (
              <div key={item.id} className={`p-3 rounded-lg ${
                item.status === "urgent" ? "bg-red-50 border-l-4 border-red-500" : "bg-yellow-50 border-l-4 border-yellow-500"
              }`}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <span className={`text-xs font-medium ${
                    item.status === "urgent" ? "text-red-600" : "text-yellow-600"
                  }`}>
                    {item.status === "urgent" ? "URGENT" : "LOW STOCK"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Current: {item.stock} | Reorder: {item.reorderLevel}</p>
                <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded">
                  Reorder Now
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;