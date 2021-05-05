<template>
  <ElForm
    ref="form"
    v-loading="loading"
    :model="form"
    @submit.native.prevent="onRegister"
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
        type="email"
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
      ثبت‌نام
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
    async onRegister() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          this.loading = true

          await this.$axios.post('/authnz/register_email/', this.form)

          this.$message.success({
            message: 'لطفا ایمیل خود را چک کنید.',
          })

          this.$store.commit('theme/TOGGLE_DIALOG')
        } catch ({ response }) {
          this.$message.error({
            message: response.data.message,
          })
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
