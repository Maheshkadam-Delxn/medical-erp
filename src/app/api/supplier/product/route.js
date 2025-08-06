// FILE: src/app/api/supplier/product/route.js
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

// GET all products for authenticated supplier
export async function GET(request) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const lowStock = searchParams.get('lowStock');

    // Always filter by the authenticated supplier's registrationId
    let query = { registrationId: user.registrationId };
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Status filter
    if (status === 'active') {
      query.active = true;
    } else if (status === 'inactive') {
      query.active = false;
    }
    
    // Low stock filter
    if (lowStock === 'true') {
      const products = await Product.find(query);
      const lowStockProducts = products.filter(product => {
        const totalStock = product.batches.reduce((sum, batch) => sum + (batch.quantity || 0), 0);
        return totalStock <= (product.reorderLevel || 0);
      });
      return NextResponse.json(lowStockProducts);
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET /api/supplier/product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new product for authenticated supplier
export async function POST(request) {
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
    
    // Create product with supplier's registrationId
    const productData = {
      name: name.trim(),
      category,
      brand: brand?.trim() || '',
      code: code.trim().toUpperCase(),
      unit: unit || 'piece',
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      reorderLevel: Number(reorderLevel),
      active: active !== false,
      batches: batches || [],
      registrationId: user.registrationId
    };
    
    const product = new Product(productData);
    const newProduct = await product.save();
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/supplier/product:', error);
    
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