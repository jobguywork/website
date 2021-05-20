<template>
  <div class="wrap layout-v layout-center-center">
    <div class="info-user text-center mt-20">
      <strong class="full-name">
        {{ fullName }}
      </strong>
      <div class="cat mt-10">
        {{ skill }}
      </div>
    </div>
    <div class="review-text">
      <p>{{ review }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fullName: {
      type: String,
      default: null,
      required: true,
    },
    skill: {
      type: String,
      default: null,
      required: true,
    },
    review: {
      type: String,
      default: null,
      required: true,
    },
  },
}
</script>
