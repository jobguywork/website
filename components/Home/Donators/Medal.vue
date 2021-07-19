<template>
  <div class="medal">
    <img :src="image" alt="medal" width="32" height="32" />
  </div>
</template>

<script>
export default {
  props: {
    rank: {
      type: Number,
      required: true,
    },
  },
  computed: {
    image() {
      let rank = this.rank
      if (rank === 1) {
        rank = 'starr'
      } else if (rank >= 2 && rank <= 8) {
        rank = 1
      } else if (rank >= 8 && rank <= 16) {
        rank = 2
      } else {
        rank = 3
      }

      return `/images/medal/${rank}.png`
    },
  },
}
</script>

<style lang="scss" scoped>
.medal {
  position: absolute;
  top: -2px;
  left: 0;
  img {
    width: 32px;
    height: auto;
  }
}
</style>
