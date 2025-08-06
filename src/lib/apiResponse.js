import { NextResponse } from 'next/server';

// Standard API response class
export class ApiResponse {
  static success(data = null, message = 'Success', status = 200) {
    return NextResponse.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    }, { status });
  }

  static error(message = 'Error occurred', status = 500, details = null) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString()
    };

    // Only include details in development
    if (process.env.NODE_ENV === 'development' && details) {
      response.details = details;
    }

    return NextResponse.json(response, { status });
  }

  static validationError(errors, message = 'Validation failed') {
    return NextResponse.json({
      success: false,
      message,
      errors: Array.isArray(errors) ? errors : [errors],
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }

  static unauthorized(message = 'Unauthorized') {
    return NextResponse.json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    }, { status: 401 });
  }

  static forbidden(message = 'Forbidden') {
    return NextResponse.json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    }, { status: 403 });
  }

  static notFound(message = 'Resource not found') {
    return NextResponse.json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    }, { status: 404 });
  }

  static conflict(message = 'Resource conflict') {
    return NextResponse.json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    }, { status: 409 });
  }
}

// Wrapper for async route handlers with error handling
export const withErrorHandler = (handler) => {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle specific error types
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return ApiResponse.validationError(errors);
      }
      
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return ApiResponse.conflict(`${field} already exists`);
      }
      
      if (error.message.includes('not found')) {
        return ApiResponse.notFound(error.message);
      }
      
      if (error.message.includes('Unauthorized') || error.message.includes('Invalid credentials')) {
        return ApiResponse.unauthorized(error.message);
      }
      
      if (error.message.includes('Forbidden') || error.message.includes('pending approval')) {
        return ApiResponse.forbidden(error.message);
      }
      
      // Default error response
      return ApiResponse.error(
        'Internal server error',
        500,
        process.env.NODE_ENV === 'development' ? error.message : null
      );
    }
  };
}; 