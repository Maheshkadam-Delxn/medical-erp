'use client';

import { useState } from 'react';
import { Plus, Printer, Download, Search, ChevronDown, Filter, MoreVertical, X } from 'lucide-react';

const samplePOs = [
  {
    poNo: 'PO001',
    date: '2025-07-06',
    supplier: 'Medilink Ltd',
    items: 5,
    total: 2300,
    status: 'Delivered',
    payment: 'Paid',
    deliveryDate: '2025-07-10'
  },
  {
    poNo: 'PO002',
    date: '2025-07-07',
    supplier: 'Cipla',
    items: 3,
    total: 1200,
    status: 'Pending',
    payment: 'Pending',
    deliveryDate: '2025-07-15'
  },
  {
    poNo: 'PO003',
    date: '2025-07-05',
    supplier: 'Sun Pharma',
    items: 8,
    total: 4500,
    status: 'Processing',
    payment: 'Partial',
    deliveryDate: '2025-07-12'
  },
  {
    poNo: 'PO004',
    date: '2025-07-08',
    supplier: 'GlaxoSmithKline',
    items: 2,
    total: 1800,
    status: 'Cancelled',
    payment: 'Refunded',
    deliveryDate: 'N/A'
  },
];

const statusOptions = ['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'];
const paymentOptions = ['All', 'Paid', 'Pending', 'Partial', 'Refunded'];

export default function PurchaseOrderPage() {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showPOForm, setShowPOForm] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    items: [],
    deliveryDate: '',
    notes: ''
  });

  const filteredPOs = samplePOs.filter(
    (po) =>
      (po.supplier.toLowerCase().includes(search.toLowerCase()) ||
        po.poNo.toLowerCase().includes(search.toLowerCase())) &&
      (selectedStatus === 'All' || po.status === selectedStatus) &&
      (selectedPayment === 'All' || po.payment === selectedPayment)
  );

  const statusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const paymentColor = (payment) => {
    switch (payment) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Partial':
        return 'bg-blue-100 text-blue-800';
      case 'Refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new PO object
    const newPO = {
      poNo: `PO${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      supplier: formData.supplier,
      items: formData.items.length,
      total: formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      status: 'Pending',
      payment: 'Pending',
      deliveryDate: formData.deliveryDate || 'N/A'
    };
    
    // Add to samplePOs
    samplePOs.unshift(newPO);
    
    // Reset form and close modal
    setFormData({
      supplier: '',
      items: [],
      deliveryDate: '',
      notes: ''
    });
    setShowPOForm(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* New Purchase Order Modal */}
      {showPOForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">New Purchase Order</h2>
              <button 
                onClick={() => setShowPOForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier*</label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Supplier</option>
                    <option value="Medilink Ltd">Medilink Ltd</option>
                    <option value="Cipla">Cipla</option>
                    <option value="Sun Pharma">Sun Pharma</option>
                    <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">Items</h3>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Plus size={16} /> Add Item
                  </button>
                </div>
                
                {formData.items.length > 0 ? (
                  <div className="space-y-4">
                    {formData.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <input
                            type="text"
                            placeholder="Item name"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            required
                            className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            placeholder="Qty"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            required
                            className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            placeholder="Price per unit"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            required
                            className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                    No items added yet
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional notes or instructions..."
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPOForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
                >
                  Create Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Purchase Orders</h1>
          <p className="text-gray-600">Manage and track your pharmacy purchase orders</p>
        </div>
        <button 
          onClick={() => setShowPOForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          <Plus size={16} /> New Purchase Order
        </button>
      </div>

      {/* Filter/Search Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by PO number, supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} /> Filters <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
              <select
                value={selectedPayment}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {paymentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">24</p>
          <p className="text-green-600 text-sm mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-2xl font-bold text-gray-800">18</p>
          <p className="text-green-600 text-sm mt-1">75% success rate</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
          <p className="text-2xl font-bold text-gray-800">4</p>
          <p className="text-yellow-600 text-sm mt-1">2 awaiting approval</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium">Cancelled</h3>
          <p className="text-2xl font-bold text-gray-800">2</p>
          <p className="text-red-600 text-sm mt-1">8% cancellation rate</p>
        </div>
      </div>

      {/* Table of Purchase Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PO No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPOs.length > 0 ? (
                filteredPOs.map((po, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {po.poNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {po.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {po.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {po.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      ₹{po.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(po.status)}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColor(po.payment)}`}>
                        {po.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {po.deliveryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 hover:underline">
                          View
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No purchase orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                <span className="font-medium">12</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </button>
                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}