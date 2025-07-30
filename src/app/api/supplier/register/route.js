import { NextResponse } from "next/server"
import connectDB from "@/lib/dbConnect"
import Supplier from "@/models/Supplier"
import cloudinary from "@/lib/cloudinary"


// Helper to clean form data and handle array fields
const cleanFormData = (formData) => {
  const data = {}
  for (const [key, value] of formData.entries()) {
    if (key === "productCategories") {
      data[key] = Array.isArray(value) ? value.map((v) => v.trim()) : [value.trim()]
    } else {
      data[key] = typeof value === "string" ? value.trim() : value
    }
  }
  return data
}

// Convert file to Base64 for Cloudinary upload
const toBase64 = async (file) => {
  const buffer = Buffer.from(await file.arrayBuffer())
  return `data:${file.type};base64,${buffer.toString("base64")}`
}

// Validate file type
const isValidFileType = (file) => {
  const validTypes = ["image/jpeg", "image/png", "application/pdf"]
  return validTypes.includes(file.type)
}

export async function POST(req) {
  try {
    await connectDB()
    const formData = await req.formData()
    const supplierData = cleanFormData(formData)

    // Required fields validation
    const requiredFields = [
      "contactPerson",
      "email",
      "phone",
      "password",
      "companyName",
      "supplierType",
      "address",
      "city",
      "state",
      "pincode",
      "drugLicenseNumber",
      "licenseExpiry",
      "gstNumber",
      "productCategories",
    ]

    const missing = requiredFields.filter((field) => !supplierData[field])
    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 })
    }

    // Field format validation
    const validations = [
      {
        field: "phone",
        regex: /^[0-9]{10}$/,
        message: "Phone must be 10 digits",
      },
      {
        field: "pincode",
        regex: /^[0-9]{6}$/,
        message: "Pincode must be 6 digits",
      },
      {
        field: "gstNumber",
        regex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/,
        message: "Invalid GST format",
      },
    ]

    for (const validation of validations) {
      if (!validation.regex.test(supplierData[validation.field])) {
        return NextResponse.json({ error: validation.message }, { status: 400 })
      }
    }

    // Validate license expiry date
    const expiryDate = new Date(supplierData.licenseExpiry)
    const today = new Date()
    if (expiryDate <= today) {
      return NextResponse.json({ error: "License expiry date must be in the future" }, { status: 400 })
    }

    // Duplicate check
    const existingSupplier = await Supplier.findOne({
      $or: [
        { email: supplierData.email },
        { phone: supplierData.phone },
        { drugLicenseNumber: supplierData.drugLicenseNumber },
        { gstNumber: supplierData.gstNumber },
      ],
    })

    if (existingSupplier) {
      let duplicateField = "details"
      if (existingSupplier.email === supplierData.email) duplicateField = "Email"
      else if (existingSupplier.phone === supplierData.phone) duplicateField = "Phone"
      else if (existingSupplier.drugLicenseNumber === supplierData.drugLicenseNumber) {
        duplicateField = "Drug License Number"
      } else if (existingSupplier.gstNumber === supplierData.gstNumber) duplicateField = "GST Number"

      return NextResponse.json({ error: `${duplicateField} already registered` }, { status: 400 })
    }

    // File validation
    const licenseFile = formData.get("licenseFile")
    const gstFile = formData.get("gstFile")

    if (!licenseFile || !gstFile) {
      return NextResponse.json({ error: "Both license and GST files are required" }, { status: 400 })
    }

    if (!isValidFileType(licenseFile) || !isValidFileType(gstFile)) {
      return NextResponse.json({ error: "Only JPG, PNG, or PDF files are allowed" }, { status: 400 })
    }

    // Upload files to Cloudinary
    const [licenseBase64, gstBase64] = await Promise.all([toBase64(licenseFile), toBase64(gstFile)])

    const [licenseUpload, gstUpload] = await Promise.all([
      cloudinary.uploader.upload(licenseBase64, {
        folder: "supplier/licenses",
        resource_type: "auto",
        format: "jpg",
        quality: "auto",
      }),
      cloudinary.uploader.upload(gstBase64, {
        folder: "supplier/gst",
        resource_type: "auto",
        format: "jpg",
        quality: "auto",
      }),
    ])

    // Format product categories to uppercase
    supplierData.productCategories = supplierData.productCategories.map((cat) => cat.toUpperCase())

    // Create new supplier
    const newSupplier = await Supplier.create({
      ...supplierData,
      documents: [
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
      ],
      isApproved: false,
    })

    // Remove sensitive data from response
    const { password, __v, ...responseData } = newSupplier.toObject()

    return NextResponse.json(
      {
        success: true,
        message: "Supplier registered successfully. Pending approval.",
        data: responseData,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Supplier registration error:", error)

    // Handle duplicate key errors
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyPattern)[0]
      const fieldName = dupField.split(/(?=[A-Z])/).join(" ")
      return NextResponse.json(
        {
          error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists`,
          field: dupField,
        },
        { status: 400 },
      )
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 })
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500 },
    )
  }
}



export async function GET() {
  try {
    await connectDB();
    const Suppliers = await Supplier.find().select("-password"); // never return password
    return NextResponse.json(Suppliers, { status: 200 });
  } catch (error) {
    console.error("Error fetching chemists:", error);
    return NextResponse.json(
      { error: "Failed to fetch chemists" },
      { status: 500 }
    );
  }
}