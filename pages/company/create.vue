<template>
  <div class="container rtl">
    <div class="create-company">
      <FormCompany v-model="form" v-loading="loading" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import FormCompany from '@/components/Company/Create/FormCompany'

export default {
  components: {
    FormCompany,
  },
  data() {
    return {
      form: {
        industry: '',
        city: '',
      },
      loading: false,
    }
  },
  head() {
    return {
      ...this.$seo({
        title: 'ثبت شرکت',
      }),
      bodyAttrs: {
        class: 'page-create-company',
      },
    }
  },
  methods: {
    async onSubmit(form) {
      try {
        const payload = {
          ...form,
          industry: { industry_slug: form.industry },
          city: { city_slug: form.city },
        }
        this.loading = true
        await this.$axios.post('/company/insert/user/', payload)
        this.$notify({
          message: 'درخواست شما با موفقیت ارسال شد.',
          type: 'success',
        })

        this.$router.push('/')
      } catch (error) {
        let message = 'Company with this name exists.'
        if (message === error.response.data.message) {
          message = 'این شرکت با این نام وجود دارد.'
        }
        this.$notify({
          message,
          type: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-company {
  min-height: 900px;
  margin-top: 160px;
  ::v-deep {
    @media (max-width: 740px) {
      .el-row {
        display: inline-block;
      }
    }
  }
}
</style>
