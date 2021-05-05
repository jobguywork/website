import { PER_PAGE } from '@/config/app'

const TOGELE_DIALOG_QUESTION = 'TOGELE_DIALOG_QUESTION'
const TOGELE_DIALOG_REPLY = 'TOGELE_DIALOG_REPLY'
const SET_QUESTION_REPLY = 'SET_TITLE_REPLY'
const SET_QUESTIONS = 'SET_QUESTIONS'
const PUSH_QUESTIONS = 'PUSH_QUESTIONS'
const INCREMENT_PAGE_QUESTIONS = 'INCREMENT_PAGE_QUESTIONS'
const RESET_QUESTIONS = 'RESET_QUESTIONS'
const INCREMENT_ANSWERS = 'INCREMENT_ANSWERS'

export const state = () => ({
  questions: {
    data: [],
    page: 1,
    total: 0,
    infiniteId: +new Date(),
  },
  dialog: {
    question: false,
    reply: false,
    questionReply: {
      title: '',
    },
    questionIndex: null,
  },
})

export const actions = {
  async getQuestions({ commit, state }, payload) {
    try {
      const params = {
        params: {
          size: PER_PAGE,
        },
      }
      if (state.questions.page >= 1) {
        params.params.index = PER_PAGE * (state.questions.page - 1)
      }
      const slug = encodeURI(payload.company)
      const questions = await this.$axios.$get(
        `/public/company/${slug}/questions/`,
        params
      )
      if (state.questions.page === 1) {
        commit(SET_QUESTIONS, questions)
      }
      if (state.questions.page !== 1) {
        commit(PUSH_QUESTIONS, questions.data)
      }
      if (payload.first === false) {
        if (state.questions.total > PER_PAGE * state.questions.page) {
          payload.infinite.loaded()
        } else {
          payload.infinite.complete()
        }
      }

      commit(INCREMENT_PAGE_QUESTIONS)
    } catch (error) {}
  },
  togeleDialogQuestion({ commit }, payload) {
    commit(TOGELE_DIALOG_QUESTION)
  },
  togeleDialogReply({ commit }, payload) {
    commit(TOGELE_DIALOG_REPLY)
  },
  setQuestionReply({ commit }, payload) {
    commit(SET_QUESTION_REPLY, payload)
  },
  resetQuestions({ commit }) {
    commit(RESET_QUESTIONS)
  },
  incrementAnswers({ commit }) {
    commit(INCREMENT_ANSWERS)
  },
}

export const mutations = {
  [TOGELE_DIALOG_QUESTION](state) {
    state.dialog.question = !state.dialog.question
  },
  [TOGELE_DIALOG_REPLY](state) {
    state.dialog.reply = !state.dialog.reply
  },
  [SET_QUESTION_REPLY](state, payload) {
    state.dialog.questionReply = payload.question
    state.dialog.questionIndex = payload.index
  },
  [SET_QUESTIONS](state, payload) {
    state.questions.data = payload.data
    state.questions.total = payload.total
  },
  [PUSH_QUESTIONS](state, payload) {
    state.questions.data.push(...payload)
  },
  [INCREMENT_PAGE_QUESTIONS](state) {
    state.questions.page++
  },
  [RESET_QUESTIONS](state) {
    state.dialog = {
      question: false,
      reply: false,
      questionReply: {
        title: '',
      },
    }
    state.questions = {
      data: [],
      page: 0,
      total: 0,
    }
  },
  [INCREMENT_ANSWERS](state) {
    state.questions.data[state.dialog.questionIndex].answer_count++
  },
}
