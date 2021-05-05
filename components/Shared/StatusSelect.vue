<template>
  <el-select v-model="select" :placeholder="placeholder" class="full-width">
    <el-option
      v-for="item in statusOptions"
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
      statusOptions: [
        {
          value: 'ACCEPT',
          label: 'پذیرفته شدم و قبول کردم',
        },
        {
          value: 'WORKING',
          label: 'پذیرفته شدم اما خودم رد کردم',
        },
        {
          value: 'REJECT',
          label: 'پذیرفته نشدم',
        },
        {
          value: 'NORESPONSE',
          label: 'هنوز جواب ندادن',
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
