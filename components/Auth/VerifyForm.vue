<template>
  <div v-loading="loading" class="register-form">
    <ElForm
      v-if="step === 1"
      ref="formOTP"
      :model="formOTP"
      @submit.native.prevent="onSendCode"
    >
      <ElFormItem
        prop="mobile"
        :rules="[
          {
            pattern: '^[0][9][0-9][0-9]{8,8}$',
            trigger: ['blur'],
            message: 'موبایل صحیح وارد نمایید.',
          },
          { required: true, message: 'موبایل اجباری است.', trigger: 'blur' },
        ]"
      >
        <ElInput
          v-model="formOTP.mobile"
          type="tel"
          placeholder="موبایل (0912100200300)"
          class="ltr-input"
        />
      </ElFormItem>

      <ElButton
        class="full-width"
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        ارسال کد
      </ElButton>
    </ElForm>

    <ElForm
      v-if="step === 2"
      ref="formRegister"
      :model="formRegister"
      @submit.native.prevent="onRegister"
    >
      <ElFormItem
        prop="code"
        :rules="[
          {
            required: true,
            message: 'کد تایید اجباری است.',
            trigger: ['blur'],
          },
        ]"
      >
        <ElInput
          v-model="formRegister.code"
          type="tel"
          placeholder="کد تایید"
          class="ltr-input"
        />
      </ElFormItem>
      <ElFormItem
        prop="password"
        :rules="[
          {
            required: true,
            message: 'کلمه عبور جدید اجباری است.',
            trigger: ['blur', 'change'],
          },
          {
            pattern: /^(?=.*\d).{8,}$/,
            message: 'کلمه عبور باید شامل حرف و عدد باشد.',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <ElInput
          v-model="formRegister.password"
          type="password"
          placeholder="کلمه عبور جدید"
          class="ltr-input"
        />
      </ElFormItem>

      <ElButton
        class="full-width"
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        ذخیره و تایید
      </ElButton>
    </ElForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      formOTP: {},
      formRegister: {},
      loading: false,
    }
  },
  mounted() {
    const mobile = this.$cookies.get('mobile')
    if (mobile) {
      this.step = 2
      this.formOTP.mobile = mobile
    }
  },
  methods: {
    async onSendCode() {
      const valid = await this.$refs.formOTP.validate()
      if (valid) {
        try {
          this.loading = true

          await this.$axios.post('/authnz/set_mobile/', {
            mobile: this.formOTP.mobile.substring(1),
          })
          this.$cookies.set('mobile', this.formOTP.mobile, {
            path: '/',
            maxAge: 60 * 10, // 10 minutes
          })
          this.step = 2
          this.$message.success({
            message: 'کد تایید ارسال شد.',
          })
        } catch ({ response }) {
          this.$message.error({
            message: response.data.message,
          })
        } finally {
          this.loading = false
        }
      }
    },
    async onRegister() {
      const valid = await this.$refs.formRegister.validate()
      if (valid) {
        try {
          this.loading = true
          const payload = {
            mobile: this.formOTP.mobile.substring(1),
            ...this.formRegister,
          }
          const { data } = await this.$axios.post(
            '/authnz/login_mobile_code/',
            payload
          )

          this.step = 1
          this.$cookies.remove('mobile')

          this.$cookies.set('token', data.data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
          })
          this.$cookies.set('user', data.data.user, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
          })

          if (data.data.token) {
            this.$axios.setToken(data.data.token, 'JWT')
          }
          this.$store.dispatch('user/setToken')

          this.$message.success({
            message: 'خوش آمدید.',
          })
          this.$router.push('/')
          this.loading = false
        } catch ({ response }) {
          this.$message.error({
            message: response.data.message,
          })
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
