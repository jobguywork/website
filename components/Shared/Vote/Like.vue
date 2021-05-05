<template>
  <div class="like layout-h layout-center">
    <span class="count ml-5">{{ count }}</span>
    <i
      v-if="status === 'UP'"
      class="fa fa-thumbs-up fa-lg active"
      @click="handleClick"
    ></i>
    <i v-else class="fa fa-thumbs-o-up fa-lg" @click="handleClick"></i>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (!this.$isLogin) {
        this.$store.commit('theme/TOGGLE_DIALOG')
      } else {
        this.$emit('click')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.like .count {
  font-size: 11px;
  position: relative;
  top: 2px;
}
.like {
  color: green;
}
</style>
