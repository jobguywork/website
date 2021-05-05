<template>
  <div class="container">
    <Wallets class="mt-20" :wallets="wallets" />
    <DonateForm class="mt-20" :wallets="wallets" />
  </div>
</template>

<script>
import DonateForm from '@/components/Donate/DonateForm'
import Wallets from '@/components/Donate/Wallets'
import { DOMAIN_TITLE, WALLETS } from '@/config/app.js'

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
    let meta = []
    meta = [
      {
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        property: 'og:title',
        content: DOMAIN_TITLE,
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ]
    return {
      bodyAttrs: {
        class: 'page-donate',
      },
      title: 'حمایت مالی',
      meta,
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
