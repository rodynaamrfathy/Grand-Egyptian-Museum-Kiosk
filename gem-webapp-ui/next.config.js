const serverIp = process.env.NEXT_PUBLIC_SERVER_IP;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', serverIp, 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
