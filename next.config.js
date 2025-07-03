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
  // Use standalone for better Netlify compatibility
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  // Configure for Netlify deployment
  experimental: {
    esmExternals: false,
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;