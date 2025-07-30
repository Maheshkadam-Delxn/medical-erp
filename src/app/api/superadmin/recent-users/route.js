import { NextResponse } from "next/server"
import Chemist from "@/models/chemist"
import Supplier from "@/models/Supplier"
import dbConnect from "@/lib/dbConnect" // Ensure dbConnect is imported

export async function GET() {
  try {
    await dbConnect() // Connect to DB
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const [recentChemists, recentSuppliers] = await Promise.all([
      Chemist.find({
        createdAt: { $gte: oneWeekAgo },
        isApproved: true,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("-password"),
      Supplier.find({
        createdAt: { $gte: oneWeekAgo },
        isApproved: true,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("-password"),
    ])

    const combined = [
      ...recentChemists.map((c) => ({
        ...c._doc,
        userType: "chemist",
        role: "Chemist",
      })),
      ...recentSuppliers.map((s) => ({
        ...s._doc,
        userType: "supplier",
        role: "Supplier",
      })),
    ]

    // Sort all by creation date
    combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return NextResponse.json(combined.slice(0, 10)) // Return top 10 most recent
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recent users" }, { status: 500 })
  }
}
