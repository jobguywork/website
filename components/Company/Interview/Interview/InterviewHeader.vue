<template>
  <div class="header">
    <div class="layout-h layout-justified layout-center">
      <h3 v-if="single === false" class="title">
        <nuxt-link :to="linkWidthSlug">
          {{ title }}
        </nuxt-link>
      </h3>
      <h1 v-else class="title">
        {{ title }}
      </h1>
      <div class="date layout-h layout-center">
        <i class="fa fa-calendar ml-5" />
        <span class="text">
          {{ interview.created | timeAgo }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interview: {
      type: Object,
      required: true,
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    title() {
      const { company, title } = this.interview
      const prefix = 'تجربه مصاحبه در شرکت'
      return `${prefix} ${company.name}: ${title}`
    },
    linkWidthSlug() {
      return `/interview/${this.interview.id}/${this.titleToSlug(
        this.interview.title
      )}`
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 5px 20px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  .title {
    font-size: 14px;
  }
  .rate {
    .number {
      border-radius: 4px;
      background-color: #febe42;
      color: #000;
      font-size: 14px;
      line-height: 15px;
      font-weight: 500;
      padding: 5px 10px 1px 10px;
      position: relative;
      cursor: default;
      box-shadow: 0 1px rgba(0, 0, 0, 0.3);
    }
  }
  @media (max-width: 720px) {
    .title {
      font-size: 12px;
      line-height: 24px;
      width: 70%;
    }
    .date {
      width: 30%;
      font-size: 11px;
      text-align: left;
    }
  }
}
</style>
