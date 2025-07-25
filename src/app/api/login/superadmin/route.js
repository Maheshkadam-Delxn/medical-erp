import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Superadmin from '@/models/Superadmin';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
        
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const superadmin = await Superadmin.findOne({ email });
    console.log('Fetched superadmin:', superadmin);
    if (!superadmin) {
      return NextResponse.json(
        { error: 'Superadmin not found' },
        { status: 404 }
      );
    }

    const isMatch = await superadmin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: superadmin._id, email: superadmin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return NextResponse.json(
      {
        message: 'Superadmin logged in successfully',
        token,
        role: 'superadmin',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
