/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'storage.cloud.google.com' },
            { hostname: 'storage.googleapis.com' },
        ],
    },
}

module.exports = nextConfig
