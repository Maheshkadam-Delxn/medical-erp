import connectDB from '@/lib/dbConnect';
import { AuthService, isValidUserType } from '@/lib/authService';
import { ApiResponse, withErrorHandler } from '@/lib/apiResponse';
import { withAuth } from '@/lib/middleware';

export const POST = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType, id } = params;
    const { isBlocked, reason } = await req.json();

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Validate isBlocked
    if (typeof isBlocked !== 'boolean') {
      return ApiResponse.validationError(['isBlocked must be a boolean']);
    }

    // Update user block status
    const user = await AuthService.blockUnblockUser(
      id, 
      userType, 
      isBlocked, 
      req.user.id, 
      reason
    );

    return ApiResponse.success(
      { user },
      `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`
    );
  }, { roles: ['superadmin'] })
); 