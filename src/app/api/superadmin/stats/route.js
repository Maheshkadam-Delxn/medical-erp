import { NextResponse } from "next/server"
import Chemist from "@/models/chemist"
import Supplier from "@/models/Supplier"
import dbConnect from "@/lib/dbConnect"

export async function GET() {
  try {
    await dbConnect()

    const [totalChemists, totalSuppliers, pendingChemists, pendingSuppliers, blockedChemists, blockedSuppliers] =
      await Promise.all([
        Chemist.countDocuments({ isApproved: true }),
        Supplier.countDocuments({ isApproved: true }),
        Chemist.countDocuments({ isApproved: false }),
        Supplier.countDocuments({ isApproved: false }),
        Chemist.countDocuments({ isBlocked: true }),
        Supplier.countDocuments({ isBlocked: true }),
      ])

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalChemists,
          totalSuppliers,
          pendingApprovals: pendingChemists + pendingSuppliers,
          blockedAccounts: blockedChemists + blockedSuppliers,
        },
      },
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stats",
      },
      { status: 500 },
    )
  }
}
