"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  Download,
  X,
  UserX,
  Users,
  MapPin,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Building,
  Shield,
  CheckCircle,
  Plus,
  UserCheck,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch suppliers from API
  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/supplier/register"); // Use the GET endpoint for suppliers
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch suppliers");
      }
      const data = await response.json();

      // Ensure data is an array and map to UI expectations
      const suppliersArray = Array.isArray(data.data) ? data.data : [];

      const transformedSuppliers = suppliersArray.map((supplier) => ({
        ...supplier,
        // Map schema fields to UI expected fields
        name: supplier.companyName, // Using companyName for display name
        storeName: supplier.companyName, // Using companyName as storeName
        status: getSupplierStatus(supplier),
        licenseNumber: supplier.drugLicenseNumber,
        address: `${supplier.address}, ${supplier.city}, ${supplier.state} - ${supplier.pincode}`,
        // Find the license file URL from the documents array
        licenseFileUrl:
          supplier.documents?.find((doc) =>
            doc.name?.toLowerCase().includes("license")
          )?.url || null,
        gstFileUrl:
          supplier.documents?.find((doc) =>
            doc.name?.toLowerCase().includes("gst")
          )?.url || null,
        joinDate: supplier.createdAt
          ? new Date(supplier.createdAt).toLocaleDateString()
          : "N/A",
      }));
      setSuppliers(transformedSuppliers);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
      setError(err.message);
      setSuppliers([]); // Ensure suppliers is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Helper function to determine status from isApproved field
  const getSupplierStatus = (supplier) => {
    if (supplier.isApproved === true) {
      return "Active";
    } else if (supplier.isApproved === false && supplier.rejectionReason) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };

  const handleAddSupplier = () => {
    router.push("/supplier/register"); // Correct path for supplier registration
  };

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [supplierToReject, setSupplierToReject] = useState(null);
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);

  // Filter suppliers based on selected filter - with safety check
  const filteredSuppliers = React.useMemo(() => {
    if (!Array.isArray(suppliers)) {
      return [];
    }
    return filter === "all"
      ? suppliers
      : suppliers.filter(
          (s) => s.status && s.status.toLowerCase() === filter.toLowerCase()
        );
  }, [suppliers, filter]);

  // Calculate stats based on actual data - with safety checks
  const stats = React.useMemo(() => {
    const suppliersArray = Array.isArray(suppliers) ? suppliers : [];
    return [
      {
        label: "Total Suppliers",
        value: suppliersArray.length,
        icon: Users,
        color: "from-green-500 to-emerald-600",
        filter: "all",
      },
      {
        label: "Active Suppliers",
        value: suppliersArray.filter((s) => s.status === "Active").length,
        icon: UserCheck,
        color: "from-green-600 to-green-700",
        filter: "active",
      },
      {
        label: "Pending Approvals",
        value: suppliersArray.filter((s) => s.status === "Pending").length,
        icon: Clock,
        color: "from-amber-500 to-orange-600",
        filter: "pending",
      },
      {
        label: "Rejected Accounts",
        value: suppliersArray.filter((s) => s.status === "Rejected").length,
        icon: UserX, // Changed from Shield to UserX for consistency with MedicalAdminsPage
        color: "from-red-500 to-red-600",
        filter: "rejected",
      },
    ];
  }, [suppliers]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };
  const approvalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: { opacity: 0, scale: 0.8 },
  };

  const viewSupplierDetails = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const downloadDocument = (fileUrl, fileName = "document") => {
    if (!fileUrl) return;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
    document.body.style.overflow = "unset";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = async (supplierId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/supplier/${supplierId}/approve-reject`,
        {
          method: "PATCH", // Use PATCH method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApproved: true,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to approve supplier");
      }
      setShowApprovalSuccess(true);
      setTimeout(() => setShowApprovalSuccess(false), 2000);
      fetchSuppliers(); // Re-fetch data to update UI
      closeModal(); // Close modal after action
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = (supplierId) => {
    setSupplierToReject(supplierId);
    setShowRejectionDialog(true);
  };

  const confirmRejection = async () => {
    if (!supplierToReject || !rejectionReason.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/supplier/${supplierToReject}/approve-reject`,
        {
          method: "PATCH", // Use PATCH method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApproved: false,
            rejectionReason: rejectionReason.trim(),
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to reject supplier");
      }
      setShowRejectionDialog(false);
      setRejectionReason("");
      setSupplierToReject(null);
      fetchSuppliers(); // Re-fetch data to update UI
      closeModal(); // Close modal after action
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelRejection = () => {
    setShowRejectionDialog(false);
    setRejectionReason("");
    setSupplierToReject(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Suppliers</h1>
          <p className="text-green-600 text-sm">
            Manage suppliers, approvals, and system oversight
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddSupplier}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base font-semibold"
          >
            <Plus size={20} /> Add Supplier
          </button>
        </div>
      </div>
      {/* Stats cards */}
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
                filter === stat.filter
                  ? "border-green-500"
                  : "border-transparent"
              }`}
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} w-fit mb-4`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
        {/* Table header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="h-5 w-5" />
            Supplier List{" "}
            {filter !== "all" &&
              `(${filter.charAt(0).toUpperCase() + filter.slice(1)})`}
          </h3>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No suppliers found</p>
              <p className="text-gray-400 text-sm">
                {filter !== "all"
                  ? `No suppliers with status "${filter}" found.`
                  : "Start by adding your first supplier."}
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier._id}
                    className="hover:bg-green-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {supplier.companyName || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {supplier.city}, {supplier.state}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {supplier.email || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {supplier.contactPerson || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {supplier.phone || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium justify-center ${getStatusColor(
                            supplier.status
                          )}`}
                        >
                          {supplier.status || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewSupplierDetails(supplier)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </motion.button>
                        {supplier.status === "Pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApprove(supplier._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium"
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRejectClick(supplier._id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium"
                              title="Reject"
                            >
                              <UserX size={16} />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                      <h3 className="text-xl font-bold text-white">
                        Supplier Details
                      </h3>
                      <p className="text-green-100 text-sm">
                        {selectedSupplier.companyName}
                      </p>
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
                      selectedSupplier.status === "Active"
                        ? "bg-green-50 border-green-500"
                        : selectedSupplier.status === "Pending"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          selectedSupplier.status === "Active"
                            ? "text-green-600"
                            : selectedSupplier.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          selectedSupplier.status === "Active"
                            ? "text-green-800"
                            : selectedSupplier.status === "Pending"
                            ? "text-yellow-800"
                            : "text-red-800"
                        }`}
                      >
                        Account Status: {selectedSupplier.status}
                      </span>
                    </div>
                    {selectedSupplier.status === "Rejected" &&
                      selectedSupplier.rejectionReason && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-800">
                            Rejection Reason:
                          </p>
                          <p className="text-sm text-red-700">
                            {selectedSupplier.rejectionReason}
                          </p>
                        </div>
                      )}
                    <p className="text-sm text-gray-600 mt-1">
                      Registered:{" "}
                      {selectedSupplier.createdAt
                        ? new Date(
                            selectedSupplier.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                      {selectedSupplier.approvedAt &&
                        ` • Approved: ${new Date(
                          selectedSupplier.approvedAt
                        ).toLocaleDateString()}`}
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Company Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                      >
                        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Company Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Building className="h-4 w-4 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedSupplier.companyName || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Company Name
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedSupplier.contactPerson || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Contact Person
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedSupplier.email || "N/A"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedSupplier.phone || "N/A"}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                            <div>
                              <p className="text-gray-700">
                                {selectedSupplier.address || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedSupplier.city},{" "}
                                {selectedSupplier.state} -{" "}
                                {selectedSupplier.pincode}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* Product Categories */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                      >
                        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Product Categories
                        </h4>
                        <div className="space-y-3">
                          {selectedSupplier.productCategories &&
                          selectedSupplier.productCategories.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedSupplier.productCategories.map(
                                (category, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                  >
                                    {category}
                                  </span>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              No categories specified
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* License Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
                      >
                        <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          License Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-purple-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedSupplier.drugLicenseNumber || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Drug License Number
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* GST Information */}
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
                              <p className="font-medium text-gray-900">
                                {selectedSupplier.gstNumber || "N/A"}
                              </p>
                              <p className="text-sm text-gray-600">
                                GST Number
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      {/* Documents */}
                      {selectedSupplier.documents &&
                        selectedSupplier.documents.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200"
                          >
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Documents
                            </h4>
                            <div className="space-y-3">
                              {selectedSupplier.documents.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-600" />
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {doc.name || `Document ${index + 1}`}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Uploaded:{" "}
                                        {doc.uploadedAt
                                          ? new Date(
                                              doc.uploadedAt
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() =>
                                        window.open(doc.url, "_blank")
                                      }
                                      className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-sm"
                                    >
                                      <Eye size={14} />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() =>
                                        downloadDocument(doc.url, doc.name)
                                      }
                                      className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-sm"
                                    >
                                      <Download size={14} />
                                    </motion.button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Supplier ID: {selectedSupplier._id} • Last updated:{" "}
                    {selectedSupplier.updatedAt
                      ? new Date(selectedSupplier.updatedAt).toLocaleString()
                      : "N/A"}
                  </div>
                  <div className="flex gap-3">
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
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  Reject Supplier Application
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="rejectionReason"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
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
                        ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                        : "bg-gray-400 cursor-not-allowed"
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
                  <span className="font-semibold">
                    Supplier approved successfully!
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SupplierPage;
