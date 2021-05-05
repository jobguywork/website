<template>
  <div class="content-tab rtl">
    <client-only>
      <gallery :images="images" :index="index" @close="index = null" />
    </client-only>
    <div class="gallery layout-h layout-wrap">
      <div
        v-for="(image, imageIndex) in images"
        :key="imageIndex"
        :style="{ backgroundImage: 'url(' + image.href + ')', height: '300px' }"
        class="image"
        @click="index = imageIndex"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
  data() {
    return {
      index: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.gallery {
  .image {
    margin: 10px;
    background-size: cover;
    cursor: pointer;
    width: calc(33.33333333333333% - 20px);
    @media (max-width: 740px) {
      margin: 5px !important;
      width: calc(50% - 10px);
      height: 150px !important;
    }
  }
}
</style>
