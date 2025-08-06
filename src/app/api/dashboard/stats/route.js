import connectDB from '@/lib/dbConnect';
import { AuthService } from '@/lib/authService';
import { ApiResponse, withErrorHandler } from '@/lib/apiResponse';
import { withAuth } from '@/lib/middleware';

export const GET = withErrorHandler(
  withAuth(async (req) => {
    await connectDB();

    // Get stats for all user types
    const stats = await AuthService.getStats();

    // Calculate totals
    const totals = {
      totalUsers: Object.values(stats).reduce((sum, type) => sum + type.total, 0),
      totalApproved: Object.values(stats).reduce((sum, type) => sum + type.approved, 0),
      totalPending: Object.values(stats).reduce((sum, type) => sum + type.pending, 0),
      totalBlocked: Object.values(stats).reduce((sum, type) => sum + type.blocked, 0)
    };

    return ApiResponse.success({
      stats,
      totals,
      timestamp: new Date().toISOString()
    });
  }, { roles: ['superadmin'] })
); 