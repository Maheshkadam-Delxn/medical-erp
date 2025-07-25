import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Supplier from "@/models/Supplier";

// GET all suppliers
export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();
    console.log("Connected to database");

    // Fetch suppliers and exclude password
    const suppliers = await Supplier.find().select("-password");

    // Handle no suppliers
    if (!suppliers.length) {
      return NextResponse.json(
        { success: false, message: "No suppliers found" },
        { status: 404 }
      );
    }

    // Return suppliers
    return NextResponse.json(
      { success: true, count: suppliers.length, data: suppliers },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch suppliers", details: error.message },
      { status: 500 }
    );
  }
}
