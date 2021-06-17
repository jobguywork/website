<template>
  <ElCard class="reply rtl" :body-style="{ padding: '10px' }">
    <div slot="header" class="title layout-h layout-center">
      <div class="logo">
        <el-image :src="logo" width="50" height="50" />
      </div>
      <span class="mr-10">{{ title }}</span>
    </div>
    <!-- // eslint-disable-next-line vue/no-v-html -->
    <div v-if="data.reply" class="content" v-html="data.reply"></div>
    <Empty v-else>
      <nuxt-link to="/contact">
        به منظور پاسخ گویی و برای دریافت پنل با ما از طریق ایمیل تماس بگیرید.
      </nuxt-link>
    </Empty>
  </ElCard>
</template>

<script>
import Empty from '@/components/Shared/Empty'

export default {
  components: {
    Empty,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    typeReply: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      return `پاسخ رسمی ${this.data.company.name}`
    },
    logo() {
      return this.mediaUrl(this.data.company.logo)
    },
  },
}
</script>

<style lang="scss" scoped>
.reply {
  ::v-deep {
    .title {
      span {
        font-weight: 600;
      }
      .logo {
        img {
          width: 50px;
          height: 50px;
          border-radius: 100%;
        }
      }
    }
  }
  .content {
    line-height: 32px;
    text-align: justify;
    font-size: 17px;
  }
}
</style>
