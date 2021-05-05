<template>
  <div class="top">
    <div class="meta layout-h layout-justified">
      <div class="skill layout-h layout-center">
        <i class="fa fa-briefcase ml-5" />
        <span class="text">
          {{ interview.job.name }}
        </span>
      </div>
      <div class="state">
        <span class="text">
          {{ iterviewStatusString(interview.status) }}
        </span>
      </div>
    </div>
    <div v-if="details" class="meta">
      <div class="row layout-h layout-justified mt-15">
        <div class="item">
          <span class="text"> نحوه درخواست شغل: </span>
        </div>
        <div class="item">
          <span class="text">
            {{ applyMethodString(interview.apply_method) }}
          </span>
        </div>
      </div>
      <div class="row">
        <UserRating :data="interview" class="mt-10" />
      </div>
    </div>
  </div>
</template>

<script>
import UserRating from '@/components/Shared/UserRating'

export default {
  components: {
    UserRating,
  },
  props: {
    interview: {
      type: Object,
      required: true,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
