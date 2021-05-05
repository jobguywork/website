<template>
  <ElForm
    ref="form"
    v-loading="loading"
    :model="form"
    @submit.native.prevent="onLogin"
  >
    <ElFormItem
      prop="email"
      :rules="[
        {
          type: 'email',
          trigger: ['change', 'blur'],
          message: 'ایمیل صحیح وارد نمایید.',
        },
        { required: true, message: 'ایمیل اجباری است.', trigger: 'blur' },
      ]"
    >
      <ElInput
        v-model="form.email"
        auto-complete="email"
        type="text"
        placeholder="آدرس ایمیل"
        class="ltr-input"
      />
    </ElFormItem>
    <ElFormItem
      prop="password"
      :rules="[
        {
          required: true,
          message: 'کلمه عبور اجباری است.',
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
        v-model="form.password"
        autocomplete="current-password"
        type="password"
        placeholder="کلمه عبور"
        class="ltr-input"
      />
    </ElFormItem>
    <ElButton
      :loading="loading"
      class="full-width"
      native-type="submit"
      type="primary"
    >
      ورود
    </ElButton>
  </ElForm>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      loading: false,
    }
  },
  methods: {
    async onLogin() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          this.loading = true

          const { data } = await this.$axios.post('/authnz/login_email/', {
            ...this.form,
          })

          this.$store.dispatch('auth/setToken', data.data.token)
          this.$store.dispatch('auth/setUser', data.data.user)

          this.$store.commit('theme/TOGGLE_DIALOG')

          this.$message.success({
            message: 'خوش آمدید.',
          })
        } catch (errors) {
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
