/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jjpewexacillcatitbra.supabase.co',
        port: '',
      }
    ]
  }
}

module.exports = nextConfig
