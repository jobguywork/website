<template>
  <main class="sections">
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
        <ElTabPane aria-label="تب آخرین تجربه ها">
          <span slot="label">
            <i class="fa fa-comments" />
            <span class="label">آخرین تجربه ها</span>
          </span>
          <!-- last-reviews -->
          <LastReviews :reviews="home.last_reviews" title="آخرین تجربه ها" />
          <!-- /last-reviews -->
        </ElTabPane>
        <ElTabPane aria-label="تب آخرین مصاحبه ها">
          <span slot="label">
            <i class="fa fa-coffee" />
            <span class="label">آخرین مصاحبه ها</span>
          </span>
          <!-- discussed-companies -->
          <LastReviews
            :reviews="home.last_interviews"
            title="آخرین مصاحبه ها"
            type="interview"
          />
          <!-- /discussed-companies -->
        </ElTabPane>
      </ElTabs>
    </div>

    <!-- popular-categories -->
    <PopularCategories :categories="home.industries" />
    <!-- /popular-categories -->

    <!-- reviews -->
    <Reviews :reviews="home.quote" />
    <!-- /reviews -->

    <!-- Donators -->
    <Donators :donators="home.donate" />
    <!-- /Donators -->
  </main>
</template>

<script>
import { DOMAIN_TITLE } from '@/config/app.js'
import IntroBanner from '@/components/Home/IntroBanner'
import PopularCategories from '@/components/Home/PopularCategories/PopularCategories'
import Companies from '@/components/Home/Companies/Companies'
import LastReviews from '@/components/Home/LastReviews/LastReviews'
import Donators from '@/components/Home/Donators/Donators'
import Reviews from '@/components/Home/Reviews/Reviews'

export default {
  components: {
    IntroBanner,
    PopularCategories,
    Companies,
    Reviews,
    LastReviews,
    Donators,
  },
  async asyncData({ $axios, store }) {
    try {
      const { data } = await $axios.$get('/public/home/')

      return {
        home: data,
        stats: {
          total_interview: data.total_interview,
          total_review: data.total_review,
          total_user: data.total_user,
          total_company: data.total_company,
        },
      }
    } catch (error) {}
  },
  head() {
    let meta = []
    meta = [
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${DOMAIN_TITLE} - تجربه کاری برای همه`,
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'جستجو و اشتراک دیدگاه ها در رابطه با استخدام، حقوق، تجربه کاری، مزایا و معایب در شرکت های ایرانی',
      },
    ]
    return {
      bodyAttrs: {
        class: 'home-page',
      },
      title: 'تجربه کاری برای همه',
      meta,
    }
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
