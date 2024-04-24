const withNextra = require('nextra')('nextra-theme-blog', './theme.config.js')

module.exports = withNextra((nextConfig) => {
  const config = {
    ...nextConfig,
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['glslify-loader']
      })
      return config
    }
  }

  return config
})
