<template>
  <li class="answer mb-20">
    <div class="body">
      {{ answer.body }}
    </div>
    <div class="like-wrap">
      <client-only>
        <Vote
          :vote="vote"
          :handle-like="handleLike"
          :handle-dislike="handleDislike"
        />
      </client-only>
    </div>
  </li>
</template>

<script>
import Vote from '@/components/Shared/Vote/Vote'

export default {
  components: {
    Vote,
  },
  props: {
    answer: {
      type: Object,
      default() {
        return {}
      },
      required: true,
    },
  },
  data() {
    return {
      vote: {
        vote_count: this.answer.vote_count,
        down_vote_count: this.answer.down_vote_count,
        vote_state: this.answer.vote_state,
      },
    }
  },
  methods: {
    async handleLike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'DOWN') {
        try {
          const res = await this.$axios.get(
            `/answer/${this.answer.id}/add_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/answer/${this.answer.id}/remove_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      }
    },
    async handleDislike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'UP') {
        try {
          const res = await this.$axios.get(
            `/answer/${this.answer.id}/add_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/answer/${this.answer.id}/remove_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      }
    },
  },
}
</script>

<style lang="scss">
.company-page {
  .answer {
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.07);
    padding: 10px;
    border-radius: 3px;
    .body {
      position: relative;
      min-height: 65px;
      .like-wrap {
        margin-right: 5px;
      }
    }
  }
  .answer:last-child {
    margin-bottom: 10px;
  }
}
</style>
