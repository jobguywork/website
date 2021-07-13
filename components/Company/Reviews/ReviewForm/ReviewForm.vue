<template>
  <el-card v-if="company" :body-style="{ padding: 0 }">
    <!-- Top -->
    <div class="top p-20 rtl layout-h">
      <div class="logo ml-15">
        <img :src="mediaUrl(company.logo)" :alt="company.name" />
      </div>
      <div class="title layout-v mt-5">
        <strong>
          لطفا به سوالات زیر در مورد <span> {{ company.name }}</span> پاسخ دهید.
        </strong>
        <p>این اطلاعات 100% ناشناس می باشد.</p>
      </div>
    </div>
    <!-- Top -->
    <!-- questions -->
    <div class="questions">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        class="layout-v"
      >
        <div class="item p-20 rtl">
          <el-form-item prop="recommend_to_friend">
            <div class="layout-h friend layout-justified">
              <div class="ask">
                آیا <strong>{{ company.name }}</strong> را به دوستان خود پیشنهاد
                می دهید؟
              </div>
              <div class="answer ltr text-left">
                <el-radio-group v-model="form.recommend_to_friend" size="mini">
                  <el-radio-button label="false"> خیر </el-radio-button>
                  <el-radio-button label="true"> بله </el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="item p-20 rtl">
          <div class="ask">امتیاز شما به این شرکت:</div>
          <div class="answer mt-20 rates">
            <el-form-item prop="work_life_balance">
              <div class="layout-h layout-center layout-justified rtl">
                <span class="text"> تعادل کار/زندگی </span>
                <div class="ltr rate">
                  <el-rate
                    v-model="form.work_life_balance"
                    :colors="['#F71735', '#F7BA2A', '#20BF55']"
                    aria-label="امتیاز تعادل کار/زندگی"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="benefits">
              <div class="layout-h layout-center layout-justified rtl">
                <span class="text"> حقوق و مزایا </span>
                <div class="ltr rate">
                  <el-rate
                    v-model="form.benefits"
                    :colors="['#F71735', '#F7BA2A', '#20BF55']"
                    aria-label="امتیاز حقوق و مزایا"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="security">
              <div class="layout-h layout-center layout-justified rtl">
                <span class="text"> امنیت شغلی/پیشرفت </span>
                <div class="ltr rate">
                  <el-rate
                    v-model="form.security"
                    :colors="['#F71735', '#F7BA2A', '#20BF55']"
                    aria-label="امتیاز امنیت شغلی/پیشرفت"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="management">
              <div class="layout-h layout-center layout-justified rtl">
                <span class="text"> مدیریت </span>
                <div class="ltr rate">
                  <el-rate
                    v-model="form.management"
                    :colors="['#F71735', '#F7BA2A', '#20BF55']"
                    aria-label="امتیاز مدیریت"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="culture">
              <div class="layout-h layout-center layout-justified rtl">
                <span class="text"> فرهنگ کار </span>
                <div class="ltr rate">
                  <el-rate
                    v-model="form.culture"
                    :colors="['#F71735', '#F7BA2A', '#20BF55']"
                    aria-label="امتیاز فرهنگ کار"
                  />
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="item p-20 rtl">
          <div class="ask mb-20">تجربه شما در مورد این شرکت:</div>
          <div class="answer review-input">
            <el-form-item label="عنوان" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
            <div class="help-block">
              <div class="title">راهنما برای نگارش بهتر:</div>
              <ul>
                <li>
                  .از خوبی‌ها و نقاط مثبت کارکردن در این شرکت بگویید و توضیح دهید
                </li>
                <li>
                  اگر بخواهید دوستتان را آگاه کنید که تصمیم بهتری بگیرد، کدام مشکلات قابل توجه این شرکت را گوشزد می‌کنید؟
                </li>
                <li>توصیه‌ای سازنده برای مدیران شرکت بنویسید.</li>
              </ul>
            </div>
            <el-form-item class="mt-10" label="تجربه کاری" prop="description">
              <client-only>
                <Editor v-model="form.description" />
              </client-only>
              <p class="help-block">
                <i class="fa fa-warning ml-5" />
                می‌توانید با انتخاب قسمتی از متن به آن استایل بدهید (Bold, Italic...)
              </p>
              <p style="color: red">
                در ثبت تجربه خود به نکات زیر توجه کنید، در غیر این صورت تجربه شما
                بر روی سایت غیرفعال می‌گردد:
              </p>
              <ul>
                <li>نام بردن از اشخاص</li>
                <li>
                  افشای اسرار درون شرکت یا سازمان (نام بردن از مشتریان، پروژه‌ها
                  و...)
                </li>
                <li>
                  فحاشی یا به کار بردن کلمات نامناسب در مورد مدیران یا سایر
                  کارمندان
                </li>
                <li>
                  سعی در بزرگ‌نمایی یا نوشتن موارد غیر واقعی با هدف انتقام‌گیری از شرکت
                </li>
                <li>امکان ویرایش تجربه تنها تا ۳۰ روز فعال می‌باشد.</li>
              </ul>
              <p style="color: red; font-weight: bold">
                نکته: همه شرکت‌ها، حتی شرکت‌های بزرگ هم نقاط ضعفی دارند، پس به جای
                تخریب شرکت سعی کنید فیدبک سازنده بنویسید.
              </p>
              <p style="color: red; font-weight: bold">
                تجربه‌ای که حاوی فیدبک برای بهبود شرکت نباشد، تایید نخواهد شد.
              </p>
            </el-form-item>
            <el-form-item class="mt-10" prop="pros" label="نکات مثبت">
              <Pros v-model="form.pros" class="full-width" />
            </el-form-item>
            <el-form-item class="mt-10" prop="cons" label="نکات منفی">
              <Cons v-model="form.cons" class="full-width" />
              <p class="help-block">
                <i class="fa fa-warning ml-5" />
                <span
                  >نکات خود را از لیست بالا انتخاب کنید. اگر در لیست موجود نبود
                  نکته را تایپ کرده و سپس آن را از لیست انتخاب کنید.</span
                >
              </p>
            </el-form-item>
          </div>
        </div>
        <div class="item p-20 rtl">
          <div class="ask mb-20">درباره خودتان به ما بگویید:</div>
          <div class="answer tell-me">
            <div class="layout-h">
              <div class="col">
                <el-form-item
                  :label="`شغل شما در ${company.name} چیست؟`"
                  prop="skill"
                >
                  <Job v-model="form.skill" class="full-width" />
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item
                  :label="`نوع قرارداد شما در ${company.name} چیست؟`"
                  prop="contractType"
                >
                  <el-select
                    v-model="form.contractType"
                    class="full-width"
                    placeholder="نوع قرارداد"
                  >
                    <el-option
                      v-for="item in contractTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <p class="help-block">
              <i class="fa fa-warning ml-5" />
              <span
                >شغل خود را از لیست بالا انتخاب کنید و اگر موجود نبود، تایپ کنید.</span
              >
            </p>
            <div class="layout-h mt-10 mb-20">
              <el-radio-group v-model="form.hiddenJob" class="ltr" size="mini">
                <el-radio-button :label="true"> شغل را نمایش نده </el-radio-button>
                <el-radio-button :label="false">
                  شغل را نمایش بده
                </el-radio-button>
              </el-radio-group>
            </div>
            <p class="help-block">
              <i class="fa fa-warning ml-5" />
              <span>شغلی که داشته‌اید را دیگران ببینند؟</span>
            </p>
          </div>
        </div>
        <div class="item salary p-20 rtl pb-10">
          <div class="ask mb-20">حقوق:</div>
          <div class="answer tell-me">
            <p>
              درآمد شما در <strong>{{ company.name }}</strong> چقدر است؟
            </p>
            <div class="layout-h">
              <div class="col">
                <el-form-item prop="salaryPeriod" class="mr-10">
                  <el-select
                    v-model="form.salaryPeriod"
                    class="full-width"
                    placeholder="نحوه محاسبه حقوق"
                  >
                    <el-option
                      v-for="item in salaryPeriodOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="col rtl">
                <el-form-item prop="salaryAmount">
                  <el-popover
                    :content="helpToman()"
                    placement="top-end"
                    width="320"
                    trigger="focus"
                  >
                    <el-input
                      slot="reference"
                      v-model="form.salaryAmount"
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
          <div class="ask mb-20">بازه زمانی همکاری:</div>
          <div class="answer date">
            <div class="layout-h">
              <div class="col">
                <el-input
                  id="date-start-input"
                  v-model="form.start_date"
                  placeholder="تاریخ شروع"
                  suffix-icon="el-icon-date"
                />
                <client-only>
                  <date-picker
                    v-model="form.start_date"
                    :max="form.start_date_max"
                    format="jYYYY/jMM/jDD"
                    display-format="jYYYY/jMM/jDD"
                    color="#0F9D58"
                    element="date-start-input"
                    view="year"
                    class="full-width"
                  />
                </client-only>
              </div>
              <div class="col last-col">
                <div class="layout-v">
                  <div class="item-v">
                    <el-input
                      id="date-end-input"
                      v-model="form.end_date"
                      :disabled="!form.start_date || form.current_work"
                      placeholder="تاریخ پایان"
                      suffix-icon="el-icon-date"
                    />
                    <client-only>
                      <date-picker
                        v-model="form.end_date"
                        :max="form.start_date_max"
                        :disabled="!form.start_date"
                        :min="form.start_date"
                        format="jYYYY/jMM/jDD"
                        display-format="jYYYY/jMM/jDD"
                        color="#0F9D58"
                        element="date-end-input"
                        view="year"
                      />
                    </client-only>
                  </div>
                  <div class="item-v mt-10 mb-15">
                    <el-checkbox v-model="form.current_work">
                      در حال همکاری
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item terms p-20 rtl">
          <el-checkbox v-model="form.terms">
            در صورتی که تجربه شما در راستای <a href="/terms" target="_blank">قوانین جاب گای</a> باشد، منتشر
            خواهد شد.
          </el-checkbox>
        </div>
      </el-form>
    </div>
    <!-- /questions -->
    <div class="footer p-20">
      <el-button size="small" type="primary" @click="onSubmit"> ثبت </el-button>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import Job from '@/components/Shared/Job'
