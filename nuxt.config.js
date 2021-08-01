const config = require('./config/app')

module.exports = {
  telemetry: false,
  ssr: true,
  server: {
    port: process.env.ENV === 'production' ? 3000 : 8000,
    host: 'localhost', // default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - ${config.DOMAIN_TITLE}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: config.META_DESCRIPTION,
      },
    ],
  },
  seo: {
    lang: 'fa',
    language: 'Persian',
    baseUrl: config.BASE_URL,
    name: config.DOMAIN_TITLE,
    title: config.DOMAIN_TITLE,
    description: config.META_DESCRIPTION,
    openGraph: {
      image: {
        url: `${config.BASE_URL}/images/og-jobguy.jpg`,
        alt: config.DOMAIN_TITLE,
      },
    },
    twitter: {
      site: config.TWITTER,
      card: 'summary_large_image',
    },
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'green', rtl: true },
  /*
   ** Global CSS
   */
  css: [
    'assets/styles/fonts/vazir/font.css',
    'assets/styles/fonts/jobguy/style.css',
    'assets/styles/main.scss',
  ],

  styleResources: {
    // your settings here
    scss: ['assets/styles/_variables.scss'],
  },

  // pwa meta
  meta: {
    mobileApp: true,
    mobileAppIOS: true,
    appleStatusBarStyle: 'default',
    theme_color: '#0A8549',
    nativeUI: true,
  },

  manifest: {
    name: 'Job Guy',
    lang: 'fa',
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios',
    '@/mixins/index.js',
    '@/plugins/globalComponents',
    {
      src: '@/plugins/element-ui',
      ssr: true,
    },
    {
      src: '@/plugins/helloJs',
      ssr: false,
    },
    {
      src: '@/plugins/infinite',
      ssr: false,
    },
    {
      src: '@/plugins/sentry.js',
      ssr: false,
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/device',
    'nuxt-compress',
    '@nuxtjs/google-analytics',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    'nuxt-seo',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
    debug: process.env.ENV !== 'production',
  },

  'nuxt-compress': {
    gzip: {
      cache: true,
    },
    brotli: {
      threshold: 10240,
    },
  },

  googleAnalytics: {
    id: config.GOOGLE_ANALYTICS,
  },

  /*
   ** Build configuration
   */
  build: {
    // hardSource: process.env.ENV === 'development',
    transpile: [/^element-ui/],
    extractCSS: {
      ignoreOrder: process.env.ENV !== 'production',
    },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true,
    },
    maxChunkSize: 100000,
    optimizeCSS: true,

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
          .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  },
  workbox: {
    offline: false,
  },
}
