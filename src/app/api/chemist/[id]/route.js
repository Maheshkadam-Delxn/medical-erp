import Chemist from "@/models/chemist" // Capitalize the model
import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect"; // Always ensure DB connection
// app/api/chemists/[id]/route.js
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const chemist = await Chemist.findById(id).select('-password');
    
    if (!chemist) {
      return NextResponse.json(
        { error: "Chemist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: chemist });
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", details: err.message },
      { status: 500 }
    );
  }
}


// app/api/chemists/[id]/route.js
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updateData = await req.json();

    // Prevent direct approval updates
    if ('isApproved' in updateData) {
      return NextResponse.json(
        { error: "Use approval endpoint for status changes" },
        { status: 400 }
      );
    }

    // Hash password if being updated
    // if (updateData.password) {
    //   updateData.password = await bcrypt.hash(updateData.password, 10);
    // }

    const updatedChemist = await Chemist.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');

    return NextResponse.json({ 
      success: true, 
      data: updatedChemist,
      message: "Chemist updated successfully" 
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}


// app/api/chemists/[id]/route.js
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deleted = await Chemist.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Chemist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Chemist deleted successfully"
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Deletion failed", details: err.message },
      { status: 500 }
    );
  }
}