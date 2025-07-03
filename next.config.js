/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'],
  },
  trailingSlash: false,
  env: {
    CUSTOM_KEY: 'my-value',
  },
  // Suppress React DevTools warning in development
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Fix for Netlify deployment - disable static generation
  output: 'standalone',
  experimental: {
    esmExternals: false,
  },
  // Webpack configuration to handle module resolution
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;