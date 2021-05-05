<template>
  <el-select v-model="select" :placeholder="placeholder" class="full-width">
    <el-option
      v-for="item in applyMethodOptions"
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
      applyMethodOptions: [
        {
          value: 'CO_STAFF',
          label: 'کارمندان شرکت',
        },
        {
          value: 'CO_SITE',
          label: 'سايت خود شرکت',
        },
        {
          value: 'JOB_SITE',
          label: 'سايت‌های کاريابی',
        },
        {
          value: 'EMAIL',
          label: 'ایمیل',
        },
        {
          value: 'FRIEND',
          label: 'دوستان و آشنايان',
        },
        {
          value: 'LINKEDIN',
          label: 'لینکدین',
        },
        {
          value: 'FESTIVAL',
          label: 'نمايشگاه',
        },
        {
          value: 'EVENT',
          label: 'رویداد و همايش',
        },
        {
          value: 'OTHER',
          label: 'سایر',
        },
      ],
      select: null,
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.select = newValue
        this.$emit('input', newValue)
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
