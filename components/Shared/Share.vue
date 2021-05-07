<template>
  <i class="share-button fa fa-share-alt fa-lg" @click="share" />
</template>

<script>
import copy from 'clipboard-copy'

export default {
  props: {
    link: {
      type: String,
      default: null,
      required: true,
    },
  },
  methods: {
    async share() {
      if (navigator.clipboard) {
        try {
          await copy(this.link)
          this.$message({
            message: 'لینک کپی شد.',
            type: 'success',
          })
        } catch (error) {}
      } else {
        this.$message({
          message: 'مرورگر شما پشتیبانی نمی کند.',
          type: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss">
.share-button {
  cursor: pointer;
}
</style>
