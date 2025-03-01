/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "https://firebasestorage.googleapis.com",
      "firebasestorage.googleapis.com"
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
