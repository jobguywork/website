<template>
  <el-select v-model="select" :placeholder="placeholder" class="full-width">
    <el-option
      v-for="item in responseTimeOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true,
    },
    placeholder: {
      type: String,
      default: 'انتخاب کنید',
    },
  },
  data() {
    return {
      responseTimeOptions: [
        {
          value: '1WEEK',
          label: 'کمتر از یک هفته',
        },
        {
          value: '2WEEK',
          label: 'کمتر از دو هفته',
        },
        {
          value: '1MONTH',
          label: 'کم تر از یک ماه',
        },
        {
          value: 'MORE',
          label: 'بیشتر از یک ماه',
        },
      ],
      select: null,
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.select = newValue
      }
    },
    select(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    },
  },
  created() {
    this.select = this.value
  },
}
</script>

<style lang="scss" scoped></style>
