import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Allow opening the dev server from a phone/other device on the LAN
  // (the "Network" URL Next prints). Without this, Next 16 blocks the
  // cross-origin dev resources and React never hydrates, so interactive
  // bits (language toggle and mobile navigation) silently do nothing.
  // Dev-only; ignored in production builds.
  allowedDevOrigins: ["192.168.0.33"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
