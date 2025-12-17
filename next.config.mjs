/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        // pathname: "/<cloud-name>/**",
      },
    ],
     domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
