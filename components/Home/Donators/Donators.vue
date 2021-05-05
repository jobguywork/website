<template>
  <div class="donators">
    <div class="container layout-v layout-center">
      <div class="title text-center">از ما حمایت کنید</div>
      <div class="description text-center my-20">
        جاب‌گای همواره به کمک‌های شما دلگرم بوده است …
      </div>

      <template v-if="donatorsList.length > 0">
        <nuxt-link to="/donate#wallets" class="el-button el-button--primary">
          حمایت از جاب‌گای
        </nuxt-link>

        <div class="sort layout-h layout-center-center mt-20">
          <span>حامیان ما به ترتیب</span>
          <div class="ltr mr-10">
            <ElRadioGroup v-model="order" size="mini">
              <ElRadioButton label="THE_LAST">‌آخرین پرداخت</ElRadioButton>
              <ElRadioButton label="THE_MOST">بیشترین مبلغ‌</ElRadioButton>
            </ElRadioGroup>
          </div>
        </div>

        <div
          class="list layout-h layout-justified layout-wrap full-width mt-40"
        >
          <Donator
            v-for="(donator, index) of donatorsList"
            :key="index"
            :donator="donator"
            :rank="index + 1"
            :order="order"
            class="mb-25"
          />
        </div>
      </template>

      <div v-else>
        <nuxt-link to="/donate#wallets" class="el-button el-button--primary">
          حمایت از جاب‌گای
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Donator from './Donator'

export default {
  components: {
    Donator,
  },
  props: {
    donators: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      order: 'THE_MOST',
    }
  },
  computed: {
    donatorsList() {
      return this.donators[this.order]
    },
  },
}
</script>

<style lang="scss" scoped>
.donators {
  background: rgba(232, 232, 232, 0.4);
  margin-top: 65px;
  padding: 60px 0;
  color: rgb(60, 72, 88);

  .title {
    font-size: 23px;
  }

  .list {
    .donator {
    }
  }
}
</style>
