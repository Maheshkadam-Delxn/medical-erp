'use client';

import { useState, useRef } from 'react';
import { 
  Pencil, Eye, Trash, Plus, Filter, Search, 
  ChevronDown, X, Upload, FileText, AlertTriangle,
  Package, Boxes, Tag, Percent, Gauge, Barcode
} from 'lucide-react';

const initialProducts = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    sku: 'SKU001',
    category: 'Tablet',
    hsnCode: '3004',
    manufacturer: 'ABC Pharma',
    brand: 'Dolo',
    composition: 'Paracetamol 500mg',
    productType: 'Generic',
    scheduleDrug: false,
    prescriptionRequired: false,
    batch: 'BCH1234',
    mfgDate: '2023-01-15',
    expDate: '2025-11-30',
    quantity: 80,
    reorderThreshold: 20,
    unit: 'Tablets',
    location: 'Rack A-12',
    barcode: '123456789012',
    purchasePrice: 45,
    mrp: 55,
    sellingPrice: 50,
    discount: 10,
    gst: 12,
    margin: 11.11,
    taxInclusive: true,
    returnable: true,
    imageUrl: '/placeholder-product.jpg',
    documents: [
      { name: 'License.pdf', type: 'license' },
      { name: 'Certificate.pdf', type: 'certificate' }
    ],
    status: 'In Stock'
  },
  // More sample products...
];

const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'];
const units = ['Tablets', 'Capsules', 'Bottles', 'Tubes', 'Vials', 'Strips'];
const productTypes = ['Generic', 'Branded'];
const documentTypes = ['license', 'certificate', 'safety', 'other'];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    sku: '',
    category: '',
    hsnCode: '',
    manufacturer: '',
    brand: '',
    composition: '',
    productType: 'Generic',
    scheduleDrug: false,
    prescriptionRequired: false,
    batch: '',
    mfgDate: '',
    expDate: '',
    quantity: '',
    reorderThreshold: '',
    unit: '',
    location: '',
    barcode: '',
    purchasePrice: '',
    mrp: '',
    sellingPrice: '',
    discount: '',
    gst: '',
    margin: '',
    taxInclusive: true,
    returnable: true,
    image: null,
    documents: []
  });
  const [currentDocument, setCurrentDocument] = useState({
    name: '',
    type: 'license',
    file: null
  });

  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  // Add this function to your component, near the other handler functions
