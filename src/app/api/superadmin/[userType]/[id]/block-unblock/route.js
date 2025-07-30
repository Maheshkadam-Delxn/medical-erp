import { NextResponse } from "next/server"
import connectDB from "@/lib/dbConnect"
import Chemist from "@/models/Chemist"
import Supplier from "@/models/Supplier"
import mongoose from "mongoose"

export async function PATCH(request, { params }) {
  await connectDB()

  // Await params before using its properties
  const { id, userType } = await params
  const { isBlocked, blockReason } = await request.json()

  // Validate inputs
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 })
  }

  if (typeof isBlocked !== "boolean") {
    return NextResponse.json({ error: "isBlocked must be a boolean" }, { status: 400 })
  }

  if (!["chemist", "supplier"].includes(userType)) {
    return NextResponse.json({ error: "Invalid user type. Must be 'chemist' or 'supplier'" }, { status: 400 })
  }

  // If blocking, require a reason
  if (isBlocked && !blockReason?.trim()) {
    return NextResponse.json({ error: "Block reason is required when blocking a user" }, { status: 400 })
  }

  try {
    // Select the correct model based on userType
    const Model = userType === "chemist" ? Chemist : Supplier

    // Prepare update data
    const updateData = {
      isBlocked,
      updatedAt: new Date(),
    }

    if (isBlocked) {
      updateData.blockedAt = new Date()
      updateData.blockReason = blockReason.trim()
    } else {
      updateData.blockedAt = null
      updateData.blockReason = null // Clear block reason when unblocking
    }

    // Find and update the user
    const updatedUser = await Model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select(
      "-password -__v",
    )

    if (!updatedUser) {
      return NextResponse.json({ error: `${userType} not found` }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `${userType} ${isBlocked ? "blocked" : "unblocked"} successfully`,
      userType,
      user: updatedUser,
    })
  } catch (error) {
    console.error("Block/Unblock error:", error)

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Failed to update block status",
        ...(process.env.NODE_ENV === "development" && { details: error.message }),
      },
      { status: 500 },
    )
  }
}
