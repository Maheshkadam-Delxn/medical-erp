import mongoose from "mongoose"

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
      enum: {
        values: ["MANUFACTURER", "DISTRIBUTOR", "WHOLESALER"], // Confirmed enum values
        message: "'{VALUE}' is not a valid supplier type",
      },
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
        enum: {
          values: ["MEDICINES", "VACCINES", "EQUIPMENT", "SURGICAL", "DISPOSABLES"], // Confirmed enum values
          message: "'{VALUE}' is not a valid product category",
        },
      },
    ],
    documents: [
      {
        name: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
supplierSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const bcrypt = require("bcryptjs")
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Log enum values when the model is defined
console.log("Supplier model enum values for supplierType:", supplierSchema.path("supplierType").enumValues)
console.log(
  "Supplier model enum values for productCategories:",
  supplierSchema.path("productCategories").caster.enumValues,
)

export default mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema)
