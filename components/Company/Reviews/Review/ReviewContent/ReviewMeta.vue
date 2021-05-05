import Reply from '@/components/Shared/Reply';
<template>
  <div class="meta layout-v">
    <div class="top layout-h layout-justified">
      <div class="skill layout-h layout-center">
        <i class="fa fa-briefcase ml-5" />
        <span class="text">
          {{ review.job.name }}
        </span>
      </div>
      <div class="state">
        <span class="text">
          {{ contractTypeString(review.state) }}
        </span>
      </div>
    </div>
    <UserRating v-if="details" :data="review" class="mt-10" />
  </div>
</template>

<script>
import UserRating from '@/components/Shared/UserRating'

export default {
  components: {
    UserRating,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rateAvg() {
      return this.review ? this.review.rate_avg.toFixed(2) : 0
    },
  },
}
</script>

<style lang="scss" scoped>
.meta {
  .left,
  .right {
    width: 50%;
  }
}
</style>
