<template>
  <div class="app">
    <LoginDialog />
    <Header />
    <nuxt :keep-alive-props="{ max: 10 }" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Shared/Header/Header'
import Footer from '@/components/Shared/Footer'
import LoginDialog from '@/components/Shared/LoginDialog'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
    LoginDialog,
  },
  computed: {
    visibleMenu: {
      get() {
        return this.$store.state.theme.visibleMenuMobile
      },
      set() {
        this.$store.commit('theme/TOGGLE_MENU_MOBILE')
      },
    },
    path() {
      return this.$route.fullPath
    },
  },
  watch: {
    path() {
      if (this.visibleMenu) this.visibleMenu = false
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.deleteCache)
  },
  methods: {
    async deleteCache() {
      await caches.delete('api')
    },
  },
}
</script>

<style></style>
