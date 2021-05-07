<template>
  <div
    v-loading.fullscreen.lock="$fetchState.pending"
    class="companies-container rtl layout-v"
  >
    <!-- sidebar -->
    <Sidebar
      v-model="filters"
      :loading="$fetchState.pending"
      @submit="onFilters"
    />
    <!-- /sidebar -->

    <div class="companies rtl mt-20">
      <!-- sort -->
      <Sort
        v-model="order_by"
        :total="total"
        @sort="onFilters"
        @dispaly="onDisplay"
      />
      <!-- /sort -->
      <!-- listings -->

      <div
        v-if="companies.length > 0"
        v-infinite-scroll="$fetch"
        infinite-scroll-disabled="disabled"
        :class="display"
        class="listings layout-h layout-wrap layout-justified mt-35"
      >
        <Company
          v-for="(company, index) in companies"
          :key="index"
          :company="company"
        />
      </div>

      <div v-else class="empty layout-h layout-center-center">
        <div class="full-width layout-h layout-center-center">
          <div class="layout-v text-center layout-center-center">
            <img class="mt-50" src="/images/empty-2.svg" alt="empty" />
            <p class="mt-30">شرکت مورد نظر شما پیدا نشد.</p>
            <p>
              برای ثبت شرکت
              <nuxt-link to="/company/create"> اینجا </nuxt-link> کلیک کنید.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- /listings -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { PER_PAGE } from '@/config/app.js'
import Company from '@/components/Companies/Company'
import Sort from '@/components/Companies/Sort'
import Sidebar from '@/components/Companies/Sidebar'

export default {
  components: {
    Company,
    Sort,
    Sidebar,
  },
  data() {
    return {
      companies: [],
      page: 1,
      perPage: PER_PAGE,
      total: 0,
      infiniteId: +new Date(),
      order_by: 'HOTTEST',
      filters: {
        name: '',
        city: '',
        industry: '',
        skill: null,
        benefits: [],
        deleted: false,
      },
      display: 'grid',
    }
  },

  async fetch() {
    try {
      const payload = {
        ...this.filters,
        order_by: this.order_by,
        index: this.page === 1 ? 0 : (this.page - 1) * this.perPage,
        size: this.perPage,
      }
      const res = await this.$axios.$get('/public/company/list/', {
        params: payload,
      })
      this.page++
      this.total = res.total
      this.companies.push(...res.data)
    } catch (error) {}
  },
  head() {
    return {
      ...this.$seo({
        title: 'شرکت ها',
      }),
      bodyAttrs: {
        class: 'companies-page',
      },
    }
  },
  computed: {
    ...mapState('theme', ['visibleSearchMobile']),
    noMore() {
      return this.page === 1 ? 0 : (this.page - 1) * this.perPage >= this.total
    },
    disabled() {
      return this.$fetchState.pending || this.noMore
    },
  },
  created() {
    const payload = {
      ...this.filters,
      ...this.$route.query,
    }
    this.filters = payload
  },

  methods: {
    onFilters() {
      this.total = 0
      this.page = 1
      this.companies = []
      this.$fetch()
    },
    onDisplay(display) {
      this.display = display
    },
  },
}
</script>

<style lang="scss" scoped>
.companies-container {
  height: calc(100vh - 62px);
  margin-top: 62px;
  overflow-y: scroll;
}
.companies {
  width: calc(100% - 340px);
  margin-right: 340px;
  padding-left: 20px;
  @media (max-width: 740px) {
    margin-right: 0;
    padding: 0 10px;
    width: 100%;
  }
  .sort {
    width: 100%;
    background-color: #f2f2f2;
    border-radius: 4px;
    padding: 15px 25px;
    position: relative;
    line-height: 28px;
    height: 59px;
    align-items: center;
    color: #666;
    .display {
      i {
        padding: 5px;
        cursor: pointer;
      }
      i.active {
        background: $--color-primary;
        border-radius: 3px;
        color: #fff;
      }
    }
    @media (max-width: 420px) {
      padding: 0 7px;
      .wrap-sort {
        width: 170px;
      }
    }
  }
  @media (max-width: 320px) {
    padding: 10px;
  }
}
.listings {
  width: 100%;
}
.listings.list {
  .company {
    width: 100%;
    margin-right: 0;
  }
}
</style>

<style lang="scss">
.companies-page {
  overflow: hidden;
  #footer {
    display: none;
  }
}
</style>
