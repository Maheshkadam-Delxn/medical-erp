import connectDB from '@/lib/dbConnect';
import { AuthService, isValidUserType } from '@/lib/authService';
import { ApiResponse, withErrorHandler } from '@/lib/apiResponse';
import { withAuth } from '@/lib/middleware';

// GET - Fetch all users of a specific type
export const GET = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType } = params;
    const { searchParams } = new URL(req.url);

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Extract query parameters
    const filters = {
      isApproved: searchParams.get('isApproved') !== null 
        ? searchParams.get('isApproved') === 'true' 
        : undefined,
      isBlocked: searchParams.get('isBlocked') !== null 
        ? searchParams.get('isBlocked') === 'true' 
        : undefined,
      search: searchParams.get('search') || undefined
    };

    // Get users
    const users = await AuthService.getAllUsers(userType, filters);

    return ApiResponse.success({
      users,
      count: users.length,
      userType
    });
  }, { roles: ['superadmin'] })
);

// POST - Create a new user (admin only)
export const POST = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType } = params;
    const userData = await req.json();

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Create user
    const user = await AuthService.registerUser(userData, userType);

    return ApiResponse.success({
      user: {
        id: user._id,
        email: user.email,
        role: userType,
        isApproved: user.isApproved
      }
    }, 'User created successfully', 201);
  }, { roles: ['superadmin'] })
); 