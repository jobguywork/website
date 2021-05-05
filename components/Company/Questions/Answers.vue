<template>
  <ul class="answers">
    <Answer v-for="(answer, index) in answers" :key="index" :answer="answer" />
  </ul>
</template>

<script>
import Answer from './Answer'
export default {
  components: {
    Answer,
  },
  props: {
    answers: {
      type: Array,
      default() {
        return []
      },
      required: true,
    },
  },
}
</script>

<style lang="scss">
.answers {
  margin-right: 20px !important;
  margin-top: 20px !important;
}
</style>
