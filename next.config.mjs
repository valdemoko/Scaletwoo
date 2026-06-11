/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow data: URIs for our procedural SVG placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Transpile Three.js ecosystem packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
