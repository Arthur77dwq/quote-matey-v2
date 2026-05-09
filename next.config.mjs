/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: [
    'fd97-2401-4900-8830-ebd0-ed57-307f-857d-a665.ngrok-free.app',
  ],
};

export default nextConfig;
