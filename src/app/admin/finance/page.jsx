"use client";
import React, { useState } from "react";
import {
  FaDollarSign,
  FaChartLine,
  FaBoxes,
  FaFileInvoiceDollar,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const FinanceDashboard = () => {
  // Sample data
  const [metrics, setMetrics] = useState({
    totalRevenue: 48250,
    grossProfitMargin: 62,
    netProfit: 18500,
    inventoryTurnover: 3.2,
    accountsReceivable: 12500,
    accountsPayable: 8500,
    expenses: {
      payroll: 12000,
      rentUtilities: 5000,
      inventoryPurchases: 18000,
      other: 3500,
    },
  });

  const [salesData, setSalesData] = useState([
    { product: "Product A", units: 320, revenue: 12500, margin: 65 },
    { product: "Product B", units: 280, revenue: 9800, margin: 60 },
    { product: "Product C", units: 195, revenue: 7500, margin: 58 },
  ]);

  const [inventoryData, setInventoryData] = useState([
    { product: "Product A", stock: 45, reorder: 50, status: "low" },
    { product: "Product B", stock: 120, reorder: 60, status: "good" },
    { product: "Product C", stock: 15, reorder: 30, status: "urgent" },
  ]);

  const [alerts, setAlerts] = useState([
    { type: "expiring", count: 5, message: "items near expiry" },
    { type: "overdue", count: 3, message: "customers > 60 days overdue" },
    { type: "low-stock", count: 2, message: "items below reorder level" },
  ]);

  // Simple bar chart component
  const BarChart = ({ data, labels, colors }) => {
    const maxValue = Math.max(...data);

    return (
      <div className="flex items-end h-40 mt-4 space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-t-sm transition-all duration-300"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: colors[index],
                minHeight: "2px", // Ensures tiny values are still visible
              }}
            />
            <span className="text-xs mt-2 text-gray-600">{labels[index]}</span>
            <span className="text-xs font-medium mt-1">{value}%</span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Finance Dashboard
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<FaDollarSign className="text-blue-500" />}
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          trend={5}
        />
        <MetricCard
          icon={<FaChartLine className="text-green-500" />}
          title="Gross Profit Margin"
          value={`${metrics.grossProfitMargin}%`}
          trend={2}
        />
        <MetricCard
          icon={<FaDollarSign className="text-purple-500" />}
          title="Net Profit"
          value={`$${metrics.netProfit.toLocaleString()}`}
          trend={4}
        />
        <MetricCard
          icon={<FaBoxes className="text-orange-500" />}
          title="Inventory Turnover"
          value={metrics.inventoryTurnover}
          trend={-1}
        />
      </div>

      {/* Sales Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <div className="h-64 flex items-end space-x-2">
            {[32000, 35000, 40000, 42000, 45000, 48250].map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-green-500 rounded-t-sm"
                style={{ height: `${(value / 50000) * 100}%` }}
              />
              
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="space-y-3 mt-4">
            {[95, 80, 75, 70 ,66, 65, 60 ].map((value, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24 text-sm text-gray-600">
                  {["Prescription", "OTC", "Healthcare","Wellness","Personal Care Products","Home Healthcare Products","Diabetic Care"][index]}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${value}%`,
                      backgroundColor: ["#4BC0C0", "#FF9F40", "#2366FF", "#dbb107", "#db6a07", "#db0b07","#75db07","#07db8d"][index],
                    }}
                  />
                </div>
                <span className="ml-2 text-sm font-medium w-10">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-50 text-blue-500">{icon}</div>
      </div>
      <div
        className={`mt-2 flex items-center text-sm ${
          trend >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {trend >= 0 ? (
          <FaArrowUp className="mr-1" />
        ) : (
          <FaArrowDown className="mr-1" />
        )}
        {Math.abs(trend)}% vs last period
      </div>
    </div>
  );
};

export default FinanceDashboard;
