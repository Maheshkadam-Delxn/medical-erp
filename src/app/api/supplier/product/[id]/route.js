// FILE: src/app/api/supplier/product/[id]/route.js

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

// GET single product by ID
export async function GET(request, { params }) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const product = await Product.findById(params.id);
    if (!product || product.registrationId !== user.registrationId) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in GET /api/supplier/product/[id]:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const {
      name,
      category,
      brand,
      code,
      unit,
      purchasePrice,
      sellingPrice,
      reorderLevel,
      batches,
      active
    } = await request.json();
    
    // Basic validation
    if (!name || !category || !code || !purchasePrice || !sellingPrice || reorderLevel === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate selling price
    if (parseFloat(sellingPrice) < parseFloat(purchasePrice)) {
      return NextResponse.json(
        { message: 'Selling price must be greater than or equal to purchase price' },
        { status: 400 }
      );
    }
    
    // Validate batches for active products
    if (active !== false && (!batches || batches.length === 0)) {
      return NextResponse.json(
        { message: 'Active products must have at least one batch' },
        { status: 400 }
      );
    }
    
    const product = await Product.findById(params.id);
    if (!product || product.registrationId !== user.registrationId) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update product fields
    product.name = name.trim();
    product.category = category;
    product.brand = brand?.trim() || '';
    product.code = code.trim().toUpperCase();
    product.unit = unit || 'piece';
    product.purchasePrice = Number(purchasePrice);
    product.sellingPrice = Number(sellingPrice);
    product.reorderLevel = Number(reorderLevel);
    product.batches = batches || [];
    product.active = active !== false;
    
    const updatedProduct = await product.save();
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error in PUT /api/supplier/product/[id]:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Product code must be unique' },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE product (soft delete)
export async function DELETE(request, { params }) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const product = await Product.findById(params.id);
    if (!product || product.registrationId !== user.registrationId) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    product.active = false;
    await product.save();
    
    return NextResponse.json(
      { message: 'Product deactivated successfully' }
    );
  } catch (error) {
    console.error('Error in DELETE /api/supplier/product/[id]:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}