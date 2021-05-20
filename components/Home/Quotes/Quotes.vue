<template>
  <section class="reviews">
    <div class="container">
      <!-- header -->
      <el-row class="header mb-35">
        <el-col :span="24">
          <div class="layout-h layout-center-center">
            <div class="title">نظر شما درباره جاب گای</div>
          </div>
        </el-col>
      </el-row>
      <!-- /header -->
      <!-- list -->
      <el-row>
        <el-col :span="24">
          <el-carousel :interval="50000" type="card" arrow="always">
            <el-carousel-item v-for="(item, index) in quotes" :key="index">
              <Quote
                :avatar="item.avatar"
                :full-name="item.name"
                :skill="item.skill"
                :review="item.description"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <!-- /list -->
    </div>
  </section>
</template>

<script>
import Quote from './Quote'
export default {
  components: {
    Quote,
  },
  props: {
    quotes: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  data() {
    return {
      value5: 3.7,
    }
  },
}
</script>

<style lang="scss">
.home-page {
  .reviews {
    .header {
      .title {
        font-size: 18px;
        color: #333;
      }
    }
  }
  .reviews {
    padding-top: 65px;
    padding-bottom: 75px;
    .el-carousel--horizontal {
      overflow: hidden;
    }
    .el-carousel__item {
      border-radius: 4px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      transition: 0.55s;
      * {
        filter: blur(2px);
      }
      h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }
    }

    .el-carousel__item.is-active {
      background-color: #fafafa;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      * {
        filter: blur(0px);
      }
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #fff;
    }
    .wrap {
      height: 100%;
      .rate-wrap {
        direction: ltr;
      }
    }
    .el-carousel__container {
      @media (max-width: 640px) {
        .el-carousel__item--card {
          width: 98%;
          transform: translateX(1%) scale(1) !important;
        }
        .el-carousel__arrow {
          display: none;
        }
      }
      button:hover {
        background: $--color-primary;
      }
    }
    .review-text {
      padding: 0 8px;
      text-align: center;
      line-height: 20px;
    }
    @media (max-width: 768px) {
      .avatar {
        width: 80px !important;
        height: 80px !important;
      }
      .review-text {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
