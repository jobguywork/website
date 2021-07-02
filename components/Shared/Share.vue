<template>
  <i class="share-button fa fa-share-alt fa-lg" @click="share" />
</template>

<script>
import copy from 'clipboard-copy'

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    async share() {
      const { title, url } = this
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        })
      } else {
        copy(url)
        this.$message({
          message: 'لینک کپی شد.',
          type: 'success',
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
