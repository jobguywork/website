<template>
  <el-autocomplete
    v-model="city"
    :fetch-suggestions="querySearchCityAsync"
    class="full-width"
    suffix-icon="el-icon-location"
    placeholder="نام شهر"
    aria-label="جستجو در نام شهر"
    :loading="loading"
    size="small"
  />
</template>

<script>
import debounce from 'lodash/debounce'
import lscache from 'lscache'

export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true,
    },
  },
  data() {
    return {
      city: '',
      loading: false,
      cities: [],
      firstLoad: false,
    }
  },
  watch: {
    city(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    },
  },
  async mounted() {
    const cities = lscache.get('cities')
    this.city = this.value
    if (!cities) {
      await this.getList()
    } else {
      this.cities = cities
    }
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/city/list/', {
          params: {
            name: this.city || '',
          },
        })
        this.firstLoad = true

        this.cities = res.data.data.map((item) => {
          return {
            value: item.name,
            slug: item.name,
          }
        })
        if (!this.city) {
          lscache.set('cities', this.cities, 60 * 24)
        }

        return this.cities
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    querySearchCityAsync: debounce(async function (queryString, cb) {
      try {
        await this.getList()
        cb(this.cities)
      } catch (error) {}
    }, 200),
  },
}
</script>
