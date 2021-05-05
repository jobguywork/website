import { PER_PAGE } from '@/config/app'

const SET_REVIEWS = 'SET_REVIEWS'
const PUSH_REVIEWS = 'PUSH_REVIEWS'
const INCREMENT_PAGE_REVIEWS = 'INCREMENT_PAGE_REVIEWS'
const SET_REVIEW = 'SET_REVIEW'
const RESET = 'RESET'

export const state = () => ({
  reviews: {
    data: [],
    page: 1,
    total: 0,
    infiniteId: +new Date(),
  },
  review: null,
})

export const actions = {
  async getReviews({ commit, state }, payload) {
    try {
      const params = {
        params: {
          size: PER_PAGE,
        },
      }

      if (state.reviews.page >= 1) {
        params.params.index = PER_PAGE * (state.reviews.page - 1)
      }
      const slug = encodeURI(payload.company)
      const reviews = await this.$axios.$get(
        `/public/company/${slug}/review/`,
        params
      )
      if (state.reviews.page === 1) {
        commit(SET_REVIEWS, reviews)
      }
      if (state.reviews.page > 1) {
        commit(PUSH_REVIEWS, reviews.data)
      }
      if (payload.first === false) {
        if (state.reviews.total > PER_PAGE * state.reviews.page) {
          payload.infinite.loaded()
        } else {
          payload.infinite.complete()
        }
      }

      commit(INCREMENT_PAGE_REVIEWS)
    } catch (error) {}
  },
  async getReview({ commit, state }, payload) {
    try {
      const review = await this.$axios.$get(
        `/public/company_review/${payload}/`
      )
      commit(SET_REVIEW, review)
    } catch (error) {}
  },
  reset({ commit }) {
    commit('RESET')
  },
}

export const mutations = {
  [SET_REVIEW](state, payload) {
    state.review = payload.data
  },
  [SET_REVIEWS](state, payload) {
    state.reviews.data = payload.data
    state.reviews.total = payload.total
  },
  [PUSH_REVIEWS](state, payload) {
    state.reviews.data.push(...payload)
  },
  [INCREMENT_PAGE_REVIEWS](state) {
    state.reviews.page++
  },
  [RESET](state) {
    state.reviews = {
      data: [],
      page: 1,
      total: 0,
    }
  },
}
