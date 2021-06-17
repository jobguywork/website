<template>
  <div class="content-tab rtl">
    <!-- title -->
    <div class="title layout-h layout-justified">
      <div class="layout-h layout-center-center">
        <i class="fa fa-edit fa-lg ml-10" />
        <div class="label">
          تجربه مصاحبه در <span>{{ company.name }}</span>
        </div>
      </div>
      <el-button size="mini" type="primary" @click="addInterview">
        ثبت تجربه مصاحبه
      </el-button>
    </div>
    <!-- /title -->
    <div v-if="interviews.data.length > 0" class="interviews mt-10">
      <ul>
        <Interview
          v-for="(interview, index) in interviews.data"
          :key="index"
          :interview="interview"
        />
      </ul>
      <client-only v-if="interviews.total > 0">
        <infinite-loading
          :identifier="interviews.infiniteId"
          @infinite="infiniteHandler"
        />
      </client-only>
    </div>
    <Empty v-else class="mt-20">
      <p>
        اولین نفر باش که تجربه مصاحبه کاریت، در {{ company.name }} را به اشتراک
        می گذاری.
      </p>
      <el-button size="mini" type="primary" @click="addInterview">
        ثبت تجربه مصاحبه
      </el-button>
    </Empty>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Empty from '@/components/Shared/Empty'
import Interview from './Interview/Interview'

export default {
  components: {
    Interview,
    Empty,
  },
  computed: {
    ...mapState('company/company', ['company']),
    ...mapState('company/interview', ['interviews']),
  },
  methods: {
    addInterview() {
      this.$router.push(`/interview/create/${this.company.company_slug}/`)
    },
    async infiniteHandler(state) {
      await this.$store.dispatch('company/interview/getInterviews', {
        company: this.company.company_slug,
        infinite: state,
        first: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tab {
  @media (max-width: 720px) {
    min-height: 260px;
  }
}
.interviews {
  @media (max-width: 720px) {
    padding: 10px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li.review-item {
      padding: 15px;
      padding-top: 0;
      border-radius: 4px;
      margin-bottom: 15px;
      padding-right: 20px;
      .title {
        font-size: 18px;
        font-weight: 500;
        color: #333;
      }
      .rate {
        .number {
          background-color: rgb(254, 190, 66);
          color: rgb(0, 0, 0);
          font-size: 14px;
          line-height: 15px;
          font-weight: 500;
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
      i {
        color: gray;
      }
      @media (max-width: 420px) {
        .meta {
          flex-wrap: wrap;
          .date,
          .skill,
          .state,
          .rate {
            width: 50%;
          }
        }
      }
    }
    li.review-item:nth-child(2n) {
      background: rgba(118, 188, 255, 0.04);
      border: 1px solid rgba(118, 188, 255, 0.08);
    }
  }
}
</style>