import Pros from '@/components/Shared/Pros'
import Cons from '@/components/Shared/Cons'
import Editor from '@/components/Shared/Editor'
import lscache from 'lscache'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export default {
  components: {
    Job,
    Pros,
    Cons,
    Editor,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      salaryPeriodOptions: [
        {
          value: 'YEAR',
          label: 'سالانه',
        },
        {
          value: 'MONTH',
          label: 'ماهانه',
        },
        {
          value: 'DAY',
          label: 'روزانه',
        },
        {
          value: 'HOUR',
          label: 'ساعتی',
        },
      ],
      contractTypeOptions: [
        {
          value: 'FULL',
          label: 'تمام وقت',
        },
        {
          value: 'PART',
          label: 'پاره وقت',
        },
        {
          value: 'CONTRACT',
          label: 'پروژه ای',
        },
        {
          value: 'INTERN',
          label: 'کارآموزی',
        },
        {
          value: 'FREELANCE',
          label: 'Freelance',
        },
        {
          value: 'REMOTE',
          label: 'Remote',
        },
      ],
      rules: {
        recommend_to_friend: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        work_life_balance: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        benefits: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        security: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        management: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        culture: [
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
            max: 5000,
            message: 'حداکثر طول متن بررسی 5000 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 150,
            message: 'حداقل طول متن بررسی 150 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        skill: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        contractType: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        salaryAmount: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        salaryPeriod: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        terms: [
          {
            required: true,
            message: 'قوانین را تایید کنید.',
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
    'form.current_work'(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === true) {
          this.form.end_date = null
        }
      }
    },
    form: {
      deep: true,
      handler(newValue) {
        lscache.set('formReview', pickBy(newValue, identity))
      },
    },
  },
  methods: {
    helpToman() {
      let period = ''
      switch (this.form.salaryPeriod) {
        case 'YEAR':
          period = 'سال'
          break
        case 'MONTH':
          period = 'ماه'
          break
        case 'DAY':
          period = 'روز'
          break
        case 'HOUR':
          period = 'ساعت'
          break
      }
      return (
        this.convertNum2persian(this.form.salaryAmount) + ' تومان در ' + period
      )
    },
    async onSubmit() {
      if (
        this.form.work_life_balance === null ||
        this.form.work_life_balance <= 0
      ) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به تعادل کار و زندگی دهید.',
        })
      }
      if (this.form.benefits === null || this.form.benefits <= 0) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به حقوق و مزایا دهید.',
        })
      }
      if (this.form.security === null || this.form.security <= 0) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به امنیت شغلی دهید.',
        })
      }
      if (this.form.management === null || this.form.management <= 0) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به مدیریت دهید.',
        })
      }
      if (this.form.culture === null || this.form.culture <= 0) {
        return this.$notify.error({
          message: 'لطفا یک امتیاز به فرهنگ کار دهید.',
        })
      }
      if (this.form.terms === false) {
        return this.$notify.error({
          message: 'لطفا قوانین را تایید کنید.',
        })
      }
      if (this.form.description.length < 150) {
        this.$notify({
          message: 'حداقل طول متن بررسی 150 کاراکتر می باشد.',
          type: 'warning',
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
::v-deep {
  .el-switch__label--left {
    margin-right: auto;
    margin-left: 10px;
  }

  .el-switch__label--right {
    margin-left: auto;
    margin-right: 10px;
  }
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
    ::v-deep {
      .el-switch__label * {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  ::v-deep {
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
.salary {
  padding-bottom: 20px !important;
  ::v-deep {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
.help-block {
  font-size: 12px;
  line-height: 24px;
}
.friend {
  .ask {
    width: 75%;
    font-weight: 300 !important;
    font-size: 14px !important;
  }
  .answer {
    width: 25%;
  }
  @media (max-width: 720px) {
    flex-direction: column;
    .ask,
    .answer {
      width: 100%;
    }
    .answer {
      margin-top: 10px;
      text-align: center;
    }
  }
}
.terms {
  a {
    border-bottom: 1px solid;
    color: $--color-primary;
  }
}
</style>
