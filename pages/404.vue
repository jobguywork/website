<template>
  <div class="wrap-404">
    <div class="layout-v layout-center-justified">
      <strong>404</strong>
    </div>
  </div>
</template>

<script>
import { DOMAIN_TITLE } from '@/config/app.js'

export default {
  head() {
    let meta = []
    meta = [
      {
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        property: 'og:title',
        content: DOMAIN_TITLE,
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ]
    return {
      bodyAttrs: {
        class: 'page-404',
      },
      title: '404',
      meta,
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
