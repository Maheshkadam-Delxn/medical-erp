'use client';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Printer, Mail, UserPlus, User, Minus, Plus, Trash2, X, Calendar, Stethoscope, CreditCard } from 'lucide-react';

const BillingInterface = () => {
  // State for customer information
  const [customerType, setCustomerType] = useState('existing');
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  
  // State for products
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // State for cart
  const [cart, setCart] = useState([]);
  
  // State for billing
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(5); // Default 5% tax
  const [paymentMode, setPaymentMode] = useState('cash');
  const [doctorName, setDoctorName] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Load sample data (in a real app, this would be from an API)
  useEffect(() => {
    // Sample customers
    const sampleCustomers = [
      { id: 'C001', name: 'Rahul Sharma', phone: '9876543210', address: '123 Main St', isRegular: true },
      { id: 'C002', name: 'Priya Patel', phone: '8765432109', address: '456 Oak Ave', isRegular: true },
      { id: 'C003', name: 'Amit Singh', phone: '7654321098', address: '789 Pine Rd', isRegular: false },
    ];
    
    // Sample products
    const sampleProducts = [
      { id: 'P001', name: 'Paracetamol 500mg', batch: 'B2023', expiry: '2025-12-31', mrp: 15, stock: 100 },
      { id: 'P002', name: 'Cetirizine 10mg', batch: 'B2024', expiry: '2024-06-30', mrp: 25, stock: 50 },
      { id: 'P003', name: 'Omeprazole 20mg', batch: 'B2023', expiry: '2025-03-31', mrp: 45, stock: 30 },
      { id: 'P004', name: 'Amoxicillin 500mg', batch: 'B2024', expiry: '2024-09-30', mrp: 120, stock: 20 },
      { id: 'P005', name: 'Vitamin C 500mg', batch: 'B2023', expiry: '2025-11-30', mrp: 30, stock: 75 },
    ];
    
    setCustomers(sampleCustomers);
    setFilteredCustomers(sampleCustomers);
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);
  
  // Filter customers based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);
  
  // Filter products based on search term
  useEffect(() => {
    if (productSearch === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.id.toLowerCase().includes(productSearch.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [productSearch, products]);
  
  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        alert(`Only ${product.stock} items available in stock!`);
      }
    } else {
      if (product.stock > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      } else {
        alert('This product is out of stock!');
      }
    }
  };
  
  // Update cart item quantity
  const updateQuantity = (id, newQuantity) => {
    const product = products.find(p => p.id === id);
    
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else if (product && newQuantity <= product.stock) {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } else {
      alert(`Only ${product.stock} items available in stock!`);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  
  // Calculate discount amount
  const discountAmount = subtotal * (discount / 100);
  
  // Calculate taxable amount
  const taxableAmount = subtotal - discountAmount;
  
  // Calculate tax
  const tax = taxableAmount * (taxRate / 100);
  
  // Calculate total
  const total = taxableAmount + tax;
  
  // Handle print bill
  const handlePrint = () => {
    // In a real app, this would generate a printable bill
    alert('Printing bill...');
  };
  
  // Handle email bill
  const handleEmail = () => {
    // In a real app, this would send the bill via email
    alert('Sending bill via email...');
  };
  
  // Handle new customer
  const handleNewCustomer = () => {
    // In a real app, this would open a customer registration form
    alert('Opening new customer registration...');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PharmaCare Billing
                </h1>
                <p className="text-sm text-slate-500">Professional Pharmacy Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Current Date</p>
                <p className="font-semibold text-slate-700">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Customer and Product Selection */}
          <div className="xl:col-span-4 space-y-6">
            {/* Customer Selection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-700 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Customer Selection
                </h2>
                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      customerType === 'existing' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    onClick={() => setCustomerType('existing')}
                  >
                    <User size={16} className="inline mr-1" /> Existing
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      customerType === 'new' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                    onClick={() => setCustomerType('new')}
                  >
                    <UserPlus size={16} className="inline mr-1" /> New
                  </button>
                </div>
              </div>
              
              {customerType === 'existing' ? (
                <>
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, phone or ID..."
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map(customer => (
                        <div
                          key={customer.id}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            customerId === customer.id 
                              ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                              : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                          }`}
                          onClick={() => setCustomerId(customer.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-slate-700">{customer.name}</div>
                              <div className="text-sm text-slate-500">{customer.phone}</div>
                            </div>
                            {customer.isRegular && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Regular
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <User className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>No customers found</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto"
                    onClick={handleNewCustomer}
                  >
                    <UserPlus size={20} className="mr-2" /> Register New Customer
                  </button>
                </div>
              )}
            </div>
            
            {/* Product Search */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                Product Search
              </h2>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>
              
              <div className="max-h-96 overflow-y-auto space-y-2">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="p-4 bg-slate-50 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-700">{product.name}</div>
                          <div className="text-sm text-slate-500 mt-1">
                            Batch: {product.batch} • Exp: {product.expiry}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-lg text-slate-700">₹{product.mrp.toFixed(2)}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            product.stock > 10 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            Stock: {product.stock}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Middle Column - Cart */}
          <div className="xl:col-span-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-700 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                  Cart ({cart.length})
                </h2>
                {cart.length > 0 && (
                  <button
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                    onClick={() => setCart([])}
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {cart.length > 0 ? (
                <div className="space-y-6">
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="font-semibold text-slate-700">{item.name}</div>
                            <div className="text-sm text-slate-500">Batch: {item.batch}</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="font-bold text-lg text-slate-700">₹{(item.mrp * item.quantity).toFixed(2)}</div>
                            <div className="text-xs text-slate-500">₹{item.mrp.toFixed(2)} each</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center bg-white rounded-lg border border-slate-200">
                            <button
                              className="p-2 hover:bg-slate-100 rounded-l-lg transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="px-3 py-1 font-medium text-slate-700">{item.quantity}</span>
                            <button
                              className="p-2 hover:bg-slate-100 rounded-r-lg transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                          <button
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Prescription Info */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-semibold text-slate-700 mb-3 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
                      Prescription Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Doctor's Name</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          value={doctorName}
                          onChange={(e) => setDoctorName(e.target.value)}
                          placeholder="Dr. Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Prescription Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            type="date"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            value={prescriptionDate}
                            onChange={(e) => setPrescriptionDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">Search and add products from the left panel</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Bill Summary */}
          <div className="xl:col-span-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 h-full">
              <h2 className="text-xl font-semibold text-slate-700 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Bill Summary
              </h2>
              
              {cart.length > 0 ? (
                <>
                  {/* Customer Info */}
                  {customerId && (
                    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="font-semibold text-slate-700 mb-2">Customer Details</h3>
                      {customers.find(c => c.id === customerId) && (
                        <div>
                          <div className="font-medium text-slate-700">
                            {customers.find(c => c.id === customerId).name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {customers.find(c => c.id === customerId).phone}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Bill Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-semibold text-slate-700">₹{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="text-slate-600">Discount:</span>
                        <div className="ml-2 flex items-center bg-white rounded-lg border border-slate-200">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-16 p-2 text-center border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={discount}
                            onChange={(e) => setDiscount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                          />
                          <span className="px-2 text-slate-600 bg-slate-50 rounded-r-lg">%</span>
                        </div>
                      </div>
                      <span className="font-semibold text-red-600">- ₹{discountAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <span className="text-slate-600">Tax:</span>
                        <div className="ml-2 flex items-center bg-white rounded-lg border border-slate-200">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            className="w-16 p-2 text-center border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={taxRate}
                            onChange={(e) => setTaxRate(Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
                          />
                          <span className="px-2 text-slate-600 bg-slate-50 rounded-r-lg">%</span>
                        </div>
                      </div>
                      <span className="font-semibold text-slate-700">+ ₹{tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-slate-700">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Mode */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-700 mb-3">Payment Mode</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { mode: 'cash', label: 'Cash' },
                        { mode: 'card', label: 'Card' },
                        { mode: 'upi', label: 'UPI' },
                        { mode: 'insurance', label: 'Insurance' },
                        { mode: 'wallet', label: 'Wallet' },
                        { mode: 'other', label: 'Other' }
                      ].map(({ mode, label }) => (
                        <button
                          key={mode}
                          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            paymentMode === mode 
                              ? 'bg-blue-600 text-white shadow-lg' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          onClick={() => setPaymentMode(mode)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-medium"
                      onClick={handlePrint}
                    >
                      <Printer className="w-5 h-5 mr-2" /> Print Bill
                    </button>
                    <button
                      className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center font-medium"
                      onClick={handleEmail}
                    >
                      <Mail className="w-5 h-5 mr-2" /> Email Bill
                    </button>
                    <button
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      Complete Sale (F2)
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <CreditCard className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium">Add products to see bill summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInterface;