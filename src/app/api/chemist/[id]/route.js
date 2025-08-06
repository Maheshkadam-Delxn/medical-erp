// app/api/chemists/[id]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Chemist from "@/models/Chemist";

export async function GET(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const chemist = await Chemist.findById(id).select("-password");
    if (!chemist) {
      return NextResponse.json({ error: "Chemist not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chemist });
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed", details: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const updateData = await req.json();

    if ("isApproved" in updateData) {
      return NextResponse.json(
        { error: "Use approval endpoint for status changes" },
        { status: 400 }
      );
    }

    const updatedChemist = await Chemist.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!updatedChemist) {
      return NextResponse.json({ error: "Chemist not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Chemist updated successfully",
      data: updatedChemist,
    });
  } catch (err) {
    return NextResponse.json({ error: "Update failed", details: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const deleted = await Chemist.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Chemist not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Chemist deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: "Deletion failed", details: err.message }, { status: 500 });
  }
}
