import { Notification } from 'element-ui'

const errorHandler = (errors) => {
  if (errors.message && typeof errors.message === 'object') {
    for (const [key, value] of Object.entries(errors.message)) {
      Notification({
        type: 'error',
        title: 'خطا!',
        message: `${key}: ${value}`,
        duration: 8000,
      })
    }
  } else {
    Notification({
      type: 'error',
      title: 'خطا!',
      message: errors.message,
      duration: 8000,
    })
  }
}

export default errorHandler
