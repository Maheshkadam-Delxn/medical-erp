// FILE: src/app/api/supplier/product/[id]/stock/route.js

import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import dbConnect from '@/lib/dbConnect';
import { verifyToken } from '@/lib/auth';

// Connect to database
await dbConnect();

// Helper function to get user from token
const getUserFromToken = (request) => {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.cookies.get('authToken')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// POST update stock
export async function POST(request, { params }) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const { batchNumber, quantity, type, manufacturerDate, expiryDate } = await request.json();
    
    // Validate quantity
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return NextResponse.json(
        { message: 'Please enter a valid quantity' },
        { status: 400 }
      );
    }

    // Validate dates for new batches
    if (!batchNumber) {
      if (!manufacturerDate || !expiryDate) {
        return NextResponse.json(
          { message: 'Manufacturer date and expiry date are required for new batches' },
          { status: 400 }
        );
      }
      
      if (new Date(manufacturerDate) > new Date(expiryDate)) {
        return NextResponse.json(
          { message: 'Expiry date must be after manufacturer date' },
          { status: 400 }
        );
      }
    }

    const product = await Product.findById(params.id);
    if (!product || product.registrationId !== user.registrationId) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // For existing batch
    if (batchNumber) {
      const batchIndex = product.batches.findIndex(b => b.batchNumber === batchNumber);
      if (batchIndex === -1) {
        return NextResponse.json(
          { message: 'Batch not found' },
          { status: 404 }
        );
      }
      
      let newQuantity = product.batches[batchIndex].quantity;
      if (type === 'add') {
        newQuantity += Number(quantity);
      } else if (type === 'subtract') {
        newQuantity = Math.max(0, newQuantity - Number(quantity));
      }
      
      product.batches[batchIndex].quantity = newQuantity;
    } else {
      // For new batch
      const newBatch = {
        batchNumber: `B${Math.floor(Math.random() * 1000)}`,
        quantity: Number(quantity),
        manufacturerDate,
        expiryDate
      };
      product.batches.push(newBatch);
    }

    const updatedProduct = await product.save();
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error in POST /api/supplier/product/[id]/stock:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}