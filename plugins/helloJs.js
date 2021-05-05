import HelloJs from 'hellojs'
import Vue from 'vue'
import VueHello from 'vue-hellojs'

HelloJs.init(
  {
    google: process.env.OAUTH_GOOGLE,
  },
  {
    redirect_uri: '/',
  }
)

Vue.use(VueHello, HelloJs)
