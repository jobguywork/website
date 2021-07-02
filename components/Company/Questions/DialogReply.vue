<template>
  <!-- reply -->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
    <div class="content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="120px"
      >
        <el-form-item label="جواب..." prop="answer">
          <el-input v-model="form.answer" :rows="6" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">
        صرف نظر
      </el-button>
      <el-button
        :loading="loading"
        size="mini"
        type="primary"
        @click="onSubmit"
      >
        ارسال جواب
      </el-button>
    </span>
  </el-dialog>
  <!-- reply -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {},
      rules: {
        answer: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: 'blur',
          },
          {
            min: 10,
            max: 5000,
            message: 'طول جواب باید حداقل 10 الی 5000 کاراکتر باشد.',
            trigger: ['change', 'blur'],
          },
        ],
      },
      loading: false,
    }
  },
  computed: {
    ...mapState('company/company', ['company']),
    dialogVisible: {
      get() {
        return this.$store.state.company.question.dialog.reply
      },
      set() {
        this.$store.dispatch('company/question/toggleDialogReply')
      },
    },
    ...mapState('company/company', ['company']),
    ...mapState('company/question', ['dialog']),
    title() {
      return `جواب دادن به سوال: ${this.dialog.questionReply.title}`
    },
  },
  methods: {
    async onSubmit() {
      const valid = await this.$refs.form.validate()
      if (!this.$isLogin) return this.$store.commit('theme/TOGGLE_DIALOG')
      if (!valid) return false

      try {
        const payload = {
          question: {
            question_slug: this.dialog.questionReply.question_slug,
          },
          body: this.form.answer,
        }
        this.loading = true
        await this.$axios.$post('/answer/create/', payload)
        this.$notify({
          message: 'جواب شما به زودی بررسی و تایید می شود.',
          type: 'success',
        })
        this.form = {}
        this.$store.dispatch('company/question/incrementAnswers')
        this.$store.dispatch('company/question/toggleDialogReply')
        await this.$store.dispatch('company/question/resetQuestions')
        await this.$store.dispatch('company/question/getQuestions', {
          company: this.company.company_slug,
          first: true,
        })
      } catch (error) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>
