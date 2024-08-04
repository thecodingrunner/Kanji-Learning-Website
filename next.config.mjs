/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
