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

const chemistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    aadharNumber: {
      type: String,
      required: [true, "Aadhar number is required"],
      unique: true,
      match: [/^[0-9]{12}$/, "Aadhar number must be 12 digits"],
    },
    panNumber: {
      type: String,
      required: [true, "PAN number is required"],
      unique: true,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"],
    },
    storeName: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
    },
    shoptype: {
      type: String,
      required: [true, "Shop type is required"],
      enum: [
        "Retail Pharmacy",
        "Wholesale Pharmacy",
        "Hospital Pharmacy",
        "Online Pharmacy",
        "Clinical Pharmacy",
        "Community Pharmacy",
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
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
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
    registrationId: {
      type: String,
      unique: true,
      required: true,
      default: () => {
        const prefix = "CHEM"
        const timestamp = Date.now().toString().slice(-6)
        const random = Math.floor(100 + Math.random() * 900)
        return `${prefix}${timestamp}${random}`
      },
      validate: {
        validator: (v) => /^CHEM\d{6}\d{3}$/.test(v),
        message: (props) => `${props.value} is not a valid Chemist ID!`,
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
    isBlocked: {
    type: Boolean,
    default: false,
    index: true // For faster querying
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
chemistSchema.pre("save", async function (next) {
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
chemistSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  obj.id = obj._id
  delete obj._id
  delete obj.__v
  return obj
}

// Create text index for search functionality
chemistSchema.index({
  storeName: "text",
  name: "text",
  email: "text",
  licenseNumber: "text",
})

export default mongoose.models.Chemist || mongoose.model("Chemist", chemistSchema)
//testung te