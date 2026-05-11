/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ['*.ngrok-free.dev'],
};

export default nextConfig;
