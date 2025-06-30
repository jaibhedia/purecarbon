import { NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@/lib/jwt';
import { AuthService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie or header
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

    // Get fresh user data from database
    const user = await AuthService.getUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      },
      tokenInfo: {
        issuedAt: new Date((payload.iat || 0) * 1000),
        expiresAt: new Date((payload.exp || 0) * 1000)
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
