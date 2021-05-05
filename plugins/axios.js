import errorHandler from '@/utils/errorHandler'
import { Raven } from 'vue-raven'

export default function (context) {
  context.$axios.setHeader('Content-Type', 'application/json')

  const token = context.$cookies.get('token')
  if (token) {
    context.$axios.setToken(token, 'JWT')
  }

  context.$axios.onError(async (error) => {
    Raven.captureException(error)
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      await context.store.dispatch('auth/logout')
      context.redirect('/')
    }

    if (code === 404) {
      context.redirect('/404')
    }

    errorHandler(error.response.data)

    throw error.response
  })
}
