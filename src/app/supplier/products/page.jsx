'use client';
import { useState } from 'react';
import Head from 'next/head';

const ProductManagement = () => {
  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      hsnCode: '3004.90.90',
      batchNo: 'BATCH001',
      mrp: 15.99,
      costPrice: 10.50,
      sellingPrice: 12.99,
      stock: 120,
      expiryDate: '2025-12-31'
    },
    {
      id: 2,
      name: 'Vitamin C 1000mg',
      category: 'Supplements',
      hsnCode: '3004.50.00',
      batchNo: 'BATCH002',
      mrp: 299.99,
      costPrice: 180.00,
      sellingPrice: 249.99,
      stock: 45,
      expiryDate: '2024-06-30'
    },
    {
      id: 3,
      name: 'Hand Sanitizer',
      category: 'Hygiene',
      hsnCode: '3808.94.00',
      batchNo: 'BATCH003',
      mrp: 99.99,
      costPrice: 45.00,
      sellingPrice: 79.99,
      stock: 200,
      expiryDate: '2025-03-15'
    }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    hsnCode: '',
    batchNo: '',
    mrp: '',
    costPrice: '',
    sellingPrice: '',
    stock: '',
    expiryDate: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open modal for adding new product
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      id: null,
      name: '',
      category: '',
      hsnCode: '',
      batchNo: '',
      mrp: '',
      costPrice: '',
      sellingPrice: '',
      stock: '',
      expiryDate: ''
    });
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const openEditModal = (product) => {
    setIsEditMode(true);
    setFormData(product);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      // Update existing product
      setProducts(products.map(p => p.id === formData.id ? formData : p));
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { ...formData, id: newId }]);
    }
    
    setIsModalOpen(false);
  };

  // Delete product
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Supplier Dashboard - Product Management</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HSN Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.hsnCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.batchNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.mrp.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
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

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="hsnCode" className="block text-sm font-medium text-gray-700 mb-1">
                    HSN Code*
                  </label>
                  <input
                    type="text"
                    id="hsnCode"
                    name="hsnCode"
                    value={formData.hsnCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number*
                  </label>
                  <input
                    type="text"
                    id="batchNo"
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Price (₹)*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="costPrice"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price (₹)*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="sellingPrice"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mrp" className="block text-sm font-medium text-gray-700 mb-1">
                    MRP (₹)*
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="mrp"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity*
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date*
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditMode ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;