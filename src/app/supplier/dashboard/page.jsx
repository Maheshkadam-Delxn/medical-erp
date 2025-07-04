"use client"
import {
  Truck,
  Plus,
  AlertTriangle,
  PackageCheck,
  Receipt,
  CalendarClock,
  Banknote,
  Boxes,
  ClipboardList,
  Info,
  ChevronRight,
  ArrowUpRight,
  Search,
  Bell,
  User,
  Settings,
  HelpCircle,
  TrendingUp,
  BarChart2,
  CreditCard,
  ShieldCheck,
  Clock,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Target,
  Activity
} from 'lucide-react';

export default function ModernSupplierDashboard() {
  const supplier = {
    name: 'MedLife Pharmaceuticals',
    contact: 'support@medlife.com',
    phone: '+91-9876543210',
    address: 'Plot No. 21, MIDC Industrial Area, Mumbai, Maharashtra',
    rating: 4.8,
    since: '2018',
    category: 'Pharmaceuticals & Healthcare',
    paymentTerms: 'Net 30 Days',
    lastOrder: '2025-07-01'
  };

  const orders = [
    { id: 'ORD-2025-001', date: '2025-07-01', items: 12, status: 'Delivered', amount: '₹15,250', priority: 'high' },
    { id: 'ORD-2025-002', date: '2025-06-25', items: 5, status: 'Pending', amount: '₹7,800', priority: 'medium' },
    { id: 'ORD-2025-003', date: '2025-06-18', items: 8, status: 'Processing', amount: '₹12,400', priority: 'low' },
    { id: 'ORD-2025-004', date: '2025-06-10', items: 3, status: 'Delivered', amount: '₹4,500', priority: 'medium' },
  ];

  const inventory = [
    { name: 'Paracetamol 500mg', qty: 150, expiry: '2025-12-10', threshold: 50, category: 'Pain Relief', value: 4500 },
    { name: 'Ibuprofen 200mg', qty: 20, expiry: '2024-08-01', threshold: 30, category: 'Pain Relief', value: 1200 },
    { name: 'Amoxicillin 250mg', qty: 5, expiry: '2024-07-10', threshold: 10, category: 'Antibiotics', value: 850 },
    { name: 'Vitamin C 1000mg', qty: 85, expiry: '2026-03-15', threshold: 25, category: 'Vitamins', value: 2550 },
  ];

  const payments = [
    { invoice: 'INV-2025-001', amount: '₹5,000', status: 'Paid', dueDate: '2025-06-15', paidDate: '2025-06-10' },
    { invoice: 'INV-2025-002', amount: '₹2,500', status: 'Overdue', dueDate: '2025-07-05', paidDate: '' },
    { invoice: 'INV-2025-003', amount: '₹8,200', status: 'Partial', dueDate: '2025-07-20', paidDate: '2025-06-25' },
  ];

  const alerts = [
    { type: 'Critical Stock', message: 'Amoxicillin 250mg critically low (5 units)', priority: 'critical', icon: <AlertCircle className="w-4 h-4" /> },
    { type: 'Expiring Soon', message: '2 products expiring within 7 days', priority: 'warning', icon: <Clock className="w-4 h-4" /> },
    { type: 'Payment Overdue', message: 'INV-2025-002 overdue by 2 days', priority: 'warning', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const stats = [
    { title: 'Total Revenue', value: '₹2,42,800', change: '+18.2%', icon: <DollarSign className="w-5 h-5" />, trend: 'up', color: 'emerald' },
    { title: 'Active Orders', value: '24', change: '+12%', icon: <Package className="w-5 h-5" />, trend: 'up', color: 'blue' },
    { title: 'Inventory Value', value: '₹1,42,800', change: '+5.8%', icon: <Boxes className="w-5 h-5" />, trend: 'up', color: 'purple' },
    { title: 'Avg. Delivery', value: '2.1 days', change: '-0.5', icon: <Zap className="w-5 h-5" />, trend: 'down', color: 'orange' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Overdue': return 'bg-red-50 text-red-700 border-red-200';
      case 'Partial': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-l-red-500 text-red-900';
      case 'warning': return 'bg-amber-50 border-l-amber-500 text-amber-900';
      default: return 'bg-blue-50 border-l-blue-500 text-blue-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 ml-63">
      {/* Modern Sidebar */}
      

      

      {/* Main Content */}
      <div className="">
       

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${
                  stat.color === 'emerald' ? 'from-emerald-50 to-emerald-100 text-emerald-600' :
                  stat.color === 'blue' ? 'from-blue-50 to-blue-100 text-blue-600' :
                  stat.color === 'purple' ? 'from-purple-50 to-purple-100 text-purple-600' :
                  'from-orange-50 to-orange-100 text-orange-600'
                }`}>
                  {stat.icon}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-slate-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Supplier Profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Supplier Profile</h2>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">Edit</button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                  {supplier.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{supplier.name}</h3>
                  <p className="text-slate-600">{supplier.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                    ))}
                    <span className="text-sm text-slate-600 ml-1">{supplier.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{supplier.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{supplier.address}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Member Since</p>
                  <p className="font-semibold text-slate-800">{supplier.since}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Payment Terms</p>
                  <p className="font-semibold text-slate-800">{supplier.paymentTerms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Recent Orders</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-12 rounded-full ${
                        order.priority === 'high' ? 'bg-red-500' :
                        order.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <p className="font-semibold text-slate-800">{order.id}</p>
                        <p className="text-sm text-slate-600">{order.items} items • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{order.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Critical Alerts
                </h2>
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                  {alerts.length} Active
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {alerts.map((alert, i) => (
                <div key={i} className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.priority)}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      alert.priority === 'critical' ? 'text-red-500' : 
                      alert.priority === 'warning' ? 'text-amber-500' : 'text-blue-500'
                    }`}>
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.type}</p>
                      <p className="text-xs text-slate-600 mt-1">{alert.message}</p>
                    </div>
                    <button className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 hover:bg-white rounded">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Inventory Status</h2>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {inventory.map((item, idx) => {
                const isLowStock = item.qty < item.threshold;
                const isExpiringSoon = new Date(item.expiry) < new Date('2024-08-01');
                const stockPercentage = (item.qty / item.threshold) * 100;
                
                return (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-slate-800">{item.name}</p>
                        {isLowStock && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Low Stock</span>}
                        {isExpiringSoon && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Expiring</span>}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>{item.qty} units</span>
                            <span>Min: {item.threshold}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                isLowStock ? 'bg-red-500' : 'bg-emerald-500'
                              }`} 
                              style={{ width: `${Math.min(100, stockPercentage)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">₹{item.value}</p>
                          <p className="text-xs text-slate-600">{item.expiry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}