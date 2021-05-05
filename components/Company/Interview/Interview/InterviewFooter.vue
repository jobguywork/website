<template>
  <div class="footer layout-h layout-justified layout-center">
    <div class="right-side layout-h">
      <div class="views-count">
        <Views :views="interview.view_count" />
      </div>
      <div class="wrap-like mr-15">
        <client-only>
          <Vote
            :vote="vote"
            :handle-like="handleLike"
            :handle-dislike="handleDislike"
          />
        </client-only>
      </div>
      <div class="share mr-20">
        <Share :link="shareLink" />
      </div>
      <div v-if="interview.my_review" class="edit mr-20">
        <Edit :id="interview.id" type="interview" />
      </div>
    </div>
    <div v-if="!details" class="left-side">
      <el-button size="mini" @click="handleRedirect"> جزئیات </el-button>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config/app'
import Vote from '@/components/Shared/Vote/Vote'
import Views from '@/components/Shared/Views'
import Share from '@/components/Shared/Share'
import Edit from '@/components/Shared/Edit'

export default {
  components: {
    Vote,
    Views,
    Share,
    Edit,
  },
  props: {
    interview: {
      type: Object,
      required: true,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      vote: {
        vote_count: this.interview.vote_count,
        down_vote_count: this.interview.down_vote_count,
        vote_state: this.interview.vote_state,
      },
    }
  },
  computed: {
    shareLink() {
      return `${BASE_URL}/interview/${this.interview.id}`
    },
    linkWidthSlug() {
      return `/interview/${this.interview.id}/${this.titleToSlug(
        this.interview.title
      )}`
    },
  },
  methods: {
    async handleLike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'DOWN') {
        try {
          const res = await this.$axios.get(
            `/interview/${this.interview.id}/add_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/interview/${this.interview.id}/remove_vote/`
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
            `/interview/${this.interview.id}/add_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/interview/${this.interview.id}/remove_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      }
    },

    handleRedirect() {
      this.$router.push(this.linkWidthSlug)
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
}
</style>
