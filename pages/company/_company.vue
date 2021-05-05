<template>
  <div class="wrap">
    <!-- cover -->
    <Cover :company="company" />
    <!-- /cover -->
    <!-- tab -->
    <section class="tab">
      <div class="container">
        <el-tabs v-model="currentTab" type="card">
          <!-- Reviews -->
          <el-tab-pane name="review">
            <span slot="label">
              <i class="fa fa-comments" />
              <span class="label">
                <span class="text">تجربه کاری</span>
                <span class="count">({{ company.total_companyview }})</span>
              </span>
            </span>
            <Reviews />
          </el-tab-pane>
          <!-- /Reviews -->

          <!-- Interview -->
          <el-tab-pane name="interview">
            <span slot="label">
              <i class="fa fa-coffee"></i>
              <span class="label">
                <span class="text">تجربه مصاحبه</span>
                <span class="count">({{ company.total_interview }})</span>
              </span>
            </span>
            <Interviews />
          </el-tab-pane>
          <!-- /Interview -->

          <!-- ASK -->
          <el-tab-pane name="questions">
            <span slot="label">
              <i class="fa fa-question" />
              <span class="label">
                <span class="text">پرسش پاسخ</span>
                <span class="count">({{ questions.total }})</span>
              </span>
            </span>
            <Questions :questions="questions" />
          </el-tab-pane>
          <!-- /ASK -->
          <!-- salaries -->
          <el-tab-pane v-if="company.salary_avg > 0" lazy>
            <span slot="label">
              <i class="fa fa-credit-card" />
              <span class="label"> حقوق </span>
            </span>
            <div class="content-tab rtl">
              <Salary />
            </div>
          </el-tab-pane>
          <!-- /salaries -->
          <!-- gallery -->
          <el-tab-pane v-if="company.gallery.length > 0" name="gallery" lazy>
            <span slot="label">
              <i class="fa fa-camera-retro" />
              <span class="label">
                <span class="text">تصاویر</span>
                <span class="count">({{ company.gallery.length }})</span>
              </span>
            </span>
            <Gallery :images="imagesMap" />
          </el-tab-pane>
          <!-- /gallery -->
          <!-- About -->
          <el-tab-pane name="about">
            <span slot="label">
              <i class="fa fa-home" />
              <span class="label"> معرفی </span>
            </span>
            <About :about="company.description" :benefits="company.benefit" />
          </el-tab-pane>
          <!-- /About -->
        </el-tabs>
      </div>
    </section>
    <!-- /tab -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cover from '@/components/Company/Cover.vue'
import Reviews from '@/components/Company/Reviews/Reviews.vue'
import Interviews from '@/components/Company/Interview/Interviews.vue'
import Questions from '@/components/Company/Questions/Questions.vue'
import Gallery from '@/components/Company/Gallery.vue'
import About from '@/components/Company/About.vue'
import Salary from '@/components/Company/Salary/Salary.vue'
import { DOMAIN_TITLE, BASE_URL } from '@/config/app.js'

export default {
  components: {
    Cover,
    Reviews,
    Questions,
    Gallery,
    About,
    Interviews,
    Salary,
  },
  data() {
    return {
      currentTab: 'review',
    }
  },
  async fetch({ store, params, query, redirect }) {
    if (params.company) {
      await store.dispatch('company/company/resetAll')
      await store.dispatch('company/company/getCompany', params.company)
      await store.dispatch('company/review/getReviews', {
        company: params.company,
        first: true,
      })
      await store.dispatch('company/interview/getInterviews', {
        company: params.company,
        first: true,
      })
      await store.dispatch('company/question/getQuestions', {
        company: params.company,
        first: true,
      })
    } else {
      redirect('/404')
    }
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
        content: `شرکت ${this.company.name} - ${this.company.name_en}`,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.cutString(this.company.description, 180),
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'company',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${BASE_URL}/company/${this.company.company_slug}`,
      },
      {
        hid: 'description',
        name: 'description',
        content: this.cutString(this.company.description, 180),
      },
    ]
    if (this.company.gallery.length > 0) {
      this.company.gallery.forEach((element) => {
        meta.push({
          property: 'og:image',
          content: this.mediaUrl(element.path),
        })
      })
    } else {
      meta.push({
        property: 'og:image',
        content: this.mediaUrl(this.company.logo),
      })
    }
    return {
      bodyAttrs: {
        class: `company-page company-${this.company.company_slug}`,
      },
      title: `تجربه کاری در شرکت ${this.company.name} - ${this.company.name_en}`,
      meta,
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
    ...mapState('company/interview', ['interviews']),
    ...mapState('company/review', ['reviews']),
    ...mapState('company/question', ['questions']),
    imagesMap() {
      return this.company.gallery.map((item) => {
        return {
          id: item.id,
          href: this.mediaUrl(item.path),
          description: item.description,
        }
      })
    },
  },
  watch: {
    currentTab(newValue, oldValue) {
      if (process.client) {
        this.$router.push({ query: { tab: newValue } })
        localStorage.setItem('currentTab', newValue)
      }
    },
  },

  mounted() {
    const tabActive = this.$route.query?.tab
    if (tabActive) {
      this.currentTab = tabActive
    } else {
      this.currentTab = localStorage.getItem('currentTab') || 'review'
    }
  },
  methods: {
    addReview() {
      this.$router.push('/company-questions')
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-tabs {
    margin-top: -40px;
    @media (max-width: 740px) {
      margin-top: -50px;
    }
    @media (max-width: 740px) {
      .el-tabs__content {
        min-height: calc(100vh - 553px);
      }

      .el-tabs__nav {
        float: none;
        .label {
          display: none;
        }
      }
    }
  }
  .el-tabs__nav {
    background: #fbfbfb;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    direction: rtl;
    float: right;
    .el-tabs__item {
      padding: 0 16px;
      font-weight: 400;
    }
  }
  .wrap {
    margin-top: 122px;
    position: relative;
    @media (max-width: 768px) {
      margin-top: 122px;
    }

    .tab {
      margin-top: -41px;
      position: relative;
      padding-bottom: 60px;
      .content-tab {
        padding: 10px 0 20px 0;
        font-size: 14px;
        line-height: 30px;
        text-align: justify;
        .help {
          font-size: 12px;
          color: gray;
        }
        .title {
          @media (max-width: 740px) {
            display: none;
          }
          .label {
            font-size: 16px;
            font-weight: 600;
            font-size: 12px;
          }
        }
        .ask {
          .see-answers {
            cursor: pointer;
          }
        }
        .benefits {
          .title {
            font-weight: 400;
          }
          ul {
            padding-right: 10px;
            display: flex;
            flex-wrap: wrap;
            li {
              list-style: none;
              width: 50%;
              i {
                color: #bbc0c4;
              }
              .text {
                font-size: 13px;
              }
            }
          }
        }
      }
      @media (max-width: 740px) {
        .content-tab {
          .about,
          .help,
          .title {
            padding: 0 10px;
            .layout-h {
              width: 70%;
            }
            .label {
              font-size: 13px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .benefits {
            padding: 10px;
            ul {
              padding-right: 10px;
              display: flex;
              flex-wrap: wrap;
              li {
                width: 50%;
              }
            }
          }
        }
      }
    }
    .ask-text {
      font-weight: 400;
    }
  }
}
</style>
