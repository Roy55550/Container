/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils', 'hooks']
  }
}

module.exports = nextConfig;
