<template>
  <el-card :body-style="{ padding: '0' }" class="rtl mt-30">
    <div class="layout-v review-item-details">
      <!-- header -->
      <ReviewHeader :review="review" :single="single" />
      <!-- /header -->
      <!-- wrap-content -->
      <ReviewContent :details="details" :review="review" />
      <!-- /wrap-content -->
      <!-- footer -->
      <ReviewFooter :review="review" :details="details" />
      <!-- /footer -->
    </div>
  </el-card>
</template>

<script>
import ReviewHeader from './ReviewHeader'
import ReviewContent from './ReviewContent/ReviewContent'
import ReviewFooter from './ReviewFooter'

export default {
  components: {
    ReviewHeader,
    ReviewContent,
    ReviewFooter,
  },
  props: {
    review: {
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
