/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "facialdetectionstack-face-images.s3.amazonaws.com",
            },]
      },
};

export default nextConfig;
