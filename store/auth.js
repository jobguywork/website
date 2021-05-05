export const state = () => ({
  token: null,
  user: null,
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions = {
  setToken({ commit }, payload) {
    commit('SET_TOKEN', payload)

    this.$axios.setToken(payload, 'JWT')

    this.$cookies.set('token', payload, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  },
  setUser({ commit }, payload) {
    commit('SET_USER', payload)

    this.$cookies.set('user', payload, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  },

  logout({ commit }) {
    this.$cookies.remove('user')
    this.$cookies.remove('token')
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
    this.$axios.setToken(false)
  },
}
