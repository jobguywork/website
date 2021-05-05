<template>
  <div class="views">
    <span class="count">
      {{ views }}
    </span>
    <i class="fa fa-eye fa-lg" />
  </div>
</template>

<script>
export default {
  props: {
    views: {
      type: Number,
      default: 0,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.views {
  position: relative;
  i {
    color: #000 !important;
    cursor: default;
    transition: all 200ms linear;
  }
  .count {
    font-size: 13px;
    user-select: none;
    margin-left: 7px;
  }
}
</style>
