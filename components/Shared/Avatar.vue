<template>
  <span :style="style" class="avatar">
    <img :src="src" :alt="alt" :width="size" :height="size" />
  </span>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: null,
      required: true,
    },
    alt: {
      type: String,
      default: null,
      required: true,
    },
    size: {
      type: Number,
      default: 34,
    },
  },
  computed: {
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  background: #ebebeb;
  display: inline-block;
  border: 3px solid #fff;
  box-shadow: 0 0 3px rgba(18, 92, 249, 0.22);
  border-radius: 100%;
  img {
    width: 100%;
    height: auto;
    border-radius: 100%;
  }
}
</style>
