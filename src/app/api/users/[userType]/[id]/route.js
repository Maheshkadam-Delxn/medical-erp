import connectDB from '@/lib/dbConnect';
import { AuthService, isValidUserType } from '@/lib/authService';
import { ApiResponse, withErrorHandler } from '@/lib/apiResponse';
import { withAuth } from '@/lib/middleware';

// GET - Get user by ID
export const GET = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType, id } = params;

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Get user
    const user = await AuthService.getUserById(id, userType);

    return ApiResponse.success({ user });
  })
);

// PUT - Update user
export const PUT = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType, id } = params;
    const updateData = await req.json();

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Get user type config
    const config = getUserTypeConfig(userType);
    
    // Update user
    const user = await config.model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return ApiResponse.notFound('User not found');
    }

    return ApiResponse.success({ user }, 'User updated successfully');
  })
);

// DELETE - Delete user (admin only)
export const DELETE = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType, id } = params;

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Get user type config
    const config = getUserTypeConfig(userType);
    
    // Delete user
    const user = await config.model.findByIdAndDelete(id);

    if (!user) {
      return ApiResponse.notFound('User not found');
    }

    return ApiResponse.success(null, 'User deleted successfully');
  }, { roles: ['superadmin'] })
); 