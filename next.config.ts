import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the line we need for the static export to Hostinger.
  output: 'export',

  // This prevents errors related to using <img> tags with a static export.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;