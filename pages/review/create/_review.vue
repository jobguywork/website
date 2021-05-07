<template>
  <el-row type="flex" justify="center" align="middle" class="review layout-v">
    <el-col :xs="23" :sm="23" :md="23" :lg="13" :xl="12">
      <ReviewForm
        v-model="form"
        v-loading="loading"
        :loading="loading"
        @submit="onSubmit"
      />
    </el-col>
  </el-row>
</template>

<script>
import ReviewForm from '@/components/Company/Reviews/ReviewForm/ReviewForm'
import { mapState } from 'vuex'
import moment from 'moment-jalaali'
import lscache from 'lscache'

export default {
  components: {
    ReviewForm,
  },
  async asyncData({ params, store, redirect }) {
    if (params.review) {
      await store.dispatch('company/company/getCompany', params.review)
    } else {
      redirect('/404')
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
        hiddenJob: false,
        contractType: null,
        salaryAmount: null,
        salaryPeriod: 'MONTH',
        start_date: null,
        start_date_max: moment().format('jYYYY/jMM/jDD'),
        end_date: null,
        current_work: false,
        terms: false,
      },
      loading: false,
      companySlug: params.review,
    }
  },
  head() {
    return {
      ...this.$seo({
        title: `اشتراک تجربه کاری در ${this.company.name}`,
      }),
      bodyAttrs: {
        class: 'company-questions-page',
      },
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
  },
  mounted() {
    const formReview = lscache.get('formReview')
    if (formReview) {
      this.form = { ...this.form, ...formReview }
    }
  },
  methods: {
    async onSubmit() {
      const payload = {
        ...this.form,
        company: {
          company_slug: this.company.company_slug,
        },
        job: {
          name: this.form.skill,
        },
        anonymous_job: this.form.hiddenJob,
        pros: this.form.pros.map((item) => {
          return { name: item }
        }),
        cons: this.form.cons.map((item) => {
          return { name: item }
        }),
        state: this.form.contractType,
        salary_benefit: this.form.benefits,
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
        this.loading = true
        if (payload.start_date === 'Invalid date') {
          delete payload.start_date
        }
        if (payload.end_date === 'Invalid date') {
          delete payload.end_date
        }
        await this.$axios.$post('/company_review/create/', payload)

        this.$notify({
          message: 'تجربه شما به زودی بررسی و تایید می شود.',
          type: 'success',
        })
        this.$router.push('/profile/reviews')
        lscache.remove('formReview')
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
.review {
  margin-top: 170px;
  margin-bottom: 60px;
}
</style>
