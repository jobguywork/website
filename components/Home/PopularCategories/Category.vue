<template>
  <nuxt-link :to="link" class="category-box">
    <div class="icon">
      <i :class="icon" />
    </div>
    <div class="counter">
      {{ countCompanies }}
    </div>
    <div class="content">
      <h3>{{ title }}</h3>
      <!-- <p>{{ desc }}</p> -->
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
      required: true,
    },
    icon: {
      type: String,
      default: 'far fa-file-code',
      required: true,
    },
    countCompanies: {
      type: Number,
      default: null,
      required: true,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
    desc: {
      type: String,
      default: null,
      required: true,
    },
  },
}
</script>

<style scoped>
i {
  font-size: 35px;
}
</style>
