import Vue from 'vue'
import VueRaven from 'vue-raven'

Vue.use(VueRaven, {
  dsn: 'https://269d52a81be74b66a0ce408734b8c08a@sentry.io/1457732',
  environment: process.env.ENV,
  disableAutoReport: false,
})
