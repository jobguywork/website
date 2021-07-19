<template>
  <section class="intro-banner">
    <div class="container">
      <el-row class="row-text">
        <el-col :span="24">
          <h1>تجربه کاری برای همه</h1>
        </el-col>
      </el-row>
      <el-row class="row-search">
        <el-col :span="24">
          <div class="search-wrap">
            <el-form
              ref="form"
              :inline="true"
              :model="form"
              class="layout-h"
              label-width="120px"
            >
              <el-form-item prop="companyName">
                <div class="search-field">
                  <label class="field-title" for="intro-company-name">
                    شرکت؟
                  </label>
                  <el-autocomplete
                    id="intro-company-name"
                    v-model="form.companyName"
                    :trigger-on-focus="false"
                    :fetch-suggestions="querySearchCompanyAsync"
                    class="full-width"
                    suffix-icon="fa fa-keyboard-o"
                    placeholder="نام شرکت"
                    aria-label="جستجو در نام شرکت"
                    @select="handleSelectCompany"
                    @keyup.native.enter="submitForm"
                  />
                </div>
              </el-form-item>
              <el-form-item prop="city">
                <div class="search-field">
                  <label class="field-title" for="city"> شهر؟ </label>
                  <City v-model="form.city" />
                </div>
              </el-form-item>
              <el-form-item class="btn-search">
                <el-button type="primary" @click="submitForm">
                  جستجو
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <ElCol v-if="textList.length > 0" :span="24">
          <div class="desc mt-5">
            <Marquee
              :marquee-list="textList"
              speed="300"
              auto-play="5000"
              height="30"
              width="320"
              color="#fff"
              font-size="13"
            >
            </Marquee>
          </div>
        </ElCol>
      </el-row>
      <el-row class="row-stats mt-45">
        <el-col :span="24">
          <ul class="intro-stats layout-h layout-center-center">
            <li>
              <strong class="counter">
                <countTo
                  :start-val="0"
                  :end-val="stats.total_interview"
                  :duration="1000"
                  :decimals="0"
                  :autoplay="true"
                />
              </strong>
              <span>تجربه مصاحبه</span>
            </li>
            <li>
              <strong class="counter">
                <countTo
                  :start-val="0"
                  :end-val="stats.total_review"
                  :duration="1000"
                  :decimals="0"
                  :autoplay="true"
                />
              </strong>
              <span>تجربه کاری</span>
            </li>
            <li>
              <strong class="counter">
                <countTo
                  :start-val="0"
                  :end-val="stats.total_company"
                  :duration="1000"
                  :decimals="0"
                  :autoplay="true"
                />
              </strong>
              <span>شرکت</span>
            </li>
            <li>
              <strong class="counter">
                <countTo
                  :start-val="0"
                  :end-val="stats.total_user"
                  :duration="2000"
                  :decimals="0"
                  :autoplay="true"
                />
              </strong>
              <span>همکار</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="background-image" :class="{ image: backgroundImage }">
      <span class="transparent" />
    </div>
  </section>
</template>

<script>
import countTo from 'vue-count-to'
import debounce from 'lodash/debounce'
import City from '@/components/Shared/City'
import Marquee from '@/components/Shared/Marquee'