const handleDocumentChange = (e) => {
  const { name, value } = e.target;
  setCurrentDocument(prev => ({
    ...prev,
    [name]: value
  }));
};

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentDocument(prev => ({
        ...prev,
        file,
        name: file.name
      }));
    }
  };

  // Add document to product
  const addDocument = () => {
    if (currentDocument.file && currentDocument.name) {
      setCurrentProduct(prev => ({
        ...prev,
        documents: [...prev.documents, {
          name: currentDocument.name,
          type: currentDocument.type,
          file: currentDocument.file
        }]
      }));
      setCurrentDocument({
        name: '',
        type: 'license',
        file: null
      });
      documentInputRef.current.value = '';
    }
  };

  // Remove document
  const removeDocument = (index) => {
    setCurrentProduct(prev => {
      const updatedDocs = [...prev.documents];
      updatedDocs.splice(index, 1);
      return {
        ...prev,
        documents: updatedDocs
      };
    });
  };

  // Calculate derived values
  const calculateValues = () => {
    const purchasePrice = parseFloat(currentProduct.purchasePrice) || 0;
    const mrp = parseFloat(currentProduct.mrp) || 0;
    const gst = parseFloat(currentProduct.gst) || 0;
    const discount = parseFloat(currentProduct.discount) || 0;
    
    let sellingPrice = mrp * (1 - discount / 100);
    let margin = ((sellingPrice - purchasePrice) / purchasePrice) * 100;
    
    if (currentProduct.taxInclusive) {
      sellingPrice = sellingPrice / (1 + gst / 100);
      margin = ((sellingPrice - purchasePrice) / purchasePrice) * 100;
    }
    
    setCurrentProduct(prev => ({
      ...prev,
      sellingPrice: sellingPrice.toFixed(2),
      margin: margin.toFixed(2)
    }));
  };

  // Save product
  const saveProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...currentProduct,
      id: products.length + 1,
      status: currentProduct.quantity > currentProduct.reorderThreshold 
        ? 'In Stock' 
        : currentProduct.quantity > 0 
          ? 'Low' 
          : 'Out of Stock',
      imageUrl: currentProduct.image ? URL.createObjectURL(currentProduct.image) : '/placeholder-product.jpg',
      documents: currentProduct.documents.map(doc => ({
        ...doc,
        url: '#' // In real app, this would be the uploaded file URL
      }))
    };
    
    setProducts([...products, newProduct]);
    resetForm();
    setIsModalOpen(false);
  };

  // Reset form
  const resetForm = () => {
    setCurrentProduct({
      name: '',
      sku: '',
      category: '',
      hsnCode: '',
      manufacturer: '',
      brand: '',
      composition: '',
      productType: 'Generic',
      scheduleDrug: false,
      prescriptionRequired: false,
      batch: '',
      mfgDate: '',
      expDate: '',
      quantity: '',
      reorderThreshold: '',
      unit: '',
      location: '',
      barcode: '',
      purchasePrice: '',
      mrp: '',
      sellingPrice: '',
      discount: '',
      gst: '',
      margin: '',
      taxInclusive: true,
      returnable: true,
      image: null,
      documents: []
    });
    setCurrentDocument({
      name: '',
      type: 'license',
      file: null
    });
    setActiveTab('basic');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Chemist Product Management</h1>
          <p className="text-gray-600">Manage your pharmacy products, inventory and pricing</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow hover:bg-emerald-700 transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products by name, SKU, batch or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filters <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isExpiringSoon = new Date(product.expDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                  const isLowStock = product.quantity <= product.reorderThreshold;
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.manufacturer}</div>
                            {product.prescriptionRequired && (
                              <span className="mt-1 inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Rx Required</span>
                            )}
                            {product.scheduleDrug && (
                              <span className="mt-1 inline-block px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">Schedule Drug</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{product.sku}</div>
                        <div className="text-xs text-gray-400">{product.barcode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{product.batch}</div>
                        <div className="text-xs text-gray-400">
                          EXP: {product.expDate}
                          {isExpiringSoon && (
                            <span className="ml-1 text-red-500 flex items-center">
                              <AlertTriangle size={12} className="mr-1" /> Soon
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <span>{product.quantity} {product.unit}</span>
                          {isLowStock && (
                            <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                              <AlertTriangle size={10} className="mr-1" /> Low
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">{product.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>MRP: ₹{product.mrp}</div>
                        <div className="text-xs text-gray-400">
                          Cost: ₹{product.purchasePrice} | Margin: {product.margin}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'In Stock'
                              ? 'bg-green-100 text-green-800'
                              : product.status === 'Low'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-gray-500 hover:text-emerald-600 transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            className="text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found. Try a different search or add a new product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-green-500 hover:bg-green-600">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-green-500 hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-1 ${activeTab === 'basic' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('basic')}
              >
                <Package size={14} /> Basic Info
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-1 ${activeTab === 'inventory' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('inventory')}
              >
                <Boxes size={14} /> Inventory
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-1 ${activeTab === 'pricing' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('pricing')}
              >
                <Tag size={14} /> Pricing
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-1 ${activeTab === 'media' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('media')}
              >
                <Upload size={14} /> Media & Docs
              </button>
            </div>
            
            <form onSubmit={saveProduct}>
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Code (SKU)*</label>
                      <input
                        type="text"
                        name="sku"
                        value={currentProduct.sku}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                      <select
                        name="category"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HSN Code*</label>
                      <input
                        type="text"
                        name="hsnCode"
                        value={currentProduct.hsnCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer*</label>
                      <input
                        type="text"
                        name="manufacturer"
                        value={currentProduct.manufacturer}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                      <input
                        type="text"
                        name="brand"
                        value={currentProduct.brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Composition*</label>
                    <input
                      type="text"
                      name="composition"
                      value={currentProduct.composition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Type*</label>
                      <select
                        name="productType"
                        value={currentProduct.productType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      >
                        {productTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="scheduleDrug"
                        name="scheduleDrug"
                        checked={currentProduct.scheduleDrug}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="scheduleDrug" className="ml-2 block text-sm text-gray-700">
                        Schedule Drug
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="prescriptionRequired"
                        name="prescriptionRequired"
                        checked={currentProduct.prescriptionRequired}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="prescriptionRequired" className="ml-2 block text-sm text-gray-700">
                        Prescription Required
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Inventory Tab */}
              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number*</label>
                      <input
                        type="text"
                        name="batch"
                        value={currentProduct.batch}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="barcode"
                          value={currentProduct.barcode}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button type="button" className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                          <Barcode size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MFG Date*</label>
                      <input
                        type="date"
                        name="mfgDate"
                        value={currentProduct.mfgDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EXP Date*</label>
                      <input
                        type="date"
                        name="expDate"
                        value={currentProduct.expDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Stock*</label>
                      <input
                        type="number"
                        name="quantity"
                        value={currentProduct.quantity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Threshold*</label>
                      <input
                        type="number"
                        name="reorderThreshold"
                        value={currentProduct.reorderThreshold}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measure*</label>
                      <select
                        name="unit"
                        value={currentProduct.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      >
                        <option value="">Select Unit</option>
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rack Location</label>
                    <input
                      type="text"
                      name="location"
                      value={currentProduct.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
              
              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price (₹)*</label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={currentProduct.purchasePrice}
                        onChange={handleInputChange}
                        onBlur={calculateValues}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹)*</label>
                      <input
                        type="number"
                        name="mrp"
                        value={currentProduct.mrp}
                        onChange={handleInputChange}
                        onBlur={calculateValues}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={currentProduct.sellingPrice}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                      <input
                        type="number"
                        name="discount"
                        value={currentProduct.discount}
                        onChange={handleInputChange}
                        onBlur={calculateValues}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST (%)*</label>
                      <input
                        type="number"
                        name="gst"
                        value={currentProduct.gst}
                        onChange={handleInputChange}
                        onBlur={calculateValues}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Margin (%)</label>
                      <input
                        type="number"
                        name="margin"
                        value={currentProduct.margin}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="taxInclusive"
                        name="taxInclusive"
                        checked={currentProduct.taxInclusive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="taxInclusive" className="ml-2 block text-sm text-gray-700">
                        Is Tax Inclusive
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="returnable"
                        name="returnable"
                        checked={currentProduct.returnable}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="returnable" className="ml-2 block text-sm text-gray-700">
                        Returnable
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Media & Documents Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden border border-gray-300 flex items-center justify-center">
                        {currentProduct.imagePreview ? (
                          <img 
                            src={currentProduct.imagePreview} 
                            alt="Product preview" 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          id="productImage"
                        />
                        <label
                          htmlFor="productImage"
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          <Upload size={16} /> Upload Image
                        </label>
                        <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 2MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Regulatory Documents</label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <input
                            type="file"
                            ref={documentInputRef}
                            onChange={handleDocumentUpload}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            id="documentUpload"
                          />
                          <label
                            htmlFor="documentUpload"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer w-full"
                          >
                            <Upload size={16} /> Select File
                          </label>
                        </div>
                        <div>
                          <select
                            name="type"
                            value={currentDocument.type}
                            onChange={handleDocumentChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {documentTypes.map(type => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          name="name"
                          value={currentDocument.name}
                          onChange={handleDocumentChange}
                          placeholder="Document name"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={addDocument}
                          disabled={!currentDocument.file || !currentDocument.name}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
                        >
                          Add
                        </button>
                      </div>
                      
                      {currentProduct.documents.length > 0 && (
                        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {currentProduct.documents.map((doc, index) => (
                            <div key={index} className="p-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText size={16} className="text-gray-500" />
                                <span className="text-sm font-medium">{doc.name}</span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                  {doc.type}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                {activeTab !== 'basic' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab(prev => {
                      if (prev === 'inventory') return 'basic';
                      if (prev === 'pricing') return 'inventory';
                      if (prev === 'media') return 'pricing';
                      return prev;
                    })}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto flex space-x-3">
                  {activeTab !== 'media' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab(prev => {
                        if (prev === 'basic') return 'inventory';
                        if (prev === 'inventory') return 'pricing';
                        if (prev === 'pricing') return 'media';
                        return prev;
                      })}
                      className="px-4 py-2 border border-gray-300 rounded-md text-black-700 bg-green-600 hover:bg-green-400"
                    >
                      Next
                    </button>
                  )}
                  
                  {activeTab === 'media' && (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        Save Product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}