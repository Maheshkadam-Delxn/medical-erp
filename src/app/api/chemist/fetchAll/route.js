import Chemist from "@/models/Chemist.js"; // Capitalize the model
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Always ensure DB connection

export async function GET() {
  try {
    await dbConnect(); // Ensure DB connection is established

    const chemists = await Chemist.find().select('-password');

    if (!chemists || chemists.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No chemists found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: chemists.length,
      data: chemists,
    });
  } catch (err) {
    console.error("Error fetching chemists:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Fetch failed",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
