<template>
  <el-select
    v-model="industry"
    filterable
    reserve-keyword
    placeholder="انتخاب دسته شغلی"
    clearable
    size="small"
  >
    <el-option
      v-for="(item, index) in industries"
      :key="index"
      :label="item.name"
      :value="item.industry_slug"
    />
  </el-select>
</template>

<script>
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
      loading: false,
      industries: [],
    }
  },
  computed: {
    industry: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  async mounted() {
    let industries = lscache.get('industries')
    this.industry = this.value
    if (!industries) {
      await this.getList()
    } else {
      industries = JSON.parse(industries)
      this.industries = industries
    }
  },
  methods: {
    remoteMethod(query) {
      this.getList(query)
    },
    async getList(query) {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/industry/list/', {
          params: {
            size: 100,
          },
        })

        this.industries = res.data.data
        if (!this.industry) {
          lscache.set('industries', JSON.stringify(this.industries), 60 * 24)
        }
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
