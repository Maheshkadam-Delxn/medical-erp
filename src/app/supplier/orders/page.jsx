'use client';

import { useState } from 'react';
import { Eye, X, Truck, CheckCircle, Clock, AlertCircle, Search, Filter, Download, ChevronDown, MoreVertical, Check } from 'lucide-react';

// ===== Enhanced Component Implementations =====
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm',
    ghost: 'hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onValueChange, className }) => {
  return (
    <div className={`relative ${className}`}>
      <select 
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

const Card = ({ children, className, onClick }) => (
  <div 
    className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-md ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-5 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

const Table = ({ children, className }) => (
  <div className={`relative w-full overflow-auto ${className}`}>
    <table className="w-full caption-bottom text-sm">
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className }) => (
  <thead className={`bg-gray-50 [&_tr]:border-b ${className}`}>
    {children}
  </thead>
);

const TableRow = ({ children, className }) => (
  <tr className={`border-b border-gray-200 hover:bg-gray-50/50 transition-colors ${className}`}>
    {children}
  </tr>
);

const TableHead = ({ children, className }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableBody = ({ children, className }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

const TableCell = ({ children, className }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'text-gray-800 border border-gray-300',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
    purple: 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const mockOrders = [
  {
    orderId: 'ORD001',
    chemistName: 'HealthPlus Pharmacy',
    orderDate: '2025-07-07',
    totalItems: 3,
    totalAmount: 520,
    paymentStatus: 'Paid',
    deliveryStatus: 'New',
    items: [
      { name: 'Paracetamol 500mg', qty: 10, price: 10 },
      { name: 'Amoxicillin 250mg Capsules', qty: 5, price: 30 },
      { name: 'Ibuprofen 400mg Tablets', qty: 2, price: 50 }
    ],
    contact: '9876543210',
    address: '123, Main Road, Pune - 411001',
    paymentMode: 'Online',
    cancellationReason: ''
  },
  {
    orderId: 'ORD002',
    chemistName: 'MedLife Solutions',
    orderDate: '2025-07-06',
    totalItems: 2,
    totalAmount: 1200,
    paymentStatus: 'Pending',
    deliveryStatus: 'Pending',
    items: [
      { name: 'Vitamin D3 60K IU', qty: 5, price: 200 },
      { name: 'Multivitamin Capsules', qty: 2, price: 100 }
    ],
    contact: '8765432109',
    address: '456, Market Lane, Mumbai - 400001',
    paymentMode: 'COD',
    cancellationReason: ''
  },
  {
    orderId: 'ORD003',
    chemistName: 'CareWell Medicals',
    orderDate: '2025-07-05',
    totalItems: 1,
    totalAmount: 350,
    paymentStatus: 'Paid',
    deliveryStatus: 'Dispatched',
    items: [
      { name: 'Cetirizine 10mg Tablets', qty: 10, price: 35 }
    ],
    contact: '7654321098',
    address: '789, Health Street, Bangalore - 560001',
    paymentMode: 'Online',
    cancellationReason: ''
  },
  {
    orderId: 'ORD004',
    chemistName: 'Apollo Pharmacy',
    orderDate: '2025-07-04',
    totalItems: 4,
    totalAmount: 875,
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    items: [
      { name: 'Dolo 650mg', qty: 20, price: 15 },
      { name: 'Azithromycin 500mg', qty: 5, price: 45 },
      { name: 'Vitamin B Complex', qty: 2, price: 100 },
      { name: 'ORS Powder', qty: 10, price: 10 }
    ],
    contact: '6543210987',
    address: '321, Medical Square, Delhi - 110001',
    paymentMode: 'Online',
    cancellationReason: ''
  },
  {
    orderId: 'ORD005',
    chemistName: 'Wellness Forever',
    orderDate: '2025-07-03',
    totalItems: 2,
    totalAmount: 680,
    paymentStatus: 'Pending',
    deliveryStatus: 'Cancelled',
    items: [
      { name: 'Pantoprazole 40mg', qty: 5, price: 36 },
      { name: 'Montelukast 10mg', qty: 10, price: 50 }
    ],
    contact: '5432109876',
    address: '654, Wellness Road, Hyderabad - 500001',
    paymentMode: 'COD',
    cancellationReason: 'Out of stock for Montelukast 10mg'
  }
];

const statusIcons = {
  New: <Clock className="w-4 h-4 text-purple-500" />,
  Pending: <Clock className="w-4 h-4 text-yellow-500" />,
  Dispatched: <Truck className="w-4 h-4 text-blue-500" />,
  Delivered: <CheckCircle className="w-4 h-4 text-green-500" />,
  Cancelled: <AlertCircle className="w-4 h-4 text-red-500" />
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [activeStatusCard, setActiveStatusCard] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.chemistName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.deliveryStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    // Additional filter for status cards
    const matchesStatusCard = activeStatusCard ? order.deliveryStatus === activeStatusCard : true;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesStatusCard;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getStatusColor = (status) => {
    if (status === '-') return 'outline';
    switch (status) {
      case 'New': return 'purple';
      case 'Pending': return 'yellow';
      case 'Dispatched': return 'blue';
      case 'Delivered': return 'green';
      case 'Cancelled': return 'red';
      case 'Paid': return 'green';
      case 'Failed': return 'red';
      default: return 'gray';
    }
  };

  const updateOrderStatus = (orderId, field, value) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId ? { ...order, [field]: value } : order
      )
    );
    
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder(prev => ({ ...prev, [field]: value }));
    }
  };

  const acceptOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId ? { ...order, deliveryStatus: 'Pending' } : order
      )
    );
    
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder(prev => ({ ...prev, deliveryStatus: 'Pending' }));
    }
  };

  const cancelOrder = () => {
    if (!selectedOrder) return;
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === selectedOrder.orderId 
          ? { 
              ...order, 
              deliveryStatus: 'Cancelled',
              paymentStatus: '-',
              cancellationReason: cancellationReason 
            } 
          : order
      )
    );
    
    setSelectedOrder(prev => ({ 
      ...prev, 
      deliveryStatus: 'Cancelled',
      paymentStatus: '-',
      cancellationReason: cancellationReason 
    }));
    
    setShowCancelModal(false);
    setCancellationReason('');
  };

  const handleStatusCardClick = (status) => {
    if (activeStatusCard === status) {
      // If clicking the same card again, reset the filter
      setActiveStatusCard(null);
      setStatusFilter('all');
    } else {
      setActiveStatusCard(status);
      setStatusFilter(status);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setActiveStatusCard(null);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all supplier orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders by ID or chemist..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            setActiveStatusCard(value === 'all' ? null : value);
          }}>
            <option value="all">All Delivery Statuses</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <option value="all">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </Select>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card 
          onClick={() => handleStatusCardClick('New')}
          className={activeStatusCard === 'New' ? 'ring-2 ring-purple-500' : ''}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">New Orders</p>
              <p className="text-2xl font-bold mt-1">
                {orders.filter(o => o.deliveryStatus === 'New').length}
              </p>
            </div>
            <div className="rounded-lg bg-purple-100 p-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => handleStatusCardClick('Pending')}
          className={activeStatusCard === 'Pending' ? 'ring-2 ring-yellow-500' : ''}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold mt-1">
                {orders.filter(o => o.deliveryStatus === 'Pending').length}
              </p>
            </div>
            <div className="rounded-lg bg-yellow-100 p-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => handleStatusCardClick('Dispatched')}
          className={activeStatusCard === 'Dispatched' ? 'ring-2 ring-blue-500' : ''}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Dispatched</p>
              <p className="text-2xl font-bold mt-1">
                {orders.filter(o => o.deliveryStatus === 'Dispatched').length}
              </p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => handleStatusCardClick('Delivered')}
          className={activeStatusCard === 'Delivered' ? 'ring-2 ring-green-500' : ''}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-2xl font-bold mt-1">
                {orders.filter(o => o.deliveryStatus === 'Delivered').length}
              </p>
            </div>
            <div className="rounded-lg bg-green-100 p-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={() => handleStatusCardClick('Cancelled')}
          className={activeStatusCard === 'Cancelled' ? 'ring-2 ring-red-500' : ''}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <p className="text-2xl font-bold mt-1">
                {orders.filter(o => o.deliveryStatus === 'Cancelled').length}
              </p>
            </div>
            <div className="rounded-lg bg-red-100 p-3">
              <X className="w-6 h-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <p className="text-sm text-gray-500">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
              {activeStatusCard && ` (Filtered by ${activeStatusCard})`}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Order ID</TableHead>
                <TableHead>Chemist</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium text-indigo-600">{order.orderId}</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{order.chemistName}</div>
                      <div className="text-xs text-gray-500">{order.contact}</div>
                    </TableCell>
                    <TableCell className="text-gray-700">{formatDate(order.orderDate)}</TableCell>
                    <TableCell className="text-center text-gray-700">{order.totalItems}</TableCell>
                    <TableCell className="text-right font-medium text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      {order.deliveryStatus === 'Cancelled' ? (
                        <Badge variant="outline">-</Badge>
                      ) : (
                        <Badge variant={getStatusColor(order.paymentStatus)} className="capitalize">
                          {order.paymentStatus}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(order.deliveryStatus)} className="capitalize">
                          <div className="flex items-center gap-1.5">
                            {statusIcons[order.deliveryStatus]}
                            {order.deliveryStatus}
                          </div>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {order.deliveryStatus === 'New' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => acceptOrder(order.orderId)}
                              className="hover:bg-gray-100 text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                              <span className="sr-only">Accept</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowCancelModal(true);
                              }}
                              className="hover:bg-gray-100 text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          className="hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                    No orders match your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="sticky top-0 bg-white p-5 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{selectedOrder.orderId}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {formatDate(selectedOrder.orderDate)}
                </p>
                {selectedOrder.deliveryStatus === 'Cancelled' && selectedOrder.cancellationReason && (
                  <div className="mt-2 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-700">Cancellation Reason:</p>
                    <p className="text-sm text-red-600">{selectedOrder.cancellationReason}</p>
                  </div>
                )}
              </div>
              <button
                className="rounded-full p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedOrder(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-3">Chemist Information</h3>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">{selectedOrder.chemistName}</p>
                    <p className="text-gray-700">{selectedOrder.contact}</p>
                    <p className="text-gray-600 text-sm">{selectedOrder.address}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-3">Order Summary</h3>
                  <div className="space-y-3">
                    {selectedOrder.deliveryStatus !== 'New' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Mode:</span>
                          <span className="font-medium">{selectedOrder.paymentMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className="font-medium">
                            {selectedOrder.deliveryStatus === 'Cancelled' ? (
                              <span className="text-gray-500">-</span>
                            ) : (
                              <Badge variant={getStatusColor(selectedOrder.paymentStatus)} className="capitalize">
                                {selectedOrder.paymentStatus}
                              </Badge>
                            )}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Status:</span>
                      <span className="font-medium">
                        <Badge variant={getStatusColor(selectedOrder.deliveryStatus)} className="capitalize">
                          <div className="flex items-center gap-1.5">
                            {statusIcons[selectedOrder.deliveryStatus]}
                            {selectedOrder.deliveryStatus}
                          </div>
                        </Badge>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-3">Order Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50%]">Item</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                          <TableCell className="text-right text-gray-700">{item.qty}</TableCell>
                          <TableCell className="text-right text-gray-700">₹{item.price.toLocaleString('en-IN')}</TableCell>
                          <TableCell className="text-right font-medium text-gray-900">₹{(item.qty * item.price).toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="w-full md:w-1/3 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200 text-gray-900">
                    <span>Total:</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-5 border-t flex justify-end gap-3">
              {selectedOrder.deliveryStatus === 'New' && (
                <>
                  <Button 
                    variant="danger"
                    onClick={() => {
                      setShowCancelModal(true);
                    }}
                  >
                    Cancel Order
                  </Button>
                  <Button onClick={() => {
                    acceptOrder(selectedOrder.orderId);
                    setSelectedOrder(null);
                  }}>
                    Accept Order
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Button>
                Print Invoice
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-in slide-in-from-bottom-10">
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Cancel Order</h2>
              <button
                className="rounded-full p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason('');
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <p className="text-gray-700">Are you sure you want to cancel this order?</p>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for cancellation
                </label>
                <Textarea
                  id="reason"
                  rows={3}
                  placeholder="Enter the reason for cancellation..."
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              </div>
            </div>
            
            <div className="p-5 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason('');
                }}
              >
                Back
              </Button>
              <Button
                variant="danger"
                onClick={cancelOrder}
                disabled={!cancellationReason.trim()}
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}