<template>
  <section class="last-reviews">
    <div class="container">
      <!-- companies -->
      <div class="companies">
        <Review
          v-for="item in reviews"
          :key="item.id"
          :type="type"
          :data="item"
        />
      </div>
      <!-- /companies -->
    </div>
  </section>
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
      default() {
        return []
      },
      required: true,
    },
    type: {
      type: String,
      default: 'review',
    },
  },
}
</script>

<style lang="scss" scoped>
.last-reviews {
  padding-top: 25px;

  .companies {
    background-color: #fff;
    overflow: hidden;
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  }
}
</style>
