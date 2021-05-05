import { PER_PAGE } from '@/config/app'

const SET_INTERVIEWS = 'SET_INTERVIEWS'
const SET_INTERVIEW = 'SET_INTERVIEW'
const PUSH_INTERVIEWS = 'PUSH_INTERVIEWS'
const INCREMENT_PAGE_INTERVIEWS = 'INCREMENT_PAGE_INTERVIEWS'
const RESET = 'RESET'

export const state = () => ({
  interviews: {
    data: [],
    page: 1,
    total: 0,
    infiniteId: +new Date(),
  },
  interview: null,
})

export const actions = {
  async getInterviews({ commit, state }, payload) {
    try {
      const params = {
        params: {
          size: PER_PAGE,
        },
      }

      if (state.interviews.page >= 1) {
        params.params.index = PER_PAGE * (state.interviews.page - 1)
      }
      const slug = encodeURI(payload.company)
      const interviews = await this.$axios.$get(
        `/public/company/${slug}/interview/`,
        params
      )
      if (state.interviews.page === 1) {
        commit(SET_INTERVIEWS, interviews)
      }
      if (state.interviews.page > 1) {
        commit(PUSH_INTERVIEWS, interviews.data)
      }
      if (payload.first === false) {
        if (state.interviews.total > PER_PAGE * state.interviews.page) {
          payload.infinite.loaded()
        } else {
          payload.infinite.complete()
        }
      }

      commit(INCREMENT_PAGE_INTERVIEWS)
    } catch (error) {}
  },
  async getInterview({ commit, state }, payload) {
    try {
      const slug = encodeURI(payload)
      const interviews = await this.$axios.$get(`/public/interview/${slug}/`)
      commit(SET_INTERVIEW, interviews)
    } catch (error) {}
  },
  reset({ commit }) {
    commit('RESET')
  },
}

export const mutations = {
  [SET_INTERVIEWS](state, payload) {
    state.interviews.data = payload.data
    state.interviews.total = payload.total
  },
  [SET_INTERVIEW](state, payload) {
    state.interview = payload.data
  },
  [PUSH_INTERVIEWS](state, payload) {
    state.interviews.data.push(...payload)
  },
  [INCREMENT_PAGE_INTERVIEWS](state) {
    state.interviews.page++
  },
  [RESET](state) {
    state.interviews = {
      data: [],
      page: 1,
      total: 0,
    }
  },
}
