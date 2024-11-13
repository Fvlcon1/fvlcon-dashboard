/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            encoding : false
          };
        }
        return config;
    },
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "facialdetectionstack-face-images.s3.amazonaws.com",
            },
            {
              protocol: "https",
              hostname: "sam-app-3-detected-faces-bucket.s3.us-east-1.amazonaws.com",
            },
            {
              protocol: "https",
              hostname: "sam-app-3-detected-faces-bucket.s3.amazonaws.com",
            },
            {
              protocol: "https",
              hostname: "facialdetectionstack-face-images.s3.us-east-1.amazonaws.com",
            },
          ]
      },
};

export default nextConfig;
