import { NextResponse } from "next/server"
import connectDB from "@/lib/dbConnect"
import Chemist from "@/models/chemist";
import cloudinary from "@/lib/cloudinary"

// Helper to clean string fields
const cleanFormData = (formData) => {
  const data = {}
  for (const [key, value] of formData.entries()) {
    data[key] = typeof value === "string" ? value.trim() : value
  }
  return data
}

// Convert file to Base64 for Cloudinary
const toBase64 = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer())
  return `data:${file.type};base64,${buffer.toString("base64")}`
}

// Validate file type
const isValidFileType = (file) => {
  const validTypes = ["image/jpeg", "image/png", "application/pdf"] // Allow PDF for consistency
  return validTypes.includes(file.type)
}

export async function POST(req) {
  try {
    await connectDB()
    console.log("monogdb connected...");
    const formData = await req.formData()
    const chemistData = cleanFormData(formData)
    console.log("clean chemistdata", cleanFormData);
    // Required fields check
    const requiredFields = [
      "name",
      "email",
      "phone",
      "password",
      "aadharNumber",
      "panNumber",
      "storeName",
      "shoptype",
      "address",
      "city",
      "state",
      "pincode",
      "licenseNumber",
      "licenseExpiry",
      "gstNumber",
    ]
    const missing = requiredFields.filter((f) => !chemistData[f])
    if (missing.length) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 })
    }

    // Format validation
    if (!/^\d{10}$/.test(chemistData.phone)) {
      return NextResponse.json({ error: "Phone must be 10 digits" }, { status: 400 })
    }
    if (!/^\d{12}$/.test(chemistData.aadharNumber)) {
      return NextResponse.json({ error: "Aadhar must be 12 digits" }, { status: 400 })
    }
    if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(chemistData.panNumber)) {
      return NextResponse.json({ error: "Invalid PAN format" }, { status: 400 })
    }
    if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/.test(chemistData.gstNumber)) {
      return NextResponse.json({ error: "Invalid GST format" }, { status: 400 })
    }

    // Validate license expiry date
    const expiryDate = new Date(chemistData.licenseExpiry)
    const today = new Date()
    if (expiryDate <= today) {
      return NextResponse.json({ error: "License expiry date must be in the future" }, { status: 400 })
    }

    // Duplicate check
    const existingChemist = await Chemist.findOne({
      $or: [
        { email: chemistData.email },
        { phone: chemistData.phone },
        { aadharNumber: chemistData.aadharNumber },
        { panNumber: chemistData.panNumber },
        { licenseNumber: chemistData.licenseNumber },
        { gstNumber: chemistData.gstNumber },
      ],
    })

    if (existingChemist) {
      let duplicateField = "details"
      if (existingChemist.email === chemistData.email) duplicateField = "Email"
      else if (existingChemist.phone === chemistData.phone) duplicateField = "Phone"
      else if (existingChemist.aadharNumber === chemistData.aadharNumber) duplicateField = "Aadhar Number"
      else if (existingChemist.panNumber === chemistData.panNumber) duplicateField = "PAN Number"
      else if (existingChemist.licenseNumber === chemistData.licenseNumber) duplicateField = "License Number"
      else if (existingChemist.gstNumber === chemistData.gstNumber) duplicateField = "GST Number"
      return NextResponse.json({ error: `${duplicateField} already registered` }, { status: 400 })
    }

    // Get and validate files
    const licenseFile = formData.get("licenseFile")
    const gstFile = formData.get("gstFile")

    if (!licenseFile || !gstFile) {
      return NextResponse.json({ error: "License and GST files are required" }, { status: 400 })
    }

    if (!isValidFileType(licenseFile) || !isValidFileType(gstFile)) {
      return NextResponse.json({ error: "Only JPG, PNG, or PDF files are allowed" }, { status: 400 })
    }

    // Upload to Cloudinary
    const [licenseBase64, gstBase64] = await Promise.all([toBase64(licenseFile), toBase64(gstFile)])

    const [licenseUpload, gstUpload] = await Promise.all([
      cloudinary.uploader.upload(licenseBase64, {
        folder: "chemist/licenses",
        resource_type: "auto",
      }),
      cloudinary.uploader.upload(gstBase64, {
        folder: "chemist/gst",
        resource_type: "auto",
      }),
    ])

    console.log("Licensefile uploaded..",licenseFile.secure_url);
    console.log("gst file uploaded..",gstFile.secure_url);
    // Construct documents array
    const documents = [
      {
        name: "Drug License",
        url: licenseUpload.secure_url,
        uploadedAt: new Date(),
      },
      {
        name: "GST Certificate",
        url: gstUpload.secure_url,
        uploadedAt: new Date(),
      },
    ]

    // Create chemist
    const newChemist = await Chemist.create({
      ...chemistData,
      documents,
      isApproved: false,
    })

    console.log(formData);
    const { password, ...safeData } = newChemist.toObject()

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Pending approval.",
        data: safeData,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    // Handle duplicate key errors from Mongoose
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyPattern)[0]
      const fieldName = dupField.split(/(?=[A-Z])/).join(" ") // Converts camelCase to "Camel Case"
      return NextResponse.json(
        {
          error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`,
          field: dupField,
        },
        { status: 400 },
      )
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}



export async function GET() {
  try {
    await connectDB();
    const chemists = await Chemist.find().select("-password"); // never return password
    return NextResponse.json(chemists, { status: 200 });
  } catch (error) {
    console.error("Error fetching chemists:", error);
    return NextResponse.json(
      { error: "Failed to fetch chemists" },
      { status: 500 }
    );
  }
}
