<template>
  <div class="auth-form">
    <ElTabs stretch>
      <ElTabPane label="ورود">
        <LoginForm />
      </ElTabPane>

      <ElTabPane label="ثبت‌نام">
        <RegisterForm />
      </ElTabPane>
    </ElTabs>

    <SocialAuth />
  </div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import SocialAuth from './SocialAuth'

export default {
  components: {
    RegisterForm,
    LoginForm,
    SocialAuth,
  },
}
</script>

<style lang="scss" scoped></style>
