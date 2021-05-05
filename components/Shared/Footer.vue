<template>
  <footer id="footer">
    <div class="container layout-h layout-justified rtl">
      <div class="right layout-v layout-center-center">
        <p>© {{ year }} - تمامی حقوق برای جاب گای محفوظ است.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import moment from 'moment-jalaali'

export default {
  data() {
    return {
      year: moment().format('jYYYY'),
    }
  },
}
</script>

<style lang="scss" scoped>
#footer {
  background-color: #303030;
  color: silver;
  padding: 25px 0;
  border-top: 1px solid #484848;
  text-align: center;
  margin-top: 40px;
  p {
    margin: 0;
  }
  .app {
    .item {
      img {
        width: 40px;
        height: auto;
      }
    }
  }
  @media (max-width: 420px) {
    .container {
      flex-direction: column;
      .left {
        margin-top: 20px;
        text-align: center;
        justify-content: center;
      }
      .right {
        text-align: center;
      }
    }
  }
}
@media (max-width: 420px) {
  // #footer {
  //   display: none;
  // }
}
</style>
