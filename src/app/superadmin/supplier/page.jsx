'use client';

import React, { useState } from 'react';
import { Eye, Download, X, User, Users, MapPin, Phone, Mail, Calendar, FileText, CreditCard, Building, Shield, CheckCircle, Plus, UserCheck, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Asha Pharma',
      email: 'contact@ashapharma.com',
      phone: '9876543210',
      store: 'Asha Medical Store',
      address: '123, MG Road, Pune',
      licenseNo: 'LIC123456',
      panNo: 'ABCDE1234F',
      gstNo: '27ABCDE1234F1Z5',
      expiry: '2025-12-31',
      licenseFile: '/dummy-license.pdf',
      status: 'Active',
      joinDate: '2020-05-15',
      lastLogin: '2025-07-16 10:30 AM',
      deliveryAreas: 'Pune, Mumbai, Nashik',
      rating: '4.8/5',
      rejectionReason: ''
    },
    {
      id: 2,
      name: 'Medico Plus',
      email: 'info@medicoplus.com',
      phone: '9823456789',
      store: 'Medico Health Hub',
      address: '45, Station Rd, Mumbai',
      licenseNo: 'LIC654321',
      panNo: 'FGHIJ5678K',
      gstNo: '27FGHIJ5678K1Z2',
      expiry: '2026-03-15',
      licenseFile: '/dummy-license2.pdf',
      status: 'Active',
      joinDate: '2021-02-20',
      lastLogin: '2025-07-16 09:45 AM',
      deliveryAreas: 'Mumbai, Thane, Navi Mumbai',
      rating: '4.5/5',
      rejectionReason: ''
    },
    {
      id: 3,
      name: 'City Meds',
      email: 'support@citymeds.com',
      phone: '9812345678',
      store: 'City Medical',
      address: '78, Main Street, Bangalore',
      licenseNo: 'LIC789012',
      panNo: 'KLMNO5678P',
      gstNo: '29KLMNO5678P1Z3',
      expiry: '2025-11-30',
      licenseFile: '/dummy-license3.pdf',
      status: 'Pending',
      joinDate: '2023-01-10',
      lastLogin: '2025-07-15 02:15 PM',
      deliveryAreas: 'Bangalore, Mysore',
      rating: '4.2/5',
      rejectionReason: ''
    },
    {
      id: 4,
      name: 'Health Plus',
      email: 'contact@healthplus.com',
      phone: '9876541230',
      store: 'Health Plus Pharmacy',
      address: '32, Gandhi Road, Delhi',
      licenseNo: 'LIC456789',
      panNo: 'PQRST1234U',
      gstNo: '07PQRST1234U1Z6',
      expiry: '2026-06-30',
      licenseFile: '/dummy-license4.pdf',
      status: 'Rejected',
      joinDate: '2022-11-05',
      lastLogin: '2025-06-28 11:20 AM',
      deliveryAreas: 'Delhi, Noida',
      rating: '3.9/5',
      rejectionReason: 'Incomplete documentation and invalid license'
    },
  ]);

  const router = useRouter();

  const handleAddSupplier = () => {
    router.push('/supp_register'); // Update path as per your routing
  };

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [supplierToReject, setSupplierToReject] = useState(null);
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);

  // Filter suppliers based on selected filter
  const filteredSuppliers = filter === 'all' 
    ? suppliers 
    : suppliers.filter(supplier => supplier.status.toLowerCase() === filter.toLowerCase());

  // Calculate stats based on actual data
  const stats = [
    { 
      label: 'Total Suppliers', 
      value: suppliers.length, 
      icon: Users, 
      color: 'from-green-500 to-emerald-600',
      filter: 'all'
    },
    { 
      label: 'Active Suppliers', 
      value: suppliers.filter(s => s.status === 'Active').length, 
      icon: UserCheck, 
      color: 'from-green-600 to-green-700',
      filter: 'active'
    },
    { 
      label: 'Pending Approvals', 
      value: suppliers.filter(s => s.status === 'Pending').length, 
      icon: Clock, 
      color: 'from-amber-500 to-orange-600',
      filter: 'pending'
    },
    { 
      label: 'Rejected Accounts', 
      value: suppliers.filter(s => s.status === 'Rejected').length, 
      icon: Shield, 
      color: 'from-red-500 to-red-600',
      filter: 'rejected'
    },
  ];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const approvalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  const viewSupplierDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const downloadLicense = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    link.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
    document.body.style.overflow = 'unset';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isLicenseExpiring = (expiry) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const handleApprove = (supplierId) => {
    const updatedSuppliers = suppliers.map(s => 
      s.id === supplierId ? {...s, status: 'Active'} : s
    );
    setSuppliers(updatedSuppliers);
    setShowApprovalSuccess(true);
    setTimeout(() => setShowApprovalSuccess(false), 2000);
  };

  const handleRejectClick = (supplierId) => {
    setSupplierToReject(supplierId);
    setShowRejectionDialog(true);
  };

  const confirmRejection = () => {
    const updatedSuppliers = suppliers.map(s => 
      s.id === supplierToReject ? {...s, status: 'Rejected', rejectionReason} : s
    );
    setSuppliers(updatedSuppliers);
    setShowRejectionDialog(false);
    setRejectionReason('');
    setSupplierToReject(null);
  };

  const cancelRejection = () => {
    setShowRejectionDialog(false);
    setRejectionReason('');
    setSupplierToReject(null);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Suppliers</h1>
          <p className="text-green-600 text-sm">Manage users, approvals, and system oversight</p>
        </div>
        <div className="flex gap-4">
          <button  onClick={handleAddSupplier} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base font-semibold">
            <Plus size={20} /> Add Supplier
          </button>
        </div>
      </div>
     
      {/* Static cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(stat.filter)}
              className={`bg-white rounded-2xl shadow-lg p-6 transform transition-transform duration-200 cursor-pointer border-l-4 ${
                filter === stat.filter ? 'border-green-500' : 'border-transparent'
              }`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} w-fit mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
        {/* table */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="h-5 w-5" />
            Supplier List {filter !== 'all' && `(${filter.charAt(0).toUpperCase() + filter.slice(1)})`}
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Contact No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Store Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-green-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">{supplier.deliveryAreas.split(',')[0]} +{supplier.deliveryAreas.split(',').length-1} more</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{supplier.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{supplier.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{supplier.store}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium justify-center ${getStatusColor(supplier.status)}`}>
                        {supplier.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {supplier.status === 'Pending' ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(supplier.id)}
                            className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 rounded-lg text-sm font-medium"
                          >
                            Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRejectClick(supplier.id)}
                            className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg text-sm font-medium"
                          >
                            Reject
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewSupplierDetails(supplier)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </motion.button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enhanced Modal with Framer Motion */}
        <AnimatePresence>
          {isModalOpen && selectedSupplier && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Animated backdrop */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backdropVariants}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
              ></motion.div>
              
              {/* Animated modal content */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                {/* Modal header */}
                <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Building className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Supplier Details</h3>
                      <p className="text-green-100 text-sm">{selectedSupplier.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Modal body */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  {/* Status Banner */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`mb-6 p-4 rounded-xl border-l-4 ${
                      selectedSupplier.status === 'Active' ? 'bg-green-50 border-green-500' : 
                      selectedSupplier.status === 'Pending' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-5 w-5 ${
                        selectedSupplier.status === 'Active' ? 'text-green-600' : 
                        selectedSupplier.status === 'Pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                      <span className={`font-medium ${
                        selectedSupplier.status === 'Active' ? 'text-green-800' : 
                        selectedSupplier.status === 'Pending' ? 'text-yellow-800' :
                        'text-red-800'
                      }`}>
                        Account Status: {selectedSupplier.status}
                      </span>
                    </div>
                    {selectedSupplier.status === 'Rejected' && selectedSupplier.rejectionReason && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                        <p className="text-sm text-red-700">{selectedSupplier.rejectionReason}</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Last login: {selectedSupplier.lastLogin} • Rating: {selectedSupplier.rating}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Supplier Information */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                      >
                        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Supplier Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Building className="h-4 w-4 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">{selectedSupplier.name}</p>
                              <p className="text-sm text-gray-600">{selectedSupplier.store}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">{selectedSupplier.email}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">{selectedSupplier.phone}</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                            <p className="text-gray-700">{selectedSupplier.address}</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <Shield className="h-4 w-4 text-blue-600 mt-1" />
                            <p className="text-gray-700">Delivery Areas: {selectedSupplier.deliveryAreas}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Business Information */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                      >
                        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Business Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">{selectedSupplier.joinDate}</p>
                              <p className="text-sm text-gray-600">Join Date</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">{selectedSupplier.rating}</p>
                              <p className="text-sm text-gray-600">Customer Rating</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* License Information */}
                      {selectedSupplier.status !== 'Rejected' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className={`p-6 rounded-xl border ${
                            isLicenseExpiring(selectedSupplier.expiry) 
                              ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' 
                              : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                          }`}
                        >
                          <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                            isLicenseExpiring(selectedSupplier.expiry) ? 'text-red-800' : 'text-purple-800'
                          }`}>
                            <FileText className="h-5 w-5" />
                            License Information
                            {isLicenseExpiring(selectedSupplier.expiry) && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Expires Soon
                              </span>
                            )}
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <FileText className={`h-4 w-4 ${
                                isLicenseExpiring(selectedSupplier.expiry) ? 'text-red-600' : 'text-purple-600'
                              }`} />
                              <div>
                                <p className="font-medium text-gray-900">{selectedSupplier.licenseNo}</p>
                                <p className="text-sm text-gray-600">License Number</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className={`h-4 w-4 ${
                                isLicenseExpiring(selectedSupplier.expiry) ? 'text-red-600' : 'text-purple-600'
                              }`} />
                              <div>
                                <p className={`font-medium ${
                                  isLicenseExpiring(selectedSupplier.expiry) ? 'text-red-900' : 'text-gray-900'
                                }`}>
                                  {selectedSupplier.expiry}
                                </p>
                                <p className="text-sm text-gray-600">Expiry Date</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Tax Information */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200"
                      >
                        <h4 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Tax Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-4 w-4 text-amber-600" />
                            <div>
                              <p className="font-medium text-gray-900">{selectedSupplier.panNo}</p>
                              <p className="text-sm text-gray-600">PAN Number</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-4 w-4 text-amber-600" />
                            <div>
                              <p className="font-medium text-gray-900">{selectedSupplier.gstNo}</p>
                              <p className="text-sm text-gray-600">GST Number</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* License Document - Only show if not rejected */}
                      {selectedSupplier.status !== 'Rejected' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200"
                        >
                          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            License Document
                          </h4>
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.open(selectedSupplier.licenseFile, '_blank')}
                              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                            >
                              <Eye className="mr-2" size={16} />
                              View Document
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => downloadLicense(selectedSupplier.licenseFile)}
                              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                            >
                              <Download className="mr-2" size={16} />
                              Download
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Modal footer - Only show download button if not rejected */}
                {selectedSupplier.status !== 'Rejected' && (
                  <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Supplier ID: {selectedSupplier.id} • Last updated: {selectedSupplier.lastLogin}
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => downloadLicense(selectedSupplier.licenseFile)}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2"
                      >
                        <Download size={16} />
                        Download License
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={closeModal}
                        className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Rejection Dialog */}
        <AnimatePresence>
          {showRejectionDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backdropVariants}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              ></motion.div>
              
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
              >
                <h3 className="text-xl font-bold text-red-800 mb-4">Reject Supplier Application</h3>
                <div className="mb-4">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Rejection
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter the reason for rejecting this supplier..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={cancelRejection}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmRejection}
                    disabled={!rejectionReason}
                    className={`px-4 py-2 text-white rounded-lg transition-all duration-200 ${
                      rejectionReason 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Confirm Rejection
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Approval Success Notification */}
        <AnimatePresence>
          {showApprovalSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={approvalVariants}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Supplier approved successfully!</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}