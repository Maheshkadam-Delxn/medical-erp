'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Eye, Mail, UserX, Building, CreditCard, Download, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleSupplierDetails = {
  name: 'Suresh Pharma',
  email: 'suresh@pharmalink.in',
  mobile: '9876543210',
  adhar: '1234-5678-9123',
  storeName: 'Suresh Medical & Co.',
  address: 'Shop 12, New Market Road, Andheri West',
  city: 'Mumbai',
  licenseNo: 'MH/2024/12345',
  licenseExpiry: '01/02/2025',
  pan: 'ABCDE1234F',
  gst: '27ABCDE1234F1Z5',
  licenseFile: 'https://via.placeholder.com/200x250.png?text=License+Copy',
};

export default function PendingApprovalsPage() {
  const [pending] = useState([
    {
      name: 'Dr. Kavita Joshi',
      email: 'kavita.j@clinicmail.com',
      role: 'Medical Admin',
      date: '2025-07-15',
    },
    {
      name: 'Suresh Pharma',
      email: 'suresh@pharmalink.in',
      role: 'Supplier',
      date: '2025-07-14',
    },
     {
      name: 'Ritika Chemist',
      email: 'ritika.chemist@healthmart.com',
      role: 'Chemist',
      date: '2025-07-13',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setSelectedUser({ ...user, ...sampleSupplierDetails });
    setShowModal(true);
  };

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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Approvals
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase rounded-tl-2xl">User Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase">Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pending.map((user, i) => (
                <tr key={i} className="hover:bg-green-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {user.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleView(user)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg" title="Reject">
                        <UserX size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal with Framer Motion */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            ></motion.div>

            {/* Modal container */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Pending Approval</h3>
                    <p className="text-green-100 text-sm">{selectedUser.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-6">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                >
                  <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Mobile No:</strong> {selectedUser.mobile}</p>
                    <p><strong>Aadhar No:</strong> {selectedUser.adhar}</p>
                  </div>
                </motion.div>

                {/* Professional Information */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                >
                  <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Professional Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                    <p><strong>Store Name:</strong> {selectedUser.storeName}</p>
                    <p><strong>City:</strong> {selectedUser.city}</p>
                    <p className="col-span-2"><strong>Address:</strong> {selectedUser.address}</p>
                    <p><strong>License No:</strong> {selectedUser.licenseNo}</p>
                    <p><strong>Expiry Date:</strong> {selectedUser.licenseExpiry}</p>
                  </div>
                </motion.div>

                {/* Tax Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200"
                >
                  <h4 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Tax Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                    <p><strong>PAN No:</strong> {selectedUser.pan}</p>
                    <p><strong>GST No:</strong> {selectedUser.gst}</p>
                  </div>
                </motion.div>

                {/* Static Document Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 mb-8"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Uploaded Document
                  </h4>
                  <div className="flex gap-4">
                    <img
                    // src="/license-sample.jpg"
                    // alt="License"
                    // className="border rounded-lg max-w-[200px]"
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open('/license-sample.jpg', '_blank')}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                      >
                        <Eye className="mr-2" size={16} />
                        View Document
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/license-sample.jpg';
                          link.download = 'license.jpg';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                      >
                        <Download className="mr-2" size={16} />
                        Download
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}  