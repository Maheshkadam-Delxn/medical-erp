import { NextResponse } from 'next/server';
import { verifyToken } from './auth';
import { ApiResponse } from './apiResponse';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};

// Clean up old entries from rate limit store
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.timestamp > RATE_LIMIT.windowMs) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT.windowMs);

// Rate limiting middleware
export const rateLimit = (req) => {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.windowMs;

  const current = rateLimitStore.get(ip) || { count: 0, timestamp: now };
  
  if (current.timestamp < windowStart) {
    current.count = 1;
    current.timestamp = now;
  } else {
    current.count++;
  }

  rateLimitStore.set(ip, current);

  if (current.count > RATE_LIMIT.max) {
    return ApiResponse.error('Too many requests', 429);
  }

  return null;
};

// Authentication middleware
export const authenticate = async (req) => {
  const token = req.cookies.get('token')?.value || 
                req.cookies.get('authToken')?.value ||
                req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return ApiResponse.unauthorized('No token provided');
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return ApiResponse.unauthorized('Invalid token');
    }

    // Add user info to request
    req.user = decoded;
    return null;
  } catch (error) {
    return ApiResponse.unauthorized('Invalid token');
  }
};

// Authorization middleware
export const authorize = (allowedRoles = []) => {
  return (req) => {
    if (!req.user) {
      return ApiResponse.unauthorized('Authentication required');
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return ApiResponse.forbidden('Insufficient permissions');
    }

    return null;
  };
};

// Role-specific authorization
export const requireRole = (role) => authorize([role]);
export const requireAdmin = () => authorize(['superadmin']);
export const requireApprovedUser = () => authorize(['chemist', 'supplier', 'superadmin']);

// Request validation middleware
export const validateRequest = (schema) => {
  return (req) => {
    try {
      const body = req.body ? JSON.parse(req.body) : {};
      const { error } = schema.validate(body);
      
      if (error) {
        return ApiResponse.validationError(error.details.map(d => d.message));
      }
      
      return null;
    } catch (error) {
      return ApiResponse.validationError('Invalid request body');
    }
  };
};

// Main middleware function
export default async function middleware(req) {
  // Skip middleware for static files and API routes that don't need auth
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/_next',
    '/favicon.ico',
    '/api/webhook'
  ];

  const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));
  
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Apply rate limiting
  const rateLimitResult = rateLimit(req);
  if (rateLimitResult) {
    return rateLimitResult;
  }

  // Apply authentication for protected routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const authResult = await authenticate(req);
    if (authResult) {
      return authResult;
    }
  }

  return NextResponse.next();
}

// Export middleware functions for use in API routes
export const withAuth = (handler, options = {}) => {
  return async (req, context) => {
    // Apply authentication
    const authResult = await authenticate(req);
    if (authResult) {
      return authResult;
    }

    // Apply authorization if specified
    if (options.roles) {
      const authzResult = authorize(options.roles)(req);
      if (authzResult) {
        return authzResult;
      }
    }

    return handler(req, context);
  };
};

// Configuration for middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 