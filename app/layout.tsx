import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

// Prevent static generation for layout
export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://purecarbon.app' : 'http://localhost:3000'),
  title: 'PureCarbon - AI-Powered Carbon Credit Platform',
  description: 'Track your carbon footprint, earn EcoPoints, and trade carbon credits in the gamified sustainability platform',
  keywords: 'carbon footprint, sustainability, carbon credits, climate action, environmental impact',
  authors: [{ name: 'PureCarbon Team' }],
  openGraph: {
    title: 'PureCarbon - AI-Powered Carbon Credit Platform',
    description: 'Track your carbon footprint, earn EcoPoints, and trade carbon credits in the gamified sustainability platform',
    url: 'https://purecarbon.app',
    siteName: 'PureCarbon',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PureCarbon - Track your carbon footprint',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PureCarbon - AI-Powered Carbon Credit Platform',
    description: 'Track your carbon footprint, earn EcoPoints, and trade carbon credits',
    images: ['/twitter-image.jpg'],
    creator: '@purecarbon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/api/placeholder/32/32" type="image/svg+xml" sizes="32x32" />
        <link rel="apple-touch-icon" href="/api/placeholder/180/180" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10B981" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}