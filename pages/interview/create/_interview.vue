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
import lscache from 'lscache'

export default {
  components: {
    InterviewForm,
  },

  async asyncData({ params, store, redirect }) {
    if (params.interview) {
      await store.dispatch('company/company/getCompany', params.interview)
    } else {
      redirect('/404')
    }
    return {
      form: {
        title: null,
        interviewer_rate: null,
        total_rate: null,
        description: null,
        pros: [],
        cons: [],
        job: '',
        terms: false,
      },
      loading: false,
      companySlug: params.interview,
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
  },
  mounted() {
    const formInterview = lscache.get('formInterview')
    if (formInterview) {
      this.form = { ...this.form, ...formInterview }
    }
  },
  methods: {
    async onSubmit(form) {
      const payload = {
        ...form,
        company: {
          company_slug: this.company.company_slug,
        },
        job: {
          name: form.job,
        },
        pros: form.pros.map((item) => {
          return { name: item }
        }),
        cons: form.cons.map((item) => {
          return { name: item }
        }),
        interview_date: moment(form.interview_date, 'jYYYY/jMM/jDD').format(
          'YYYY-MM-DD'
        ),
      }
      try {
        this.loading = true
        await this.$axios.$post('/interview/create/', payload)
        this.$notify({
          message: 'تجربه شما به زودی بررسی و تایید می شود.',
          type: 'success',
        })

        this.$router.push('/profile/interviews')
        lscache.remove('formInterview')
      } catch (error) {
      } finally {
        this.loading = false
      }
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
