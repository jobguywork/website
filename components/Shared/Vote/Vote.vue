<template>
  <div class="vote layout-h">
    <Like
      :status="vote.vote_state"
      :count="vote.vote_count"
      class="ml-5"
      @click="handleLike"
    />
    <el-divider direction="vertical"></el-divider>
    <Dislike
      :status="vote.vote_state"
      :count="vote.down_vote_count"
      class="mr-5"
      @click="handleDislike"
    />
  </div>
</template>

<script>
import Like from './Like'
import Dislike from './Dislike'
export default {
  components: {
    Like,
    Dislike,
  },
  props: {
    vote: {
      type: Object,
      required: true,
    },
    handleLike: {
      type: Function,
      required: true,
    },
    handleDislike: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  i {
    cursor: pointer;
  }
  .el-divider--vertical {
    position: relative;
    top: 7px;
  }
}
.count {
  user-select: none;
}
</style>
