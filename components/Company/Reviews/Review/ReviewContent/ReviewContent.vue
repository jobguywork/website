<template>
  <div class="wrap-content">
    <ReviewMeta :review="review" :details="details" />

    <div class="desc mt-40">
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="details" class="description-te" v-html="review.description" />
      <!--eslint-enable-->
      <div v-else class="description-te">
        {{ review.description }}
      </div>
    </div>

    <div v-if="details === false" class="extra-info mt-20">
      <div class="item rtl mt-20">
        <div class="rates-wrap">
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> میانگین کل امتیازات: </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.over_all_rate"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                allow-half
                disabled
                aria-label="امتیاز میانگین کل امتیازات"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="details" class="extra-info mt-20">
      <div class="pros-cons full-width layout-h layout-justified mt-30">
        <div v-if="review.pros.length > 0" class="pros">
          <strong class="title"> نکات مثبت </strong>
          <div class="items">
            <el-tag
              v-for="(item, index) in review.pros"
              :key="index"
              size="medium"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </div>
        <div v-if="review.cons.length > 0" class="cons">
          <strong class="title"> نکات منفی </strong>
          <div class="items">
            <el-tag
              v-for="(item, index) in review.cons"
              :key="index"
              type="danger"
              size="medium"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </div>
      </div>
      <div class="item rtl mt-30">
        <div class="layout-h layout-center layout-justified rtl">
          <div class="title">پیشنهاد به دوست:</div>
          <el-tag v-if="review.recommend_to_friend" type="success">
            {{ review.recommend_to_friend | yesOrNo }}
          </el-tag>
          <el-tag v-else type="danger">
            {{ review.recommend_to_friend | yesOrNo }}
          </el-tag>
        </div>
      </div>
      <div v-if="rates.over_all_rate > 0" class="item rtl mt-20">
        <div class="title">جزئیات امتیاز ها:</div>
        <div class="rates-wrap">
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> میانگین کل امتیازات: </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.over_all_rate"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                allow-half
                disabled
                aria-label="امتیاز میانگین کل امتیازات"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> تعادل کار/زندگی </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.work_life_balance"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز تعادل کار/زندگی"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> حقوق و مزایا </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.salary_benefit"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز حقوق و مزایا"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> امنیت شغلی/پیشرفت </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.security"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز امنیت شغلی/پیشرفت"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> مدیریت </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.management"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز مدیریت"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> فرهنگ کار </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.culture"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز فرهنگ کار"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="review.start_date !== 'نامشخص'" class="item rtl date mt-20">
        <div class="layout-h layout-justified cols">
          <div class="col layout-h layout-justified">
            <strong>تاریخ شروع به فعالیت</strong>
            <span>
              {{
                gregorianToJalali(review.start_date, 'YYYY-MM', 'jMMMM jYYYY')
              }}
            </span>
          </div>
          <div
            v-if="review.end_date !== 'نامشخص'"
            class="col layout-h layout-justified"
          >
            <strong>تاریخ پایان فعالیت</strong>
            <span v-if="review.current_work === false">
              {{ gregorianToJalali(review.end_date, 'YYYY-MM', 'jMMMM jYYYY') }}
            </span>
            <span v-else> در حال همکاری </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewMeta from './ReviewMeta'
export default {
  components: {
    ReviewMeta,
  },
  filters: {
    yesOrNo(value) {
      if (value) return 'بله'
      return 'خیر'
    },
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rates: {
        over_all_rate: 0,
        work_life_balance: 0,
        salary_benefit: 0,
        security: 0,
        management: 0,
        culture: 0,
      },
    }
  },
  mounted() {
    this.rates.over_all_rate = this.review.over_all_rate
    this.rates.work_life_balance = this.review.work_life_balance
    this.rates.salary_benefit = this.review.salary_benefit
    this.rates.security = this.review.security
    this.rates.management = this.review.management
    this.rates.culture = this.review.culture
  },
}
</script>

<style lang="scss" scoped>
.wrap-content {
  padding: 5px 15px 10px 15px;
  line-height: 30px;
  .pros-cons {
    position: relative;
    @media (max-width: 720px) {
      flex-direction: column !important;
    }
    .pros,
    .cons {
      width: 49.5%;
      padding: 0 10px;
      strong.title {
        font-size: 13px !important;
      }
      .items {
        margin-top: 10px;
        .el-tag {
          margin-left: 5px;
          margin-bottom: 8px;
        }
      }
    }
    .pros {
      border-right: 3px solid #00b159;
      @media (max-width: 720px) {
        width: 100%;
      }
    }
    .cons {
      border-right: 3px solid #e51a2d;
      @media (max-width: 720px) {
        width: 100%;
        margin-top: 15px;
      }
    }
  }
  .extra-info {
    .title {
      font-weight: 500;
    }
    .date {
      .col {
        width: 49%;
      }
      .col:first-child {
        margin-left: 1%;
      }
      @media (max-width: 720px) {
        .cols {
          flex-direction: column;
        }
        .col {
          width: 100%;
          margin-left: 0 !important;
          margin-bottom: 5px;
        }
      }
    }
  }
  .desc {
    font-size: 17px;
    line-height: 32px;
  }
}
</style>
