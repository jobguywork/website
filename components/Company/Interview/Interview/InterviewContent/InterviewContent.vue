<template>
  <div class="wrap-content">
    <InterviewMeta :details="details" :interview="interview" />

    <div class="desc mt-40">
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="details"
        class="description-te"
        v-html="interview.description"
      />
      <!--eslint-enable-->
      <div v-else class="description-te">
        {{ interview.description }}
      </div>
    </div>

    <div v-if="details" class="extra-info mt-20">
      <div class="pros-cons full-width layout-h layout-justified mt-30">
        <div v-if="interview.pros.length > 0" class="pros">
          <strong class="title"> نکات مثبت </strong>
          <div class="items">
            <el-tag
              v-for="(item, index) in interview.pros"
              :key="index"
              size="medium"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </div>
        <div v-if="interview.cons.length > 0" class="cons">
          <strong class="title"> نکات منفی </strong>
          <div class="items">
            <el-tag
              v-for="(item, index) in interview.cons"
              :key="index"
              type="danger"
              size="medium"
            >
              {{ item.name }}
            </el-tag>
          </div>
        </div>
      </div>
      <div
        v-if="rates.interviewer_rate > 0 && rates.total_rate > 0"
        class="item rtl mt-20"
      >
        <div class="title">امتیاز ها:</div>
        <div class="rates-wrap">
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> مصاحبه کننده: </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.interviewer_rate"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                allow-half
                disabled
                aria-label="امتیاز مصاحبه کننده"
              />
            </div>
          </div>
          <div class="layout-h layout-center layout-justified rtl mt-20">
            <span class="text"> شرکت </span>
            <div class="ltr rate">
              <el-rate
                v-model="rates.total_rate"
                :colors="['#F71735', '#F7BA2A', '#20BF55']"
                disabled
                aria-label="امتیاز شرکت"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="item rtl date mt-20">
        <div class="layout-h layout-justified cols">
          <div class="col layout-h layout-justified ml-10">
            <strong>حقوق پيشنهادی شما</strong>
            <ElTag type="success">{{ interview.asked_salary.toLocaleString('ir', {minimumFractionDigits: 2, maximumFractionDigits: 2}).split(".")[0] }}</ElTag>
          </div>
          <div class="col layout-h layout-justified">
            <strong>حقوق پیشنهادی آن‌ها</strong>
            <ElTag type="success">{{ interview.offered_salary.toLocaleString('ir', {minimumFractionDigits: 2, maximumFractionDigits: 2}).split(".")[0] }}</ElTag>
          </div>
        </div>
      </div>
      <div class="item rtl date mt-20">
        <div class="layout-h layout-justified cols">
          <div class="col layout-h layout-justified">
            <strong>تاریخ مصاحبه</strong>
            <el-tag>
              {{
                gregorianToJalali(
                  interview.interview_date,
                  'YYYY-MM',
                  'jMMMM jYYYY'
                )
              }}
            </el-tag>
          </div>
          <div class="col layout-h layout-justified ml-10">
            <strong>زمان دعوت به مصاحبه</strong>
            <el-tag>{{
              responseTimeString(interview.response_time_before_review)
            }}</el-tag>
          </div>
          <div class="col layout-h layout-justified">
            <strong>کل فرايند درخواست تا نتيجه نهايی</strong>
            <el-tag>
              {{ responseTimeString(interview.response_time_after_review) }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InterviewMeta from './InterviewMeta'

export default {
  components: {
    InterviewMeta,
  },
  props: {
    interview: {
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
        interviewer_rate: 0,
        total_rate: 0,
      },
    }
  },
  mounted() {
    this.rates.interviewer_rate = this.interview.interviewer_rate
    this.rates.total_rate = this.interview.total_rate
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
