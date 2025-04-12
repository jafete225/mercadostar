/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "image.pexels.com",
        },
        {
          protocol: "https",
          hostname: "static.wixstatic.com", // Adiciona o domínio do Wix
        },
      ],
    },
  };
  
  export default nextConfig;
  