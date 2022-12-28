/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/exportData/:path*",
        destination: "http://127.0.0.1:5001/baycrest-music-brain-study/us-central1/exportData/:path*",
      }
    ];
  },
};

module.exports = nextConfig;
