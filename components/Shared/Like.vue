<template>
  <div class="like layout-h layout-center">
    <span v-if="$isLogin" class="layout-h login layout-center">
      <span class="count">
        {{ vote.vote_count }}
      </span>
      <span v-if="dataVote.vote_state === false">
        <i class="fa fa-thumbs-up fa-lg" @click="addVote" />
      </span>
      <span v-else>
        <i class="fa fa-thumbs-up fa-lg active" @click="removeVote" />
      </span>
    </span>
    <span v-else class="layout-h no-login layout-center">
      ss
      <span class="count">
        {{ vote.vote_count }}
      </span>
      <i slot="icon" class="fa fa-thumbs-up fa-lg" @click="showLogin" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    vote: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      dataVote: this.vote,
    }
  },
  mounted() {
    this.dataVote = this.vote
  },
  methods: {
    addVote() {
      this.$emit('add-vote')
    },
    removeVote() {
      this.$emit('remove-vote')
    },
    showLogin() {
      this.$store.commit('theme/TOGGLE_DIALOG')
    },
  },
}
</script>

<style lang="scss">
.like {
  position: relative;
  i {
    color: #000 !important;
    cursor: pointer;
    transition: all 200ms linear;
  }
  i.active {
    color: #0A8549 !important;
  }
  .count {
    font-size: 13px;
    user-select: none;
    margin-left: 7px;
  }
}
</style>
