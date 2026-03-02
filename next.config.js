/** @type {import('next').NextConfig} */
const path = require('path');

// If your repository/workspace contains multiple package-lock files (or monorepo-like layout),
// Turbopack may infer the wrong workspace root. Setting `experimental.turbopack.root`
// forces Turbopack to use the correct project directory and silences the warning.
const nextConfig = {
  experimental: {
    turbopack: {
      // Resolve to this project's directory (this file's folder)
      root: path.resolve(__dirname),
    },
  },
  // NOTE: keep other top-level config properties below
  
  /** @type {import('next').NextConfig} */

  // (the rest of the config follows)

  //
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

