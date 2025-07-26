import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Chemist from "@/models/chemist"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const chemist = await Chemist.findOne({ email });
    if (!chemist) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, chemist.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!chemist.isApproved) {
      return NextResponse.json({ error: "Account not approved yet" }, { status: 403 });
    }

    const token = jwt.sign(
      { id: chemist._id, email: chemist.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ message: "Login successful", token, role: "chemist" }, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
