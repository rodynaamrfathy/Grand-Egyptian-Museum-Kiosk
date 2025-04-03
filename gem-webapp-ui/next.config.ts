import type { NextConfig } from "next";
const serverIp = process.env.NEXT_PUBLIC_SERVER_IP;

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', `${serverIp}`, 'res.cloudinary.com'], 
  },
};

export default nextConfig;
