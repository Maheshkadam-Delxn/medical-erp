import Supplier from "@/models/Supplier";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// 🔹 GET: Fetch supplier by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const supplier = await Supplier.findById(id).select("-password");

    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: supplier });
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", details: err.message },
      { status: 500 }
    );
  }
}

// 🔹 PUT: Update supplier (prevent approval change directly)
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updateData = await req.json();

    // Block isApproved update here
    if ("isApproved" in updateData) {
      return NextResponse.json(
        { error: "Use approval endpoint for status changes" },
        { status: 400 }
      );
    }

    // Optional: Hash password if updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      data: updatedSupplier,
      message: "Supplier updated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}

// 🔹 DELETE: Delete supplier by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deleted = await Supplier.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Deletion failed", details: err.message },
      { status: 500 }
    );
  }
}
