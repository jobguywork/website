<template>
  <el-card v-if="company" :body-style="{ padding: 0 }">
    <!-- Top -->
    <div class="top p-20 rtl layout-h">
      <div class="logo ml-15">
        <img :src="mediaUrl(company.logo)" :alt="company.name" />
      </div>
      <div class="title layout-v mt-5">
        <strong>
          لطفا به سوالات زیر در مورد <span>{{ company.name }}</span> پاسخ دهید.
        </strong>
        <p>این اطلاعات 100% ناشناس می باشد.</p>
      </div>
    </div>
    <!-- Top -->

    <!-- questions -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      class="questions layout-v"
    >
      <div class="item p-20 rtl">
        <div class="ask">امتیاز شما به:</div>
        <div class="answer mt-20 rates">
          <el-form-item prop="interviewer_rate">
            <div class="layout-h layout-center layout-justified rtl">
              <span class="text"> مصاحبه کننده </span>
              <div class="ltr rate">
                <el-rate
                  v-model="form.interviewer_rate"
                  :colors="['#F71735', '#F7BA2A', '#20BF55']"
                  aria-label="امتیاز مصاحبه کننده"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="total_rate">
            <div class="layout-h layout-center layout-justified rtl">
              <span class="text"> شرکت </span>
              <div class="ltr rate">
                <el-rate
                  v-model="form.total_rate"
                  :colors="['#F71735', '#F7BA2A', '#20BF55']"
                  aria-label="امتیاز شرکت"
                />
              </div>
            </div>
          </el-form-item>
        </div>
      </div>
      <div class="item p-20 rtl">
        <div class="ask mb-20">تجربه مصاحبه شما در مورد این شرکت:</div>
        <div class="answer review-input">
          <el-form-item label="عنوان" prop="title">
            <el-input v-model="form.title" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item class="mt-10" label="مصاحبه کاری" prop="description">
            <p class="help-block pr-2">
              چند مرحله مصاحبه داشت و افراد در چه سمت هایی در مصاحبه حضور داشتن؟
            </p>
            <p class="help-block pr-2">
              توی مصاحبه چه سوالاتی پرسیدن و چه مهارتی رو سنجیدن؟
            </p>
            <p class="help-block pr-2">
              برخورد مصاحبه کننده و سایر کارمندان شرکت چجوری بود؟
            </p>
            <p class="help-block pr-2">
              به افرادی که قصد رفتن به مصاحبه این شرکت رو دارن چه توصیه هایی
              داری؟
            </p>
            <client-only>
              <Editor v-model="form.description" />
            </client-only>
            <p class="help-block">
              <i class="fa fa-warning ml-5" />
              با انتخاب قسمی از متن می تونی بهش استایل بدی‌ (Bold, Italic...)
            </p>
            <p style="color: red">
              در ثبت تجربه خود به نکات زیر توجه کنید در غیر این صورت تجربه شما
              بر روی سایت غیرفعال می گردد:
            </p>
            <ul>
              <li>نام بردن از اشخاص</li>
              <li>
                افشای اسرار درون شرکت یا سازمان (نام بردن از مشتریان، پروژه ها
                و...)
              </li>
              <li>
                فحاشی یا به کار بردن کلمات نامناسب در مورد مدیران و سایر
                کارمندان
              </li>
              <li>
                سعی در بزرگنمایی و یا نوشتن موارد غیر واقع ای با هدف انتقام گیری
                از شرکت ها
              </li>
              <li>امکان ویرایش برای تجربه ها تنها تا ۳۰ روز فعال می باشد.</li>
            </ul>
          </el-form-item>
          <el-form-item class="mt-10" prop="pros" label="نکات مثبت">
            <Pros v-model="form.pros" class="full-width" />
          </el-form-item>
          <el-form-item class="mt-10" prop="cons" label="نکات منفی">
            <Cons v-model="form.cons" class="full-width" />
            <p class="help-block">
              <i class="fa fa-warning ml-5" />
              <span>
                نکات خود را از لیست بالا انتخاب کن اگر در لیست موجود نبود نکته
                خود را تایپ کرده و سپس آن را از لیست انتخاب کن.
              </span>
            </p>
          </el-form-item>
        </div>
      </div>
      <div class="item p-20 rtl">
        <div class="ask mb-20">درباره خودتان به ما بگویید:</div>
        <div class="answer tell-me">
          <div class="layout-h">
            <div class="col">
              <el-form-item prop="job" label="برای چه شغلی درخواست دادی؟">
                <Job v-model="form.job" class="full-width" />
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item
                prop="apply_method"
                label="چطوری برای اين شغل درخواست دادی؟"
              >
                <ApplyMethodSelect v-model="form.apply_method" />
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item
                prop="status"
                label="برای شغل مورد نظر پذیرفته شدی؟"
              >
                <StatusSelect v-model="form.status" />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="item salary p-20 rtl pb-10">
        <div class="ask mb-20">حقوق:</div>
        <div class="answer tell-me">
          <div class="layout-h">
            <div class="col rtl">
              <el-form-item
                label="حقوق پيشنهادی ماهانه شما چقدر بود؟"
                prop="asked_salary"
              >
                <el-popover
                  :content="helpToman(form.asked_salary)"
                  placement="top-end"
                  width="320"
                  trigger="focus"
                >
                  <el-input
                    slot="reference"
                    v-model="form.asked_salary"
                    type="number"
                    placeholder="برای مثال 5000000"
                  />
                </el-popover>
              </el-form-item>
            </div>
            <div class="col rtl">
              <el-form-item
                label="حقوق پیشنهادی ماهانه شرکت"
                prop="offered_salary"
              >
                <el-popover
                  :content="helpToman(form.offered_salary)"
                  placement="top-end"
                  width="320"
                  trigger="focus"
                >
                  <el-input
                    slot="reference"
                    v-model="form.offered_salary"
                    type="number"
                    placeholder="برای مثال 5000000"
                  />
                </el-popover>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="item p-20 rtl">
        <div class="ask mb-20">زمان پاسخگویی:</div>
        <div class="answer date">
          <div class="layout-h">
            <div class="col">
              <el-form-item prop="interview_date" label="تاریخ مصاحبه">
                <el-input
                  id="interview_date"
                  v-model="form.interview_date"
                  placeholder="تاریخ مصاحبه"
                  suffix-icon="el-icon-date"
                />
                <client-only>
                  <date-picker
                    v-model="form.interview_date"
                    format="jYYYY/jMM/jDD"
                    display-format="jYYYY/jMM/jDD"
                    color="#0F9D58"
                    element="interview_date"
                    view="year"
                    class="full-width"
                  />
                </client-only>
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item
                prop="response_time_before_review"
                label="از وقتي که رزومه فرستادی تا زمان دعوت به مصاحبه چقدر طول کشيد؟"
              >
                <ResponseTimeSelect
                  v-model="form.response_time_before_review"
                />
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item
                prop="response_time_after_review"
                label="کل فرایند مصاحبه تا نتیجه نهایی چقدر طول کشید؟"
              >
                <ResponseTimeSelect v-model="form.response_time_after_review" />
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="item terms p-20 rtl">
        <el-checkbox v-model="form.terms">
          در صورتی که تجربتون همراستا با
          <a href="/terms" target="_blank">قوانین</a> جاب گای باشه، منتشر خواهد
          شد.
        </el-checkbox>
      </div>
    </el-form>
    <!-- /questions -->

    <!-- footer -->
    <div class="footer p-20">
      <el-button size="small" type="primary" @click="onSubmit"> ثبت </el-button>
    </div>
    <!-- /footer -->
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import Job from '@/components/Shared/Job'
import Pros from '@/components/Shared/Pros'
import Cons from '@/components/Shared/Cons'
import Editor from '@/components/Shared/Editor'
import ApplyMethodSelect from '@/components/Shared/ApplyMethodSelect'
import StatusSelect from '@/components/Shared/StatusSelect'
import ResponseTimeSelect from '@/components/Shared/ResponseTimeSelect'
import lscache from 'lscache'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export default {
  components: {
    Job,
    Pros,
    Cons,
    Editor,
    ApplyMethodSelect,
    StatusSelect,
    ResponseTimeSelect,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        interviewer_rate: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        total_rate: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        title: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            max: 100,
            message: 'حداکثر طول عنوان 100 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 10,
            message: 'حداقل طول عنوان 10 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        description: [
          {
            max: 4000,
            message: 'حداکثر طول متن بررسی 4000 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 50,
            message: 'حداقل طول متن بررسی 50 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        apply_method: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        job: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        status: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        asked_salary: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        offered_salary: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        interview_date: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        response_time_before_review: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        response_time_after_review: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
    form: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    form: {
      deep: true,
      handler(newValue) {
        lscache.set('formInterview', pickBy(newValue, identity))
      },
    },
  },
  methods: {
    helpToman(value) {
      return this.converNum2persian(value) + ' تومان در ماه'
    },
    async onSubmit() {
      if (
        this.form.interviewer_rate === null ||
        this.form.interviewer_rate <= 0
      ) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به مصاحبه کننده دهید.',
        })
      }
      if (this.form.total_rate === null || this.form.total_rate <= 0) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به شرکت دهید.',
        })
      }
      if (this.form.terms === false) {
        return this.$notify.error({
          message: 'لطفا قوانین را تایید کنید.',
        })
      }

      const valid = await this.$refs.form.validate()
      if (valid) {
        if (this.$isLogin) {
          this.$emit('submit', this.form)
        } else {
          this.$store.commit('theme/TOGGLE_DIALOG')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-switch__label--left {
  margin-right: auto;
  margin-left: 10px;
}

.el-switch__label--right {
  margin-left: auto;
  margin-right: 10px;
}
.top {
  .logo {
    width: 100px;
    img {
      width: 100%;
      height: auto;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.01);
      padding: 5px;
      border-radius: 4px;
    }
  }
  @media (max-width: 740px) {
    .logo {
      width: 80px;
      margin-left: 10px;
    }
  }
  .title {
    strong {
      font-size: 16px;
    }
    @media (max-width: 740px) {
      strong {
        font-size: 13px;
      }
    }
    p {
      font-weight: 400;
    }
  }
}
@media (max-width: 740px) {
  .top {
    padding: 8px;
  }
  .salary {
    .col {
      .el-form-item.mr-10 {
        margin-right: 0;
      }
    }
  }
}
.questions {
  .item {
    border-top: 2px solid #f2f2f2;
    padding-bottom: 0;
    .ask {
      font-size: 16px;
      font-weight: 400;
    }
    .rates {
      padding-top: 10px;
      .text {
        font-weight: 400;
      }
    }
    .date,
    .tell-me {
      .layout-h {
        @media (max-width: 420px) {
          flex-direction: column;
        }
      }
      .col {
        width: 50%;
        padding: 0 5px;
        @media (max-width: 420px) {
          width: 100%;
        }
      }
    }
    @media (max-width: 720px) {
      .date {
        .last-col {
          margin-top: 10px;
        }
      }
    }
    .el-switch__label * {
      font-size: 12px;
      font-weight: 400;
    }
  }
  .el-form-item {
    margin-bottom: 20px;
  }
}
.salary {
  padding-bottom: 20px !important;
  .el-form-item {
    margin-bottom: 10px;
  }
}
.help-block {
  font-size: 12px;
  line-height: 24px;
  margin: 2px 0;
}
.terms {
  a {
    border-bottom: 1px solid;
    color: $--color-primary;
  }
}
</style>
