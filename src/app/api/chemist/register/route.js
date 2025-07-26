import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import connectDB from "@/lib/dbConnect";
import Chemist from "@/models/chemist"

// Helper function to trim and clean form data
const cleanFormData = (formData) => {
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = typeof value === 'string' ? value.trim() : value;
  }
  return data;
};

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    // Clean and trim all form data
    const chemistData = cleanFormData(formData);
    console.log("Cleaned form data:", chemistData);

    // Validate required fields
    const requiredFields = [
      'name', 'email', 'phone', 'password',
      'aadharNumber', 'panNumber', 'storeName',
      'shoptype', 'address', 'city', 'state',
      'pincode', 'licenseNumber', 'licenseExpiry',
      'gstNumber'
    ];

    const missingFields = requiredFields.filter(field => !chemistData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Additional format validation
    if (!/^\d{10}$/.test(chemistData.phone)) {
      return NextResponse.json(
        { error: "Phone must be exactly 10 digits" },
        { status: 400 }
      );
    }

    if (!/^\d{12}$/.test(chemistData.aadharNumber)) {
      return NextResponse.json(
        { error: "Aadhar must be exactly 12 digits" },
        { status: 400 }
      );
    }

    if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(chemistData.panNumber)) {
      return NextResponse.json(
        { error: "PAN must be in AAAAA9999A format" },
        { status: 400 }
      );
    }

    // Check for existing records
    const existingChemist = await Chemist.findOne({
      $or: [
        { email: chemistData.email },
        { phone: chemistData.phone },
        { aadharNumber: chemistData.aadharNumber },
        { panNumber: chemistData.panNumber },
        { licenseNumber: chemistData.licenseNumber },
        { gstNumber: chemistData.gstNumber }
      ]
    });

    if (existingChemist) {
      const duplicateField = 
        existingChemist.email === chemistData.email ? "Email" :
        existingChemist.phone === chemistData.phone ? "Phone" :
        existingChemist.aadharNumber === chemistData.aadharNumber ? "Aadhar" :
        existingChemist.panNumber === chemistData.panNumber ? "PAN" :
        existingChemist.licenseNumber === chemistData.licenseNumber ? "License" : "GST";
      
      return NextResponse.json(
        { error: `${duplicateField} already registered` },
        { status: 400 }
      );
    }

    // Handle file uploads
    const licenseFile = formData.get("licenseFile");
    const gstFile = formData.get("gstFile");

    if (!licenseFile || !gstFile) {
      return NextResponse.json(
        { error: "Both license and GST files are required" },
        { status: 400 }
      );
    }

    // Create upload directory
    const uploadsDir = path.join(process.cwd(), "public/uploads/chemist");
    await mkdir(uploadsDir, { recursive: true });

    // Process license file
    const licenseBytes = await licenseFile.arrayBuffer();
    const licenseFilename = `license-${Date.now()}-${licenseFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    await writeFile(
      path.join(uploadsDir, licenseFilename),
      Buffer.from(licenseBytes)
    );

    // Process GST file
    const gstBytes = await gstFile.arrayBuffer();
    const gstFilename = `gst-${Date.now()}-${gstFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    await writeFile(
      path.join(uploadsDir, gstFilename),
      Buffer.from(gstBytes)
    );

    // Create new chemist
    const newChemist = await Chemist.create({
      ...chemistData,
      licenseFileUrl: `/uploads/chemist/${licenseFilename}`,
      gstFileUrl: `/uploads/chemist/${gstFilename}`,
      registrationId: `CHEM${Date.now()}`,
      isApproved: false
    });

    // Remove sensitive data from response
    const { password, ...responseData } = newChemist.toObject();

    return NextResponse.json(
      {
        success: true,
        data: responseData,
        message: "Registration successful. Pending approval."
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${duplicateField} already exists` },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: `Validation failed: ${errors.join(", ")}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const query = {};
    if (status === "approved") query.isApproved = true;
    if (status === "pending") query.isApproved = false;

    const chemists = await Chemist.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Chemist.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: chemists,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch chemists" },
      { status: 500 }
    );
  }
}