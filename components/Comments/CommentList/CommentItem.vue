<template>
  <div class="comment layout-v p-12">
    <div class="body">
      {{ comment.body }}
      <div class="date">
        {{ comment.created | timeAgo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  border-top: 1px solid #dcdfe6;
  font-size: 17px;
  line-height: 32px;
  .body {
    position: relative;
    padding-bottom: 20px;
    line-height: 28px;
    .date {
      position: absolute;
      left: 0;
      bottom: 4px;
      padding: 0 5px;
      font-size: 11px;
      color: #171717;
      background: #d6d6d6;
      line-height: 20px;
      border-radius: 4px;
    }
  }
}
</style>
