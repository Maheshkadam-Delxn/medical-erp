import { NextResponse } from "next/server"
import connectDB  from "@/lib/dbConnect"
import Supplier from "@/models/Supplier"
import mongoose from "mongoose" // Import mongoose to use isValidObjectId

export async function PATCH(req, { params }) {
  try {
    await connectDB()

    const { id: _id } = await params // Get MongoDB _id from URL params
    const { isApproved, rejectionReason } = await req.json()

    if (!mongoose.isValidObjectId(_id)) {
      return NextResponse.json({ error: "Invalid User ID format" }, { status: 400 })
    }

    if (typeof isApproved !== "boolean") {
      return NextResponse.json({ error: "isApproved must be a boolean" }, { status: 400 })
    }

    const updateFields = {
      isApproved: isApproved,
      approvedAt: isApproved ? new Date() : null,
      rejectionReason: isApproved ? null : rejectionReason || "No reason provided",
      // approvedBy will be set here once admin authentication is implemented
      // For now, it will remain null or its default value in the schema
    }

    const updatedSupplier = await Supplier.findOneAndUpdate(
      { _id: _id }, // Use _id for lookup
      { $set: updateFields },
      { new: true, runValidators: true }, // Return the updated document and run schema validators
    ).select("-password") // Exclude password from the response

    if (!updatedSupplier) {
      return NextResponse.json({ error: "Supplier not found with this User ID" }, { status: 404 })
    }

    console.log(`Supplier with ID ${_id} status updated to: ${isApproved ? "Approved" : "Rejected"}`)

    return NextResponse.json({
      success: true,
      data: updatedSupplier,
      message: `Supplier with ID ${_id} has been ${isApproved ? "approved" : "rejected"}.`,
    })
  } catch (error) {
    console.error("Error updating supplier status:", error)

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message)
      return NextResponse.json({ error: `Validation failed: ${validationErrors.join(", ")}` }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update supplier status", details: error.message }, { status: 500 })
  }
}
