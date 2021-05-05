<template>
  <section class="popular-categories">
    <div class="container">
      <!-- title -->
      <el-row class="text-center">
        <el-col :span="24">
          <span class="title pb-10"> دسته های شغلی محبوب </span>
        </el-col>
      </el-row>
      <!-- /title -->
      <!-- categories -->
      <div class="categories">
        <Category
          v-for="(cat, index) in categories"
          :key="index"
          :link="`/companies?industry=${cat.industry_slug}`"
          :count-companies="cat.company_count"
          :title="cat.name"
          :desc="cat.description"
          :icon="cat.icon"
        />
      </div>
      <!-- /categories -->
    </div>
  </section>
</template>

<script>
import Category from './Category'
export default {
  components: {
    Category,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
}
</script>

<style lang="scss">
.home-page {
  .popular-categories {
    background: rgba(232, 232, 232, 0.4);
    margin-top: 65px;
    .container {
      padding: 40px;
    }
    .title {
      font-size: 20px;
      display: block;
    }
    .categories {
      display: flex;
      flex-wrap: wrap;
      .category-box {
        flex: 0 0 25%;
        height: 245px;
        align-content: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin: 0;
        text-align: center;
        padding: 25px;
        border-radius: 4px;
        transition: 0.35s;
        .icon {
          line-height: 32px;
          color: $--color-primary;
          position: relative;
          i {
            display: block;
            transition: 0.35s;
            margin-bottom: 12px;
          }
        }
        .counter {
          width: auto;
          height: 24px;
          font-size: 14px;
          line-height: 25px;
          border-radius: 4px;
          padding: 0 8px;
          color: #909090;
          background: rgba(0, 0, 0, 0.06);
          font-weight: 600;
          display: inline-block;
          margin: 0 auto;
          transition: 0.35s;
          margin-bottom: 18px;
        }
        .content {
          h3 {
            font-size: 15px;
            line-height: 28px;
            font-weight: 400;
            color: #333;
            margin: 0;
            margin-bottom: 10px;
            padding: 0;
            transition: 0.35s;
          }
          p {
            color: #888;
            margin: 0;
            padding: 0;
            line-height: 26px;
            margin-top: 5px;
            transition: 0.35s;
          }
        }
      }
      .category-box:hover {
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(42, 65, 232, 0.2);
        background-color: $--color-primary;
        * {
          color: #fff !important;
        }
      }
      @media (max-width: 768px) {
        .category-box {
          flex: 0 0 50%;
        }
      }
      @media (max-width: 480px) {
        .category-box {
          flex: 0 0 100%;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
