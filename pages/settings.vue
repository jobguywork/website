<template>
  <div class="container">
    <div class="settings-wrap">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="120px"
      >
        <el-tabs type="border-card" tab-position="right" style="height: 240px">
          <!-- Information -->
          <el-tab-pane class="information">
            <span slot="label">
              <div class="rtl">
                <span class="label"> مشخصات </span>
              </div>
            </span>
            <div class="tab-content">
              <div class="layout-h info-tab">
                <div class="form-wrap">
                  <div class="item rtl">
                    <el-form-item label="نام" prop="first_name">
                      <el-input v-model="form.first_name" placeholder="نام" />
                    </el-form-item>
                  </div>
                  <div class="item rtl">
                    <el-form-item label="نام خانوادگی" prop="last_name">
                      <el-input
                        v-model="form.last_name"
                        placeholder="نام خانوادگی"
                      />
                    </el-form-item>
                  </div>
                  <!-- <div class="item rtl">
                    <el-form-item label="نام مستعار" prop="nick_name">
                      <el-input v-model="form.nick_name" placeholder="نام مستعار" />
                    </el-form-item>
                  </div> -->
                  <!-- <div class="item rtl">
                    <el-form-item label="بیوگرافی" prop="biography">
                      <el-input v-model="form.biography" type="textarea" :rows="2" placeholder="بیوگرافی" />
                    </el-form-item>
                  </div> -->
                </div>
                <div class="change-avatar text-left">
                  <client-only>
                    <Crop v-model="form.profile_image" preview />
                  </client-only>
                </div>
              </div>
              <div class="btn-save ltr text-left">
                <el-button
                  :loading="loadingBtn"
                  size="mini"
                  type="primary"
                  @click="handleInfoSubmit"
                >
                  بروز رسانی
                </el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="user && !user.mobile_confirmed">
            <span slot="label">
              <div class="rtl">
                <span class="label"> تایید موبایل </span>
              </div>
            </span>
            <div class="tab-content">
              <VerifyForm />
            </div>
          </el-tab-pane>
          <!-- /Information -->
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import Crop from '@/components/Shared/Crop.vue'
import VerifyForm from '~/components/Auth/VerifyForm.vue'

export default {
  components: {
    Crop,
    VerifyForm,
  },
  middleware: 'authenticated',
  data() {
    return {
      rules: {
        first_name: [
          {
            min: 3,
            max: 100,
            message: 'طول این فیلد باید بین 3 الی 100 کاراکتر باشد.',
            trigger: 'blur',
          },
        ],
        last_name: [
          {
            min: 3,
            max: 100,
            message: 'طول این فیلد باید بین 3 الی 100 کاراکتر باشد.',
            trigger: 'blur',
          },
        ],
      },
      form: {
        first_name: null,
        last_name: null,
        profile_image: null,
      },
      loadingBtn: false,
    }
  },
  head() {
    return {
      ...this.$seo({
        title: 'تنظیمات پروفایل',
      }),
      bodyAttrs: {
        class: 'settings-page',
      },
    }
  },
  mounted() {
    this.form.first_name = this.$user.first_name
    this.form.last_name = this.$user.last_name
    // this.form.nick_name = this.$user.nick_name
    this.form.profile_image = this.$user.profile_image
  },
  methods: {
    async handleInfoSubmit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.loadingBtn = true
        try {
          const res = await this.$axios.$patch(
            '/authnz/update_profile/',
            omitBy(this.form, isEmpty)
          )

          this.$cookies.set('user', res.data)
          this.$notify({
            message: 'اطلاعات شما با موفقیت بروز شد.',
            type: 'success',
          })
        } catch (error) {
        } finally {
          this.loadingBtn = false
        }
      }
    },
  },
}
</script>

<style lang="scss">
.settings-wrap {
  margin-top: 150px;
  padding-bottom: 50px;
  .tab-content {
    padding: 20px;
  }
  .el-tabs__nav-scroll {
    .el-tabs__item {
      .label {
        user-select: none;
      }
    }
  }
  .el-tabs__content {
    direction: rtl;
  }
  .information {
    .form-wrap {
      width: 70%;
    }
    .change-avatar {
      width: 30%;
      padding-right: 20px;
      .btn-save {
        height: 100%;
        button {
          position: absolute;
          bottom: 36px;
        }
      }
    }
  }
}
@media (max-width: 740px) {
  .settings-wrap {
    padding: 8px;
    .el-tabs {
      .el-tabs__nav-scroll {
        .label {
          display: none;
        }
      }
    }
    .information {
      .form-wrap {
        width: 100%;
      }
      .change-avatar {
        width: 100%;
        text-align: right;
        padding-right: 0;
      }
      .info-tab {
        flex-direction: column;
      }
      @media (max-width: 720px) {
        .btn-save {
          width: 100%;
          margin-top: 10px;
          .el-button {
            width: 100%;
          }
        }
      }
    }
    .el-tabs--border-card {
      min-height: 370px !important;
    }
  }
}
</style>
