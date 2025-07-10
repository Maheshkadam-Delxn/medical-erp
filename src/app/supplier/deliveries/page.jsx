"use client";
import { useState } from "react";
import { Truck, Calendar, CheckCircle, X, Plus } from "lucide-react";

export default function DeliveriesDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    destination: "",
    date: "",
    driver: ""
  });

  const deliveries = [
    { id: "DEL-001", destination: "123 Main St", date: "2023-05-18", status: "In Transit", driver: "John Smith" },
    { id: "DEL-002", destination: "456 Oak Ave", date: "2023-05-19", status: "Scheduled", driver: "Sarah Johnson" },
    { id: "DEL-003", destination: "789 Pine Rd", date: "2023-05-17", status: "Delivered", driver: "Mike Brown" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log("New delivery scheduled:", newDelivery);
    setIsDialogOpen(false);
    // Reset form
    setNewDelivery({ destination: "", date: "", driver: "" });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Truck className="h-6 w-6 text-indigo-600" /> Deliveries
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage your deliveries and shipments</p>
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Schedule Delivery
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm">Scheduled</div>
          <div className="text-2xl font-bold mt-1">{deliveries.filter(d => d.status === "Scheduled").length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm">In Transit</div>
          <div className="text-2xl font-bold mt-1">{deliveries.filter(d => d.status === "In Transit").length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm">Completed</div>
          <div className="text-2xl font-bold mt-1">{deliveries.filter(d => d.status === "Delivered").length}</div>
        </div>
      </div>

      {/* Delivery Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scheduled Deliveries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Deliveries
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "Scheduled").map((delivery) => (
              <div key={delivery.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                </div>
                <div className="mt-3 text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Driver: </span>
                    <span className="font-medium">{delivery.driver}</span>
                  </div>
                  <div className="text-gray-500 text-xs">{delivery.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5 text-yellow-500" />
              In Transit
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "In Transit").map((delivery) => (
              <div key={delivery.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">In Transit</span>
                </div>
                <div className="mt-3 text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Driver: </span>
                    <span className="font-medium">{delivery.driver}</span>
                  </div>
                  <button className="rounded-md bg-indigo-50 text-indigo-600 py-1 px-3 text-xs hover:bg-indigo-100 transition-colors">
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Completed
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "Delivered").map((delivery) => (
              <div key={delivery.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Delivered</span>
                </div>
                <div className="mt-3 text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500">Driver: </span>
                    <span className="font-medium">{delivery.driver}</span>
                  </div>
                  <div className="text-gray-500 text-xs">{delivery.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Delivery Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Schedule New Delivery</h3>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Address
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={newDelivery.destination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newDelivery.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  id="driver"
                  name="driver"
                  value={newDelivery.driver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Schedule Delivery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}