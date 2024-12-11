/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Configuración para alias en Next.js
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
