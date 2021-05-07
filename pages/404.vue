<template>
  <div class="wrap-404">
    <div class="layout-v layout-center-justified">
      <strong>404</strong>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      ...this.$seo({
        title: '404',
      }),
      bodyAttrs: {
        class: 'page-404',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.wrap-404 {
  width: 100%;
  .layout-v {
    height: calc(100vh - 122px);
    text-align: center;
  }
  strong {
    font-size: 270px;
    color: #000;
    padding-top: 62px;
  }
  @media (max-width: 420px) {
    strong {
      font-size: 160px;
    }
  }
}
</style>
