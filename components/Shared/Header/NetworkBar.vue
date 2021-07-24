<template>
  <div
    :class="{ hidden: scrollPosition > 100 }"
    class="network rtl layout-h layout-center-center"
  >
    <nuxt-link to="/donate#wallets" class="text">
      از جابگای حمایت کنید <span class="love">❤</span>
    </nuxt-link>
    <el-divider direction="vertical"></el-divider>
    <div class="icons">
      <a
        href="https://twitter.com/JobguyIR"
        target="_blank"
        rel="noreferrer"
        aria-label="حساب توئیتر جاب‌گای"
      >
        <i class="fa fa-twitter"></i>
      </a>
      <a
        href="https://t.me/jobguy"
        target="_blank"
        rel="noreferrer"
        aria-label="حساب تلگرام جاب‌گای"
      >
        <i class="fa fa-telegram"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(event) {
      this.scrollPosition = window.scrollY
    },
  },
}
</script>

<style lang="scss" scoped>
.network {
  background: #07401e;
  color: #fff;
  line-height: 60px;
  height: 60px;
  width: 100%;
  text-align: center;
  font-size: 15px;
  transition: all 0.3s ease-in-out;
  a {
    color: #fff;
  }
  .love {
    color: red;
  }
  @media (max-width: 740px) {
    font-size: 14px;
  }
  .icons {
    a {
      margin-right: 10px;
      font-size: 22px;
      color: #fff;
      @media (max-width: 740px) {
        font-size: 20px;
      }
    }
  }
}
.hidden {
  height: 0;
}
</style>

<style lang="scss">
.companies-page {
  #header-container {
    .network {
      display: none;
    }
  }
}
</style>
