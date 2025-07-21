'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const BrowseProducts = () => {
  // Sample data for suppliers and products
  const suppliersData = [
    {
      id: 1,
      name: 'PharmaPlus Suppliers',
      contact: 'contact@pharmaplus.com | (555) 123-4567',
      products: [
        {
          id: 101,
          name: 'Vitamin C 500mg',
          image: '/images/vitamin-c.jpg',
          price: 12.99,
          stock: 45,
          category: 'Vitamins',
          brand: 'HealthPlus'
        },
        {
          id: 102,
          name: 'Ibuprofen 200mg',
          image: '/images/ibuprofen.jpg',
          price: 8.49,
          stock: 120,
          category: 'Pain Relief',
          brand: 'MediCare'
        },
        {
          id: 103,
          name: 'Allergy Relief',
          image: '/images/allergy-relief.jpg',
          price: 15.99,
          stock: 32,
          category: 'Allergy',
          brand: 'ClearAir'
        }
      ]
    },
    {
      id: 2,
      name: 'MediCare Distributors',
      contact: 'sales@medicare-dist.com | (555) 987-6543',
      products: [
        {
          id: 201,
          name: 'Blood Pressure Monitor',
          image: '/images/bp-monitor.jpg',
          price: 49.99,
          stock: 18,
          category: 'Medical Devices',
          brand: 'MediTech'
        },
        {
          id: 202,
          name: 'Hand Sanitizer',
          image: '/images/sanitizer.jpg',
          price: 5.99,
          stock: 0,
          category: 'Hygiene',
          brand: 'PureHands'
        }
      ]
    },
    {
      id: 3,
      name: 'Health Essentials Ltd',
      contact: 'orders@healthessentials.com | (555) 456-7890',
      products: [
        {
          id: 301,
          name: 'Multivitamin Complex',
          image: '/images/multivitamin.jpg',
          price: 22.50,
          stock: 27,
          category: 'Vitamins',
          brand: 'VitaLife'
        },
        {
          id: 302,
          name: 'Probiotic Capsules',
          image: '/images/probiotic.jpg',
          price: 18.75,
          stock: 14,
          category: 'Digestive Health',
          brand: 'GutWell'
        },
        {
          id: 303,
          name: 'Vitamin D3 1000IU',
          image: '/images/vitamin-d.jpg',
          price: 9.99,
          stock: 63,
          category: 'Vitamins',
          brand: 'SunLife'
        }
      ]
    }
  ];

  // State management
  const [suppliers, setSuppliers] = useState(suppliersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    availability: 'all',
    priceRange: 'all'
  });
  const [sortOption, setSortOption] = useState('default');
  const [cart, setCart] = useState([]);
  const [expandedSupplier, setExpandedSupplier] = useState(null);

  // Filter and sort products
  const filteredSuppliers = suppliers.map(supplier => {
    let filteredProducts = [...supplier.products];
    
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      );
    }
    
    // Apply availability filter
    if (filters.availability === 'inStock') {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    } else if (filters.availability === 'outOfStock') {
      filteredProducts = filteredProducts.filter(product => product.stock === 0);
    }
    
    // Apply price range filter
    if (filters.priceRange === 'under10') {
      filteredProducts = filteredProducts.filter(product => product.price < 10);
    } else if (filters.priceRange === '10to20') {
      filteredProducts = filteredProducts.filter(
        product => product.price >= 10 && product.price <= 20
      );
    } else if (filters.priceRange === 'over20') {
      filteredProducts = filteredProducts.filter(product => product.price > 20);
    }
    
    // Apply sorting
    if (sortOption === 'priceLowHigh') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceHighLow') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      filteredProducts.sort((a, b) => b.id - a.id); // Using ID as proxy for newness
    }
    
    return {
      ...supplier,
      products: filteredProducts
    };
  }).filter(supplier => supplier.products.length > 0); // Remove suppliers with no products after filtering

  // Get all unique categories for filter dropdown
  const categories = ['all', ...new Set(
    suppliers.flatMap(supplier => 
      supplier.products.map(product => product.category)
    )
  )];

  // Toggle supplier expansion
  const toggleSupplier = (supplierId) => {
    setExpandedSupplier(expandedSupplier === supplierId ? null : supplierId);
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Browse Products | Chemist Dashboard</title>
        <meta name="description" content="Browse pharmacy products by supplier" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Chemist Dashboard</h1>
          <div className="relative">
            <button className="flex items-center text-green-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse Products</h2>
          
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="search"
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Product or brand"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Availability Filter */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  id="availability"
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  id="priceRange"
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                >
                  <option value="all">All Prices</option>
                  <option value="under10">Under $10</option>
                  <option value="10to20">$10 - $20</option>
                  <option value="over20">Over $20</option>
                </select>
              </div>
            </div>
            
            {/* Sorting */}
            <div className="mt-4 flex items-center">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                id="sort"
                className="focus:ring-green-500 focus:border-green-500 block pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Suppliers and Products */}
          <div className="space-y-4">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map(supplier => (
                <div key={supplier.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Supplier Header - Collapsible */}
                  <button
                    className="w-full px-4 py-3 flex justify-between items-center bg-green-50 hover:bg-green-100 focus:outline-none"
                    onClick={() => toggleSupplier(supplier.id)}
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-green-800">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">{supplier.contact}</p>
                    </div>
                    <svg
                      className={`h-5 w-5 text-green-600 transform transition-transform ${expandedSupplier === supplier.id ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Products Grid - Collapsible Content */}
                  {expandedSupplier === supplier.id && (
                    <div className="p-4 border-t border-gray-200">
                      {supplier.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {supplier.products.map(product => (
                            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="bg-gray-100 h-40 flex items-center justify-center p-4">
                                {/* Placeholder for product image */}
                                <div className="text-gray-400 text-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-xs">Product Image</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                                <p className="text-green-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
                                <p className={`text-sm mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </p>
                                <button
                                  onClick={() => addToCart(product)}
                                  disabled={product.stock === 0}
                                  className={`w-full py-2 px-4 rounded-md text-sm font-medium ${product.stock > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No products match your filters.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseProducts;