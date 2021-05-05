<template>
  <el-card :body-style="{ padding: '0' }" class="rtl mt-30">
    <div class="layout-v interview-item-details">
      <!-- header -->
      <InterviewHeader :interview="interview" :single="single" />
      <!-- /header -->
      <!-- wrap-contetn -->
      <InterviewContent :details="details" :interview="interview" />
      <!-- /wrap-contetn -->
      <!-- footer -->
      <InterviewFooter :details="details" :interview="interview" />
      <!-- /footer -->
    </div>
  </el-card>
</template>

<script>
import InterviewHeader from './InterviewHeader'
import InterviewContent from './InterviewContent/InterviewContent'
import InterviewFooter from './InterviewFooter'

export default {
  components: {
    InterviewHeader,
    InterviewContent,
    InterviewFooter,
  },
  props: {
    interview: {
      type: Object,
      default: null,
      required: true,
    },
    details: {
      type: Boolean,
      default: false,
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