export default {
  components: {
    countTo,
    City,
    Marquee,
  },
  props: {
    stats: {
      type: Object,
      default() {
        return {
          total_interview: 0,
          total_review: 0,
          total_user: 0,
          total_company: 0,
        }
      },
      required: true,
    },
    textList: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  data() {
    return {
      form: {
        companyName: '',
        city: '',
      },
      options: [
        {
          value: 'Option1',
          label: 'اصفهان',
        },
        {
          value: 'Option2',
          label: 'تهران',
        },
      ],
      company: null,
      city: null,
      backgroundImage: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.backgroundImage = true
    }, 5000)
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$router.push({
            path: '/companies/',
            query: {
              city: this.form.city,
              name: this.form.companyName,
            },
          })
        } else {
          return false
        }
      })
    },
    querySearchCompanyAsync: debounce(async function (queryString, cb) {
      try {
        const params = new URLSearchParams()
        if (queryString) {
          params.append('name', queryString)
        }
        const results = await this.$axios.$get('/public/company/name_list/', {
          params,
        })
        cb(
          results.data.map((item) => {
            return {
              value: item.name,
              slug: item.company_slug,
            }
          })
        )
      } catch (error) {}
    }, 200),
    async handleSelectCompany(item) {
      this.company = item
      await this.$store.dispatch('company/company/resetAll')
      this.$router.push(`/company/${item.slug}`)
    },
  },
}
</script>

<style lang="scss">
.home-page {
  .intro-banner {
    position: relative;
    width: 100%;
    padding: 105px 0;
    display: flex;
    margin-top: 122px;
    color: #fff;
    @media (max-width: 768px) {
      margin-top: 122px;
    }
    .row-text {
      h1 {
        font-size: 30px;
      }
    }
    .row-search {
      margin-top: 80px;
      .search-wrap {
        display: flex;
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        .el-form {
          width: 100%;
          .el-input__inner {
            border: none !important;
          }
          .el-form-item {
            margin-bottom: 0;
            border-left: 1px solid #e4e4e4;
            padding: 10px 12px;
            width: 50%;
            .el-input,
            .el-form-item__content,
            input {
              width: 100%;
            }
            input {
              padding-right: 40px;
            }
            .search-field {
              .field-title {
                background: $--color-primary;
                line-height: 22px;
                padding: 5px 10px;
                border-radius: 4px;
                transform: translateY(calc(-100% - 15px));
                position: absolute;
                right: -22px;
              }
              i {
                font-size: 20px;
                color: #b0b0b0;
              }
            }
          }
          .el-form-item:last-child {
            border: none;
          }
          .btn-search {
            width: 10%;
          }
          .is-error {
            input::placeholder,
            input {
              color: #f71735;
              font-weight: 500;
            }
            .el-form-item__error {
              display: none;
            }
          }
        }
      }
    }
    .background-image {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 100% 60%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 10;
      overflow: hidden;
      &.image {
        background-image: url('/images/home-background.webp');
      }
      .transparent {
        background-color: #1e3142;
        opacity: 0.76;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
      }
    }
    .row-stats {
      .intro-stats {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        li {
          margin-left: 35px;
          padding-left: 35px;
          border-left: 1px solid #e0e0e0;
          text-align: center;
          strong {
            font-weight: 500;
            color: #fff;
            font-size: 28px;
            margin-bottom: 10px;
            display: block;
            font-size: 18px;
          }
          > span {
            display: block;
            font-weight: normal;
            color: #fff;
            font-size: 15px;
          }
        }
        li:last-child {
          border: none;
        }
      }
    }
  }
  @media (max-width: 420px) {
    .intro-banner {
      height: auto;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .container {
      padding: 10px;
      .row-text {
        text-align: center;
      }
      .row-search {
        margin-top: 20px;
        .search-wrap {
          background: transparent !important;
          box-shadow: none !important;
          .el-form {
            flex-direction: column;
            .el-form-item {
              padding: 5px 12px !important;
              width: calc(100% - 20px) !important;
              background: #fff;
              margin-bottom: 20px !important;
              border-radius: 4px;
              .field-title {
                display: none;
              }
            }
          }
          .btn-search {
            background: transparent;
            button {
              width: 100%;
            }
          }
        }
      }

      .intro-stats {
        justify-content: center;
        li {
          margin-left: 15px !important;
          padding-left: 5px !important;
          width: 100%;
          text-align: center;
          span {
            font-size: 13px;
          }
        }
      }
    }
    .desc {
      margin-right: 10px;
      margin-top: -10px;
    }
  }
}
</style>
