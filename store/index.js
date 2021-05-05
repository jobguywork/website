export const actions = {
  async nuxtServerInit(store, { redirect }) {
    const user = this.$cookies.get('user')
    const token = this.$cookies.get('token')
    if (token) {
      await store.dispatch('auth/setToken', token)
      await store.dispatch('auth/setUser', user)
      try {
        const { data } = await this.$axios.get('/authnz/refresh_my_token/')

        store.dispatch('auth/setToken', data.data.token)
        store.dispatch('auth/setUser', data.data.user)
      } catch (error) {
        await store.dispatch('auth/logout')
        redirect('/')
      }
    }
  },
}
