<template>
  <ElCard :body-style="{ padding: '15px' }">
    <ElForm ref="form" :model="form" :rules="rules" label-position="top">
      <ElRow :gutter="20" type="flex">
        <ElCol :xs="24" :sm="24" :md="12">
          <ElFormItem prop="name" label="نام شرکت (فارسی)">
            <ElInput v-model="form.name" placeholder="نام شرکت (فارسی)" />
          </ElFormItem>
        </ElCol>
        <ElCol :xs="24" :sm="24" :md="12">
          <ElFormItem
            prop="name_en"
            class="ltr-input"
            label="نام شرکت (English)"
          >
            <ElInput v-model="form.name_en" placeholder="نام شرکت (English)" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem prop="description" label="درباره شرکت">
        <ElInput
          v-model="form.description"
          placeholder="درباره شرکت"
          type="textarea"
          :rows="6"
        />
      </ElFormItem>

      <ElFormItem prop="site" label="وب سایت شرکت">
        <ElInput
          v-model="form.site"
          class="ltr-input"
          placeholder="وب سایت شرکت"
        />
        <div class="layout-h layout-end-justified">
          <div class="help-block ltr mt-5">Ex:https://jobguy.work</div>
        </div>
      </ElFormItem>

      <ElRow :gutter="20" type="flex">
        <ElCol :xs="24" :sm="12">
          <ElFormItem prop="industry" label="دسته شغلی">
            <Industry
              v-model="form.industry"
              class="full-width"
              placeholder="دسته شغلی"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :xs="24" :sm="12">
          <ElFormItem prop="city" label="شهر">
            <City v-model="form.city" class="full-width" placeholder="شهر" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <ElFormItem v-if="$isLogin" prop="logo" label="لوگو" class="mt-10">
        <client-only>
          <Crop v-model="form.logo" :width="200" :height="200" preview />
        </client-only>
      </ElFormItem>

      <ElFormItem class="mt-30">
        <ElButton type="success" size="small" @click="onSubmit">
          ثبت اطلاعات
        </ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>

<script>
import Industry from '@/components/Shared/Industry'
import City from '@/components/Shared/City'
import Crop from '@/components/Shared/Crop.vue'

export default {
  components: {
    Industry,
    City,
    Crop,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            max: 50,
            message: 'حداکثر طول عنوان 50 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 3,
            message: 'حداقل طول عنوان 3 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        name_en: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            max: 50,
            message: 'حداکثر طول عنوان 50 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 3,
            message: 'حداقل طول عنوان 3 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        description: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            max: 3000,
            message: 'حداکثر طول عنوان 3000 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
          {
            min: 10,
            message: 'حداقل طول عنوان 10 کاراکتر می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        site: [
          {
            type: 'url',
            message: 'آدرس صحیح وارد نمایید.',
            trigger: ['change', 'blur'],
          },
        ],
        industry: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        city: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
        logo: [
          {
            required: true,
            message: 'این فیلد اجباری می باشد.',
            trigger: ['change', 'blur'],
          },
        ],
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    async onSubmit() {
      if (this.$isLogin) {
        const valid = await this.$refs.form.validate()
        if (valid) {
          this.$emit('submit', this.form)
        }
      } else {
        this.$store.commit('theme/TOGGLE_DIALOG')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.help-block {
  border-radius: 4px;
  background-color: #eee;
  display: inline-block;
  padding: 0 10px;
  font-size: 12px;
  line-height: 27px;
  color: #757575;
  cursor: default;
  user-select: none;
}
::v-deep {
  @media only screen and (max-width: 767px) {
    .el-col-xs-24 {
      min-width: 100%;
    }
  }
}
</style>
