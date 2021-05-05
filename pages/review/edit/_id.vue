<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    class="company-questions-wrap layout-v"
  >
    <el-col :xs="23" :sm="23" :md="23" :lg="13" :xl="12">
      <ReviewForm v-model="form" v-loading="loading" @submit="onSubmit" />
    </el-col>
  </el-row>
</template>

<script>
import ReviewForm from '@/components/Company/Reviews/ReviewForm/ReviewForm'
import { mapState } from 'vuex'
import moment from 'moment-jalaali'
import { DOMAIN_TITLE } from '@/config/app.js'

export default {
  components: {
    ReviewForm,
  },
  async asyncData({ params, store, redirect }) {
    if (params.id) {
      await store.dispatch('company/review/getReview', params.id)
      const companySlug = store.state.company.review.review.company.company_slug
      await store.dispatch('company/company/getCompany', companySlug)
    }
    return {
      form: {
        recommend_to_friend: null,
        work_life_balance: null,
        benefits: null,
        security: null,
        management: null,
        culture: null,
        title: null,
        description: null,
        pros: [],
        cons: [],
        skill: '',
        hiddenJob: true,
        contractType: null,
        salaryAmount: null,
        salaryPeriod: null,
        start_date: null,
        start_date_max: moment().format('jYYYY/jMM/jDD'),
        end_date: null,
        current_work: false,
      },
      loading: false,
      companySlug: store.state.company.review.review.company.company_slug,
      reviewId: params.id,
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
        content: `ویرایش تجربه کاری: ${this.review.title}`,
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ]
    return {
      bodyAttrs: {
        class: 'company-questions-page',
      },
      title: `ویرایش تجربه کاری: ${this.review.title}`,
      meta,
    }
  },
  computed: {
    ...mapState('company/review', ['review']),
    ...mapState('company/company', ['company']),
  },
  mounted() {
    this.form = {
      ...this.review,
    }

    this.form.benefits = this.review.salary_benefit

    this.form.pros = this.review.pros.map((item) => {
      return item.name
    })
    this.form.cons = this.review.cons.map((item) => {
      return item.name
    })
    this.form.skill = this.review.job.name
    this.form.hiddenJob = this.review.anonymous_job
    this.form.contractType = this.review.state
    this.form.salaryAmount = this.review.salary
    this.form.salaryPeriod = this.review.salary_type
    this.form.start_date = moment(this.review.start_date).format(
      'jYYYY/jMM/jDD'
    )
    this.form.start_date_max = moment().format('jYYYY/jMM/jDD')
    this.form.end_date = moment(this.review.end_date).format('jYYYY/jMM/jDD')
    this.form.terms = true
  },
  methods: {
    async onSubmit() {
      const payload = {
        company: {
          company_slug: this.company.company_slug,
        },
        job: {
          name: this.form.skill,
        },
        anonymous_job: this.form.hiddenJob,
        recommend_to_friend: this.form.recommend_to_friend,
        pros: this.form.pros.map((item) => {
          return { name: item }
        }),
        cons: this.form.cons.map((item) => {
          return { name: item }
        }),
        state: this.form.contractType,
        work_life_balance: this.form.work_life_balance,
        salary_benefit: this.form.benefits,
        security: this.form.security,
        management: this.form.management,
        culture: this.form.culture,
        title: this.form.title,
        description: this.form.description,
        salary: this.form.salaryAmount,
        salary_type: this.form.salaryPeriod,
        start_date: moment(this.form.start_date, 'jYYYY/jMM/jDD').format(
          'YYYY-MM-DD'
        ),
        end_date: moment(this.form.end_date, 'jYYYY/jMM/jDD').format(
          'YYYY-MM-DD'
        ),
      }
      try {
        if (payload.start_date === 'Invalid date') {
          delete payload.start_date
        }
        if (payload.end_date === 'Invalid date') {
          delete payload.end_date
        }
        this.loading = true
        await this.$axios.$put(
          `/company_review/${this.reviewId}/update/`,
          payload
        )

        this.$notify({
          message: 'بروزرسانی با موفقیت انجام شد.',
          type: 'success',
        })
        this.$router.push('/profile/reviews')
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
.company-questions-wrap {
  margin-top: 170px;
  margin-bottom: 60px;
}
</style>
