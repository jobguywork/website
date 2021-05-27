<template>
  <nuxt-link :to="link">
    <div class="details">
      <div class="logo hidden-xs-only">
        <!-- <img :src="mediaUrl(logo)" :alt="name" /> -->
        <el-image :src="mediaUrl(logo)" :alt="title" fit="cover" lazy />
      </div>
      <div class="description">
        <h3 class="title">
          {{ title }}
        </h3>
        <div class="footer">
          <ul>
            <el-tooltip
              class="item"
              effect="dark"
              content="مجموع تجربه‌های کاری و مصاحبه"
              placement="top-start"
            >
              <li>
                <i class="fa fa-comments" />
                <span class="text"> {{ countReviews }} تجربه </span>
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
                    {{ salary }}
                  </span>
                </div>
              </li>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="تعداد اعضای تیم"
              placement="top-start"
            >
              <li>
                <div class="layout-h">
                  <i class="fa fa-users" />
                  <span class="text mr-5">
                    {{ teamSizeString(teamSize) }}
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
              <li>
                <div class="layout-h">
                  <i class="fa fa-calendar" />
                  <span class="text mr-5">
                    {{ founded }}
                  </span>
                </div>
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
                  {{ location }}
                </span>
              </li>
            </el-tooltip>
            <li class="rate-item">
              <div class="rate">
                <el-rate
                  v-model="rateData"
                  :colors="['#F71735', '#F7BA2A', '#20BF55']"
                  allow-half
                  disabled
                  aria-label="امتیاز شرکت"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-button> جزئیات </el-button>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
      required: true,
    },
    logo: {
      type: String,
      default: null,
      required: true,
    },
    name: {
      type: String,
      default: null,
      required: true,
    },
    salary: {
      type: String,
      default: null,
      required: true,
    },
    teamSize: {
      type: String,
      default: null,
      required: true,
    },
    founded: {
      type: String,
      default: null,
      required: true,
    },
    countReviews: {
      type: Number,
      default: null,
      required: true,
    },
    location: {
      type: String,
      default: null,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      rateData: 0,
    }
  },
  computed: {
    title() {
      return `شرکت ${this.name}`
    },
  },
  mounted() {
    this.rateData = this.rate
  },
}
</script>

<style lang="scss"></style>
