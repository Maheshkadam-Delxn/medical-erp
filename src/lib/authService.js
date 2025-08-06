import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Chemist from '@/models/Chemist';
import Supplier from '@/models/Supplier';
import Superadmin from '@/models/Superadmin';

// User type configurations
const USER_TYPES = {
  chemist: {
    model: Chemist,
    role: 'chemist',
    requiresApproval: true,
    fields: ['name', 'email', 'phone', 'storeName', 'licenseNumber', 'gstNumber']
  },
  supplier: {
    model: Supplier,
    role: 'supplier',
    requiresApproval: true,
    fields: ['contactPerson', 'email', 'phone', 'companyName', 'drugLicenseNumber', 'gstNumber']
  },
  superadmin: {
    model: Superadmin,
    role: 'superadmin',
    requiresApproval: false,
    fields: ['email']
  }
};

// Centralized authentication service
export class AuthService {
  static async authenticateUser(email, password, userType) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    const user = await config.model.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if password is correct
    let isPasswordValid;
    if (userType === 'superadmin') {
      isPasswordValid = await user.comparePassword(password);
    } else {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Check approval status for roles that require it
    if (config.requiresApproval && !user.isApproved) {
      throw new Error('Account pending approval');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new Error('Account is blocked');
    }

    return user;
  }

  static generateToken(user, userType) {
    const payload = {
      id: user._id,
      email: user.email,
      role: userType,
      ...(user.name && { name: user.name }),
      ...(user.contactPerson && { name: user.contactPerson }),
      ...(user.storeName && { storeName: user.storeName }),
      ...(user.companyName && { companyName: user.companyName })
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  static async registerUser(userData, userType, files = {}) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    // Validate required fields
    const missingFields = config.fields.filter(field => !userData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Check for existing user
    const existingUser = await config.model.findOne({
      $or: [
        { email: userData.email },
        ...(userData.phone && [{ phone: userData.phone }]),
        ...(userData.licenseNumber && [{ licenseNumber: userData.licenseNumber }]),
        ...(userData.gstNumber && [{ gstNumber: userData.gstNumber }])
      ]
    });

    if (existingUser) {
      throw new Error('User already exists with these credentials');
    }

    // Create user
    const user = await config.model.create({
      ...userData,
      isApproved: !config.requiresApproval
    });

    return user;
  }

  static async getUserById(id, userType) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    const user = await config.model.findById(id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async updateUserStatus(id, userType, status, adminId, reason = null) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    const updateData = {
      isApproved: status === 'approved',
      approvedBy: status === 'approved' ? adminId : null,
      approvedAt: status === 'approved' ? new Date() : null,
      rejectionReason: status === 'rejected' ? reason : null
    };

    const user = await config.model.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async blockUnblockUser(id, userType, isBlocked, adminId, reason = null) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    const updateData = {
      isBlocked,
      blockedAt: isBlocked ? new Date() : null,
      unblockedAt: !isBlocked ? new Date() : null,
      blockReason: isBlocked ? reason : null,
      blockedBy: isBlocked ? adminId : null
    };

    const user = await config.model.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async getAllUsers(userType, filters = {}) {
    const config = USER_TYPES[userType];
    if (!config) {
      throw new Error('Invalid user type');
    }

    const query = {};
    
    // Apply filters
    if (filters.isApproved !== undefined) {
      query.isApproved = filters.isApproved;
    }
    if (filters.isBlocked !== undefined) {
      query.isBlocked = filters.isBlocked;
    }
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const users = await config.model.find(query).select('-password');
    return users;
  }

  static async getStats() {
    const stats = {};
    
    for (const [userType, config] of Object.entries(USER_TYPES)) {
      const total = await config.model.countDocuments();
      const approved = await config.model.countDocuments({ isApproved: true });
      const pending = await config.model.countDocuments({ isApproved: false });
      const blocked = await config.model.countDocuments({ isBlocked: true });
      
      stats[userType] = { total, approved, pending, blocked };
    }
    
    return stats;
  }
}

// Helper function to validate user type
export const isValidUserType = (userType) => {
  return Object.keys(USER_TYPES).includes(userType);
};

// Helper function to get user type config
export const getUserTypeConfig = (userType) => {
  return USER_TYPES[userType];
}; 