/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for nginx/static hosting deployment
  output: 'export',
  
  // Disable trailing slash for cleaner URLs (optional, can be changed)
  trailingSlash: false,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig