import Vue from 'vue'
import auth from './auth'
import { general } from './general'
import time from './time'

Vue.mixin(general)
Vue.mixin(auth)
Vue.mixin(time)
