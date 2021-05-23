<template>
  <div class="reviews">
    <div class="container">
      <div class="reviews__title">آخرین‌ تجربه‌ها</div>
      <div class="reviews__list mt-40">
        <Review
          v-for="item in reviews"
          :key="item.id"
          :type="item.type"
          :data="item"
        />
      </div>
      <div class="reviews__footer layout-h layout-center-center mt-40">
        <ElButton type="primary" size="small" @click="$emit('more')">
          بارگذاری بیشتر
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script>
import Review from './Review'

export default {
  components: {
    Review,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.reviews {
  background: rgba(232, 232, 232, 0.4);
  margin-top: 60px;
  padding: 60px 0;
  &__title {
    font-size: 18px;
    color: #333;
  }
  &__list {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    border-radius: 4px;
    ::v-deep {
      a:first-child {
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
      }
      a:last-child {
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }
    }
  }
}
</style>
