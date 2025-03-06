/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://backend:3001/api/:path*' // Proxy to Backend
        }
      ];
    }
  };
  
  export default nextConfig;