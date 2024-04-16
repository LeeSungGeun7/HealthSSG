const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  async headers() {
    
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "imagedelivery.net",
          port: "",
          pathname: "/**/**",
        },
      ],
    },
  };
  NextAuth({
    // ...
    url: process.env.NEXTAUTH_URL,
    // ...
  }),
  
  module.exports = nextConfig;