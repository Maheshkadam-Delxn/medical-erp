"use client"
import React, { useState } from "react";
import {
  FaCog,
  FaUserCog,
  FaLock,
  FaBell,
  FaDatabase,
  FaReceipt,
  FaBarcode,
  FaSave,
  FaUndo
} from "react-icons/fa";

const SettingsDashboard = () => {
  // System settings state
  const [settings, setSettings] = useState({
    pharmacyName: "GreenLeaf Pharmacy",
    address: "123 Medical St, Health City",
    phone: "(555) 123-4567",
    email: "info@greenleafpharmacy.com",
    taxRate: 8.25,
    barcodeScanner: true,
    lowStockThreshold: 10,
    autoBackup: true,
    backupFrequency: "Daily",
    notificationSound: true,
    printReceipt: true
  });

  // Security settings
  const [security, setSecurity] = useState({
    passwordExpiry: 90,
    failedAttempts: 5,
    twoFactorAuth: false,
    sessionTimeout: 30
  });

  // User preferences
  const [preferences, setPreferences] = useState({
    theme: "green-white",
    language: "English",
    defaultView: "dashboard",
    itemsPerPage: 25
  });

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    const updateValue = type === "checkbox" ? checked : value;
    
    if (section === "system") {
      setSettings(prev => ({ ...prev, [name]: updateValue }));
    } else if (section === "security") {
      setSecurity(prev => ({ ...prev, [name]: updateValue }));
    } else {
      setPreferences(prev => ({ ...prev, [name]: updateValue }));
    }
  };

  const saveSettings = () => {
    // Here you would typically make an API call to save settings
    alert("Settings saved successfully!");
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset to default settings?")) {
      // Reset logic would go here
      alert("Settings reset to defaults");
    }
  };

  return (
    <div className=" bg-gray min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaCog className="text-green-600 mr-2" />
        System Settings
      </h1>

      {/* Tabs Navigation */}
      <div className="flex border-b border-green-200 mb-6">
        <button className="px-4 py-2 font-medium text-green-700 border-b-2 border-green-600">
          General
        </button>
        <button className="px-4 py-2 font-medium text-gray-600 hover:text-green-700">
          Security
        </button>
        <button className="px-4 py-2 font-medium text-gray-600 hover:text-green-700">
          Preferences
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-green-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-green-800">
          <FaCog className="mr-2" /> Pharmacy Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
            <input
              type="text"
              name="pharmacyName"
              value={settings.pharmacyName}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={settings.lowStockThreshold}
              onChange={(e) => handleChange(e, "system")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* System Features */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-green-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-green-800">
          <FaUserCog className="mr-2" /> System Features
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="barcodeScanner"
              name="barcodeScanner"
              checked={settings.barcodeScanner}
              onChange={(e) => handleChange(e, "system")}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            />
            <label htmlFor="barcodeScanner" className="ml-2 block text-sm text-gray-700">
              Enable Barcode Scanner <FaBarcode className="inline ml-1" />
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoBackup"
              name="autoBackup"
              checked={settings.autoBackup}
              onChange={(e) => handleChange(e, "system")}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            />
            <label htmlFor="autoBackup" className="ml-2 block text-sm text-gray-700">
              Automatic Backup <FaDatabase className="inline ml-1" />
            </label>
          </div>
          
          {settings.autoBackup && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
              <select
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={(e) => handleChange(e, "system")}
                className="border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notificationSound"
              name="notificationSound"
              checked={settings.notificationSound}
              onChange={(e) => handleChange(e, "system")}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            />
            <label htmlFor="notificationSound" className="ml-2 block text-sm text-gray-700">
              Notification Sounds <FaBell className="inline ml-1" />
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="printReceipt"
              name="printReceipt"
              checked={settings.printReceipt}
              onChange={(e) => handleChange(e, "system")}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            />
            <label htmlFor="printReceipt" className="ml-2 block text-sm text-gray-700">
              Auto-Print Receipts <FaReceipt className="inline ml-1" />
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings (Collapsed by default) */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-green-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-green-800">
          <FaLock className="mr-2" /> Security Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Expiry (Days)</label>
            <input
              type="number"
              name="passwordExpiry"
              value={security.passwordExpiry}
              onChange={(e) => handleChange(e, "security")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Failed Attempts Before Lock</label>
            <input
              type="number"
              name="failedAttempts"
              value={security.failedAttempts}
              onChange={(e) => handleChange(e, "security")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (Minutes)</label>
            <input
              type="number"
              name="sessionTimeout"
              value={security.sessionTimeout}
              onChange={(e) => handleChange(e, "security")}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300"
              min="1"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="twoFactorAuth"
              name="twoFactorAuth"
              checked={security.twoFactorAuth}
              onChange={(e) => handleChange(e, "security")}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
            />
            <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button 
          onClick={resetToDefault}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <FaUndo className="mr-2" /> Reset Defaults
        </button>
        <button 
          onClick={saveSettings}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <FaSave className="mr-2" /> Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsDashboard;