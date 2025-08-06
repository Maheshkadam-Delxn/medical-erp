"use client";
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiRefreshCw, FiAlertTriangle, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useSession } from '@/context/SessionContext';

const ProductManagement = () => {
  const { user } = useSession();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [stockUpdateData, setStockUpdateData] = useState({ 
    productId: null, 
    batchNumber: '', 
    quantity: '', 
    type: 'add',
    manufacturerDate: '',
    expiryDate: ''
  });
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [quantityError, setQuantityError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [manufacturerDateError, setManufacturerDateError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);

  // Categories for dropdown
  const categories = ['Tablet', 'Syrup', 'Equipment', 'Consumable', 'Injection', 'Capsule'];
  const units = ['strip', 'bottle', 'piece', 'pair', 'box', 'pack'];

  // Toggle row expansion
  const toggleRow = (productId) => {
    if (expandedRows.includes(productId)) {
      setExpandedRows(expandedRows.filter(id => id !== productId));
    } else {
      setExpandedRows([...expandedRows, productId]);
    }
  };

  // Fetch products from API (filtered by supplier's registrationId)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url = `/api/supplier/product`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        console.error('Error fetching products:', data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error loading products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch expiry alerts from API
  const fetchExpiryAlerts = async () => {
    try {
      const url = `/api/supplier/product/alerts/expiry`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setExpiryAlerts(data);
      } else {
        console.error('Error fetching expiry alerts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching expiry alerts:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchExpiryAlerts();
    }
  }, [user]);

  const handleBatchUpdate = (index, field, value) => {
    const updatedBatches = [...currentProduct.batches];
    updatedBatches[index] = {
      ...updatedBatches[index],
      [field]: value
    };
    setCurrentProduct({
      ...currentProduct,
      batches: updatedBatches
    });
  };

  const removeBatch = (index) => {
    const updatedBatches = [...currentProduct.batches];
    updatedBatches.splice(index, 1);
    setCurrentProduct({
      ...currentProduct,
      batches: updatedBatches
    });
  };

  // Filter products based on search term and active tab
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeTab === 'active') {
      result = result.filter(product => product.active);
    } else if (activeTab === 'inactive') {
      result = result.filter(product => !product.active);
    } else if (activeTab === 'lowStock') {
      result = result.filter(product => {
        const totalStock = product.batches.reduce((sum, batch) => sum + (Number(batch.quantity) || 0), 0);
        return totalStock <= (Number(product.reorderLevel) || 0);
      });
    }
    
    setFilteredProducts(result);
  }, [searchTerm, products, activeTab]);

  // Initialize form for adding new product
  const initNewProduct = () => {
    setCurrentProduct({
      name: '',
      category: '',
      brand: '',
      code: '',
      unit: 'piece',
      purchasePrice: '',
      sellingPrice: '',
      reorderLevel: '',
      active: true,
      batches: []
    });
    setIsModalOpen(true);
  };

  // Edit product
  const handleEdit = (product) => {
    setCurrentProduct({ 
      ...product,
      quantity: product.batches.reduce((sum, batch) => sum + (Number(batch.quantity) || 0), 0)
    });
    setIsModalOpen(true);
  };

  // Delete product (soft delete)
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteConfirmOpen(true);
  };

  const executeDelete = async () => {
    try {
      const response = await fetch(`/api/supplier/product/${productToDelete._id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchProducts(); // Refresh the product list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } finally {
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  // Save product (add or update)
  const saveProduct = async () => {
    // Validate required fields
    if (!currentProduct.name?.trim()) {
      alert('Product name is required');
      return;
    }
    if (!currentProduct.category) {
      alert('Category is required');
      return;
    }
    if (!currentProduct.code?.trim()) {
      alert('Product code is required');
      return;
    }
    if (!currentProduct.purchasePrice || currentProduct.purchasePrice <= 0) {
      alert('Purchase price is required and must be greater than 0');
      return;
    }
    if (!currentProduct.sellingPrice || currentProduct.sellingPrice <= 0) {
      alert('Selling price is required and must be greater than 0');
      return;
    }
    if (currentProduct.sellingPrice < currentProduct.purchasePrice) {
      alert('Selling price must be greater than or equal to purchase price');
      return;
    }
    if (!currentProduct.reorderLevel || currentProduct.reorderLevel < 0) {
      alert('Reorder level is required and must be 0 or greater');
      return;
    }

    // Validate batches for active products
    if (currentProduct.active !== false && (!currentProduct.batches || currentProduct.batches.length === 0)) {
      alert('Active products must have at least one batch');
      return;
    }

    // Validate batches
    for (const batch of currentProduct.batches) {
      if (!batch.batchNumber?.trim()) {
        alert('All batches must have a batch number');
        return;
      }
      if (!batch.quantity || isNaN(batch.quantity) || Number(batch.quantity) <= 0) {
        alert('All batches must have a valid quantity greater than 0');
        return;
      }
      if (!batch.manufacturerDate) {
        alert('All batches must have a manufacturer date');
        return;
      }
      if (!batch.expiryDate) {
        alert('All batches must have an expiry date');
        return;
      }
      if (new Date(batch.manufacturerDate) > new Date(batch.expiryDate)) {
        alert('Manufacturer date must be before expiry date');
        return;
      }
    }

    try {
      const method = currentProduct._id ? 'PUT' : 'POST';
      const url = currentProduct._id 
        ? `/api/supplier/product/${currentProduct._id}`
        : '/api/supplier/product';

      // Prepare product data with proper data types
      const productData = {
        name: currentProduct.name.trim(),
        category: currentProduct.category,
        brand: currentProduct.brand?.trim() || '',
        code: currentProduct.code.trim().toUpperCase(),
        unit: currentProduct.unit || 'piece',
        purchasePrice: Number(currentProduct.purchasePrice),
        sellingPrice: Number(currentProduct.sellingPrice),
        reorderLevel: Number(currentProduct.reorderLevel),
        active: currentProduct.active !== false,
        batches: currentProduct.batches.map(batch => ({
          batchNumber: batch.batchNumber.trim(),
          quantity: Number(batch.quantity),
          manufacturerDate: batch.manufacturerDate,
          expiryDate: batch.expiryDate
        }))
      };

      console.log('Submitting product data:', productData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Product saved successfully!');
        fetchProducts(); // Refresh the product list
        setIsModalOpen(false);
      } else {
        console.error('API Error:', responseData);
        alert(`Error: ${responseData.message || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  // Handle stock update
  const initStockUpdate = (productId, batchNumber = '') => {
    const product = products.find(p => p._id === productId);
    const batch = product?.batches.find(b => b.batchNumber === batchNumber);
    
    setStockUpdateData({
      productId,
      batchNumber,
      quantity: batch?.quantity || '',
      type: 'add',
      manufacturerDate: batch?.manufacturerDate || '',
      expiryDate: batch?.expiryDate || ''
    });
    setQuantityError(false);
    setExpiryError(false);
    setManufacturerDateError(false);
    setIsStockModalOpen(true);
  };

  const executeStockUpdate = async () => {
    // Validate quantity
    if (!stockUpdateData.quantity || isNaN(stockUpdateData.quantity) || Number(stockUpdateData.quantity) <= 0) {
      setQuantityError(true);
      return;
    }

    // Validate dates for new batches
    if (!stockUpdateData.batchNumber) {
      let hasError = false;
      
      if (!stockUpdateData.manufacturerDate) {
        setManufacturerDateError(true);
        hasError = true;
      }
      
      if (!stockUpdateData.expiryDate) {
        setExpiryError(true);
        hasError = true;
      }
      
      if (new Date(stockUpdateData.manufacturerDate) > new Date(stockUpdateData.expiryDate)) {
        setExpiryError(true);
        alert('Expiry date must be after manufacturer date');
        hasError = true;
      }
      
      if (hasError) return;
    }

    try {
      const response = await fetch(`/api/supplier/product/${stockUpdateData.productId}/stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockUpdateData)
      });

      if (response.ok) {
        fetchProducts(); // Refresh the product list
        setIsStockModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error updating stock');
    }
  };

  // Calculate total stock for a product
  const getTotalStock = (product) => {
    return product.batches.reduce((sum, batch) => sum + (Number(batch.quantity) || 0), 0);
  };

  // Check if product is low on stock
  const isLowStock = (product) => {
    return getTotalStock(product) <= (Number(product.reorderLevel) || 0);
  };

  // Add a new empty batch to the current product
  const addNewBatch = () => {
    setCurrentProduct({
      ...currentProduct,
      batches: [
        ...currentProduct.batches,
        {
          batchNumber: '',
          quantity: '',
          manufacturerDate: '',
          expiryDate: ''
        }
      ]
    });
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
          <p className="text-lg text-gray-700">
            {!user ? 'Loading user information...' : 'Loading products...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Medical Inventory Management</h1>
        <p className="text-gray-600">Manage your medical products, stock, and batches</p>
      </div>

      {/* Expiry Alerts */}
      {expiryAlerts.length > 0 && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <FiAlertTriangle className="text-yellow-500 mr-2" />
            <h3 className="font-semibold text-yellow-800">Expiry Alerts</h3>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {expiryAlerts.map((alert, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-yellow-100">
                <p className="font-medium">{alert.productName} (Batch: {alert.batchNumber})</p>
                <p className="text-sm">Expires in {alert.daysLeft} days on {alert.expiryDate}</p>
                <p className="text-sm">Quantity: {alert.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm ${activeTab === 'all' ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-sm ${activeTab === 'active' ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 text-sm ${activeTab === 'inactive' ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Inactive
              </button>
              <button
                onClick={() => setActiveTab('lowStock')}
                className={`px-4 py-2 text-sm ${activeTab === 'lowStock' ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                Low Stock
              </button>
            </div>
            
            <button
              onClick={initNewProduct}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <>
                    <tr 
                      key={product._id} 
                      className={`${!product.active ? 'bg-gray-50' : ''} hover:bg-gray-50 cursor-pointer`}
                      onClick={() => toggleRow(product._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {expandedRows.includes(product._id) ? (
                          <FiChevronDown className="text-gray-500" />
                        ) : (
                          <FiChevronRight className="text-gray-500" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.unit}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getTotalStock(product)}
                          {isLowStock(product) && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Low
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            initStockUpdate(product._id);
                          }}
                          className="text-xs text-green-600 hover:text-green-800 mt-1"
                        >
                          Update Stock
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.sellingPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">${product.purchasePrice.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(product);
                          }}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          <FiEdit className="inline" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(product);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="inline" />
                        </button>
                      </td>
                    </tr>
                    {expandedRows.includes(product._id) && (
                      <tr className="bg-gray-50">
                        <td colSpan="9" className="px-6 py-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-100">
                            <h4 className="font-medium text-gray-700 mb-3">Batches</h4>
                            {product.batches.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Batch No.</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Manufacturer Date</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {product.batches.map((batch, index) => (
                                      <tr key={index}>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batch.batchNumber}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batch.quantity}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batch.manufacturerDate}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{batch.expiryDate}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                          <button
                                            onClick={() => initStockUpdate(product._id, batch.batchNumber)}
                                            className="text-green-600 hover:text-green-800 text-sm mr-2"
                                          >
                                            Update
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No batches available for this product.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found. Try adjusting your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {currentProduct._id ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand/Manufacturer</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.brand}
                    onChange={(e) => setCurrentProduct({...currentProduct, brand: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Code (SKU)*</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.code}
                    onChange={(e) => setCurrentProduct({...currentProduct, code: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.unit || 'piece'}
                    onChange={(e) => setCurrentProduct({...currentProduct, unit: e.target.value})}
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level*</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.reorderLevel || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, reorderLevel: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)*</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.purchasePrice || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, purchasePrice: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($)*</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={currentProduct.sellingPrice || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, sellingPrice: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                    value={currentProduct.batches.reduce((sum, batch) => sum + (Number(batch.quantity) || 0), 0)}
                    readOnly
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Batches</h3>
                  <button
                    onClick={addNewBatch}
                    className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200"
                  >
                    Add Batch
                  </button>
                </div>
                
                <div className="border rounded-md overflow-hidden border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Batch No.*</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity*</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Manufacturer Date*</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date*</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentProduct.batches.length > 0 ? (
                        currentProduct.batches.map((batch, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="text"
                                value={batch.batchNumber}
                                onChange={(e) => handleBatchUpdate(index, 'batchNumber', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                required
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                value={batch.quantity || ''}
                                onChange={(e) => handleBatchUpdate(index, 'quantity', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                required
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="date"
                                value={batch.manufacturerDate}
                                onChange={(e) => handleBatchUpdate(index, 'manufacturerDate', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                required
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                type="date"
                                value={batch.expiryDate}
                                onChange={(e) => handleBatchUpdate(index, 'expiryDate', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
                                required
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <button
                                onClick={() => removeBatch(index)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                            No batches added yet. Click "Add Batch" to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="activeStatus"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  checked={currentProduct.active}
                  onChange={(e) => setCurrentProduct({...currentProduct, active: e.target.checked})}
                />
                <label htmlFor="activeStatus" className="ml-2 block text-sm text-gray-700">
                  Active Product
                </label>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deactivation</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to deactivate "{productToDelete.name}"? This product will be marked as inactive but retained in the system.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Update Modal */}
      {isStockModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {stockUpdateData.batchNumber ? 'Update Batch Stock' : 'Add New Batch'}
            </h2>
            
            {stockUpdateData.batchNumber ? (
              <p className="mb-4 text-sm text-gray-600">
                Batch: {stockUpdateData.batchNumber}
              </p>
            ) : null}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {stockUpdateData.batchNumber ? 'Adjustment Type' : 'Initial Quantity'}
              </label>
              {stockUpdateData.batchNumber ? (
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={stockUpdateData.type === 'add'}
                      onChange={() => setStockUpdateData({...stockUpdateData, type: 'add'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Add Stock</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={stockUpdateData.type === 'subtract'}
                      onChange={() => setStockUpdateData({...stockUpdateData, type: 'subtract'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Remove Stock</span>
                  </label>
                </div>
              ) : null}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
              <input
                type="number"
                min="1"
                className={`w-full px-3 py-2 border ${quantityError ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                value={stockUpdateData.quantity}
                onChange={(e) => {
                  setStockUpdateData({...stockUpdateData, quantity: e.target.value});
                  setQuantityError(false);
                }}
                placeholder="Enter quantity"
              />
              {quantityError && (
                <p className="mt-1 text-sm text-red-600">Please enter a valid quantity</p>
              )}
            </div>
            
            {!stockUpdateData.batchNumber && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer Date*</label>
                  <input
                    type="date"
                    className={`w-full px-3 py-2 border ${manufacturerDateError ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    value={stockUpdateData.manufacturerDate}
                    onChange={(e) => {
                      setStockUpdateData({...stockUpdateData, manufacturerDate: e.target.value});
                      setManufacturerDateError(false);
                    }}
                    max={stockUpdateData.expiryDate || ''}
                  />
                  {manufacturerDateError && (
                    <p className="mt-1 text-sm text-red-600">Please select a manufacturer date</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                  <input
                    type="date"
                    className={`w-full px-3 py-2 border ${expiryError ? 'border-red-500' : 'border-gray-200'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    value={stockUpdateData.expiryDate}
                    onChange={(e) => {
                      setStockUpdateData({...stockUpdateData, expiryDate: e.target.value});
                      setExpiryError(false);
                    }}
                    min={stockUpdateData.manufacturerDate || ''}
                  />
                  {expiryError && (
                    <p className="mt-1 text-sm text-red-600">Please select a valid expiry date</p>
                  )}
                </div>
              </>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsStockModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeStockUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {stockUpdateData.batchNumber ? 'Update Stock' : 'Add Batch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;