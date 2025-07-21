import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Chemist from '../../../../models/chemist';
import { writeFile } from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  await connectDB();

  try {
    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    
    // Create object to store form values for logging
    const formValues = {};
    const filesInfo = {};

    // Extract all fields and prepare for logging
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        filesInfo[key] = {
          name: value.name,
          type: value.type,
          size: value.size
        };
      } else {
        formValues[key] = value;
      }
    }

    // Log form data to VS Code terminal
    console.log('======== FORM SUBMISSION DATA ========');
    console.log('Form Fields:', JSON.stringify(formValues, null, 2));
    console.log('Files:', JSON.stringify(filesInfo, null, 2));
    console.log('======================================');

    // Validate required fields
    const requiredFields = {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone number',
      aadharNumber: 'Aadhar number',
      password: 'Password',
      storeName: 'Store name',
      address: 'Address',
      city: 'City',
      state: 'State',
      pincode: 'Pincode',
      licenseNumber: 'License number',
      panNumber: 'PAN number',
      gstNumber: 'GST number',
      fssaiNumber: 'FSSAI number',
      shopActNumber: 'Shop Act number'
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formValues[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate files
    const licenseFile = formData.get('licenseFile');
    const shopPhotoFile = formData.get('shopPhotoFile');

    if (!licenseFile) {
      return NextResponse.json(
        { success: false, error: 'License file is required' },
        { status: 400 }
      );
    }

    if (!shopPhotoFile) {
      return NextResponse.json(
        { success: false, error: 'Shop photo is required' },
        { status: 400 }
      );
    }

    // Validate file types
    const validLicenseTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    const validPhotoTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (!validLicenseTypes.includes(licenseFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid license file type. Only PDF, JPEG, PNG allowed.' },
        { status: 400 }
      );
    }

    if (!validPhotoTypes.includes(shopPhotoFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid shop photo type. Only JPEG, PNG allowed.' },
        { status: 400 }
      );
    }

    // Process file uploads
    const processFile = async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = file.name.split('.').pop();
      const filename = `${file.name.split('.')[0]}-${uniqueSuffix}.${fileExtension}`;
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(uploadPath, buffer);
      return `/uploads/${filename}`;
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(formValues.password, 10);

    // Process files in parallel
    const [licenseFileUrl, shopPhotoUrl] = await Promise.all([
      processFile(licenseFile),
      processFile(shopPhotoFile)
    ]);

    // Create new chemist record
    const newChemist = new Chemist({
      ...formValues,
      password: hashedPassword,
      licenseExpiry: formValues.licenseExpiry 
        ? new Date(formValues.licenseExpiry) 
        : null,
      licenseFileUrl,
      shopPhotoUrl,
      status: 'pending'
    });

    // Save to database
    const savedChemist = await newChemist.save();

    // Log successful registration
    console.log('Successfully registered chemist:', {
      id: savedChemist._id,
      email: savedChemist.email,
      storeName: savedChemist.storeName
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          userId: `chemist-${savedChemist._id.toString()}`,
          email: savedChemist.email,
          storeName: savedChemist.storeName
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}