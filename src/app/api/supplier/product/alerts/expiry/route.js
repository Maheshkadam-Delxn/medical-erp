import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
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

// GET expiry alerts for authenticated supplier
export async function GET(request) {
  try {
    const user = getUserFromToken(request);
    
    if (!user || user.role !== 'supplier') {
      return NextResponse.json(
        { message: 'Unauthorized - Supplier access required' },
        { status: 401 }
      );
    }

    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + 30); // 30 days from now
    
    // Always filter by the authenticated supplier's registrationId
    let query = {
      active: true,
      registrationId: user.registrationId,
      'batches.expiryDate': {
        $gte: today,
        $lte: thresholdDate
      }
    };
    
    const products = await Product.find(query);
    
    const alerts = [];
    products.forEach(product => {
      product.batches.forEach(batch => {
        if (batch.expiryDate) {
          const expiryDate = new Date(batch.expiryDate);
          if (expiryDate <= thresholdDate) {
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            alerts.push({
              productId: product._id,
              productName: product.name,
              batchNumber: batch.batchNumber,
              expiryDate: batch.expiryDate,
              daysLeft: diffDays,
              quantity: batch.quantity
            });
          }
        }
      });
    });
    
    // Sort by days left (ascending)
    alerts.sort((a, b) => a.daysLeft - b.daysLeft);
    
    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Error in GET /api/supplier/product/alerts/expiry:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}