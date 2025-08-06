import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import { authenticateUser, generateToken } from "@/lib/userService";
import Chemist from "@/models/Chemist";
import Supplier from "@/models/Supplier";
import Superadmin from "@/models/Superadmin";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password, role } = await req.json();

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json({ 
        error: "Email, password, and role are required" 
      }, { status: 400 });
    }

    // Validate role
    if (!['chemist', 'supplier', 'superadmin'].includes(role)) {
      return NextResponse.json({ 
        error: "Invalid role. Must be chemist, supplier, or superadmin" 
      }, { status: 400 });
    }

    // Check if user exists in the correct collection based on role
    let userExists = false;
    let userInWrongCollection = null;

    if (role === 'chemist') {
      const chemist = await Chemist.findOne({ email });
      if (chemist) {
        userExists = true;
      } else {
        // Check if user exists in other collections
        const supplier = await Supplier.findOne({ email });
        const superadmin = await Superadmin.findOne({ email });
        if (supplier) {
          userInWrongCollection = 'supplier';
        } else if (superadmin) {
          userInWrongCollection = 'superadmin';
        }
      }
    } else if (role === 'supplier') {
      const supplier = await Supplier.findOne({ email });
      if (supplier) {
        userExists = true;
      } else {
        // Check if user exists in other collections
        const chemist = await Chemist.findOne({ email });
        const superadmin = await Superadmin.findOne({ email });
        if (chemist) {
          userInWrongCollection = 'chemist';
        } else if (superadmin) {
          userInWrongCollection = 'superadmin';
        }
      }
    } else if (role === 'superadmin') {
      const superadmin = await Superadmin.findOne({ email });
      if (superadmin) {
        userExists = true;
      } else {
        // Check if user exists in other collections
        const chemist = await Chemist.findOne({ email });
        const supplier = await Supplier.findOne({ email });
        if (chemist) {
          userInWrongCollection = 'chemist';
        } else if (supplier) {
          userInWrongCollection = 'supplier';
        }
      }
    }

    // If user doesn't exist at all
    if (!userExists && !userInWrongCollection) {
      return NextResponse.json({ 
        error: "User not found with this email address" 
      }, { status: 401 });
    }

    // If user exists but in wrong collection
    if (!userExists && userInWrongCollection) {
      return NextResponse.json({ 
        error: `Invalid user type selected. This email is registered as a ${userInWrongCollection}. Please select the correct user type.` 
      }, { status: 401 });
    }

    // Authenticate user
    const user = await authenticateUser(email, password, role);
    
    // Generate token
    const token = generateToken(user, role);
    
    // Create response with role-specific user data
    const userResponse = {
      id: user._id,
      email: user.email,
      role: role,
      name: user.name || user.contactPerson || user.email,
    };

    // Add role-specific fields
    if (role === 'chemist' && user.storeName) {
      userResponse.storeName = user.storeName;
    }
    if (role === 'supplier' && user.companyName) {
      userResponse.companyName = user.companyName;
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: userResponse
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    
    // Simple error handling
    if (error.message.includes('not found') || error.message.includes('Invalid credentials')) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    if (error.message.includes('pending approval')) {
      return NextResponse.json({ error: "Account pending approval" }, { status: 403 });
    }
    if (error.message.includes('blocked')) {
      return NextResponse.json({ error: "Account is blocked" }, { status: 403 });
    }
    
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
} 