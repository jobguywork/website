<template>
  <div v-loading="loading" class="form-comment">
    <ElForm
      v-if="$isLogin"
      ref="form"
      :model="form"
      :rules="rules"
      class="p-20"
    >
      <ElFormItem prop="body">
        <ElInput
          v-model="form.body"
          :rows="4"
          class="comment"
          type="textarea"
          placeholder="دیدگاه شما..."
          maxlength="500"
          show-word-limit
        />
      </ElFormItem>

      <div class="submit">
        <ElButton size="small" type="success" @click="handleSubmit">
          ارسال
        </ElButton>
      </div>
    </ElForm>
    <div v-else class="login-text text-center layout-v layout-center-center">
      <p>لطفا برای ارسال دیدگاه وارد سایت شوید.</p>
      <ElButton class="mt-10" size="mini" type="success" @click="handleLogin">
        ورود به سایت
      </ElButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {},
      rules: {
        body: [
          { required: true, message: 'متن نظر اجباری است.', trigger: 'blur' },
          {
            min: 3,
            max: 500,
            message: 'متن نظر حداقل 3 الی 500 کاراکتر می باشد.',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('add-comment', this.form)
          this.form.body = null
        }
      })
    },
    handleLogin() {
      this.$store.commit('theme/TOGGLE_DIALOG')
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  ::v-deep {
    .el-textarea__inner {
      resize: none;
    }
    .el-input__count {
      left: 7px;
      right: auto;
      line-height: 15px;
    }
  }
}
.login-text {
  padding-top: 30px;
  p {
    margin-bottom: 20px;
  }
}
</style>
