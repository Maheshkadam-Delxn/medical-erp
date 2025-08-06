import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Chemist from '@/models/Chemist';
import Supplier from '@/models/Supplier';
import Superadmin from '@/models/Superadmin';

// User type mapping
const USER_MODELS = {
  chemist: Chemist,
  supplier: Supplier,
  superadmin: Superadmin
};

// Authentication function
export const authenticateUser = async (email, password, userType) => {
  const Model = USER_MODELS[userType];
  if (!Model) {
    throw new Error('Invalid user type');
  }

  const user = await Model.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Check password
  let isValid;
  if (userType === 'superadmin') {
    isValid = await user.comparePassword(password);
  } else {
    isValid = await bcrypt.compare(password, user.password);
  }

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Check approval status
  if (userType !== 'superadmin' && !user.isApproved) {
    throw new Error('Account pending approval');
  }

  // Check if blocked
  if (user.isBlocked) {
    throw new Error('Account is blocked');
  }

  return user;
};

// Token generation
export const generateToken = (user, userType) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: userType
  };

  // Add registrationId for suppliers
  if (userType === 'supplier' && user.registrationId) {
    payload.registrationId = user.registrationId;
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User creation
export const createUser = async (userData, userType) => {
  const Model = USER_MODELS[userType];
  if (!Model) {
    throw new Error('Invalid user type');
  }

  const user = await Model.create(userData);
  return user;
};

// User update
export const updateUser = async (id, userType, updateData) => {
  const Model = USER_MODELS[userType];
  if (!Model) {
    throw new Error('Invalid user type');
  }

  const user = await Model.findByIdAndUpdate(id, updateData, { new: true });
  return user;
};

// User fetch by ID
export const getUserById = async (id, userType) => {
  const Model = USER_MODELS[userType];
  if (!Model) {
    throw new Error('Invalid user type');
  }

  const user = await Model.findById(id).select('-password');
  return user;
};

// User listing
export const getAllUsers = async (userType, filters = {}) => {
  const Model = USER_MODELS[userType];
  if (!Model) {
    throw new Error('Invalid user type');
  }

  const users = await Model.find(filters).select('-password');
  return users;
}; 