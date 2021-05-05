<template>
  <div class="empty text-center layout-h layout-center-center">
    <div class="image">
      <img src="/images/empty.png" alt="empty" />
    </div>
    <div class="content layout-v layout-center-center">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.empty {
  position: relative;
  padding-bottom: 30px;
  line-height: 28px;
  @media (max-width: 740px) {
    .image {
      img {
        width: 75%;
        height: auto;
      }
    }
  }
  .content {
    position: absolute;
    top: 0;
    bottom: -220px;
    margin: auto;
    @media (max-width: 720px) {
      bottom: -140px;
    }
    p {
      margin: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
