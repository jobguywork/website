import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  slots: {
    noResults: 'داده ای وجود ندارد ☹️',
  },
  props: {
    spinner: 'default',
    /* other props need to configure */
  },
  system: {
    throttleLimit: 300,
    /* other settings need to configure */
  },
})
