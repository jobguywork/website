<template>
  <nuxt-link :to="link">
    <div class="details">
      <div class="logo hidden-xs-only">
        <el-image
          :src="mediaUrl(data.company.logo)"
          :alt="title"
          fit="cover"
          lazy
        />
      </div>
      <div class="description rtl">
        <div class="layout-h layout-justified">
          <h3 class="title">
            {{ title }}
          </h3>
          <div v-if="rate > 0" class="rate ltr hidden-xs-only">
            <el-rate
              v-model="rate"
              :colors="['#F71735', '#F7BA2A', '#20BF55']"
              disabled
              aria-label="امتیاز تجربه"
              :aria-valuetext="rate"
            />
          </div>
        </div>
        <h5 class="company-name">
          {{ data.company.name }}
        </h5>
        <div class="footer">
          {{ data.description }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
      reuired: true,
    },
    type: {
      type: String,
      default: 'review',
    },
  },
  data() {
    return {
      rate: null,
    }
  },
  computed: {
    title() {
      const { company, title } = this.data
      const perfix =
        this.type === 'review' ? 'تجربه کاری در شرکت' : 'تجربه مصاحبه در شرکت'
      return `${perfix} ${company.name}: ${title}`
    },
    link() {
      return `/${this.type}/${this.data.id}/${this.titleToSlug(
        this.data.title
      )}`
    },
  },
  mounted() {
    this.rate = this.data.over_all_rate || this.data.total_rate
  },
}
</script>

<style lang="scss" scoped>
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
      margin-top: 5px;
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
        line-height: 26px;
      }
    }
    .el-button {
      transition: 0.3s;
    }
  }
  .company-name {
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: 500;
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

@media (max-width: 768px) {
  a {
    padding: 15px;
    .title {
      font-size: 14px !important;
    }
  }
}
</style>
