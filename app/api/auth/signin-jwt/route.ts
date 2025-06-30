import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { JWTService } from '@/lib/jwt';
import { initializeDatabase } from '@/lib/db';

// This route should not be statically generated
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initializeDatabase();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Login user
    const user = await AuthService.loginUser({ email, password });

    // Generate JWT token
    const token = JWTService.generateToken({
      userId: user.id,
      email: user.email,
      name: user.name
    });

    // Create response with user data
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token // Include token in response for frontend
      },
      { status: 200 }
    );

    // Set JWT token as HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid email or password') {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
