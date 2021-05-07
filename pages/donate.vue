<template>
  <div class="container">
    <Wallets class="mt-20" :wallets="wallets" />
    <DonateForm class="mt-20" :wallets="wallets" />
  </div>
</template>

<script>
import DonateForm from '@/components/Donate/DonateForm'
import Wallets from '@/components/Donate/Wallets'
import { WALLETS } from '@/config/app.js'

export default {
  components: {
    Wallets,
    DonateForm,
  },
  asyncData() {
    return {
      wallets: WALLETS,
    }
  },
  head() {
    return {
      ...this.$seo({
        title: 'حمایت مالی',
      }),
      bodyAttrs: {
        class: 'page-donate',
      },
      title: 'حمایت مالی',
    }
  },
}
</script>

<style lang="scss" scope>
.content {
  font-size: 13px;
  line-height: 30px;
}
</style>

<style lang="scss">
.page-donate {
  min-height: 900px;
  margin-top: 170px;
}
</style>
