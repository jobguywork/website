// import timeago from 'timeago.js'
import { MEDIA_URL } from '@/config/app'
import Num2persian from '@/plugins/Num2persian'
import { slug } from '@/utils/slug'
import { stripHTML } from '@/utils/stripHtml'
import isNumber from 'lodash/isNumber'
import toNumber from 'lodash/toNumber'
import momentJalaali from 'moment-jalaali'
import { substr } from 'stringz'

export const general = {
  methods: {
    mediaUrl(patch, width = false, height = false) {
      if (patch) {
        if (width && height) {
          return `${MEDIA_URL}/${width}x${height}` + patch
        } else {
          return `${MEDIA_URL}` + patch
        }
      } else {
        return `/images/cover-default.png`
      }
    },
    teamSizeString(size) {
      switch (size) {
        case 'VS':
          return '1-10 نفر'
        case 'S':
          return '11-50 نفر'
        case 'M':
          return '51-200 نفر'
        case 'L':
          return '201-500 نفر'
        case 'VL':
          return '501-1000 نفر'
        case 'UL':
          return 'بیش از 1000 نفر'
      }
    },
    contractTypeString(type) {
      switch (type) {
        case 'FULL':
          return 'تمام وقت'
        case 'PART':
          return 'پاره وقت'
        case 'CONTRACT':
          return 'پروژه ای'
        case 'INTERN':
          return 'کارآموزی'
        case 'FREELANCE':
          return 'Freelance'
        case 'REMOTE':
          return 'Remote'
      }
    },
    cutString(str, limitString) {
      const text = typeof str === 'string' ? stripHTML(str) : ''
      return str ? substr(text, 0, limitString) : ''
    },
    convertNum2persian(number) {
      number = toNumber(number)
      if (isNumber(number)) {
        return Num2persian(number)
      }
    },
    titleToSlug(title) {
      return slug(title)
    },
    gregorianToJalali(date, formatInput, formatOutput) {
      return momentJalaali(date, formatInput).format(formatOutput)
    },
    interviewStatusString(status) {
      switch (status) {
        case 'WORKING':
          return 'پذیرفته شدم اما خودم رد کردم'
        case 'ACCEPT':
          return 'پذیرفته شدم و قبول کردم'
        case 'REJECT':
          return 'پذیرفته نشدم'
        case 'NORESPONSE':
          return 'هنوز جواب ندادن'
      }
    },
    responseTimeString(time) {
      switch (time) {
        case '1WEEK':
          return 'کمتر از یک هفته'
        case '2WEEK':
          return 'کمتر از دو هفته'
        case '1MONTH':
          return 'کمتر از یک ماه'
        case 'MORE':
          return 'بیشتر از یک ماه'
      }
    },
    applyMethodString(method) {
      switch (method) {
        case 'CO_STAFF':
          return 'کارمندان شرکت'
        case 'CO_SITE':
          return 'سايت خود شرکت'
        case 'JOB_SITE':
          return 'سايت‌های کاريابی'
        case 'EMAIL':
          return 'ایمیل'
        case 'FRIEND':
          return 'دوستان و آشنايان'
        case 'LINKEDIN':
          return 'لینکدین'
        case 'FESTIVAL':
          return 'نمايشگاه'
        case 'EVENT':
          return 'رویدار و همايش'
        case 'OTHER':
          return 'سایر'
      }
    },
    covertNewLineToParagraph: (text) => {
      return text ? text.replace(/\n/g, '<br />') : ''
    },
  },
}
