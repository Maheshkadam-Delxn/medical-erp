"use client";
import { useState, useEffect, useMemo } from "react";
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
  Clock,
  Shield,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PendingApprovalsPage() {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [userToReject, setUserToReject] = useState(null);
  const [showApprovalSuccess, setShowApprovalSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Helper function to determine status from isApproved field
  const getStatus = (item) => {
    if (item.isApproved === true) {
      return "Active";
    } else if (item.isApproved === false && item.rejectionReason) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };

  // Function to fetch data from backend
  const fetchAllPendingApprovals = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const [chemistsRes, suppliersRes] = await Promise.all([
        fetch("/api/chemist/register"),
        fetch("/api/supplier/register"),
      ]);

      const chemistsData = await chemistsRes.json();
      const suppliersData = await suppliersRes.json();

      if (!chemistsRes.ok)
        throw new Error(chemistsData.error || "Failed to fetch chemists");
      if (!suppliersRes.ok)
        throw new Error(suppliersData.error || "Failed to fetch suppliers");

      console.log(chemistsData);
      
      const chemists = (chemistsData || []).map((chem) => ({
        _id: chem.id,
        userType: "Chemist",
        name: chem.name,
        email: chem.email,
        phone: chem.phone,
        organizationName: chem.storeName,
        address: chem.address,
        city: chem.city,
        state: chem.state,
        pincode: chem.pincode,
        status: getStatus(chem),
        rejectionReason: chem.rejectionReason,
        createdAt: chem.createdAt,
        updatedAt: chem.updatedAt,
        shoptype: chem.shoptype,
        licenseNumber: chem.licenseNumber,
        licenseExpiry: chem.licenseExpiry,
        licenseFileUrl: chem.licenseFileUrl,
        panNumber: chem.panNumber,
        gstNumber: chem.gstNumber,
      }));

      const suppliers = (suppliersData || []).map((supp) => ({
        _id: supp.id,
        userType: "Supplier",
        name: supp.contactPerson, // Use contactPerson as the main name for display
        email: supp.email,
        phone: supp.phone,
        organizationName: supp.companyName,
        address: supp.address,
        city: supp.city,
        state: supp.state,
        pincode: supp.pincode,
        status: getStatus(supp),
        rejectionReason: supp.rejectionReason,
        createdAt: supp.createdAt,
        updatedAt: supp.updatedAt,
        supplierType: supp.supplierType,
        drugLicenseNumber: supp.drugLicenseNumber,
        productCategories: supp.productCategories,
        documents: supp.documents,
        // For consistency, map drugLicenseNumber to licenseNumber if needed in modal
        licenseNumber: supp.drugLicenseNumber,
        licenseExpiry: supp.licenseExpiry,
        licenseFileUrl:
          supp.documents?.find((doc) =>
            doc.name?.toLowerCase().includes("license")
          )?.url || null,
        gstNumber: supp.gstNumber,
      }));

      setPendingApprovals([...chemists, ...suppliers]);

      
      
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPendingApprovals();
  }, []);

  console.log("Pending ", pendingApprovals);
  
  // Filter users based on selected filter
  const filteredUsers = useMemo(() => {
    return filter === "all"
      ? pendingApprovals
      : pendingApprovals.filter(
          (user) => user.status.toLowerCase() === filter.toLowerCase()
        );
  }, [pendingApprovals, filter]);

