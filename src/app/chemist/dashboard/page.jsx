"use client"
export default function ChemistDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Appointments Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Today's Appointments</h3>
          <p className="text-4xl font-bold text-purple-600">12</p>
          <p className="text-sm text-gray-500 mt-1">+3 from yesterday</p>
        </div>

        {/* Pending Prescriptions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Pending Prescriptions</h3>
          <p className="text-4xl font-bold text-purple-600">8</p>
          <p className="text-sm text-gray-500 mt-1">Needs review</p>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Inventory Alerts</h3>
          <p className="text-4xl font-bold text-red-500">3</p>
          <p className="text-sm text-gray-500 mt-1">Low stock medicines</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-600">✔ New prescription uploaded by Dr. Mehta</span>
          </li>
          <li className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-600">⚠ Paracetamol stock is below threshold</span>
          </li>
          <li className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-600">📦 Inventory updated for Vitamin C</span>
          </li>
        </ul>
      </div>
    </div>
  );
}