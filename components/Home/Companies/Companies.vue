<template>
  <section class="top-companies">
    <div class="container">
      <!-- header -->
      <el-row class="header mb-35">
        <el-col :span="24">
          <div class="layout-h layout-around-justified">
            <div class="title">
              {{ title }}
            </div>
            <div
              class="more text-left layout-h layout-center layout-end-justified"
            >
              <span class="text ml-10">
                <nuxt-link :to="link"> نمایش همه </nuxt-link>
              </span>
              <i class="fa fa-long-arrow-left fa-2x" />
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- /header -->
      <!-- companies -->
      <div class="companies">
        <Company
          v-for="(item, index) in companies"
          :key="index"
          :link="`/company/${item.company_slug}`"
          :logo="item.logo"
          :name="item.name"
          :salary="`${item.salary_min}-${item.salary_max}`"
          :team-size="item.size"
          :founded="item.founded"
          :count-reviews="item.total_review"
          :location="item.city.name"
          :rate="item.over_all_rate"
        />
      </div>
      <!-- /companies -->
    </div>
  </section>
</template>

<script>
import Company from './Company'
export default {
  components: {
    Company,
  },
  props: {
    companies: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    link: {
      type: String,
      default: '',
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
  .top-companies {
    padding-top: 25px;

    .companies {
      background-color: #fff;
      overflow: hidden;
      // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
      a {
        display: block;
        padding: 30px 35px;
        background-color: #fff;
        transition: 0.3s;
        position: relative;
        .details {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 0;
          top: 0;
          .logo {
            flex: 1;
            max-width: 55px;
            margin-left: 25px;
            position: relative;
            top: 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 0, 0, 0.01);
            border-radius: 4px;
            img {
              width: 100%;
              transform: translate3d(0, 0, 0);
              padding: 5px;
            }
          }
          .description {
            flex: 1;
            padding-top: 3px;
            .title {
              font-size: 18px;
              line-height: 28px;
              color: #333;
              margin: 0;
              margin-bottom: 5px;
            }
            .footer {
              background-color: transparent;
              padding: 0;
              margin-top: 3px;
              position: relative;
              ul {
                list-style: none;
                padding: 0;
                margin: 0;
                margin-top: 10px;
                li {
                  display: inline-block;
                  margin-left: 10px;
                  color: #777;
                  width: calc(16.5% - 20px);
                  > i {
                    position: relative;
                    top: 1px;
                    margin-left: 3px;
                    color: #777;
                  }
                  .rate {
                    direction: ltr;
                  }
                }
              }
            }
          }
          .el-button {
            transition: 0.3s;
          }
        }
      }
      a:nth-child(2n) {
        background-color: #f8f8f8;
      }
      a:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 3px;
        height: 100%;
        display: block;
        background: #66676b;
        transition: 0.3s;
        opacity: 0;
      }
      a:hover {
        .el-button {
          background: $--color-primary;
          color: #fff;
        }
      }
      a:hover::before {
        background: $--color-primary;
        opacity: 1;
      }
    }
    @media (max-width: 768px) {
      .companies {
        a {
          padding: 15px;
          .rate-item,
          .el-button {
            flex: auto;
            width: 100%;
            margin-top: 15px;
          }
        }
        .footer {
          li {
            // width: calc(50% - 28px);
            width: 49% !important;
            margin-left: 0 !important;
            margin-bottom: 15px;
          }
          li:nth-child(2n) {
            text-align: left;
          }
          li.rate-item {
            // width: 100%;
            // text-align: center;
            margin: 0 !important;
          }
        }
      }
    }
  }
  .top-companies {
    .header {
      padding: 0 10px;
      .title {
        width: 50%;
        font-size: 18px;
        color: #333;
      }
      .more {
        width: 50%;
        .text {
          line-height: 25px;
        }
        a,
        i {
          color: $--color-primary;
        }
      }
    }
  }
}
</style>
