<template>
  <div class="review">
    <div class="details layout-h">
      <div class="logo hidden-xs-only">
        <el-image
          :src="mediaUrl(data.company.logo)"
          :alt="title"
          fit="cover"
          lazy
        />
      </div>
      <div class="description rtl">
        <div class="top layout-h layout-justified">
          <h2 class="title">
            <nuxt-link :to="link">
              {{ title }}
            </nuxt-link>
          </h2>
          <div v-if="rate > 0" class="rate ltr hidden-xs-only">
            <ElRate
              v-model="rate"
              :colors="['#F71735', '#F7BA2A', '#20BF55']"
              disabled
              aria-label="امتیاز تجربه"
              :aria-valuetext="rate"
            />
          </div>
        </div>
        <div class="meta layout-h">
          <div class="date ml-5">
            {{ data.created | timeAgo }}
          </div>
          <ElDivider direction="vertical" />
          <h5 class="company-name">
            {{ data.company.name }}
          </h5>
        </div>

        <div class="footer">
          {{ data.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
      required: true,
    },
    type: {
      type: String,
      default: 'REVIEW',
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
      const prefix =
        this.type === 'REVIEW' ? 'تجربه کاری در شرکت' : 'تجربه مصاحبه در شرکت'
      return `${prefix} ${company.name}: ${title}`
    },
    link() {
      return `/${this.type.toLowerCase()}/${this.data.id}/${this.titleToSlug(
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
.review {
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
      ::v-deep {
        img {
          min-width: 50px;
          padding: 5px;
        }
      }
    }
    .description {
      flex: 1;
      padding-top: 3px;
      width: calc(100% - 80px);
      .top {
        position: relative;
        @media (max-width: 768px) {
          flex-direction: column;
        }
        .title {
          width: calc(100% - 200px);
          font-size: 18px;
          line-height: 28px;
          color: #333;
          margin: 0;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          a {
            color: #006aee;
            &:hover {
              text-decoration: underline;
            }
          }
          @media (max-width: 768px) {
            width: 100%;
            white-space: unset;
            overflow: unset;
            text-overflow: unset;
          }
        }
      }

      .meta {
        .date {
          font-size: 10px;
        }
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
.review:nth-child(2n) {
  background-color: #f8f8f8;
}
.review:before {
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
.review:hover {
  .el-button {
    background: $--color-primary;
    color: #fff;
  }
}
.review:hover::before {
  background: $--color-primary;
  opacity: 1;
}

@media (max-width: 768px) {
  .title {
    font-size: 14px !important;
  }
}
</style>
