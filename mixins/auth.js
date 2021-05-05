export default {
  computed: {
    $user() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user
      }
    },
    $isLogin() {
      if (this.$store.state.auth.user) {
        return !!this.$store.state.auth.user
      } else {
        return false
      }
    },
    $token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    $logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
  },
}
