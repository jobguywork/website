import Donators from '@/components/Home/Donators/Donators';
<template>
  <ElRow type="flex" justify="center" align="middle" class="layout-v">
    <ElCol :span="24">
      <ElCard class="mb-50 rtl" :body-style="{ padding: '10px' }">
        <div class="title my-10 pr-5">فرم ثبت دونیت</div>
        <div class="layout-v layout-center-center">
          <div class="content form rtl py-5">
            <ElForm
              v-if="!isFinished"
              ref="form"
              :model="form"
              label-position="top"
              :rules="rules"
              @submit.native.prevent="onSubmit"
            >
              <ElFormItem
                prop="name"
                label="نام و نام خانودادگی یا نام شرکت (نام مستعار)"
              >
                <ElInput
                  v-model="form.name"
                  placeholder="نام و نام خانودادگی یا نام شرکت (نام مستعار)"
                />
              </ElFormItem>
              <ElFormItem prop="coin" label="انتخاب سکه">
                <ElSelect
                  v-model="form.coin"
                  placeholder="انتخاب سکه"
                  class="full-width"
                  filterable
                >
                  <ElOption
                    v-for="wallet of wallets"
                    :key="wallet.coin"
                    :label="wallet.coin"
                    :value="wallet.coin"
                  >
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      {{ wallet.coin }}
                    </span>
                    <span style="float: left">
                      <img
                        :src="`/images/coins/${wallet.coin}.png`"
                        width="16"
                        height="16"
                      />
                    </span>
                  </ElOption>
                </ElSelect>
              </ElFormItem>
              <ElFormItem prop="amount" label="تعداد" class="ltr-input">
                <ElInput
                  v-model="form.amount"
                  type="number"
                  placeholder="تعداد"
                  step="any"
                />
              </ElFormItem>

              <ElFormItem
                prop="link"
                label="لینک تراکنش/آی‌دی تراکنش"
                class="ltr-input"
              >
                <ElInput
                  v-model="form.link"
                  placeholder="لینک تراکنش/آی‌دی تراکنش"
                />
              </ElFormItem>

              <ElButton native-type="submit" type="primary" :loading="loading">
                ثبت
              </ElButton>
            </ElForm>

            <ElAlert
              v-else
              title="از حمایت شما ممنونیم ❤"
              type="success"
              description="تراکنش شما در اسرع وقت بررسی و در صفحه حمایت کنندگان نمایش داده خواهد شد."
              @close="isFinished = false"
            />
          </div>
        </div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<script>
export default {
  props: {
    wallets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 3,
            message: 'حداقل طول نام 3 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            max: 50,
            message: 'حداکثر طول نام 50 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        coin: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        amount: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        link: [
          {
            max: 500,
            message: 'حداکثر طول این فیلد 500 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
      },
      donator: {
        amount: 10,
        coin: 'USDT',
        created: '2021-04-28 11:55',
        link: 'https://google.com',
        name: 'mamad',
      },
      output: null,
      loading: false,
      isFinished: false,
    }
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
      try {
        this.loading = true
        await this.$axios.$post('/donate/', this.form)
        this.isFinished = true
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 17px;
  font-weight: bold;
}

.form {
  max-width: 450px;
  width: 100%;
}
</style>
