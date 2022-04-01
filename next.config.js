const { withSentryConfig } = require('@sentry/nextjs')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// TODO: Remove dummy domains listed below once all images are migrated to siw domain
const moduleExports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'vercel.saleor.cloud',
      'siw.bluesquaretech.com.au',
      process.env.CONTENTFUL_IMAGE_HOST,
      process.env.COMMERCE_IMAGE_HOST,
    ],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
module.exports = moduleExports
