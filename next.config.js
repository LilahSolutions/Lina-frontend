/** @type {import('next').NextConfig} */

const basePath = '/lina';

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    basePath: basePath,
  },
  basePath: basePath,
  assetPrefix: basePath,
  eslint: { dirs: ['.'] },
  output: 'standalone',
  images: {
    //Specifies the domains that are allowed for images when using the next/image component
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },
};

module.exports = nextConfig;
