import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const superadminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "superadmin" },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
superadminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare password for login
superadminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Superadmin ||
  mongoose.model("Superadmin", superadminSchema);
