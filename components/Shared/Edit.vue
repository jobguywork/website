<template>
  <i class="edit-button fa fa-edit fa-lg" @click="editHandle" />
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
      requred: true,
    },
    type: {
      type: String,
      default: 'review',
      requred: true,
    },
  },
  methods: {
    editHandle() {
      this.$router.push(`/${this.type}/edit/${this.id}`)
    },
  },
}
</script>

<style lang="scss">
.edit-button {
  cursor: pointer;
}
</style>
