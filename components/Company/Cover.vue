/* eslint-disable vue/no-mutating-props */
<template>
  <section
    v-if="company"
    :style="{ backgroundImage: `url('${coverImage}')` }"
    class="cover"
  >
    <div class="overlay" />
    <div class="container rtl layout-h">
      <div class="right-side layout-h layout-center">
        <div class="logo layout-center layout-center-justified">
          <img :src="mediaUrl(company.logo)" :alt="company.name" />
        </div>
        <div class="details layout-v">
          <h1 v-if="single === false">{{ company.name }}</h1>
          <h2 v-else>{{ company.name }}</h2>
          <div class="extra-info layout-h">
            <div class="right layout-v">
              <span>
                <i class="fa fa-calendar ml-5" />
                سال تاسیس {{ company.founded }}
              </span>
              <span class="mt-15 layout-h">
                <i class="fa fa-users ml-5" />
                <span class="text">
                  {{ teamSizeString(company.size) }}
                </span>
              </span>
              <span class="mt-15 layout-h">
                <i class="fa fa-comments ml-5" />
                {{ company.total_review }} تجربه
              </span>
            </div>
            <div class="left layout-v">
              <span class="industry">
                <i class="fa fa-folder-open-o ml-5" />
                {{ company.industry.name }}
              </span>
              <span v-if="company.city.name" class="mt-15">
                <i class="fa fa-map-marker ml-5" />
                {{ company.city.name }}
              </span>
              <span v-if="company.site" class="mt-15 layout-h">
                <i class="fa fa-external-link ml-5" />
                <a :href="company.site" target="_blank" rel="nofollow">
                  {{ extractHostname(company.site) }}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="left-side layout-v layout-end text-left">
        <div class="money-box layout-v text-right">
          <span>میانگین حقوق ماهانه</span>
          <div class="amount layout-h layout-center">
            <strong class="ml-5">
              {{ averageSalary }}
            </strong>
            <span v-if="company.salary_avg">میلیون</span>
          </div>
        </div>
        <div class="rate layout-h layout-center mt-20 ltr">
          <span class="number mr-15">
            {{ company.over_all_rate }}
          </span>
          <el-rate
            v-model="rate"
            :colors="['#F71735', '#F7BA2A', '#20BF55']"
            disabled
            allow-half
            aria-label="امتیاز کل"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true,
      default() {
        return {
          cover: '',
          logo: '',
          name: '',
          size: '',
          total_review: '',
          industry: {
            name: '',
          },
          city: {
            name: '',
          },
          site: '',
        }
      },
    },
    single: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rate: 0,
    }
  },
  computed: {
    coverImage() {
      return this.company.cover
        ? this.mediaUrl(this.company.cover)
        : '/images/cover-default.png'
    },
    averageSalary() {
        if (this.company.salary_avg == 0) {
            return 'نامعلوم'
        }

        return this.company.salary_avg
    },
  },
  mounted() {
    this.rate = this.company.over_all_rate
  },
  methods: {
    extractHostname(url) {
      let hostname
      // find & remove protocol (http, ftp, etc.) and get hostname

      if (url.includes('//')) {
        hostname = url.split('/')[2]
      } else {
        hostname = url.split('/')[0]
      }

      // find & remove port number
      hostname = hostname.split(':')[0]
      // find & remove "?"
      hostname = hostname.split('?')[0]

      return hostname
    },
  },
}
</script>

<style lang="scss" scoped>
.cover {
  height: 350px;
  background-size: cover;
  background-position: center;
  margin-top: 122px;
  .overlay {
    position: absolute;
    width: 100%;
    height: 350px;
    content: '';
    background: rgba(0, 0, 0, 0.75);
  }
  .container {
    position: relative;
    z-index: 999;
    color: #fff;
    height: 300px;
    .right-side {
      width: 55%;
      padding: 50px;
      padding-right: 0;
      .logo {
        height: 140px;
        flex: 0 0 140px;
        margin-left: 35px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        img {
          width: 110px;
          height: 110px;
          border-radius: 4px;
        }
      }
      .details {
        width: 100%;
        h2,
        h1 {
          font-size: 22px;
          font-weight: 400;
          @media (max-width: 720px) {
            font-size: 16px !important;
            margin-top: 25px;
          }
        }
        span {
          a {
            color: #fff;
          }
        }
      }
      .extra-info {
        color: #fff;
        .left,
        .right {
          width: 50%;
        }
        .left {
          @media (max-width: 720px) {
            span {
              width: 180px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          @media (max-width: 320px) {
            span {
              width: 140px;
            }
          }
        }
      }
    }
    .left-side {
      width: 45%;
      padding: 50px;
      padding-left: 0;
      .money-box {
        border-radius: 4px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        padding: 10px 30px;
        width: 175px;
        margin-top: 25px;
        span {
          color: #888;
          line-height: 20px;
          margin: 3px 0 8px;
        }
        strong {
          color: #333;
          font-size: 24px;
          line-height: 36px;
          font-weight: 300;
        }
      }
      .rate {
        position: absolute;
        bottom: -30px;
        z-index: 999;
        width: 185px;
        .number {
          border-radius: 4px;
          background-color: #febe42;
          color: #000;
          font-size: 14px;
          line-height: 15px;
          font-weight: 400;
          padding: 5px 10px 1px 10px;
          position: relative;
          cursor: default;
          box-shadow: 0 2px rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
  @media (max-width: 670px) {
    background-position: center;
    height: 280px;
    .overlay {
      height: 280px;
    }
    .container {
      flex-direction: column;
      height: 220px;
    }
    .right-side,
    .left-side {
      padding: 0 10px !important;
      width: 100% !important;
    }
    .right-side {
      .logo {
        height: 70px !important;
        flex: 0 0 70px !important;
        padding: 0 10px !important;
        margin-left: 15px !important;
        position: absolute;
        left: -5px;
        top: 20px;
        img {
          width: 50px !important;
          height: 50px !important;
        }
      }
      .extra-info {
        width: 100% !important;
        flex-direction: column !important;
        .right,
        .left {
          width: 100% !important;
        }
        .left {
          margin-top: 15px;
        }
      }
    }
    .left-side {
      text-align: right !important;
      .money-box {
        position: absolute;
        bottom: 30px;
        padding: 2px 10px !important;
        width: 150px !important;
      }
      .rate {
        position: absolute;
        bottom: -5px !important;
      }
    }
  }
}
</style>
