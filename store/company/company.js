const SET_COMPANY = 'SET_COMPANY'
const RESET = 'RESET'

export const state = () => ({
  company: null,
})

export const actions = {
  async getCompany({ commit }, payload) {
    try {
      const slug = encodeURI(payload)
      const company = await this.$axios.$get(`/public/company/${slug}/`)
      commit(SET_COMPANY, company.data)
    } catch (error) {}
  },
  resetAll({ commit, dispatch }) {
    dispatch('company/review/reset', null, { root: true })
    dispatch('company/interview/reset', null, { root: true })
    dispatch('company/question/resetQuestions', null, { root: true })
  },
}

export const mutations = {
  [SET_COMPANY](state, payload) {
    state.company = payload
  },
  [RESET](state) {
    state.company = null
  },
}
