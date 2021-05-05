const pkg = require('./package')

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
    titleTemplate: '%s - جاب گای',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'جاب گای',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'جاب گای',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://jobguy.work/',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://jobguy.work/',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: pkg.description,
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'website',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://jobguy.work/images/logo.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/fonts/vazir/font.css',
        defer: true,
      },
      {
        rel: 'stylesheet',
        href: '/fonts/jobguy/style.css',
        defer: true,
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'green', rtl: true },
  /*
   ** Global CSS
   */
  css: ['assets/styles/main.scss'],

  styleResources: {
    // your settings here
    scss: ['assets/styles/_variables.scss'],
  },

  // pwa meta
  meta: {
    mobileApp: true,
    mobileAppIOS: true,
    appleStatusBarStyle: 'default',
    theme_color: '#0F9D58',
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
      src: '@/plugins/gallery',
      ssr: false,
    },
    {
      src: '@/plugins/helloJs',
      ssr: false,
    },
    {
      src: '@/plugins/crop',
      ssr: false,
    },
    {
      src: '@/plugins/infinite',
      ssr: false,
    },
    {
      src: '@/plugins/persianDate.js',
      ssr: false,
    },
    {
      src: '@/plugins/editor.js',
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
    id: 'UA-135891606-1',
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
