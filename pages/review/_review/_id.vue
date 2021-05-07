<template>
  <div v-if="company" class="wrap">
    <Cover :company="company" />
    <div class="container">
      <!-- breadcrumb -->
      <div class="breadcrumb mt-30">
        <el-breadcrumb separator-class="el-icon-arrow-left">
          <el-breadcrumb-item :to="{ path: '/' }"> خانه </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/companies' }">
            شرکت ها
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="`/company/${company.company_slug}`">
            {{ company.name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ review.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /breadcrumb -->

      <!-- review-details -->
      <ElRow type="flex" justify="center" align="middle">
        <ElCol :span="24">
          <Review :review="review" details single />
        </ElCol>
      </ElRow>
      <!-- /review-details -->

      <ElRow class="mt-20 mb-30" type="flex" justify="center" align="middle">
        <ElCol :span="24">
          <Reply :data="review" type-reply="review" />
        </ElCol>
      </ElRow>

      <ElRow class="mt-20 mb-30" type="flex" justify="center" align="middle">
        <ElCol :span="24">
          <Comments
            :comments="comments"
            :loading="loading"
            @add-comment="handleAddComment"
          />
        </ElCol>
      </ElRow>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Review from '@/components/Company/Reviews/Review/Review'
import Cover from '@/components/Company/Cover.vue'
import Comments from '@/components/Comments/Comments'
import Reply from '@/components/Shared/Reply'

export default {
  components: {
    Review,
    Cover,
    Comments,
    Reply,
  },
  async asyncData({ $axios, params, store, redirect }) {
    if (params.review) {
      const ID = params.review
      await store.dispatch('company/review/getReview', params.review)
      const companySlug = store.state.company.review.review.company.company_slug
      await store.dispatch('company/company/getCompany', companySlug)

      const { data } = await $axios.get(
        `/public/company_review/${ID}/comment_list/`,
        {
          params: {
            size: 30,
          },
        }
      )

      return {
        reviewId: params.review,
        comments: data.data || [],
      }
    } else {
      redirect('/404')
    }
  },
  data() {
    return {
      loading: false,
    }
  },

  head() {
    return {
      ...this.$seo({
        title: `تجربه کاری در شرکت ${this.company.name}: ${this.review.title}`,
        description: this.cutString(this.review.description, 180),
      }),
      bodyAttrs: {
        class: `page-review-details company-${this.company.company_slug}`,
      },
    }
  },
  computed: {
    ...mapState('company/review', ['review']),
    ...mapState('company/company', ['company']),
  },

  methods: {
    async handleAddComment(form) {
      try {
        this.loading = true
        const ID = this.$route.params.review
        const { data } = await this.$axios.post('/review_comment/create/', {
          ...form,
          review: { id: ID },
        })
        this.comments.unshift(data.data)
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
