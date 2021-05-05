<template>
  <div class="sort rtl layout-h layout-justified">
    <div class="wrap-sort">
      <label class="ml-20 hidden-xs-only" for="sort"> مرتب سازی بر اساس </label>
      <el-select
        v-model="order_by"
        size="small"
        placeholder="مرتب سازی بر اساس"
      >
        <el-option
          v-for="item in optionsSort"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="left layout-h">
      <strong class="hidden-xs-only"> {{ total }} شرکت </strong>
      <div class="display mr-15">
        <i
          :class="{ active: visibleSearchMobile }"
          class="fa fa-search ml-5 hidden-sm-and-up"
          @click="togeleSearch"
        />
        <i
          :class="[display === 'grid' ? 'active' : '']"
          class="fa fa-th ml-5 hidden-xs-only"
          @click="onChangeDisplay('grid')"
        />
        <i
          :class="[display === 'list' ? 'active' : '']"
          class="fa fa-list ml-5 hidden-xs-only"
          @click="onChangeDisplay('list')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    total: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      optionsSort: [
        {
          value: 'HOTTEST',
          label: 'بیشترین تجربه کاری',
        },
        {
          value: 'SALARY',
          label: 'حقوق',
        },
        {
          value: 'RATE',
          label: 'امتیاز',
        },
      ],
      display: 'grid',
    }
  },
  computed: {
    order_by: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    ...mapState('theme', ['visibleSearchMobile']),
  },
  watch: {
    order_by: {
      deep: true,
      handler() {
        this.$emit('sort')
      },
    },
  },
  methods: {
    togeleSearch() {
      this.$store.commit('theme/TOGGLE_SEARCH_MOBILE')
    },
    onChangeDisplay(dispaly) {
      this.display = dispaly
      this.$emit('dispaly', dispaly)
    },
  },
}
</script>

<style lang="scss">
.companies-page {
  .companies {
    .sort {
      width: 100%;
      background-color: #f2f2f2;
      border-radius: 4px;
      padding: 15px 25px;
      position: relative;
      line-height: 28px;
      height: 59px;
      align-items: center;
      color: #666;
      .display {
        i {
          padding: 5px;
          cursor: pointer;
        }
        i.active {
          background: $--color-primary;
          border-radius: 3px;
          color: #fff;
        }
      }
      @media (max-width: 420px) {
        padding: 0 7px;
        .wrap-sort {
          width: 170px;
        }
      }
    }
  }
}
</style>
