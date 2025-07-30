import mongoose from "mongoose"

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Drug License", "GST Certificate"],
    },
    url: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const supplierSchema = new mongoose.Schema(
  {
    contactPerson: {
      type: String,
      required: [true, "Contact person name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    supplierType: {
      type: String,
      required: [true, "Supplier type is required"],
      enum: [
        "PHARMACEUTICAL_MANUFACTURER",
        "MEDICAL_EQUIPMENT_SUPPLIER",
        "WHOLESALE_DISTRIBUTOR",
        "GENERIC_MEDICINE_SUPPLIER",
        "SURGICAL_EQUIPMENT_SUPPLIER",
        "AYURVEDIC_PRODUCT_SUPPLIER",
      ],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
    },
    drugLicenseNumber: {
      type: String,
      required: [true, "Drug license number is required"],
      unique: true,
      trim: true,
    },
    licenseExpiry: {
      type: Date,
      required: [true, "License expiry date is required"],
      validate: {
        validator: (date) => date > new Date(),
        message: "License expiry date must be in the future",
      },
    },
    gstNumber: {
      type: String,
      required: [true, "GST number is required"],
      unique: true,
      uppercase: true,
      match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/, "Invalid GST format"],
    },
    productCategories: [
      {
        type: String,
        required: true,
        enum: [
          "PRESCRIPTION_MEDICINES",
          "OVER_THE_COUNTER_DRUGS",
          "MEDICAL_DEVICES",
          "SURGICAL_INSTRUMENTS",
          "LABORATORY_EQUIPMENT",
          "AYURVEDIC_PRODUCTS",
          "HOMEOPATHIC_MEDICINES",
          "VETERINARY_MEDICINES",
        ],
      },
    ],
    registrationId: {
      type: String,
      unique: true,
      required: true,
      default: () => {
        const prefix = "SUP"
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.floor(100 + Math.random() * 900)
        return `${prefix}${timestamp}${random}`
      },
      validate: {
        validator: (v) => /^SUP\d{9}$/.test(v),
        message: (props) => `${props.value} is not a valid registration ID!`,
      },
    },
    documents: {
      type: [documentSchema],
      validate: {
        validator: (v) => v.length === 2,
        message: "Two documents are required (Drug License & GST Certificate)",
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    isBlocked: { // Note: Typo kept consistent with your existing code
    type: Boolean,
    default: false,
    index: true
  },
  blockedAt: {
    type: Date,
    default: null
  },
  unblockedAt: {
    type: Date,
    default: null
  },
  blockReason: {
    type: String,
    default: null,
    trim: true
  },
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SuperAdmin',
    default: null
  }
  },
  { timestamps: true },
)

// Hash password before saving
supplierSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const bcrypt = await import("bcryptjs")
    this.password = await bcrypt.hash(this.password, 12)
    next()
  } catch (err) {
    next(err)
  }
})

// Remove sensitive data from responses
supplierSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  obj.id = obj._id
  delete obj._id
  delete obj.__v
  return obj
}

// Create text index for search functionality
supplierSchema.index({
  companyName: "text",
  contactPerson: "text",
  email: "text",
  drugLicenseNumber: "text",
})

export default mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema)
