<template>
  <!-- new ask -->
  <el-dialog :visible.sync="dialogVisible" title="ثبت سوال جدید" width="30%">
    <div class="content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="120px"
      >
        <el-form-item label="عنوان سوال" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="توضیحات..." prop="description">
          <el-input v-model="form.description" :rows="6" type="textarea" />
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
        ایجاد
      </el-button>
    </span>
  </el-dialog>
  <!-- new ask -->
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
      },
      rules: {
        title: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 100,
            message: 'طول سوال باید حداقل 5 الی 100 کاراکتر باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        description: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 10,
            max: 1000,
            message: 'طول سوال باید حداقل 10 الی 1000 کاراکتر باشد.',
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
        return this.$store.state.company.question.dialog.question
      },
      set() {
        this.$store.dispatch('company/question/toggleDialogQuestion')
      },
    },
  },
  mounted() {
    const formQuestion = this.$cookies.get('formQuestion')
    if (formQuestion) {
      this.form = formQuestion
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.$cookies.set('formQuestion', this.form)
          if (this.$isLogin) {
            this.loadingBtn = true
            const data = {
              company: {
                company_slug: this.company.company_slug,
              },
              title: this.form.title,
              body: this.form.description,
            }
            try {
              await this.$axios.$post('/question/create/', data)

              this.$cookies.remove('formQuestion')
              this.$notify({
                message: 'سوال شما با موفقیت ثبت شد.',
                type: 'success',
              })
              this.$store.dispatch('company/question/toggleDialogQuestion')
              await this.$store.dispatch('company/question/resetQuestions')
              await this.$store.dispatch('company/question/getQuestions', {
                company: this.company.company_slug,
                first: true,
              })
            } catch (error) {
            } finally {
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
