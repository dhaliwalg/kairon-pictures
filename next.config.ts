/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Add Vimeo if you're using any remote Vimeo thumbnails
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        port: "",
        pathname: "/**",
      },
      // Add any other domains you might use for images
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add modern image formats and optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache images for 60 seconds minimum
  },
  
  // Enable compression
  compress: true,
  
  // Note: swcMinify is now default in Next.js 13+ and deprecated
  
  // Add security and performance headers
  async headers() {
    return [
      {
        // Apply to all routes
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
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/optimized-project-videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // Cache images
        source: '/project-thumbnails/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // Cache stills/images
        source: '/stills/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        // Allow embedding in iframes for Vimeo (if needed)
        source: '/work/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Override DENY for work pages that might have Vimeo embeds
          },
        ],
      },
    ];
  },

  // Redirect configuration (if you need any)
  async redirects() {
    return [
      // Example: redirect old URLs to new ones
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Turbopack configuration (replaces experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Environment variables validation (optional but recommended)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Webpack configuration for additional optimizations
  // Note: Only use webpack config if you're NOT using Turbopack
  // Remove this section if you want to use Turbopack for dev
  webpack: (config: { optimization: { splitChunks: { chunks: string; cacheGroups: { vendor: { test: RegExp; name: string; chunks: string; }; }; }; }; module: { rules: { test: RegExp; use: string[]; }[]; }; }, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Only apply webpack optimizations in production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Output configuration for static export (if needed)
  // trailingSlash: true,
  // output: 'export',

  // Generate robots.txt and sitemap automatically
  async rewrites() {
    return [
      // Add any URL rewrites here if needed
    ];
  },
};

module.exports = nextConfig;