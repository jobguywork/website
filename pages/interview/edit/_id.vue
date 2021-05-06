<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    class="interview layout-v"
  >
    <el-col :xs="23" :sm="23" :md="23" :lg="21" :xl="15">
      <InterviewForm v-model="form" v-loading="loading" @submit="onSubmit" />
    </el-col>
  </el-row>
</template>

<script>
import moment from 'moment-jalaali'
import { mapState } from 'vuex'
import { DOMAIN_TITLE } from '@/config/app.js'
import InterviewForm from '@/components/Company/Interview/InterviewForm/InterviewForm'

export default {
  components: {
    InterviewForm,
  },
  async asyncData({ params, store, redirect }) {
    if (params.id) {
      await store.dispatch('company/interview/getInterview', params.id)
      const companySlug =
        store.state.company.interview.interview.company.company_slug
      await store.dispatch('company/company/getCompany', companySlug)
    }
    return {
      form: {
        title: null,
        description: null,
        pros: [],
        cons: [],
        job: '',
      },
      loading: false,
      companySlug: store.state.company.interview.interview.company.company_slug,
      interviewId: params.id,
    }
  },
  head() {
    let meta = []
    meta = [
      {
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        property: 'og:title',
        content: `اشتراک مصاحبه کاری در ${this.company.name} - ${DOMAIN_TITLE}`,
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ]
    return {
      bodyAttrs: {
        class: 'company-interview-page',
      },
      title: `اشتراک مصاحبه کاری در ${this.company.name} - ${DOMAIN_TITLE}`,
      meta,
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
    ...mapState('company/interview', ['interview']),
  },
  mounted() {
    this.form = {
      ...this.interview,
    }

    this.form.pros = this.interview.pros.map((item) => {
      return item.name
    })
    this.form.cons = this.interview.cons.map((item) => {
      return item.name
    })
    this.form.job = this.interview.job.name
    this.form.interview_date = moment(this.interview.interview_date).format(
      'jYYYY/jMM/jDD'
    )

    this.form.terms = true
  },
  methods: {
    async onSubmit() {
      const payload = {
        ...this.form,
        company: {
          company_slug: this.company.company_slug,
        },
        job: {
          name: this.form.job,
        },
        pros: this.form.pros.map((item) => {
          return { name: item }
        }),
        cons: this.form.cons.map((item) => {
          return { name: item }
        }),
        interview_date: moment(
          this.form.interview_date,
          'jYYYY/jMM/jDD'
        ).format('YYYY-MM-DD'),
      }
      try {
        this.loading = true
        await this.$axios.$put(
          `/interview/${this.interviewId}/update/`,
          payload
        )

        this.$cookies.remove('formInterview')
        this.$notify({
          message: 'مصاحبه شما با موفقیت ویرایش شد.',
          type: 'success',
        })
        this.$router.push('/profile/interviews')
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
    helpToman(value) {
      return this.convertNum2persian(value) + ' تومان در ماه'
    },
  },
}
</script>

<style lang="scss" scoped>
.interview {
  margin-top: 170px;
  margin-bottom: 60px;
}
</style>
