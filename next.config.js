/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
  },
  // Suppress React DevTools warning in development
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Suppress specific React warnings in development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: 'Download the React DevTools for a better development experience',
            replace: '',
            flags: 'g'
          }
        }
      });
    }
    return config;
  },
};

module.exports = nextConfig;