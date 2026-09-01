import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// GitHub Pages serves project sites from `/<repository>` rather than `/`.
// `actions/configure-pages` supplies this value during the deployment build;
// local development keeps the empty default.
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "export",
  basePath: pagesBasePath,
  trailingSlash: true,
  images: {
    // GitHub Pages has no Next.js image-optimization server.
    unoptimized: true,
  },
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
