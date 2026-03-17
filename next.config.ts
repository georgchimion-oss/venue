import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript check on VPS builds (low RAM droplet gets OOM killed)
  // Types are validated locally before pushing
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
