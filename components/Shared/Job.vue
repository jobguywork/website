<template>
  <el-autocomplete
    v-model="job"
    :fetch-suggestions="querySearchJobAsync"
    placeholder="انتخاب شغل"
  />
</template>

<script>
import debounce from 'lodash/debounce'
import lscache from 'lscache'

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      job: '',
      loading: false,
      jobs: [],
      firstLoad: false,
    }
  },
  watch: {
    job(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    },
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.job = newValue
      }
    },
  },
  async mounted() {
    let jobs = lscache.get('jobs')
    this.job = this.value
    if (!jobs) {
      await this.getList()
    } else {
      jobs = JSON.parse(jobs)
      this.jobs = jobs
    }
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/job/list/', {
          params: {
            name__icontains: this.job || '',
          },
        })
        this.firstLoad = true

        this.jobs = res.data.data.map((item) => {
          return {
            value: item.name,
            slug: item.name,
          }
        })
        if (!this.job) {
          lscache.set('jobs', JSON.stringify(this.jobs), 60 * 24)
        }

        return this.jobs
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    querySearchJobAsync: debounce(async function (queryString, cb) {
      try {
        if (queryString.length > 0) {
          await this.getList()
        }
        cb(this.jobs)
      } catch (error) {}
    }, 200),
  },
}
</script>
