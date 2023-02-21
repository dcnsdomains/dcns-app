/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // remove this once this PR is merged to main: https://github.com/vercel/next.js/pull/33236
    swcFileReading: false,
  },
  // change to true once infinite loop is fixed
  swcMinify: false,
  generateBuildId: () => {
    const hash = execSync('git rev-parse HEAD').toString().trim()
    return hash
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      include: [options.dir],
      use: [
        'next-swc-loader',
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
            babel: false,
          },
        },
      ],
    })

    return config
  }
}

module.exports = nextConfig
