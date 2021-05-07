<template>
  <el-dialog :visible.sync="dialogVisible" title="ورود / ثبت‌نام" width="320px">
    <div class="dialog-content pb-10">
      <AuthForm class="mt-20" />
    </div>
  </el-dialog>
</template>

<script>
import AuthForm from '@/components/Auth/AuthForm'
export default {
  components: {
    AuthForm,
  },
  computed: {
    dialogVisible: {
      get() {
        return this.$store.state.theme.visibleDialogLogin
      },
      set() {
        this.$store.commit('theme/TOGGLE_DIALOG')
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-content {
  .title {
    span {
      font-weight: 400;
    }
  }
}
</style>
