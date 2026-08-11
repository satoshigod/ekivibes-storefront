const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Evita que Next.js colapse con un Error 500 al procesar fotos externas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite cargar fotos de Railway, GitHub, Cloudinary o S3
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
