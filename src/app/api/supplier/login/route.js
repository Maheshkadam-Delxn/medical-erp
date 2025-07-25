import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Supplier from "@/models/Supplier";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!supplier.isApproved) {
      return NextResponse.json(
        { error: "Account not approved yet" },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      { id: supplier._id, email: supplier.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { message: "Login successful", token, role: "supplier" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
