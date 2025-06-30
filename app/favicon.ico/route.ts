import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Create a simple favicon SVG
  const svg = `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" fill="#10b981" rx="4"/>
      <path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c1.1 0 2.1.3 3 .8L12 18h8c-.9 2.8-3.5 4.8-6.5 4.8S9.5 20.8 8.5 18c0-.7.1-1.4.3-2l7.2-7.2z" fill="white"/>
      <circle cx="16" cy="12" r="2" fill="white"/>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
