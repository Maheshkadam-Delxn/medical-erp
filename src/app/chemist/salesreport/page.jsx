'use client';

import { useState } from 'react';
import { Download, Printer, Search, Filter, ArrowUpDown, ChevronDown, User, Pill, Award, Activity } from 'lucide-react';

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState('sales');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('week');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Sample data
  const staffPerformance = [
    {
      id: 1,
      name: 'Dr. Sharma',
      position: 'Head Pharmacist',
      customersServed: 42,
      prescriptionsFilled: 38,
      salesAmount: 12500,
      efficiency: 92,
    },
    {
      id: 2,
      name: 'Dr. Patel',
      position: 'Pharmacist',
      customersServed: 35,
      prescriptionsFilled: 28,
      salesAmount: 9800,
      efficiency: 85,
    },
    {
      id: 3,
      name: 'Dr. Gupta',
      position: 'Intern',
      customersServed: 22,
      prescriptionsFilled: 15,
      salesAmount: 6500,
      efficiency: 78,
    }
  ];

  const topProducts = [
    {
      name: 'Paracetamol 500mg',
      sales: 120,
      revenue: 6000,
      category: 'Pain Relief'
    },
    {
      name: 'Amoxicillin 250mg',
      sales: 85,
      revenue: 4250,
      category: 'Antibiotic'
    },
    {
      name: 'Dolo 650',
      sales: 78,
      revenue: 3900,
      category: 'Fever'
    },
    {
      name: 'Cetirizine',
      sales: 65,
      revenue: 1950,
      category: 'Allergy'
    },
    {
      name: 'Omeprazole',
      sales: 52,
      revenue: 2600,
      category: 'Acidity'
    }
  ];

  const recentSales = [
    {
      invoice: 'RX-001',
      date: '2025-07-07',
      staff: 'Sharma',
      products: 'Paracetamol, Amoxicillin',
      qty: 3,
      total: 150,
      mode: 'Cash',
      status: 'Dispensed',
      prescription: 'Yes',
      discount: 10,
    },
    {
      invoice: 'RX-002',
      date: '2025-07-07',
      staff: 'Patel',
      products: 'Dolo 650, Vitamin C',
      qty: 5,
      total: 225,
      mode: 'Insurance',
      status: 'Pending',
      prescription: 'Yes',
      discount: 15,
    },
    {
      invoice: 'RX-003',
      date: '2025-07-06',
      staff: 'Gupta',
      products: 'Cetirizine, Zinc',
      qty: 2,
      total: 120,
      mode: 'UPI',
      status: 'Dispensed',
      prescription: 'No',
      discount: 0,
    },
  ];

  // Calculate metrics
  const totalSales = recentSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCustomers = staffPerformance.reduce((sum, staff) => sum + staff.customersServed, 0);
  const totalPrescriptions = staffPerformance.reduce((sum, staff) => sum + staff.prescriptionsFilled, 0);
  const avgEfficiency = staffPerformance.reduce((sum, staff) => sum + staff.efficiency, 0) / staffPerformance.length;

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pharmacy Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive view of sales and staff performance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'sales' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'staff' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('staff')}
        >
          Staff Performance
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('products')}
        >
          Top Products
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder={activeTab === 'staff' ? "Search staff..." : activeTab === 'products' ? "Search products..." : "Search sales..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Filter size={16} className="text-gray-600" />
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'sales' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow text-white">
              <h3 className="text-sm font-medium">Total Sales</h3>
              <p className="text-2xl font-bold mt-2">₹{totalSales.toFixed(2)}</p>
              <p className="text-xs mt-1 opacity-80">This {dateRange}</p>
            </div>
            <div className="p-5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow text-white">
              <h3 className="text-sm font-medium">Customers Served</h3>
              <p className="text-2xl font-bold mt-2">{totalCustomers}</p>
              <p className="text-xs mt-1 opacity-80">By all staff</p>
            </div>
            <div className="p-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow text-white">
              <h3 className="text-sm font-medium">Prescriptions</h3>
              <p className="text-2xl font-bold mt-2">{totalPrescriptions}</p>
              <p className="text-xs mt-1 opacity-80">Filled</p>
            </div>
            <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow text-white">
              <h3 className="text-sm font-medium">Avg. Efficiency</h3>
              <p className="text-2xl font-bold mt-2">{avgEfficiency.toFixed(1)}%</p>
              <p className="text-xs mt-1 opacity-80">Staff performance</p>
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RX No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicines</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentSales.map((sale, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{sale.invoice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          {sale.staff}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{sale.products}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{sale.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sale.status === 'Dispensed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'staff' && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Staff Performance</h2>
            <p className="text-sm text-gray-600">This {dateRange}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescriptions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffPerformance.map((staff, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="text-blue-600" size={16} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{staff.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.customersServed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.prescriptionsFilled}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{staff.salesAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              staff.efficiency > 90 ? 'bg-green-500' : 
                              staff.efficiency > 75 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`} 
                            style={{ width: `${staff.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{staff.efficiency}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Top Products Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-sm font-medium text-gray-500">Top Selling Product</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Pill className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold">{topProducts[0].name}</p>
                  <p className="text-sm text-gray-500">{topProducts[0].sales} units sold</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-sm font-medium text-gray-500">Highest Revenue</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold">{topProducts[0].name}</p>
                  <p className="text-sm text-gray-500">₹{topProducts[0].revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-sm font-medium text-gray-500">Most Popular Category</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Pain Relief</p>
                  <p className="text-sm text-gray-500">120 units sold</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <p className="text-sm text-gray-600">This {dateRange}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topProducts.map((product, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <Pill size={16} className="text-gray-400" />
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{product.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                idx < 2 ? 'bg-green-500' : 
                                idx < 4 ? 'bg-blue-500' : 'bg-yellow-500'
                              }`} 
                              style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{Math.round((product.sales / topProducts[0].sales) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}