<template>
  <ElCard :body-style="{ padding: '0' }" class="rtl full-width">
    <CommentForm :loading="loading" @add-comment="handleAddComment" />
    <CommentList :comments="comments" class="mt-30" />
  </ElCard>
</template>

<script>
import CommentForm from './CommentForm'
import CommentList from './CommentList/CommentList'

export default {
  components: {
    CommentForm,
    CommentList,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleAddComment(form) {
      this.$emit('add-comment', form)
    },
  },
}
</script>

<style lang="scss" scoped></style>
