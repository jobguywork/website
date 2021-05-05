<template>
  <div class="comments layout-v">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
  components: {
    CommentItem,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
