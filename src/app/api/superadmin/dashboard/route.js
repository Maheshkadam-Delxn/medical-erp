import { NextResponse } from "next/server"
import Chemist from "@/models/Chemist"
import Supplier from "@/models/Supplier"
import dbConnect from "@/lib/dbConnect"

export async function GET() {
  try {
    await dbConnect()

    // Get stats
    const [totalChemists, totalSuppliers, pendingChemists, pendingSuppliers, blockedChemists, blockedSuppliers] =
      await Promise.all([
        Chemist.countDocuments({ isApproved: true }),
        Supplier.countDocuments({ isApproved: true }),
        Chemist.countDocuments({ isApproved: false }),
        Supplier.countDocuments({ isApproved: false }),
        Chemist.countDocuments({ isBlocked: true }),
        Supplier.countDocuments({ isBlocked: true }),
      ])

    // Get recent users (last 10 users)
    const [recentChemists, recentSuppliers] = await Promise.all([
      Chemist.find().sort({ createdAt: -1 }).limit(5).select("-password -__v").lean(),
      Supplier.find().sort({ createdAt: -1 }).limit(5).select("-password -__v").lean(),
    ])

    // Get pending users
    const [pendingChemistsList, pendingSuppliersList] = await Promise.all([
      Chemist.find({ isApproved: false, isBlocked: false }).sort({ createdAt: -1 }).select("-password -__v").lean(),
      Supplier.find({ isApproved: false, isBlocked: false }).sort({ createdAt: -1 }).select("-password -__v").lean(),
    ])

    // Get blocked users
    const [blockedChemistsList, blockedSuppliersList] = await Promise.all([
      Chemist.find({ isBlocked: true }).sort({ updatedAt: -1 }).select("-password -__v").lean(),
      Supplier.find({ isBlocked: true }).sort({ updatedAt: -1 }).select("-password -__v").lean(),
    ])

    // Add userType and role to each user
    const formatUsers = (users, userType, role) =>
      users.map((user) => ({
        ...user,
        id: user._id.toString(),
        userType,
        role,
      }))

    const recent = [
      ...formatUsers(recentChemists, "chemist", "Chemist"),
      ...formatUsers(recentSuppliers, "supplier", "Supplier"),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)

    const pending = [
      ...formatUsers(pendingChemistsList, "chemist", "Chemist"),
      ...formatUsers(pendingSuppliersList, "supplier", "Supplier"),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const blocked = [
      ...formatUsers(blockedChemistsList, "chemist", "Chemist"),
      ...formatUsers(blockedSuppliersList, "supplier", "Supplier"),
    ].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalChemists,
          totalSuppliers,
          pendingApprovals: pendingChemists + pendingSuppliers,
          blockedAccounts: blockedChemists + blockedSuppliers,
        },
        recent,
        pending,
        blocked,
      },
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard data",
      },
      { status: 500 },
    )
  }
}
