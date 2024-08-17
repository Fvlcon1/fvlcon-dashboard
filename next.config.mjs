/** @type {import('next').NextConfig} */
const nextConfig = {
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
            },]
      },
};

export default nextConfig;
