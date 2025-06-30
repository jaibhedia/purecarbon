import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL ? 'Set ✅' : 'Not set ❌',
    jwtSecret: process.env.JWT_SECRET ? 'Set ✅' : 'Not set ❌',
    nodeEnv: process.env.NODE_ENV,
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    jwtSecretLength: process.env.JWT_SECRET?.length || 0,
  });
}
