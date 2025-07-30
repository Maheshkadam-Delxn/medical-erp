"use client"

import { useState, useEffect, useMemo } from "react"
import {
  CheckCircle,
  UserX,
  Users,
  UserCheck,
  Clock,
  Shield,
  Eye,
  Mail,
  Calendar,
  Building,
  X,
  User,
  MapPin,
  Phone,
  FileText,
  Download,
  ShieldMinus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function SuperAdminDashboardPage() {
  const [stats, setStats] = useState({
    totalChemists: 0,
    totalSuppliers: 0,
    pendingApprovals: 0,
    blockedAccounts: 0,
  })
  const [pending, setPending] = useState([])
  const [recent, setRecent] = useState([])
  const [blocked, setBlocked] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [userToReject, setUserToReject] = useState(null)

  // New states for block dialog
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [blockReason, setBlockReason] = useState("")
  const [userToBlock, setUserToBlock] = useState(null)

  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const [filter, setFilter] = useState("all")
  const [pendingSubFilter, setPendingSubFilter] = useState("all") // New state for sub-filtering pending users
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard data
        const dashboardResponse = await fetch("/api/superadmin/dashboard")
        const dashboardResult = await dashboardResponse.json()

        // Fetch all users for comprehensive filtering
        const [chemistsRes, suppliersRes] = await Promise.all([
          fetch("/api/chemist/register"),
          fetch("/api/supplier/register"),
        ])

        const chemistsData = await chemistsRes.json()
        const suppliersData = await suppliersRes.json()

        if (dashboardResult.success && dashboardResult.data) {
          setRecent(dashboardResult.data.recent || [])
          setPending(dashboardResult.data.pending || [])
          setBlocked(dashboardResult.data.blocked || [])
          setStats(
            dashboardResult.data.stats || {
              totalChemists: 0,
              totalSuppliers: 0,
              pendingApprovals: 0,
              blockedAccounts: 0,
            },
          )
        }

        // Process all users for filtering
        const getStatus = (item) => {
          if (item.isBlocked) {
            return "Blocked"
          }
          if (item.isApproved === true) {
            return "Active"
          }
          if (item.isApproved === false && item.rejectionReason) {
            return "Rejected"
          }
          return "Pending"
        }

        const chemists = (chemistsData || []).map((chem) => ({
          _id: chem._id || chem.id,
          id: chem._id || chem.id,
          userType: "chemist",
          role: "Chemist",
          name: chem.name,
          email: chem.email,
          phone: chem.phone,
          organizationName: chem.storeName,
          companyName: chem.storeName,
          shopName: chem.storeName,
          address: chem.address,
          city: chem.city,
          state: chem.state,
          pincode: chem.pincode,
          status: getStatus(chem),
          isApproved: chem.isApproved,
          isBlocked: chem.isBlocked,
          rejectionReason: chem.rejectionReason,
          blockReason: chem.blockReason,
          createdAt: chem.createdAt,
          updatedAt: chem.updatedAt,
          licenseFileUrl: chem.licenseFileUrl,
        }))

        const suppliers = (suppliersData || []).map((supp) => ({
          _id: supp._id || supp.id,
          id: supp._id || supp.id,
          userType: "supplier",
          role: "Supplier",
          name: supp.contactPerson,
          contactPerson: supp.contactPerson,
          email: supp.email,
          phone: supp.phone,
          organizationName: supp.companyName,
          companyName: supp.companyName,
          address: supp.address,
          city: supp.city,
          state: supp.state,
          pincode: supp.pincode,
          status: getStatus(supp),
          isApproved: supp.isApproved,
          isBlocked: supp.isBlocked,
          rejectionReason: supp.rejectionReason,
          blockReason: supp.blockReason,
          createdAt: supp.createdAt,
          updatedAt: supp.updatedAt,
          licenseFileUrl: supp.documents?.find((doc) => doc.name?.toLowerCase().includes("license"))?.url || null,
        }))

        setAllUsers([...chemists, ...suppliers])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const refreshDashboardData = async () => {
    try {
      const response = await fetch("/api/superadmin/dashboard")
      const result = await response.json()
      if (result.success && result.data) {
        setRecent(result.data.recent || [])
        setPending(result.data.pending || [])
        setBlocked(result.data.blocked || [])
        setStats(
          result.data.stats || {
            totalChemists: 0,
            totalSuppliers: 0,
            pendingApprovals: 0,
            blockedAccounts: 0,
          },
        )
      }
    } catch (error) {
      console.error("Error refreshing dashboard data:", error)
    }
  }

  const viewUserDetails = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleApprove = async (user) => {
    try {
      const response = await fetch(`/api/superadmin/${user.userType}/${user.id}/approve-reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: true,
        }),
      })

      if (response.ok) {
        setSuccessMessage(`${user.userType} approved successfully!`)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        await refreshDashboardData()
        closeModal()
      } else {
        console.error("Approval failed:", await response.text())
      }
    } catch (error) {
      console.error("Approval failed:", error)
    }
  }

  const handleRejectClick = (user) => {
    setUserToReject(user)
    setShowRejectionDialog(true)
  }

  const confirmRejection = async () => {
    if (!userToReject || !rejectionReason.trim()) return

    try {
      const response = await fetch(`/api/superadmin/${userToReject.userType}/${userToReject.id}/approve-reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isApproved: false,
          rejectionReason: rejectionReason.trim(),
        }),
      })

      if (response.ok) {
        setSuccessMessage(`${userToReject.userType} rejected successfully!`)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        await refreshDashboardData()
        setShowRejectionDialog(false)
        setRejectionReason("")
        setUserToReject(null)
        closeModal()
      } else {
        console.error("Rejection failed:", await response.text())
      }
    } catch (error) {
      console.error("Rejection failed:", error)
    }
  }

  // New function to handle block click
  const handleBlockClick = (user) => {
    setUserToBlock(user)
    setShowBlockDialog(true)
  }

  // New function to confirm block with reason
  const confirmBlock = async () => {
    if (!userToBlock || !blockReason.trim()) return

    try {
      const response = await fetch(`/api/superadmin/${userToBlock.userType}/${userToBlock.id}/block-unblock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBlocked: true,
          blockReason: blockReason.trim(),
        }),
      })

      if (response.ok) {
        setSuccessMessage(`${userToBlock.userType} blocked successfully!`)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        await refreshDashboardData()
        setShowBlockDialog(false)
        setBlockReason("")
        setUserToBlock(null)
        closeModal()
      } else {
        console.error("Block failed:", await response.text())
      }
    } catch (error) {
      console.error("Block failed:", error)
    }
  }

  const handleUnblock = async (user) => {
    try {
      const response = await fetch(`/api/superadmin/${user.userType}/${user.id}/block-unblock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBlocked: false,
          blockReason: null, // Clear the block reason when unblocking
        }),
      })

      if (response.ok) {
        setSuccessMessage(`${user.userType} unblocked successfully!`)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
        await refreshDashboardData()
        closeModal()
      } else {
        console.error("Unblock failed:", await response.text())
      }
    } catch (error) {
      console.error("Unblock failed:", error)
    }
  }

  const getStatusColor = (isApproved, isBlocked) => {
    if (isBlocked) return "bg-red-100 text-red-800"
    if (!isApproved) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getStatusText = (isApproved, isBlocked) => {
    if (isBlocked) return "Blocked"
    if (!isApproved) return "Pending"
    return "Active"
  }

  // Filter users based on selected filter and sub-filter
  const filteredUsers = useMemo(() => {
    let currentUsers = allUsers

    if (filter === "pending") {
      currentUsers = currentUsers.filter((user) => user.status === "Pending")
      if (pendingSubFilter === "chemist") {
        currentUsers = currentUsers.filter((user) => user.userType === "chemist")
      } else if (pendingSubFilter === "supplier") {
        currentUsers = currentUsers.filter((user) => user.userType === "supplier")
      }
    } else if (filter === "active") {
      currentUsers = currentUsers.filter((user) => user.status === "Active")
    } else if (filter === "blocked") {
      currentUsers = currentUsers.filter((user) => user.status === "Blocked")
    } else if (filter === "rejected") {
      currentUsers = currentUsers.filter((user) => user.status === "Rejected")
    } else if (filter === "chemist") {
      // For the "Total Chemists" stat card
      currentUsers = currentUsers.filter((user) => user.userType === "chemist")
    } else if (filter === "supplier") {
      // For the "Total Suppliers" stat card
      currentUsers = currentUsers.filter((user) => user.userType === "supplier")
    }
    // 'all' filter case is implicitly handled if no other filter applies
    return currentUsers
  }, [allUsers, filter, pendingSubFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {" "}
          {/* Changed to lg:grid-cols-5 */}
          {[
            {
              label: "Total Chemists",
              value: allUsers.filter((u) => u.userType === "chemist").length || 0, // Use allUsers for accurate count
              icon: Users,
              color: "from-blue-500 to-blue-600",
              filterKey: "chemist",
            },
            {
              label: "Total Suppliers",
              value: allUsers.filter((u) => u.userType === "supplier").length || 0, // Use allUsers for accurate count
              icon: UserCheck,
              color: "from-green-500 to-emerald-600",
              filterKey: "supplier",
            },
            {
              label: "Pending Approvals",
              value: allUsers.filter((u) => u.status === "Pending").length || 0, // Use allUsers for accurate count
              icon: Clock,
              color: "from-amber-500 to-orange-600",
              filterKey: "pending", // This will trigger the sub-filter logic
            },
            {
              label: "Blocked Accounts",
              value: allUsers.filter((u) => u.status === "Blocked").length || 0, // Use allUsers for accurate count
              icon: Shield,
              color: "from-red-500 to-red-600",
              filterKey: "blocked",
            },
            {
              // New Rejected Accounts card
              label: "Rejected Accounts",
              value: allUsers.filter((u) => u.status === "Rejected").length || 0,
              icon: UserX, // Using UserX for rejected
              color: "from-orange-500 to-red-500", // Similar to previous rejected color
              filterKey: "rejected",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setFilter(stat.filterKey)
                // Reset pendingSubFilter when switching to a new main filter
                if (stat.filterKey !== "pending") {
                  setPendingSubFilter("all")
                }
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 transform transition-transform duration-200 cursor-pointer border-l-4 ${
                filter === stat.filterKey ? "border-green-500" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <Eye className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

       
        {/* Sub-filter for Pending Approvals */}
        {filter === "pending" && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Filter Pending By Type:</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPendingSubFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pendingSubFilter === "all"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Pending ({allUsers.filter((u) => u.status === "Pending").length})
              </button>
              <button
                onClick={() => setPendingSubFilter("chemist")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pendingSubFilter === "chemist"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Chemists ({allUsers.filter((u) => u.status === "Pending" && u.userType === "chemist").length})
              </button>
              <button
                onClick={() => setPendingSubFilter("supplier")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pendingSubFilter === "supplier"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Suppliers ({allUsers.filter((u) => u.status === "Pending" && u.userType === "supplier").length})
              </button>
            </div>
          </div>
        )}

        {/* Filtered Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              {filter === "all"
                ? "All Users"
                : filter === "pending"
                  ? `Pending Approvals (${pendingSubFilter === "all" ? "All" : pendingSubFilter === "chemist" ? "Chemists" : "Suppliers"})`
                  : filter === "active"
                    ? "Active Users"
                    : filter === "blocked"
                      ? "Blocked Users"
                      : filter === "rejected"
                        ? "Rejected Users"
                        : "Users"}
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{filteredUsers.length}</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No users found for the selected filter.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-green-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.companyName || user.shopName || user.name}
                          </div>
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
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            user.isApproved,
                            user.isBlocked,
                          )}`}
                        >
                          {getStatusText(user.isApproved, user.isBlocked)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            title="View Details"
                            onClick={() => viewUserDetails(user)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          {user.status === "Pending" && (
                            <>
                              <button
                                title="Approve"
                                onClick={() => handleApprove(user)}
                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                title="Reject"
                                onClick={() => handleRejectClick(user)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <UserX size={18} />
                              </button>
                            </>
                          )}
                          {user.status === "Rejected" && (
                            <button
                              title="Re-approve"
                              onClick={() => handleApprove(user)}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          {user.status === "Blocked" ? (
                            <button
                              title="Unblock"
                              onClick={() => handleUnblock(user)}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                            >
                              <ShieldMinus size={18} />
                            </button>
                          ) : (
                            user.status !== "Pending" &&
                            user.status !== "Rejected" && (
                              <button
                                title="Block"
                                onClick={() => handleBlockClick(user)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Shield size={18} />
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recently Added Users */}
        {/* Blocked Users */}
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.role} Details</h3>
                    <p className="text-green-100 text-sm">
                      {selectedUser.companyName || selectedUser.shopName || selectedUser.name}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <User className="h-4 w-4 text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedUser.name || selectedUser.contactPerson}
                            </p>
                            <p className="text-sm text-gray-600">{selectedUser.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <p className="text-gray-700">{selectedUser.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <p className="text-gray-700">{selectedUser.phone}</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                          <p className="text-gray-700">
                            {selectedUser.address}, {selectedUser.city}, {selectedUser.state} - {selectedUser.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Organization Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {selectedUser.companyName || selectedUser.shopName}
                            </p>
                            <p className="text-sm text-gray-600">{selectedUser.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(selectedUser.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">Join Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Status Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {getStatusText(selectedUser.isApproved, selectedUser.isBlocked)}
                            </p>
                            <p className="text-sm text-gray-600">Current Status</p>
                          </div>
                        </div>
                        {selectedUser.isBlocked && selectedUser.blockReason && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-4 w-4 text-purple-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">Block Reason</p>
                              <p className="text-sm text-gray-600">{selectedUser.blockReason}</p>
                            </div>
                          </div>
                        )}
                        {!selectedUser.isApproved && selectedUser.rejectionReason && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-4 w-4 text-purple-600 mt-1" />
                            <div>
                              <p className="font-medium text-gray-900">Rejection Reason</p>
                              <p className="text-sm text-gray-600">{selectedUser.rejectionReason}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedUser.licenseFileUrl && (
                      <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          License Document
                        </h4>
                        <div className="flex gap-3">
                          <button
                            onClick={() => window.open(selectedUser.licenseFileUrl, "_blank")}
                            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                          >
                            <Eye className="mr-2" size={16} />
                            View Document
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement("a")
                              link.href = selectedUser.licenseFileUrl
                              link.download = selectedUser.licenseFileUrl.split("/").pop()
                              link.click()
                            }}
                            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
                          >
                            <Download className="mr-2" size={16} />
                            Download
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t flex justify-end items-center">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                >
                  Close
                </button>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold text-red-800 mb-4">Reject {userToReject?.role} Application</h3>
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
                  placeholder="Enter the reason for rejecting this user..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectionDialog(false)
                    setRejectionReason("")
                    setUserToReject(null)
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRejection}
                  disabled={!rejectionReason.trim()}
                  className={`px-4 py-2 text-white rounded-lg transition-all duration-200 ${
                    rejectionReason.trim()
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Block Dialog */}
      <AnimatePresence>
        {showBlockDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold text-red-800 mb-4">Block {userToBlock?.role}</h3>
              <div className="mb-4">
                <label htmlFor="blockReason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Blocking
                </label>
                <textarea
                  id="blockReason"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="Enter the reason for blocking this user..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowBlockDialog(false)
                    setBlockReason("")
                    setUserToBlock(null)
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBlock}
                  disabled={!blockReason.trim()}
                  className={`px-4 py-2 text-white rounded-lg transition-all duration-200 ${
                    blockReason.trim()
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Block
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
