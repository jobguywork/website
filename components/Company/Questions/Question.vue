<template>
  <li class="layout-v question">
    <ElCard :body-style="{ padding: '0 15px 15px 15px' }">
      <div class="top">
        <h3 class="title">
          {{ question.title }}
        </h3>
        <div class="meta layout-h layout-justified">
          <div class="date">
            <i class="fa fa-calendar ml-5" />
            <span class="text">
              {{ question.created | timeAgo }}
            </span>
          </div>
        </div>
      </div>
      <div class="desc mt-10">
        {{ question.body }}
      </div>
      <div class="bottom layout-h layout-center layout-justified mt-10">
        <div class="meta-button layout-h layout-center">
          <div class="see-answers layout-h layout-center ml-10">
            <el-badge
              :value="question.answer_count"
              class="item"
              type="primary"
            >
              <el-button size="small" @click="loadAnswers(question, index)">
                <i class="fa fa-comments ml-5" />
                <!-- <span>نمایش جواب ها</span> -->
              </el-button>
            </el-badge>
          </div>
          <client-only>
            <Vote
              :vote="vote"
              :handle-like="handleLike"
              :handle-dislike="handleDislike"
            />
          </client-only>
        </div>
        <el-button
          size="small"
          type="primary"
          @click="handleReply(question, index)"
        >
          جواب دادن
        </el-button>
      </div>
      <Answers v-if="question.answer_count > 0" :answers="question.answers" />
    </ElCard>
  </li>
</template>

<script>
import Vote from '@/components/Shared/Vote/Vote'
import Answers from './Answers'

export default {
  components: {
    Answers,
    Vote,
  },
  props: {
    question: {
      type: Object,
      default: null,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      quesiotnData: {},
      vote: {
        vote_count: this.question.vote_count,
        down_vote_count: this.question.down_vote_count,
        vote_state: this.question.vote_state,
      },
    }
  },
  mounted() {},
  methods: {
    handleReply(question, index) {
      this.$store.dispatch('company/question/setQuestionReply', {
        question,
        index,
      })
      this.$store.dispatch('company/question/toggleDialogReply')
    },
    loadAnswers(question, index) {},
    async handleLike() {
      if (this.vote.vote_state === 'NONE' || this.vote.vote_state === 'DOWN') {
        try {
          const res = await this.$axios.get(
            `/question/${this.question.question_slug}/add_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/question/${this.question.question_slug}/remove_vote/`
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
            `/question/${this.question.question_slug}/add_down_vote/`
          )
          this.vote.vote_count = res.data.data.vote_count
          this.vote.vote_state = res.data.data.vote_state
          this.vote.down_vote_count = res.data.data.down_vote_count
        } catch (error) {}
      } else {
        try {
          const res = await this.$axios.get(
            `/question/${this.question.question_slug}/remove_down_vote/`
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
li.question {
  padding: 0;
  padding-top: 0;
  border-radius: 4px;
  margin-bottom: 15px;
  .title {
    font-size: 18px;
    font-weight: 400;
    color: #333;
  }
  .rate {
    .number {
      background-color: rgb(254, 190, 66);
      color: rgb(0, 0, 0);
      font-size: 14px;
      line-height: 15px;
      font-weight: 400;
      position: relative;
      cursor: default;
      border-radius: 4px;
      padding: 5px 10px 1px;
    }
  }
  .date {
    .text {
      font-size: 14px;
    }
  }
}
li.question:nth-child(2n) {
  background: rgba(118, 188, 255, 0.04);
  border: 1px solid rgba(118, 188, 255, 0.08);
}
</style>
