/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Justifed-Idea-Generator',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig