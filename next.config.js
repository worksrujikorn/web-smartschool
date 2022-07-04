// module.exports = {
//   reactStrictMode: true,
// }
module.exports = {
  images: {
    domains: ['tmdb.org', 'api.noodee.net'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    return config
  },
  
}