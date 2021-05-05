<template>
  <div class="content-tab rtl">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="about" v-html="covertNewLineToParagraph(about)"></div>
    <div v-if="benefits.length" class="benefits">
      <div class="title">مزایا</div>
      <ul>
        <li v-for="(item, index) in benefits" :key="index">
          <i :class="item.icon" class="ml-5" />
          <span class="text">
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    about: {
      required: true,
    },
    benefits: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tab {
  min-height: 400px;
  line-height: 28px;
}
</style>
