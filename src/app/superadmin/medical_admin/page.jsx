"use client";
import { useState, useEffect } from "react";
import {
  Eye,
  Download,
  X,
  User,
  Users,
  UserX,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  CreditCard,
  Building,
  CheckCircle,
  Plus,
  UserCheck,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MedicalAdminsPage() {
  const [admins, setAdmins] = useState([]); // Will store combined chemists and suppliers
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [adminToReject, setAdminToReject] = useState(null); // Stores the full admin object
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Function to fetch data from backend
  const fetchRegistrations = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const chemistsRes = await fetch("/api/chemist/register"); // GET only chemists
      const chemistsData = await chemistsRes.json();
      if (!chemistsRes.ok)
        throw new Error(chemistsData.error || "Failed to fetch chemists");

      const allUsers = [
        ...(chemistsData.data || []).map((chem) => ({
          ...chem,
          userType: "Chemist",
          status: chem.isApproved
            ? "Active"
            : chem.rejectionReason
            ? "Rejected"
            : "Pending",
          licenseNumber: chem.licenseNumber,
          licenseExpiry: chem.licenseExpiry,
          licenseFileUrl: chem.licenseFileUrl,
          joinDate: new Date(chem.createdAt).toLocaleDateString(),
        })),
      ];
      setAdmins(allUsers);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filter admins based on selected filter
  const filteredAdmins =
    filter === "all"
      ? admins
      : admins.filter(
          (admin) => admin.status.toLowerCase() === filter.toLowerCase()
        );

  // Calculate stats based on actual data
  const stats = [
    {
      label: "Total Chemists", // Changed from Total Users
      value: admins.length,
      icon: Users,
      color: "from-green-500 to-emerald-600",
      filter: "all",
    },
    {
      label: "Active Chemists", // Changed from Active Users
      value: admins.filter((a) => a.status === "Active").length,
      icon: UserCheck,
      color: "from-green-600 to-green-700",
      filter: "active",
    },
    {
      label: "Pending Chemist Approvals", // Changed from Pending Approvals
      value: admins.filter((a) => a.status === "Pending").length,
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      filter: "pending",
    },
    {
      label: "Rejected Chemist Accounts", // Changed from Rejected Accounts
      value: admins.filter((a) => a.status === "Rejected").length,
      icon: UserX,
      color: "from-red-500 to-red-600",
      filter: "rejected",
    },
  ];

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

  const viewAdminDetails = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const downloadLicense = (fileUrl) => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.split("/").pop();
      link.click();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    document.body.style.overflow = "unset";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isLicenseExpiring = (expiry) => {
    if (!expiry) return false;
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0; // Expiring within 30 days, but not already expired
  };

  const handleApprove = async (admin) => {
    setLoading(true);
    try {
      const apiUrl = `/api/${admin.userType.toLowerCase()}/${
        admin._id
      }/approve-reject`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: true }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to approve user");
      }
      setShowApprovalSuccess(true);
      setTimeout(() => setShowApprovalSuccess(false), 2000);
      fetchRegistrations(); // Re-fetch data to update UI
      closeModal(); // Close modal after action
    } catch (error) {
      console.error("Approval error:", error);
      setFetchError(error.message); // Display error in main component
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = (admin) => {
    setAdminToReject(admin); // Store the full admin object
    setShowRejectionDialog(true);
  };

  const confirmRejection = async () => {
    if (!adminToReject || !rejectionReason.trim()) return;
    setLoading(true);
    try {
      const apiUrl = `/api/${adminToReject.userType.toLowerCase()}/${
        adminToReject._id
      }/approve-reject`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: false,
          rejectionReason: rejectionReason.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to reject user");
      }
      setShowRejectionDialog(false);
      setRejectionReason("");
      setAdminToReject(null);
      fetchRegistrations(); // Re-fetch data to update UI
      closeModal(); // Close modal after action
    } catch (error) {
      console.error("Rejection error:", error);
      setFetchError(error.message); // Display error in main component
    } finally {
      setLoading(false);
    }
  };

  const cancelRejection = () => {
    setShowRejectionDialog(false);
    setRejectionReason("");
    setAdminToReject(null);
  };

  return (
    <div>
      {/* Header with Add Admin Button */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-green-800">User Management</h1>{" "}
          {/* Changed title */}
          <p className="text-green-600 text-sm">
            Manage healthcare professionals and suppliers
          </p>{" "}
          {/* Updated description */}
        </div>
        <div className="flex gap-4">
          {/* Removed Add Admin button as it's not directly related to this page's purpose */}
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Chemist List{" "}
            {filter !== "all" &&
              `(${filter.charAt(0).toUpperCase() + filter.slice(1)})`}
          </h3>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading users...</div>
        ) : fetchError ? (
          <div className="p-6 text-center text-red-600">
            Error: {fetchError}
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            No users found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Type
                  </th>
                  {/* Added User Type */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Organization
                  </th>
                  {/* Changed from Clinic/Hospital */}
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAdmins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-green-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {admin.name || admin.contactPerson}
                          </div>
                          <div className="text-sm text-gray-500">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {admin.userType}
                      </span>{" "}
                      {/* Display User Type */}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {admin.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {admin.storeName || admin.companyName}
                        </span>{" "}
                        {/* Display organization */}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium justify-center ${getStatusColor(
                            admin.status
                          )}`}
                        >
                          {admin.status}
                        </span>
                        {isLicenseExpiring(admin.licenseExpiry) &&
                          admin.status !== "Rejected" && (
                            <span className="text-xs text-red-600 font-medium">
                              Expires Soon
                            </span>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => viewAdminDetails(admin)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </motion.button>
                        {admin.status === "Pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApprove(admin)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium"
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRejectClick(admin)}
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
          </div>
        )}

        {/* Admin Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedAdmin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={backdropVariants}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
              ></motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedAdmin.userType} Details
                      </h3>{" "}
                      {/* Dynamic title */}
                      <p className="text-green-100 text-sm">
                        {selectedAdmin.name || selectedAdmin.contactPerson}
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
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`mb-6 p-4 rounded-xl border-l-4 ${
                      selectedAdmin.status === "Active"
                        ? "bg-green-50 border-green-500"
                        : selectedAdmin.status === "Pending"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          selectedAdmin.status === "Active"
                            ? "text-green-600"
                            : selectedAdmin.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          selectedAdmin.status === "Active"
                            ? "text-green-800"
                            : selectedAdmin.status === "Pending"
                            ? "text-yellow-800"
                            : "text-red-800"
                        }`}
                      >
                        Account Status: {selectedAdmin.status}
                      </span>
                    </div>
                    {selectedAdmin.status === "Rejected" &&
                      selectedAdmin.rejectionReason && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-800">
                            Rejection Reason:
                          </p>
                          <p className="text-sm text-red-700">
                            {selectedAdmin.rejectionReason}
                          </p>
                        </div>
                      )}
                  </motion.div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                      >
                        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Personal Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <User className="h-4 w-4 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedAdmin.name ||
                                  selectedAdmin.contactPerson}
                              </p>
                              {selectedAdmin.userType === "Chemist" &&
                                selectedAdmin.shoptype && (
                                  <p className="text-sm text-gray-600">
                                    {selectedAdmin.shoptype}
                                  </p>
                                )}
                              {selectedAdmin.userType === "Supplier" &&
                                selectedAdmin.supplierType && (
                                  <p className="text-sm text-gray-600">
                                    {selectedAdmin.supplierType}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedAdmin.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedAdmin.phone}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                            <p className="text-gray-700">
                              {selectedAdmin.address}, {selectedAdmin.city},{" "}
                              {selectedAdmin.state} - {selectedAdmin.pincode}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                      >
                        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Organization Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Building className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedAdmin.storeName ||
                                  selectedAdmin.companyName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedAdmin.userType === "Chemist"
                                  ? "Pharmacy"
                                  : "Company"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {selectedAdmin.joinDate}
                              </p>
                              <p className="text-sm text-gray-600">Join Date</p>
                            </div>
                          </div>
                          {selectedAdmin.productCategories &&
                            selectedAdmin.productCategories.length > 0 && (
                              <div className="flex items-start gap-3">
                                <Plus className="h-4 w-4 text-green-600 mt-1" />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Product Categories:
                                  </p>
                                  <ul className="text-sm text-gray-600 list-disc list-inside">
                                    {selectedAdmin.productCategories.map(
                                      (cat, idx) => (
                                        <li key={idx}>{cat}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Only show license info if not rejected */}
                      {selectedAdmin.status !== "Rejected" && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`p-6 rounded-xl border ${
                              isLicenseExpiring(selectedAdmin.licenseExpiry)
                                ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                                : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                            }`}
                          >
                            <h4
                              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                                isLicenseExpiring(selectedAdmin.licenseExpiry)
                                  ? "text-red-800"
                                  : "text-purple-800"
                              }`}
                            >
                              <FileText className="h-5 w-5" />
                              License Information
                              {isLicenseExpiring(
                                selectedAdmin.licenseExpiry
                              ) && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Expires Soon
                                </span>
                              )}
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <FileText
                                  className={`h-4 w-4 ${
                                    isLicenseExpiring(
                                      selectedAdmin.licenseExpiry
                                    )
                                      ? "text-red-600"
                                      : "text-purple-600"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {selectedAdmin.licenseNumber}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    License Number
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar
                                  className={`h-4 w-4 ${
                                    isLicenseExpiring(
                                      selectedAdmin.licenseExpiry
                                    )
                                      ? "text-red-600"
                                      : "text-purple-600"
                                  }`}
                                />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      isLicenseExpiring(
                                        selectedAdmin.licenseExpiry
                                      )
                                        ? "text-red-900"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {selectedAdmin.licenseExpiry
                                      ? new Date(
                                          selectedAdmin.licenseExpiry
                                        ).toLocaleDateString()
                                      : "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Expiry Date
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
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
                                    {selectedAdmin.panNumber || "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    PAN Number
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <CreditCard className="h-4 w-4 text-amber-600" />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {selectedAdmin.gstNumber || "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    GST Number
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
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
                                onClick={() =>
                                  window.open(
                                    selectedAdmin.licenseFileUrl,
                                    "_blank"
                                  )
                                }
                                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                disabled={!selectedAdmin.licenseFileUrl}
                              >
                                <Eye className="mr-2" size={16} />
                                View Document
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                  downloadLicense(selectedAdmin.licenseFileUrl)
                                }
                                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                                disabled={!selectedAdmin.licenseFileUrl}
                              >
                                <Download className="mr-2" size={16} />
                                Download
                              </motion.button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal footer - Only show if not rejected */}
                {selectedAdmin.status !== "Rejected" && (
                  <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      User ID: {selectedAdmin._id} • Registered:{" "}
                      {selectedAdmin.joinDate}
                    </div>
                    <div className="flex gap-3">
                      {selectedAdmin.status === "Pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleApprove(selectedAdmin)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRejectClick(selectedAdmin)}
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2"
                          >
                            <UserX size={16} />
                          </motion.button>
                        </>
                      )}
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
                <h3 className="text-xl font-bold text-red-800 mb-4">
                  Reject User Application
                </h3>{" "}
                {/* Changed title */}
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
                    placeholder="Enter the reason for rejecting this user..."
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
                    User approved successfully!
                  </span>{" "}
                  {/* Changed text */}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
