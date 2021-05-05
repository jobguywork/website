<template>
  <div :class="color" class="user-rating py-1 px-4">
    {{ userRatingText }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    rateAvg() {
      return this.data ? this.data.rate_avg.toFixed(2) : 0
    },
    userRatingText() {
      const totalReview = this.data ? this.data.total_review : ''
      return `نویسنده این تجربه، ${totalReview} تجربه با میانگین امتیاز ${this.rateAvg} در جابگای ثبت کرده است.`
    },
    color() {
      let color = 'green'
      if (this.rateAvg < 3) {
        color = 'red'
      } else if (this.rateAvg >= 3 && this.rateAvg < 4) {
        color = 'blue'
      }

      return color
    },
  },
}
</script>

<style lang="scss" scoped>
.user-rating {
  border-radius: 4px;
  width: 100%;
  &.blue {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    color: #595959;
  }
  &.red {
    background-color: #ffe4e4;
    border: 1px solid #ffc0c0;
    color: #cc3a3a;
  }
  &.green {
    background-color: #dbf8e8;
    border: 1px solid #93e9b9;
    color: #0e9c4d;
  }
}
</style>
