import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Chemist from '@/models/Chemist'
import Supplier from '@/models/Supplier'
import Superadmin from '@/models/Superadmin'
import connectDB from '@/lib/dbConnect'

export async function GET() {
  await connectDB();
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { user: null, message: 'No authentication token found' },
        { status: 200 }
      )
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = null;
    
    if (decoded.role === 'chemist') {
      user = await Chemist.findById(decoded.id).select('-password');
    } else if (decoded.role === 'supplier') {
      user = await Supplier.findById(decoded.id).select('-password');
    } else if (decoded.role === 'superadmin') {
      user = await Superadmin.findById(decoded.id).select('-password');
    }
    
    if (!user) {
      return NextResponse.json({ user: null, message: 'User not found' }, { status: 200 });
    }
    
    // Add role field to user object since database models don't have it
    const userWithRole = {
      ...user.toObject(),
      role: decoded.role
    };
    
    return NextResponse.json({ user: userWithRole }, { status: 200 });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { user: null, message: 'Session expired' },
        { status: 401 }
      )
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { user: null, message: 'Invalid token' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { user: null, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}