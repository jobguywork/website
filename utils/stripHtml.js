import { stripHtml } from 'string-strip-html'

export const stripHTML = (html) => {
  return stripHtml(html).result
}
