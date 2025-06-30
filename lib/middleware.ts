import { NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@/lib/jwt';

export function authMiddleware(request: NextRequest) {
  // Get token from cookie or Authorization header
  const tokenFromCookie = request.cookies.get('auth-token')?.value;
  const authHeader = request.headers.get('authorization');
  const tokenFromHeader = JWTService.extractTokenFromHeader(authHeader);
  
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Verify token
  const payload = JWTService.verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Add user info to request headers for use in API routes
  const response = NextResponse.next();
  response.headers.set('x-user-id', payload.userId.toString());
  response.headers.set('x-user-email', payload.email);
  if (payload.name) {
    response.headers.set('x-user-name', payload.name);
  }

  return response;
}

// Helper function to get user from request
export function getUserFromRequest(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  const email = request.headers.get('x-user-email');
  const name = request.headers.get('x-user-name');

  if (!userId || !email) return null;

  return {
    id: parseInt(userId),
    email,
    name: name || undefined
  };
}
