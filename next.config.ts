import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:lang/partners/:path*',
        destination: '/partners/:path*',
      },
    ]
  },
};

export default nextConfig;
