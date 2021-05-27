<template>
  <el-aside
    :class="{ activeSearchMobile: visibleSearchMobile }"
    class="sidebar"
    width="320px"
  >
    <el-form class="content-sidebar rtl" @submit.native.prevent="onSubmit">
      <div class="close-search hidden-sm-and-up" @click="onCloseSearch">
        <i class="el-icon-close" />
      </div>
      <!-- name company -->
      <div class="filter mb-15">
        <div class="title mb-10">شرکت</div>
        <div class="content">
          <el-input
            v-model="filters.name"
            placeholder="نام شرکت"
            prefix-icon="el-icon-search"
            size="small"
          />
        </div>
      </div>
      <!-- /name company -->
      <!-- location -->
      <div class="filter mb-15">
        <div class="title mb-10">شهر</div>
        <div class="content">
          <City v-model="filters.city" class="full-width" />
        </div>
      </div>
      <!-- /location -->
      <!-- location -->
      <div class="filter mb-15">
        <div class="title mb-10">دسته شغلی</div>
        <div class="content rtl">
          <Industry v-model="filters.industry" class="full-width" />
        </div>
      </div>
      <!-- /location -->
      <!-- salary -->
      <div class="filter salary mb-15">
        <div class="title layout-h layout-justified mb-20">
          <span>حقوق ماهانه</span>
          <div class="preview">
            {{ amountSalary[0] }}-{{ amountSalary[1] }} میلیون
          </div>
        </div>
        <div class="content ltr">
          <el-slider
            v-if="amountSalaryAdvanced === false"
            v-model="amountSalary"
            :step="0.1"
            :min="0"
            :max="100"
            range
            @change="onChangeSalary"
          />
          <div class="advanced layout-v">
            <el-switch
              v-model="amountSalaryAdvanced"
              active-text="دقیق"
              inactive-text="ساده"
              size="mini"
            />
            <div
              v-if="amountSalaryAdvanced === true"
              class="advanced-fields layout-h layout-justified mt-10"
            >
              <div class="input">
                <el-input
                  v-model="filters.salary_avg_gte"
                  :step="0.1"
                  :min="0"
                  :max="100"
                  size="mini"
                  type="number"
                />
              </div>
              <div class="input">
                <el-input
                  v-model="filters.salary_avg_lte"
                  :step="0.1"
                  :min="0"
                  :max="100"
                  size="mini"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /salary -->

      <div class="footer">
        <el-button
          :loading="loading"
          class="full-width"
          type="primary"
          native-type="submit"
        >
          جستجو
        </el-button>
      </div>
    </el-form>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
import City from '@/components/Shared/City'
import Industry from '@/components/Shared/Industry'

export default {
  components: {
    City,
    Industry,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      amountSalary: [0, 100],
      amountSalaryAdvanced: false,
    }
  },
  computed: {
    filters: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    ...mapState('theme', ['visibleSearchMobile']),
  },
  methods: {
    onCloseSearch() {
      this.$store.commit('theme/TOGGLE_SEARCH_MOBILE')
    },
    onSubmit() {
      this.$emit('submit', this.filters)
      if (this.$device.isMobile) {
        this.$store.commit('theme/TOGGLE_SEARCH_MOBILE')
      }
    },
    onChangeSalary(salary) {
      this.filters.salary_avg_lte = salary[1]
      this.filters.salary_avg_gte = salary[0]
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  right: 0;
  height: calc(100vh - 62px);
  background: #f2f2f2;
  padding: 20px;
  box-shadow: 0 5px 4px 2px rgba(0, 0, 0, 0.1);
  .content-sidebar {
    height: calc(100vh - 102px);
    padding-bottom: 30px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    .close-search {
      position: absolute;
      left: 0;
      i {
        font-size: 18px;
      }
    }
    .filter {
      .title {
        font-size: 13px;
        font-weight: 400;
      }
    }
    .filter.salary {
      .content {
        padding: 0 10px;
      }
      ::v-deep {
        .el-switch__label * {
          font-size: 12px;
        }
        .advanced-fields {
          .input {
            width: 47%;
          }
        }
      }
    }
    .delete-company {
      ::v-deep {
        .el-checkbox__label {
          font-size: 13px;
          color: red;
        }
      }
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 10px 0;
    z-index: 1;
  }
  @media (max-width: 668px) {
    width: 100% !important;
    display: none;
  }
}
.sidebar.activeSearchMobile {
  display: block;
  top: 0;
  background: #fff;
  z-index: 9999;
  height: 100vh;
  .content-sidebar {
    height: calc(100vh - 60px);
  }
}
</style>
