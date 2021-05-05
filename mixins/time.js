import moment from 'moment-jalaali'
import momentTZ from 'moment-timezone'
import fa from 'moment/locale/fa'

moment.updateLocale('fa', fa)
moment.loadPersian()

const DEFAULT_FORMAT = 'jYYYY/jM/jD - H:m'

export default {
  filters: {
    timeAgo(time) {
      const data = momentTZ(time)
        .locale('fa')
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .fromNow()

      return data
    },
    dateFormat(time, format = DEFAULT_FORMAT) {
      const data = moment.unix(time).format(format)

      return data
    },
  },
}
