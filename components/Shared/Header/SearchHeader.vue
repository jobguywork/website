<template>
  <el-autocomplete
    v-model="companyName"
    :trigger-on-focus="false"
    :fetch-suggestions="querySearchCompanyAsync"
    class="full-width rtl"
    suffix-icon="el-icon-search"
    placeholder="نام شرکت"
    autocomplete="off"
    @select="handleSelectCompany"
    @keyup.native.enter="submitForm"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true,
    },
  },
  computed: {
    companyName: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    querySearchCompanyAsync: debounce(async function (queryString, cb) {
      try {
        const params = new URLSearchParams()
        if (queryString) {
          params.append('name', queryString)
        }
        const results = await this.$axios.$get('/public/company/name_list/', {
          params,
        })
        cb(
          results.data.map((item) => {
            return {
              value: item.name,
              slug: item.company_slug,
            }
          })
        )
      } catch (error) {}
    }, 200),
    async handleSelectCompany(item) {
      if (this.$store.state.theme.visibleMenuMobile) {
        this.$store.commit('theme/TOGGLE_MENU_MOBILE')
      }
      await this.$store.dispatch('company/company/resetAll')
      this.company = item
      this.$router.push(`/company/${item.slug}`)
      this.companyName = null
    },
    submitForm() {
      this.$router.push(`/companies/?company=${this.companyName}`)
      if (this.$store.state.theme.visibleMenuMobile) {
        this.$store.commit('theme/TOGGLE_MENU_MOBILE')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
