'use client';

import React, { useState, useEffect } from 'react';

const PurchaseManagementSystem = () => {
  // State for all data
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const [purchaseBills, setPurchaseBills] = useState([]);
  
  // Form states
  const [vendorForm, setVendorForm] = useState({
    name: '',
    contact: '',
    GSTIN: '',
    address: ''
  });
  
  const [poForm, setPoForm] = useState({
    vendorId: '',
    status: 'Draft',
    items: [],
    newItem: { productId: '', quantity: 1, unitPrice: 0 }
  });
  
  const [grnForm, setGrnForm] = useState({
    poId: '',
    receivedItems: [],
    damagedItems: [],
    date: new Date().toISOString().split('T')[0],
    warehouse: ''
  });
  
  const [billForm, setBillForm] = useState({
    grnId: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    paid: false
  });
  
  // UI states
  const [activeTab, setActiveTab] = useState('vendors');
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample initial data
  useEffect(() => {
    // Sample vendors
    setVendors([
      {
        id: '1',
        name: 'GreenTech Supplies',
        contact: 'contact@greentech.com',
        GSTIN: '22AAAAA0000A1Z5',
        address: '123 Eco Park, Green City'
      },
      {
        id: '2',
        name: 'EcoFriendly Materials',
        contact: 'sales@ecofriendly.com',
        GSTIN: '33BBBBB0000B1Z6',
        address: '456 Nature Lane, Eco Town'
      }
    ]);
    
    // Sample products
    setProducts([
      { id: '1', name: 'Organic Cotton Fabric', unit: 'meter' },
      { id: '2', name: 'Bamboo Cutlery Set', unit: 'set' },
      { id: '3', name: 'Recycled Paper', unit: 'ream' },
      { id: '4', name: 'Solar Panel 100W', unit: 'piece' }
    ]);
  }, []);

  // Vendor CRUD operations
  const handleVendorSubmit = (e) => {
    e.preventDefault();
    if (editingVendorId) {
      setVendors(vendors.map(v => 
        v.id === editingVendorId ? { ...vendorForm, id: editingVendorId } : v
      ));
      setEditingVendorId(null);
    } else {
      setVendors([...vendors, { ...vendorForm, id: Date.now().toString() }]);
    }
    setVendorForm({ name: '', contact: '', GSTIN: '', address: '' });
  };

  const editVendor = (vendor) => {
    setVendorForm(vendor);
    setEditingVendorId(vendor.id);
  };

  const deleteVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  // PO operations
  const handlePoSubmit = (e) => {
    e.preventDefault();
    if (poForm.items.length === 0) return alert('Add at least one item');
    
    const newPO = {
      id: Date.now().toString(),
      vendorId: poForm.vendorId,
      status: poForm.status,
      items: poForm.items,
      date: new Date().toISOString()
    };
    
    setPurchaseOrders([...purchaseOrders, newPO]);
    setPoForm({
      vendorId: '',
      status: 'Draft',
      items: [],
      newItem: { productId: '', quantity: 1, unitPrice: 0 }
    });
  };

  const addPoItem = () => {
    if (!poForm.newItem.productId || poForm.newItem.quantity <= 0) return;
    
    const product = products.find(p => p.id === poForm.newItem.productId);
    setPoForm({
      ...poForm,
      items: [...poForm.items, {
        ...poForm.newItem,
        productName: product.name,
        total: poForm.newItem.quantity * poForm.newItem.unitPrice
      }],
      newItem: { productId: '', quantity: 1, unitPrice: 0 }
    });
  };

  const removePoItem = (index) => {
    setPoForm({
      ...poForm,
      items: poForm.items.filter((_, i) => i !== index)
    });
  };

  // GRN operations
  const handleGrnSubmit = (e) => {
    e.preventDefault();
    if (grnForm.receivedItems.length === 0) return alert('Add received items');
    
    const po = purchaseOrders.find(p => p.id === grnForm.poId);
    const newGRN = {
      id: Date.now().toString(),
      poId: grnForm.poId,
      vendorId: po.vendorId,
      receivedItems: grnForm.receivedItems,
      damagedItems: grnForm.damagedItems,
      date: grnForm.date,
      warehouse: grnForm.warehouse
    };
    
    setGoodsReceipts([...goodsReceipts, newGRN]);
    setGrnForm({
      poId: '',
      receivedItems: [],
      damagedItems: [],
      date: new Date().toISOString().split('T')[0],
      warehouse: ''
    });
  };

  const handlePoSelectForGrn = (poId) => {
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;
    
    setGrnForm({
      ...grnForm,
      poId,
      receivedItems: po.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        orderedQty: item.quantity,
        receivedQty: item.quantity,
        unitPrice: item.unitPrice
      })),
      damagedItems: po.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        damagedQty: 0
      }))
    });
  };

  // Bill operations
  const handleBillSubmit = (e) => {
    e.preventDefault();
    const grn = goodsReceipts.find(g => g.id === billForm.grnId);
    if (!grn) return alert('Select valid GRN');
    
    const newBill = {
      id: Date.now().toString(),
      grnId: billForm.grnId,
      poId: grn.poId,
      vendorId: grn.vendorId,
      invoiceNumber: billForm.invoiceNumber,
      date: billForm.date,
      amount: billForm.amount,
      paid: billForm.paid
    };
    
    setPurchaseBills([...purchaseBills, newBill]);
    setBillForm({
      grnId: '',
      invoiceNumber: '',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      paid: false
    });
  };

  // Filtered data for lists
  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = po.id.includes(searchTerm) || 
      vendors.find(v => v.id === po.vendorId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || po.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredGRNs = goodsReceipts.filter(grn => {
    return grn.poId.includes(searchTerm) || 
      vendors.find(v => v.id === grn.vendorId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredBills = purchaseBills.filter(bill => {
    return bill.invoiceNumber.includes(searchTerm) || 
      vendors.find(v => v.id === bill.vendorId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate total amount
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.receivedQty * item.unitPrice), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Purchase Management System</h1>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-green-200 mb-6">
          {['vendors', 'purchaseOrders', 'goodsReceipts', 'purchaseBills', 'purchaseList'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 font-medium ${activeTab === tab ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-green-600'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>
        
        {/* Vendor Management */}
        {activeTab === 'vendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendor Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                {editingVendorId ? 'Edit Vendor' : 'Add New Vendor'}
              </h2>
              <form onSubmit={handleVendorSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={vendorForm.name}
                    onChange={(e) => setVendorForm({...vendorForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Contact</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={vendorForm.contact}
                    onChange={(e) => setVendorForm({...vendorForm, contact: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">GSTIN</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={vendorForm.GSTIN}
                    onChange={(e) => setVendorForm({...vendorForm, GSTIN: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Address</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={vendorForm.address}
                    onChange={(e) => setVendorForm({...vendorForm, address: e.target.value})}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                >
                  {editingVendorId ? 'Update Vendor' : 'Add Vendor'}
                </button>
                {editingVendorId && (
                  <button
                    type="button"
                    className="ml-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
                    onClick={() => {
                      setVendorForm({ name: '', contact: '', GSTIN: '', address: '' });
                      setEditingVendorId(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
            
            {/* Vendor List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Vendor List</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Name</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Contact</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-green-50">
                        <td className="py-2 px-4 border-b border-gray-200">{vendor.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vendor.contact}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <button
                            onClick={() => editVendor(vendor)}
                            className="text-green-600 hover:text-green-800 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteVendor(vendor.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Purchase Order */}
        {activeTab === 'purchaseOrders' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Create Purchase Order</h2>
            <form onSubmit={handlePoSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Vendor</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={poForm.vendorId}
                    onChange={(e) => setPoForm({...poForm, vendorId: e.target.value})}
                    required
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={poForm.status}
                    onChange={(e) => setPoForm({...poForm, status: e.target.value})}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-green-700 mb-2">Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Product</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={poForm.newItem.productId}
                    onChange={(e) => setPoForm({
                      ...poForm, 
                      newItem: {...poForm.newItem, productId: e.target.value}
                    })}
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={poForm.newItem.quantity}
                    onChange={(e) => setPoForm({
                      ...poForm, 
                      newItem: {...poForm.newItem, quantity: parseInt(e.target.value)}
                    })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Unit Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={poForm.newItem.unitPrice}
                    onChange={(e) => setPoForm({
                      ...poForm, 
                      newItem: {...poForm.newItem, unitPrice: parseFloat(e.target.value)}
                    })}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addPoItem}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mb-6"
              >
                Add Item
              </button>
              
              {poForm.items.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-green-700 mb-2">Order Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Product</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Quantity</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Unit Price</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Total</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {poForm.items.map((item, index) => (
                          <tr key={index} className="hover:bg-green-50">
                            <td className="py-2 px-4 border-b border-gray-200">{item.productName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{item.quantity}</td>
                            <td className="py-2 px-4 border-b border-gray-200">${item.unitPrice.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b border-gray-200">${item.total.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              <button
                                onClick={() => removePoItem(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-green-50">
                          <td colSpan="3" className="py-2 px-4 border-b border-gray-200 text-right font-medium">Total:</td>
                          <td className="py-2 px-4 border-b border-gray-200 font-medium">
                            ${poForm.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
              >
                Create Purchase Order
              </button>
            </form>
          </div>
        )}
        
        {/* Goods Receipt Note */}
        {activeTab === 'goodsReceipts' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Create Goods Receipt Note</h2>
            <form onSubmit={handleGrnSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Purchase Order</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={grnForm.poId}
                    onChange={(e) => handlePoSelectForGrn(e.target.value)}
                    required
                  >
                    <option value="">Select PO</option>
                    {purchaseOrders.filter(po => po.status === 'Approved').map(po => (
                      <option key={po.id} value={po.id}>
                        PO#{po.id.substring(0, 6)} - {vendors.find(v => v.id === po.vendorId)?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={grnForm.date}
                    onChange={(e) => setGrnForm({...grnForm, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Warehouse</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={grnForm.warehouse}
                    onChange={(e) => setGrnForm({...grnForm, warehouse: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              {grnForm.poId && (
                <>
                  <h3 className="text-lg font-medium text-green-700 mb-2">Received Items</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Product</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Ordered Qty</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Received Qty</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Unit Price</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grnForm.receivedItems.map((item, index) => (
                          <tr key={index} className="hover:bg-green-50">
                            <td className="py-2 px-4 border-b border-gray-200">{item.productName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{item.orderedQty}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              <input
                                type="number"
                                min="0"
                                max={item.orderedQty}
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={item.receivedQty}
                                onChange={(e) => {
                                  const newReceivedItems = [...grnForm.receivedItems];
                                  newReceivedItems[index].receivedQty = parseInt(e.target.value);
                                  setGrnForm({...grnForm, receivedItems: newReceivedItems});
                                }}
                              />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">${item.unitPrice.toFixed(2)}</td>
                            <td className="py-2 px-4 border-b border-gray-200">${(item.receivedQty * item.unitPrice).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-green-50">
                          <td colSpan="4" className="py-2 px-4 border-b border-gray-200 text-right font-medium">Total:</td>
                          <td className="py-2 px-4 border-b border-gray-200 font-medium">
                            ${calculateTotal(grnForm.receivedItems).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  <h3 className="text-lg font-medium text-green-700 mb-2">Damaged Items</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Product</th>
                          <th className="py-2 px-4 border-b border-gray-200 text-left">Damaged Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grnForm.damagedItems.map((item, index) => (
                          <tr key={index} className="hover:bg-green-50">
                            <td className="py-2 px-4 border-b border-gray-200">{item.productName}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              <input
                                type="number"
                                min="0"
                                max={grnForm.receivedItems[index]?.receivedQty || 0}
                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                value={item.damagedQty}
                                onChange={(e) => {
                                  const newDamagedItems = [...grnForm.damagedItems];
                                  newDamagedItems[index].damagedQty = parseInt(e.target.value);
                                  setGrnForm({...grnForm, damagedItems: newDamagedItems});
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
                disabled={!grnForm.poId}
              >
                Create GRN
              </button>
            </form>
          </div>
        )}
        
        {/* Purchase Bills */}
        {activeTab === 'purchaseBills' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Create Purchase Bill</h2>
            <form onSubmit={handleBillSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">GRN</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={billForm.grnId}
                    onChange={(e) => {
                      const grn = goodsReceipts.find(g => g.id === e.target.value);
                      setBillForm({
                        ...billForm,
                        grnId: e.target.value,
                        amount: grn ? calculateTotal(grn.receivedItems) : 0
                      });
                    }}
                    required
                  >
                    <option value="">Select GRN</option>
                    {goodsReceipts.map(grn => (
                      <option key={grn.id} value={grn.id}>
                        GRN#{grn.id.substring(0, 6)} - PO#{grn.poId.substring(0, 6)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={billForm.invoiceNumber}
                    onChange={(e) => setBillForm({...billForm, invoiceNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={billForm.date}
                    onChange={(e) => setBillForm({...billForm, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={billForm.amount}
                    onChange={(e) => setBillForm({...billForm, amount: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="paid"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={billForm.paid}
                    onChange={(e) => setBillForm({...billForm, paid: e.target.checked})}
                  />
                  <label htmlFor="paid" className="ml-2 block text-gray-700">
                    Paid
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
              >
                Create Bill
              </button>
            </form>
          </div>
        )}
        
        {/* Purchase List */}
        {activeTab === 'purchaseList' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Purchase History</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search by PO/GRN/Invoice or Vendor..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Filter:</span>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-green-700 mb-3">Purchase Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left">PO Number</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Vendor</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPOs.length > 0 ? (
                      filteredPOs.map(po => (
                        <tr key={po.id} className="hover:bg-green-50">
                          <td className="py-2 px-4 border-b border-gray-200">PO#{po.id.substring(0, 6)}</td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {vendors.find(v => v.id === po.vendorId)?.name || 'Unknown Vendor'}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {new Date(po.date).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              po.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              po.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {po.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            ${po.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 px-4 border-b border-gray-200 text-center text-gray-500">
                          No purchase orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-green-700 mb-3">Goods Receipt Notes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left">GRN Number</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">PO Number</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Vendor</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Warehouse</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGRNs.length > 0 ? (
                      filteredGRNs.map(grn => (
                        <tr key={grn.id} className="hover:bg-green-50">
                          <td className="py-2 px-4 border-b border-gray-200">GRN#{grn.id.substring(0, 6)}</td>
                          <td className="py-2 px-4 border-b border-gray-200">PO#{grn.poId.substring(0, 6)}</td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {vendors.find(v => v.id === grn.vendorId)?.name || 'Unknown Vendor'}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {new Date(grn.date).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">{grn.warehouse}</td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            ${calculateTotal(grn.receivedItems).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 px-4 border-b border-gray-200 text-center text-gray-500">
                          No goods receipt notes found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-green-700 mb-3">Purchase Bills</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Invoice Number</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">GRN Number</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Vendor</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Amount</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.length > 0 ? (
                      filteredBills.map(bill => (
                        <tr key={bill.id} className="hover:bg-green-50">
                          <td className="py-2 px-4 border-b border-gray-200">{bill.invoiceNumber}</td>
                          <td className="py-2 px-4 border-b border-gray-200">GRN#{bill.grnId.substring(0, 6)}</td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {vendors.find(v => v.id === bill.vendorId)?.name || 'Unknown Vendor'}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {new Date(bill.date).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-200">${bill.amount.toFixed(2)}</td>
                          <td className="py-2 px-4 border-b border-gray-200">
                            {bill.paid ? (
                              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                Paid
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                Unpaid
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 px-4 border-b border-gray-200 text-center text-gray-500">
                          No purchase bills found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseManagementSystem;