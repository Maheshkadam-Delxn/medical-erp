'use client';

import { useState } from 'react';
import { 
  User, 
  Store, 
  CreditCard, 
  Package, 
  Printer, 
  Plug, 
  HardDrive,
  Check,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    store: false,
    billing: false,
    inventory: false,
    print: false,
    integrations: false,
    backup: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="bg-blue-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          Pharmacy Settings
        </h2>
        
        <nav className="space-y-1">
          <button
            onClick={() => { setActiveTab('profile'); toggleSection('profile'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </div>
            {expandedSections.profile ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('store'); toggleSection('store'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'store' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <Store className="h-5 w-5 mr-3" />
              <span>Store Info</span>
            </div>
            {expandedSections.store ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('billing'); toggleSection('billing'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'billing' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3" />
              <span>Billing</span>
            </div>
            {expandedSections.billing ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); toggleSection('inventory'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'inventory' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-3" />
              <span>Inventory</span>
            </div>
            {expandedSections.inventory ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('print'); toggleSection('print'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'print' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <Printer className="h-5 w-5 mr-3" />
              <span>Print Settings</span>
            </div>
            {expandedSections.print ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('integrations'); toggleSection('integrations'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'integrations' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <Plug className="h-5 w-5 mr-3" />
              <span>Integrations</span>
            </div>
            {expandedSections.integrations ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <button
            onClick={() => { setActiveTab('backup'); toggleSection('backup'); }}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${activeTab === 'backup' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <div className="flex items-center">
              <HardDrive className="h-5 w-5 mr-3" />
              <span>Backup</span>
            </div>
            {expandedSections.backup ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{activeTab.replace('-', ' ')} Settings</h1>
        
        {/* Profile Settings */}
        {activeTab === 'profile' && expandedSections.profile && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Sarah Johnson"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="sarah.johnson@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  defaultValue="PH12345678"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Store Info Settings */}
        {activeTab === 'store' && expandedSections.store && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Store className="h-5 w-5 mr-2 text-blue-500" />
              Pharmacy Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
                <input
                  type="text"
                  defaultValue="HealthPlus Pharmacy"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                <input
                  type="text"
                  defaultValue="22ABCDE1234F1Z5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  defaultValue="123 Medical Plaza, Suite 200"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  defaultValue="Boston"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  defaultValue="Massachusetts"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  defaultValue="02115"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">About Your Pharmacy</label>
              <textarea
                defaultValue="We provide personalized pharmaceutical care with a focus on patient education and wellness."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Billing Settings */}
        {activeTab === 'billing' && expandedSections.billing && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
              Billing & Payments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  defaultValue="•••• •••• •••• 4242"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="text"
                  defaultValue="12/25"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  defaultValue="•••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="auto-renew"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="auto-renew" className="ml-2 block text-sm text-gray-700">
                  Enable auto-renewal for subscription
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="invoice-email"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="invoice-email" className="ml-2 block text-sm text-gray-700">
                  Send invoice copies to email
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Inventory Settings */}
        {activeTab === 'inventory' && expandedSections.inventory && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-blue-500" />
              Inventory Management
            </h2>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Low Stock Alerts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Threshold</label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Frequency</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Daily</option>
                    <option selected>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Method</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Email</option>
                    <option selected>Dashboard Notification</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Expiry Alerts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days Before Expiry</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Frequency</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Daily</option>
                    <option selected>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Method</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Email</option>
                    <option selected>Dashboard Notification</option>
                    <option>Both</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="auto-reorder"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="auto-reorder" className="ml-2 block text-sm text-gray-700">
                Enable automatic reordering for low stock items
              </label>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Print Settings */}
        {activeTab === 'print' && expandedSections.print && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Printer className="h-5 w-5 mr-2 text-blue-500" />
              Print Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Printer</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Thermal Printer (Receipts)</option>
                  <option selected>Laser Printer (Documents)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option selected>A4</option>
                  <option>A5</option>
                  <option>Letter</option>
                  <option>Thermal 80mm</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Prescription Print Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-header"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-header" className="ml-2 block text-sm text-gray-700">
                    Print pharmacy header
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-doctor"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-doctor" className="ml-2 block text-sm text-gray-700">
                    Print doctor information
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-barcode"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-barcode" className="ml-2 block text-sm text-gray-700">
                    Include barcode on prescription
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Invoice Print Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-tax"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-tax" className="ml-2 block text-sm text-gray-700">
                    Print tax details
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-logo"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-logo" className="ml-2 block text-sm text-gray-700">
                    Print pharmacy logo
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="print-notes"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="print-notes" className="ml-2 block text-sm text-gray-700">
                    Include notes section
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Integrations Settings */}
        {activeTab === 'integrations' && expandedSections.integrations && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Plug className="h-5 w-5 mr-2 text-blue-500" />
              System Integrations
            </h2>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Connected Services</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Payment Gateway</h4>
                      <p className="text-sm text-gray-500">Connected to Stripe</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Disconnect</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Inventory Management</h4>
                      <p className="text-sm text-gray-500">Connected to Zoho Inventory</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Disconnect</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">E-Prescription Service</h4>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Connect</button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">API Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <div className="flex">
                    <input
                      type="text"
                      defaultValue="sk_test_51JXyz2SGpR8v5JZ..."
                      className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                    <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300 text-sm font-medium">
                      Copy
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable-api"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enable-api" className="ml-2 block text-sm text-gray-700">
                    Enable API access
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === 'backup' && expandedSections.backup && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-blue-500" />
              Data Backup & Recovery
            </h2>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Automatic Backups</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Daily</option>
                    <option selected>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option selected>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>12:00 AM</option>
                    <option>1:00 AM</option>
                    <option>2:00 AM</option>
                    <option selected>3:00 AM</option>
                    <option>4:00 AM</option>
                    <option>5:00 AM</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="cloud-backup"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="cloud-backup" className="ml-2 block text-sm text-gray-700">
                  Enable cloud backup
                </label>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Manual Backup</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                  Create Backup Now
                </button>
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                  Download Latest Backup
                </button>
                <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
                  Restore from Backup
                </button>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-700 mb-3">Recent Backups</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        July 15, 2025 
                        </td>
                    </tr>
                    <><tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                July 8, 2025 03:00 AM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Automatic
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                45 MB
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                    Completed
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr><tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    July 1, 2025 03:00 AM
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Automatic
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    42 MB
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                        Completed
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr></>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;