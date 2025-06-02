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
      }
    ],
  },
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
