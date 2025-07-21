import mongoose from 'mongoose';

const chemistSchema = new mongoose.Schema({
  // Personal Information
  name: { type: String, required: [true, 'Name is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  aadharNumber: { 
    type: String, 
    required: [true, 'Aadhar number is required'],
    match: [/^[0-9]{12}$/, 'Please enter a valid 12-digit Aadhar number']
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },

  // Store Information
  storeName: { type: String, required: [true, 'Store name is required'] },
  address: { type: String, required: [true, 'Address is required'] },
  city: { type: String, required: [true, 'City is required'] },
  state: { type: String, required: [true, 'State is required'] },
  pincode: { 
    type: String, 
    required: [true, 'Pincode is required'],
    match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
  },

  // Legal Information
  licenseNumber: { type: String, required: [true, 'License number is required'] },
  licenseExpiry: { type: Date, required: [true, 'License expiry date is required'] },
  panNumber: { 
    type: String, 
    required: [true, 'PAN number is required'],
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number']
  },
  gstNumber: { 
    type: String, 
    required: [true, 'GST number is required'],
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/, 'Please enter a valid GST number']
  },

  // Verification Information
  fssaiNumber: { type: String, required: [true, 'FSSAI number is required'] },
  shopActNumber: { type: String, required: [true, 'Shop Act number is required'] },

  // File Uploads
  licenseFileUrl: { type: String, required: [true, 'License file is required'] },
  shopPhotoUrl: { type: String, required: [true, 'Shop photo is required'] },

  // Status
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Hash password before saving

// Add indexes (removed email index since we have unique:true)
chemistSchema.index({ phone: 1 });
chemistSchema.index({ licenseNumber: 1 });
chemistSchema.index({ status: 1 });

// Virtual for formatted user ID
chemistSchema.virtual('userId').get(function() {
  return `chemist-${this._id.toString()}`;
});

export default mongoose.models.Chemist || mongoose.model('Chemist', chemistSchema);