<template>
  <div>
    <ElRow type="flex" justify="center" align="middle" class="layout-v">
      <ElCol :span="24">
        <ElCard class="mb-50" :body-style="{ padding: '10px' }">
          <div class="content rtl">
            <p>
              حمایت مالی یا دونیشن (Donation) یکی از منابع رایج تامین مالی
              موسسات و سازمانهای غیرانتفاعی است. موسسات غیرانتفاعی، موسساتی
              هستند که بدون دریافت هزینه، به ارائه خدمات رایگان عام‌المنفعه
              می‌پردازند و به نیت درآمدزایی تاسیس نشده‌اند. این موسسات به منظور
              تامین هزینه‌ها و گسترش دامنه فعالیتهای خود، به راهکارهای مختلفی رو
              می‌آورند که یکی از آنها حمایت مالی یا Donation است که امروزه در
              میان موسسات بزرگ بین‌المللی اهمیت بسیاری پیدا کرده و به یکی از
              منابع تامین مالی قابل ملاحظه این سازمان‌ها تبدیل شده است.
            </p>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>

    <div
      id="wallets"
      class="
        wallets
        layout-h layout-justified layout-wrap
        full-width
        mt-30
        rtl
        mt-20
      "
    >
      <div
        v-for="(wallet, walletIndex) of wallets"
        :key="walletIndex"
        class="wallet mb-20"
      >
        <div class="qr-code" @click="index = walletIndex">
          <img :src="`/images/wallet/${wallet.coin}.png`" :alt="wallet.coin" />
        </div>
        <div class="address px-5 ltr">
          <p class="wallet-address px-2">{{ wallet.address }}</p>
          <i class="fa fa-copy" @click="copy(wallet.address)"></i>
        </div>
      </div>
    </div>

    <client-only>
      <gallery
        v-if="images"
        :images="images"
        :index="index"
        @close="index = null"
      />
    </client-only>
  </div>
</template>

<script>
import copy from 'clipboard-copy'

export default {
  props: {
    wallets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      index: null,
    }
  },
  computed: {
    images() {
      return this.wallets.map((wallet) => ({
        href: `/images/wallet/${wallet.coin}.png`,
      }))
    },
  },
  methods: {
    async copy(wallet) {
      try {
        await copy(wallet)
        this.$message({
          message: 'آدرس کپی شد.',
          type: 'success',
        })
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
.wallets {
  .wallet {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    min-width: 23%;
    max-width: 23%;
    position: relative;
    .qr-code {
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    @media (max-width: 740px) {
      min-width: 48%;
      max-width: 48%;
    }

    .address {
      position: relative;
      width: 100%;
      .wallet-address {
        width: calc(100% - 30px);
        background-color: rgb(250, 250, 250);
        border: 1px solid hsl(0, 0%, 90%);
        line-height: 36px;
        border-radius: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: 12px;
      }
    }
  }
}
</style>
