<template>
  <main v-loading.fullscreen.lock="loading" class="sections">
    <!-- intro-banner -->
    <IntroBanner :text-list="home.jobguy_text" :stats="stats" />
    <!-- /intro-banner -->

    <div class="container tabs">
      <ElTabs type="border-card" class="home-tab">
        <ElTabPane aria-label="تب شرکت های برتر">
          <span slot="label">
            <i class="fa fa-emoji-happy"></i>
            <span class="label">شرکت های برتر</span>
          </span>
          <!-- top-companies -->
          <Companies
            :companies="home.company"
            title="شرکت های برتر"
            link="/companies?sort=RATE"
          />
          <!-- /top-companies -->
        </ElTabPane>
        <ElTabPane aria-label="تب شرکت های پربحث">
          <span slot="label">
            <i class="fa fa-emoji-sad"></i>
            <span class="label">شرکت های پربحث</span>
          </span>
          <!-- discussed-companies -->
          <Companies
            :companies="home.discussed_company_list"
            title="شرکت های پربحث"
            link="/companies?sort=HOTTEST"
          />
          <!-- /discussed-companies -->
        </ElTabPane>
      </ElTabs>
    </div>

    <!-- Reviews -->
    <Reviews :reviews="reviews" @more="getReviews" />
    <!-- /Reviews -->

    <!-- Quotes -->
    <Quotes :quotes="home.quote" />
    <!-- /Quotes -->

    <!-- Donators -->
    <Donators :donators="home.donate" />
    <!-- /Donators -->
  </main>
</template>

<script>
import IntroBanner from '@/components/Home/IntroBanner'
import Companies from '@/components/Home/Companies/Companies'
import Donators from '@/components/Home/Donators/Donators'
import Reviews from '@/components/Home/Reviews/Reviews'
import Quotes from '@/components/Home/Quotes/Quotes'

export default {
  components: {
    IntroBanner,
    Companies,
    Reviews,
    Quotes,
    Donators,
  },
  data() {
    return {
      home: {
        jobguy_text: [],
        company: [],
        discussed_company_list: [],
        quote: [],
        donate: {
          THE_LAST: [],
          THE_MOST: [],
        },
      },
      reviews: [],
      stats: {
        total_interview: 0,
        total_review: 0,
        total_user: 0,
        total_company: 0,
      },
      loading: false,
      page: 0,
      perPage: 10,
    }
  },
  async fetch() {
    await this.getReviews()
  },
  head() {
    return {
      ...this.$seo({
        title: 'تجربه کاری برای همه',
      }),
      bodyAttrs: {
        class: 'home-page',
      },
    }
  },
  methods: {
    async getReviews() {
      try {
        this.loading = true
        this.page++

        const payload = {
          params: {
            index: this.page === 1 ? 0 : (this.page - 1) * this.perPage,
            size: this.perPage,
          },
          headers: {
            Accept: 'application/json; version=1.0.1',
          },
        }

        const { data } = await this.$axios.$get('/public/home/', payload)

        this.home = data
        this.stats = {
          total_interview: data.total_interview,
          total_review: data.total_review,
          total_user: data.total_user,
          total_company: data.total_company,
        }

        this.reviews.push(...data.reviews)
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scope>
.home-page {
  .tabs {
    min-height: 1300px;
  }
  .sections {
    .container {
      width: 100%;
      max-width: 1210px;
      margin: auto;
      position: relative;
      z-index: 999;
      direction: rtl;
    }
  }
}
.home-tab {
  margin-top: 60px;
}
.legal-team {
  background: rgba(232, 232, 232, 0.4);
  .title {
    font-size: 18px;
    color: #333;
  }
  p {
    line-height: 28px;
  }
}
</style>
<style lang="scss">
.el-tabs {
  .el-tabs__nav {
    float: right;
  }
  .el-tabs__content {
    padding: 0;
  }
  @media (max-width: 740px) {
    .el-tabs__nav {
      .label {
        display: none;
      }
    }
  }
}
.home-page {
  #header .search {
    display: none;
  }
  #footer {
    margin-top: 0;
  }
}
@media (max-width: 420px) {
  .home-tab .container {
    padding: 0 !important;
  }
}
</style>
