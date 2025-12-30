import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'kjvscwficgqufvsvsowc.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'emgxjbmzrxpnureimxoj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
