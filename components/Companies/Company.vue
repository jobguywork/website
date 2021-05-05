<template>
  <nuxt-link :to="`/company/${company.company_slug}`" class="company">
    <div class="info">
      <div class="logo">
        <img :src="mediaUrl(company.logo)" :alt="title" />
      </div>
      <div class="description">
        <h2 class="company-name">
          {{ title }}
        </h2>
        <p>{{ company.description }}</p>
      </div>
    </div>
    <div class="footer">
      <!-- <span class="bookmark-icon">
        <i class="far fa-bookmark" />
      </span> -->
      <ul class="layout-h layout-justified">
        <el-tooltip
          class="item"
          effect="dark"
          content="تجربه کاری"
          placement="top-start"
        >
          <li>
            <i class="fa fa-comments" />
            <span class="text"> {{ company.total_review }} تجربه کاری </span>
          </li>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="بازه حقوق ماهیانه به میلیون"
          placement="top-start"
        >
          <li>
            <div class="layout-h">
              <i class="fa fa-credit-card" />
              <span class="text mr-5">
                {{ company.salary_min }}-{{ company.salary_max }}
              </span>
            </div>
          </li>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="سال تاسیس"
          placement="top-start"
        >
          <li class="hidden-xs-only">
            <i class="fa fa-calendar" />
            <span class="text">
              {{ company.founded }}
            </span>
          </li>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="شهر"
          placement="top-start"
        >
          <li>
            <i class="fa fa-map-marker" />
            <span class="text">
              {{ company.city.name }}
            </span>
          </li>
        </el-tooltip>
      </ul>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return `شرکت ${this.company.name}`
    },
  },
}
</script>

<style lang="scss">
.companies-page {
  .company {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
    margin-bottom: 35px;
    background-color: #fff;
    transition: 0.3s;
    position: relative;
    .info {
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 20px;
      .logo {
        max-width: 56px;
        margin-left: 14px;
        top: 1px;
        flex: 0 0 56px;
        position: relative;
        img {
          border-radius: 4px;
          transform: translate3d(0, 0, 0);
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.01);
          padding: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      }
      .description {
        flex: 1;
        padding-top: 3px;
        margin-bottom: 15px;
        width: calc(100% - 70px);
        h2 {
          font-size: 14px;
          color: gray;
          margin-top: 0;
          margin-bottom: 5px;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          font-size: 11px;
          font-weight: 400;
          overflow: hidden;
          height: 32px;
          line-height: 18px;
          margin: 0;
          position: relative;
        }
        // p::after {
        //   content: '...';
        //   position: absolute;
        //   left: 0;
        //   bottom: -3px;
        //   display: block;
        //   background: linear-gradient(
        //     to right,
        //     white 10%,
        //     rgba(255, 255, 255, 0.1) 100%
        //   );
        //   width: 50px;
        //   padding-right: 25px;
        //   text-align: left;
        // }
      }
    }
    .footer {
      background-color: #f6f6f6;
      flex-grow: 0;
      padding: 30px 15px;
      border-radius: 0 0 4px 4px;
      position: relative;
      .bookmark-icon {
        font-size: 20px;
        position: absolute;
        z-index: 101;
        top: 0;
        left: 25px;
        transform: translateY(-50%) scale(1);
        cursor: pointer;
        background-color: #eee;
        color: silver;
        display: block;
        height: 39px;
        width: 39px;
        border-radius: 50%;
        transition: all 0.4s;
        line-height: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bookmark-icon:hover {
        background-color: #333;
        color: #fff;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          color: #777;
          i {
            margin-left: 3px;
          }
          @media (max-width: 320px) {
            .text {
              font-size: 11px;
            }
            i {
              display: none;
            }
          }
        }
      }
    }
  }
  .company:hover {
    box-shadow: 0 2px 18px rgba(0, 0, 0, 0.17);
    transform: translateY(-4px);
  }
  .company {
    margin-bottom: 30px;
    width: calc(100% * (1 / 3) - 15px);
  }
  @media (max-width: 1920px) {
    .company {
      width: calc(100% * (1 / 3) - 15px);
    }
  }
  @media (max-width: 1600px) {
    .company {
      width: calc(100% * (1 / 2) - 15px);
    }
  }
  @media (max-width: 1200px) {
    .company {
      width: 100%;
      margin-right: 0;
    }
  }
}
</style>
