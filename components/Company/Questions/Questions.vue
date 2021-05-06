<template>
  <div class="content-tab rtl">
    <!-- title -->
    <div class="title layout-h layout-justified">
      <div class="layout-h layout-center">
        <i class="fa fa-edit fa-lg ml-10" />
        <div class="label mt-5">پرسش پاسخ</div>
      </div>
      <el-button size="mini" type="primary" @click="handeleQuestion">
        سوال جدید
      </el-button>
    </div>
    <p class="help">اگر سوالی در مورد {{ company.name }} داری بپرس.</p>
    <!-- /title -->
    <div v-if="questions.data.length > 0" class="ask mt-10">
      <ul>
        <Question
          v-for="(question, index) in questions.data"
          :key="index"
          :question="question"
          :index="index"
        />
      </ul>
      <client-only v-if="questions.total > 0">
        <infinite-loading
          :identifier="questions.infiniteId"
          @infinite="infiniteHandler"
        />
      </client-only>
    </div>
    <Empty v-else class="mt-20">
      <p>اولین نفر باش که سوال می پرسی!</p>
      <el-button size="mini" type="primary" @click="handeleQuestion">
        سوال جدید
      </el-button>
    </Empty>
    <!-- dialogs -->
    <DialogQuestion />
    <DialogReply />
    <!-- /dialogs -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Empty from '@/components/Shared/Empty'
import Question from './Question'
import DialogQuestion from './DialogQuestion'
import DialogReply from './DialogReply'
export default {
  components: {
    Question,
    DialogQuestion,
    DialogReply,
    Empty,
  },
  computed: {
    ...mapState('company/company', ['company']),
    ...mapState('company/question', ['questions']),
  },
  methods: {
    handeleQuestion() {
      this.$store.dispatch('company/question/toggleDialogQuestion')
    },
    async infiniteHandler(state) {
      await this.$store.dispatch('company/question/getQuestions', {
        company: this.company.company_slug,
        infinite: state,
        first: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tab {
  @media (max-width: 720px) {
    min-height: 280px;
  }
}
.ask {
  @media (max-width: 720px) {
    padding: 10px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
