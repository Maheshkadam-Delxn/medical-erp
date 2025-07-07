"use client";
import { ShoppingCart, Filter, Search } from "lucide-react";

export default function OrdersDashboard() {
  const orders = [
    { id: "#ORD-001", customer: "John Doe", date: "2023-05-15", status: "Completed", amount: "$120.00" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2023-05-16", status: "Processing", amount: "$85.50" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "2023-05-17", status: "Pending", amount: "$210.00" },
  ];

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" /> Orders
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              placeholder="Search orders..." 
              className="pl-10 w-[300px] rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
            />
          </div>
          <button className="flex items-center gap-2 rounded-md border border-gray-300 py-2 px-4 hover:bg-gray-50">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700">
            + New Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed" ? "bg-green-100 text-green-800" :
                      order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">Showing 1 to 3 of 3 entries</div>
          <div className="flex gap-2">
            <button className="rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="rounded-md border border-gray-300 py-1 px-3 hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}