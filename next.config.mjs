/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add your S3 domain here
    remotePatterns: [
      {
        protocol: 'https',
        // --- UPDATED HOSTNAME HERE ---
        hostname: 'mohan-ecom-static-uploads.s3.ap-south-1.amazonaws.com', 
        port: '',
        pathname: '/**', // Allows all paths in the bucket
      },
      // If you are using CloudFront, you would uncomment and update this block:
      // {
      //   protocol: 'https',
      //   hostname: 'd123example456.cloudfront.net', 
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  reactCompiler: true,
};

// Use 'export default nextConfig;' if your file is next.config.mjs
export default nextConfig; 

// Use 'module.exports = nextConfig;' if your file is next.config.js
// module.exports = nextConfig;