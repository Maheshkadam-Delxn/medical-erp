import connectDB from '@/lib/dbConnect';
import { AuthService, isValidUserType } from '@/lib/authService';
import { ApiResponse, withErrorHandler } from '@/lib/apiResponse';
import { withAuth } from '@/lib/middleware';

export const POST = withErrorHandler(
  withAuth(async (req, { params }) => {
    await connectDB();

    const { userType, id } = params;
    const { status, reason } = await req.json();

    // Validate user type
    if (!isValidUserType(userType)) {
      return ApiResponse.validationError(['Invalid user type']);
    }

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return ApiResponse.validationError(['Status must be either "approved" or "rejected"']);
    }

    // Update user status
    const user = await AuthService.updateUserStatus(
      id, 
      userType, 
      status, 
      req.user.id, 
      reason
    );

    return ApiResponse.success(
      { user },
      `User ${status} successfully`
    );
  }, { roles: ['superadmin'] })
); 