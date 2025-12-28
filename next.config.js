
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/buy',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'housing-images.n7net.in',
        // Optional: You can specify a port if needed, usually omitted
        // port: '', 
        // Optional: Specify a pathname prefix if needed, usually omitted
        // pathname: '/some/specific/path/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // Keep any other domains you might have configured here (e.g., googleusercontent.com)
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
      // You may also need this if your images use the older sub-domain format
      {
        protocol: 'http',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'c.housingcdn.com'
      },
       {
        protocol: 'https',
        hostname: 'housing.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      }

      // Add any other domains here...
    ],
  },
};

module.exports = nextConfig;