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
        :loading="loadingBtn"
        size="mini"
        type="primary"
        @click="handleSubmit"
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
      form: {
        answer: '',
      },
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
      loadingBtn: false,
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
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.$isLogin) {
            this.loadingBtn = true
            const data = {
              question: {
                question_slug: this.dialog.questionReply.question_slug,
              },
              body: this.form.answer,
            }
            try {
              await this.$axios.$post('/answer/create/', data)
              this.loadingBtn = false
              this.$notify({
                message: 'جواب شما با موفقیت ثبت شد.',
                type: 'success',
              })
              this.$store.dispatch('company/question/incrementAnswers')
              this.$store.dispatch('company/question/toggleDialogReply')
              await this.$store.dispatch('company/question/resetQuestions')
              await this.$store.dispatch('company/question/getQuestions', {
                company: this.company.company_slug,
                first: true,
              })
            } catch (error) {
              this.loadingBtn = false
            }
          } else {
            this.$store.commit('theme/TOGGLE_DIALOG')
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped></style>