console.log("filter",filteredUsers);

  
  // Calculate stats based on actual data
  const stats = useMemo(() => {
    return [
      {
        label: "Total Pending Approvals",
        value: pendingApprovals.filter((u) => u.status === "Pending").length,
        icon: Clock,
        color: "from-amber-500 to-orange-600",
        filter: "pending",
      },
      {
        label: "Total Active Accounts",
        value: pendingApprovals.filter((u) => u.status === "Active").length,
        icon: UserCheck,
        color: "from-green-600 to-green-700",
        filter: "active",
      },
      {
        label: "Total Rejected Accounts",
        value: pendingApprovals.filter((u) => u.status === "Rejected").length,
        icon: UserX,
        color: "from-red-500 to-red-600",
        filter: "rejected",
      },
      {
        label: "All Accounts",
        value: pendingApprovals.length,
        icon: Users,
        color: "from-blue-500 to-indigo-600",
        filter: "all",
      },
    ];
  }, [pendingApprovals]);

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

  const viewUserDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const downloadDocument = (fileUrl, fileName = "document") => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
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

  const handleApprove = async (user) => {
    setLoading(true);
    try {
      const apiUrl = `/api/superadmin/${user.userType.toLowerCase()}/${
        user._id
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
        throw new Error(result.error || `Failed to approve ${user.userType}`);
      }

      setShowApprovalSuccess(true);
      setTimeout(() => setShowApprovalSuccess(false), 2000);
      fetchAllPendingApprovals(); // Re-fetch data to update UI
      closeModal(); // Close modal after action
    } catch (error) {
      console.error("Approval error:", error);
      setFetchError(error.message); // Display error in main component
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = (user) => {
    setUserToReject(user); // Store the full user object
    setShowRejectionDialog(true);
  };

  const confirmRejection = async () => {
    if (!userToReject || !rejectionReason.trim()) return;

    setLoading(true);
    try {
      const apiUrl = `/api/superadmin/${userToReject.userType.toLowerCase()}/${
        userToReject._id
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
        throw new Error(
          result.error || `Failed to reject ${userToReject.userType}`
        );
      }

      setShowRejectionDialog(false);
      setRejectionReason("");
      setUserToReject(null);
      fetchAllPendingApprovals(); // Re-fetch data to update UI
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
    setUserToReject(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Approval Management
          </h1>
          <p className="text-green-600 text-sm">
            Review and manage pending chemist and supplier registrations
          </p>
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
            <Users className="h-5 w-5" />
            All Registrations{" "}
            {filter !== "all" &&
              `(${filter.charAt(0).toUpperCase() + filter.slice(1)})`}
          </h3>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-600">
            Loading registrations...
          </div>
        ) : fetchError ? (
          <div className="p-6 text-center text-red-600">
            Error: {fetchError}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            No registrations found for this filter.
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Contact No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Organization
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
                {filteredUsers.map((user) => (
                  console.log("Rendering user with ID:", user._id, "User:", user),
                  <tr
                    key={user._id}
                    className="hover:bg-green-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          {user.userType === "Chemist" ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <Building className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {user.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {user.organizationName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium justify-center ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                        {user.userType === "Chemist" &&
                          isLicenseExpiring(user.licenseExpiry) &&
                          user.status !== "Rejected" && (
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
                          onClick={() => viewUserDetails(user)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </motion.button>
                        {user.status === "Pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApprove(user)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium"
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                              
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRejectClick(user)}
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

        {/* User Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedUser && (
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
                      {selectedUser.userType === "Chemist" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Building className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedUser.userType} Details
                      </h3>
                      <p className="text-green-100 text-sm">
                        {selectedUser.name}
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
                      selectedUser.status === "Active"
                        ? "bg-green-50 border-green-500"
                        : selectedUser.status === "Pending"
                        ? "bg-yellow-50 border-yellow-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          selectedUser.status === "Active"
                            ? "text-green-600"
                            : selectedUser.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          selectedUser.status === "Active"
                            ? "text-green-800"
                            : selectedUser.status === "Pending"
                            ? "text-yellow-800"
                            : "text-red-800"
                        }`}
                      >
                        Account Status: {selectedUser.status}
                      </span>
                    </div>
                    {selectedUser.status === "Rejected" &&
                      selectedUser.rejectionReason && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-800">
                            Rejection Reason:
                          </p>
                          <p className="text-sm text-red-700">
                            {selectedUser.rejectionReason}
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
                                {selectedUser.name}
                              </p>
                              {selectedUser.userType === "Chemist" &&
                                selectedUser.shoptype && (
                                  <p className="text-sm text-gray-600">
                                    {selectedUser.shoptype}
                                  </p>
                                )}
                              {selectedUser.userType === "Supplier" &&
                                selectedUser.supplierType && (
                                  <p className="text-sm text-gray-600">
                                    {selectedUser.supplierType}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedUser.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <p className="text-gray-700">
                              {selectedUser.phone}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                            <p className="text-gray-700">
                              {selectedUser.address}, {selectedUser.city},{" "}
                              {selectedUser.state} - {selectedUser.pincode}
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
                                {selectedUser.organizationName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedUser.userType === "Chemist"
                                  ? "Pharmacy"
                                  : "Company"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {new Date(
                                  selectedUser.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600">Join Date</p>
                            </div>
                          </div>
                          {selectedUser.userType === "Supplier" &&
                            selectedUser.productCategories &&
                            selectedUser.productCategories.length > 0 && (
                              <div className="flex items-start gap-3">
                                <Shield className="h-4 w-4 text-green-600 mt-1" />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    Product Categories:
                                  </p>
                                  <ul className="text-sm text-gray-600 list-disc list-inside">
                                    {selectedUser.productCategories.map(
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
                      {selectedUser.status !== "Rejected" && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`p-6 rounded-xl border ${
                              isLicenseExpiring(selectedUser.licenseExpiry)
                                ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                                : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                            }`}
                          >
                            <h4
                              className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                                isLicenseExpiring(selectedUser.licenseExpiry)
                                  ? "text-red-800"
                                  : "text-purple-800"
                              }`}
                            >
                              <FileText className="h-5 w-5" />
                              License Information
                              {isLicenseExpiring(
                                selectedUser.licenseExpiry
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
                                      selectedUser.licenseExpiry
                                    )
                                      ? "text-red-600"
                                      : "text-purple-600"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {selectedUser.licenseNumber ||
                                      selectedUser.drugLicenseNumber ||
                                      "N/A"}
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
                                      selectedUser.licenseExpiry
                                    )
                                      ? "text-red-600"
                                      : "text-purple-600"
                                  }`}
                                />
                                <div>
                                  <p
                                    className={`font-medium ${
                                      isLicenseExpiring(
                                        selectedUser.licenseExpiry
                                      )
                                        ? "text-red-900"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {selectedUser.licenseExpiry
                                      ? new Date(
                                          selectedUser.licenseExpiry
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
                                    {selectedUser.panNumber || "N/A"}
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
                                    {selectedUser.gstNumber || "N/A"}
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
                              Documents
                            </h4>
                            <div className="flex flex-col gap-3">
                              {selectedUser.userType === "Chemist" &&
                                selectedUser.licenseFileUrl && (
                                  <div className="flex gap-3">
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() =>
                                        window.open(
                                          selectedUser.licenseFileUrl,
                                          "_blank"
                                        )
                                      }
                                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                                      disabled={!selectedUser.licenseFileUrl}
                                    >
                                      <Eye className="mr-2" size={16} />
                                      View License
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() =>
                                        downloadDocument(
                                          selectedUser.licenseFileUrl,
                                          "license"
                                        )
                                      }
                                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                                      disabled={!selectedUser.licenseFileUrl}
                                    >
                                      <Download className="mr-2" size={16} />
                                      Download
                                    </motion.button>
                                  </div>
                                )}
                              {selectedUser.userType === "Supplier" &&
                                selectedUser.documents &&
                                selectedUser.documents.length > 0 && (
                                  <div className="space-y-3">
                                    {selectedUser.documents.map(
                                      (doc, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-between p-3 bg-white rounded-lg border"
                                        >
                                          <div className="flex items-center gap-3">
                                            <FileText className="h-4 w-4 text-gray-600" />
                                            <div>
                                              <p className="font-medium text-gray-900">
                                                {doc.name ||
                                                  `Document ${index + 1}`}
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
                                                downloadDocument(
                                                  doc.url,
                                                  doc.name
                                                )
                                              }
                                              className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-100 rounded text-sm"
                                            >
                                              <Download size={14} />
                                            </motion.button>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal footer - Only show if not rejected */}
                {selectedUser.status !== "Rejected" && (
                  <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      User ID: {selectedUser._id} • Registered:{" "}
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-3">
                      {selectedUser.status === "Pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleApprove(selectedUser)}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2"
                          >
                            <CheckCircle size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRejectClick(selectedUser)}
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
                  Reject Application
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
                    placeholder={`Enter the reason for rejecting this ${
                      userToReject?.userType || "user"
                    }...`}
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
                    Application approved successfully!
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
