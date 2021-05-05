<template>
  <div class="dislike">
    <span class="count ml-5">{{ count }}</span>
    <i
      v-if="status === 'DOWN'"
      class="fa fa-thumbs-down fa-lg active"
      @click="handleClick"
    ></i>
    <i v-else class="fa fa-thumbs-o-down fa-lg" @click="handleClick"></i>
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
.dislike .count {
  font-size: 11px;
  position: relative;
}
.dislike {
  color: red;
}
</style>
