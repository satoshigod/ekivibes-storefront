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
  async redirects() {
    return [
      {
        source: "/:country/products/chaleco-airbag-vh-ni%C3%B1os",
        destination: "/:country/products/chaleco-airbag-vh-juvenil-adulto",
        permanent: true,
      },
      {
        source: "/:country/products/chaleco-airbag-mlv3-h-ni%C3%B1os",
        destination: "/:country/products/chaleco-airbag-mlv3-h-juvenil-adulto",
        permanent: true,
      },
      {
        source: "/:country/products/chaleco-airbag-vh-ninos",
        destination: "/:country/products/chaleco-airbag-vh-juvenil-adulto",
        permanent: true,
      },
      {
        source: "/:country/products/chaleco-airbag-mlv3-h-ninos",
        destination: "/:country/products/chaleco-airbag-mlv3-h-juvenil-adulto",
        permanent: true,
      },
    ]
  },
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
