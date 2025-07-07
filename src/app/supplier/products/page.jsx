"use client";
import { Package, Plus, Search } from "lucide-react";

export default function ProductsDashboard() {
  const products = [
    { id: "PROD-001", name: "Pain Reliever", category: "Medicine", stock: 45, price: "$5.99" },
    { id: "PROD-002", name: "Vitamin C", category: "Supplements", stock: 32, price: "$12.99" },
    { id: "PROD-003", name: "Bandages", category: "First Aid", stock: 78, price: "$3.50" },
  ];

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="h-6 w-6" /> Products
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              placeholder="Search products..." 
              className="pl-10 w-[300px] rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
            />
          </div>
          <button className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="font-semibold">Product Inventory</h3>
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-50">
              Export
            </button>
            <button className="rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-50">
              Import
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-5 gap-4 p-4 font-medium">
            <div>Product ID</div>
            <div>Name</div>
            <div>Category</div>
            <div>Stock</div>
            <div>Price</div>
          </div>
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50">
              <div className="font-medium">{product.id}</div>
              <div>{product.name}</div>
              <div>{product.category}</div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.stock > 50 ? "bg-green-100 text-green-800" :
                  product.stock > 20 ? "bg-blue-100 text-blue-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {product.stock} in stock
                </span>
              </div>
              <div>{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}