"use client";
import { Truck, Calendar, CheckCircle } from "lucide-react";

export default function DeliveriesDashboard() {
  const deliveries = [
    { id: "DEL-001", destination: "123 Main St", date: "2023-05-18", status: "In Transit", driver: "John Smith" },
    { id: "DEL-002", destination: "456 Oak Ave", date: "2023-05-19", status: "Scheduled", driver: "Sarah Johnson" },
    { id: "DEL-003", destination: "789 Pine Rd", date: "2023-05-17", status: "Delivered", driver: "Mike Brown" },
  ];

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="h-6 w-6" /> Deliveries
        </h2>
        <button className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700">
          + Schedule Delivery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scheduled Deliveries */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h3 className="font-semibold">Upcoming Deliveries</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "Scheduled").map((delivery) => (
              <div key={delivery.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Driver: </span>
                  {delivery.driver}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Transit */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h3 className="font-semibold">In Transit</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "In Transit").map((delivery) => (
              <div key={delivery.id} className="p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Driver: </span>
                    {delivery.driver}
                  </div>
                  <button className="rounded-md border border-gray-300 py-1 px-2 text-xs hover:bg-gray-50">
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h3 className="font-semibold">Completed</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {deliveries.filter(d => d.status === "Delivered").map((delivery) => (
              <div key={delivery.id} className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">{delivery.id}</div>
                    <div className="text-sm text-gray-500">{delivery.destination}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Driver: </span>
                  {delivery.driver}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}