import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { createUser } from "@/lib/userService";
import Chemist from "@/models/Chemist";
import Supplier from "@/models/Supplier";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, role, ...userData } = await req.json();

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json({ 
        error: "Email, password, and role are required" 
      }, { status: 400 });
    }

    // Validate role
    if (!['chemist', 'supplier'].includes(role)) {
      return NextResponse.json({ 
        error: "Invalid role. Must be chemist or supplier" 
      }, { status: 400 });
    }

    // Check if user already exists
    let existingUser;
    if (role === 'chemist') {
      existingUser = await Chemist.findOne({ email });
    } else if (role === 'supplier') {
      existingUser = await Supplier.findOne({ email });
    }

    if (existingUser) {
      return NextResponse.json({ 
        error: "User with this email already exists" 
      }, { status: 409 });
    }

    // Create user
    const user = await createUser({ email, password, ...userData }, role);

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please wait for admin approval.",
      user: {
        id: user._id,
        email: user.email,
        role: role,
        name: user.name || user.contactPerson || user.email,
        ...(role === 'chemist' && user.storeName && { storeName: user.storeName }),
        ...(role === 'supplier' && user.companyName && { companyName: user.companyName })
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "User with this email already exists" 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: "Registration failed" 
    }, { status: 500 });
  }
} 