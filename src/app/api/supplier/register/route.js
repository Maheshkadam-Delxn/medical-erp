import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import connectDB from "@/lib/dbConnect"
import Supplier from "@/models/Supplier"

const VALID_SUPPLIER_TYPES = ["MANUFACTURER", "DISTRIBUTOR", "WHOLESALER"]
const VALID_PRODUCT_CATEGORIES = ["MEDICINES", "VACCINES", "EQUIPMENT", "SURGICAL", "DISPOSABLES"]

export async function POST(req) {
  try {
    await connectDB()

    const formData = await req.formData()

    // Process and validate form data
    const supplierData = {
      contactPerson: formData.get("contactPerson")?.trim(),
      email: formData.get("email")?.trim().toLowerCase(),
      phone: formData.get("phone")?.trim().replace(/\D/g, ""),
      password: formData.get("password"),
      companyName: formData.get("companyName")?.trim(),
      supplierType: formData.get("supplierType")?.trim().toUpperCase(),
      address: formData.get("address")?.trim(),
      city: formData.get("city")?.trim(),
      state: formData.get("state")?.trim(),
      pincode: formData.get("pincode")?.trim(),
      drugLicenseNumber: formData.get("drugLicenseNumber")?.trim(),
      licenseExpiry: formData.get("licenseExpiry"),
      gstNumber: formData.get("gstNumber")?.trim().toUpperCase(),
      productCategories: formData.getAll("productCategories").map((pc) => pc.trim().toUpperCase()),
    }

    // Validate required fields
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
    ]

    const missingFields = requiredFields.filter((field) => !supplierData[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Validate enum values
    if (!VALID_SUPPLIER_TYPES.includes(supplierData.supplierType)) {
      return NextResponse.json(
        {
          error: `Invalid supplierType. Valid values: ${VALID_SUPPLIER_TYPES.join(", ")}`,
          received: supplierData.supplierType,
        },
        { status: 400 },
      )
    }

    if (supplierData.productCategories.length === 0) {
      return NextResponse.json({ error: "At least one product category is required" }, { status: 400 })
    }

    const invalidCategories = supplierData.productCategories.filter((pc) => !VALID_PRODUCT_CATEGORIES.includes(pc))

    if (invalidCategories.length > 0) {
      return NextResponse.json(
        {
          error: `Invalid product categories: ${invalidCategories.join(", ")}`,
          validCategories: VALID_PRODUCT_CATEGORIES,
        },
        { status: 400 },
      )
    }

    // Validate formats
    if (!/^\d{10}$/.test(supplierData.phone)) {
      return NextResponse.json({ error: "Phone must be exactly 10 digits" }, { status: 400 })
    }

    if (!/^\d{6}$/.test(supplierData.pincode)) {
      return NextResponse.json({ error: "Pincode must be exactly 6 digits" }, { status: 400 })
    }

    // Check for existing records
    const existingSupplier = await Supplier.findOne({
      $or: [{ email: supplierData.email }, { phone: supplierData.phone }, { gstNumber: supplierData.gstNumber }],
    })

    if (existingSupplier) {
      const duplicateField =
        existingSupplier.email === supplierData.email
          ? "Email"
          : existingSupplier.phone === supplierData.phone
            ? "Phone"
            : "GST Number"

      return NextResponse.json({ error: `${duplicateField} already registered` }, { status: 400 })
    }

    // Handle file uploads
    const licenseFile = formData.get("licenseFile")
    const gstFile = formData.get("gstFile")

    if (!licenseFile || !gstFile) {
      return NextResponse.json({ error: "Both license and GST files are required" }, { status: 400 })
    }

    // Create upload directory
    const uploadsDir = path.join(process.cwd(), "public/uploads/supplier")
    await mkdir(uploadsDir, { recursive: true })

    const processFile = async (file) => {
      const bytes = await file.arrayBuffer()
      const filename = `doc-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      await writeFile(path.join(uploadsDir, filename), Buffer.from(bytes))
      return `/uploads/supplier/${filename}`
    }

    const [licenseUrl, gstUrl] = await Promise.all([processFile(licenseFile), processFile(gstFile)])

    // Create supplier
    const newSupplier = await Supplier.create({
      ...supplierData,
      documents: [
        { name: "Drug License", url: licenseUrl },
        { name: "GST Certificate", url: gstUrl },
      ],
      registrationId: `SUPP${Date.now()}`,
      isApproved: false,
    })

    const { password, ...responseData } = newSupplier.toObject()

    return NextResponse.json(
      {
        success: true,
        data: responseData,
        message: "Supplier registered successfully. Pending approval.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ error: `${duplicateField} already exists` }, { status: 400 })
    }
    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? error.message : null,
      },
      { status: 500 },
    )
  }
}

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10

    const query = {}
    if (status === "approved") query.isApproved = true
    if (status === "pending") query.isApproved = false

    const suppliers = await Supplier.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const total = await Supplier.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: suppliers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}
