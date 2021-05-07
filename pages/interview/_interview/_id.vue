<template>
  <div v-if="company" class="wrap">
    <Cover :company="company" single />
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
            {{ interview.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /breadcrumb -->

      <!-- interview-details -->
      <ElRow type="flex" justify="center" align="middle">
        <ElCol :span="24">
          <Interview :interview="interview" details single />
        </ElCol>
      </ElRow>
      <!-- /review-details -->

      <ElRow class="mt-20 mb-30">
        <ElCol :span="24">
          <Reply :data="interview" type-reply="interview" single />
        </ElCol>
      </ElRow>

      <ElRow class="mt-20 mb-30">
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
import Interview from '@/components/Company/Interview/Interview/Interview'
import Cover from '@/components/Company/Cover.vue'
import Comments from '@/components/Comments/Comments'
import Reply from '@/components/Shared/Reply'

export default {
  components: {
    Interview,
    Cover,
    Comments,
    Reply,
  },
  async asyncData({ $axios, params, store, redirect }) {
    if (params.interview) {
      const ID = params.interview
      const { data } = await $axios.get(
        `/public/interview/${ID}/comment_list/`,
        {
          params: {
            size: 30,
          },
        }
      )
      await store.dispatch('company/interview/getInterview', params.interview)
      const companySlug =
        store.state.company.interview.interview.company.company_slug
      await store.dispatch('company/company/getCompany', companySlug)
      return {
        interviewId: params.interview,
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
        title: `تجربه مصاحبه در شرکت ${this.company.name}: ${this.interview.title}`,
        description: this.cutString(this.company.description, 180),
      }),
      bodyAttrs: {
        class: 'page-review-details',
      },
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
    ...mapState('company/interview', ['interview']),
  },
  methods: {
    async handleAddComment(form) {
      try {
        this.loading = true
        const ID = this.$route.params.interview
        const { data } = await this.$axios.post('/interview_comment/create/', {
          ...form,
          interview: { id: ID },
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

<style lang="scss">
.page-review-details {
  .breadcrumb {
    direction: rtl;
    @media (max-width: 720px) {
      padding-right: 10px;
      .el-breadcrumb__item[aria-current='page'] {
        display: none;
      }
      .el-breadcrumb {
        .el-breadcrumb__item {
          font-size: 13px;
          span {
            font-weight: 400;
          }
        }
        .el-breadcrumb__item:nth-child(3) i {
          display: none;
        }
      }
    }
  }
  .wrap {
    margin-top: 122px;
  }
  .wrap-review-details {
    margin-top: 0;
    margin-bottom: 30px;
  }
  .review-item {
    .pros-cons {
      margin-top: 20px;
      .items {
        margin-top: 10px;
      }
    }
  }
}

::v-deep {
}
</style>

<style lang="scss">
.comments-wrapper {
  .el-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
