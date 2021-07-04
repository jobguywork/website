<template>
  <div class="footer layout-h layout-justified layout-center">
    <div class="right-side layout-h">
      <div class="views-count">
        <Views :views="review.view_count" />
      </div>
      <div class="wrap-like mr-15">
        <client-only>
          <Vote
            :vote="vote"
            :handle-like="onLike"
            :handle-dislike="onDislike"
          />
        </client-only>
      </div>
      <div class="share mr-20">
        <Share :url="shareLink" :title="review.title" />
      </div>
      <div v-if="review.my_review" class="edit mr-20">
        <Edit :id="review.id" />
      </div>
    </div>
    <div v-if="!details" class="left-side">
      <nuxt-link
        class="el-button el-button--default el-button--mini"
        :to="linkWidthSlug"
      >
        جزئیات
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Views from '@/components/Shared/Views'
import Share from '@/components/Shared/Share'
import Edit from '@/components/Shared/Edit'
import Vote from '@/components/Shared/Vote/Vote'
import { BASE_URL } from '@/config/app'

export default {
  components: {
    Vote,
    Views,
    Share,
    Edit,
  },
  props: {
    review: {
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
        vote_count: this.review.vote_count,
        down_vote_count: this.review.down_vote_count,
        vote_state: this.review.vote_state,
      },
    }
  },
  computed: {
    shareLink() {
      return `${BASE_URL}/review/${this.review.id}`
    },
    linkWidthSlug() {
      return `/review/${this.review.id}/${this.titleToSlug(this.review.title)}`
    },
  },
  methods: {
    async onLike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'DOWN') {
        try {
          const res = await this.$axios.get(
            `/company_review/${this.review.id}/add_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/company_review/${this.review.id}/remove_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      }
    },
    async onDislike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'UP') {
        try {
          const res = await this.$axios.get(
            `/company_review/${this.review.id}/add_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/company_review/${this.review.id}/remove_down_vote/`
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
