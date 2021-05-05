<template>
  <div class="crop-wrap layout-h layout-center layout-justified">
    <el-button size="mini" type="primary" @click="toggleShow">
      {{ btnName }}
    </el-button>
    <image-crop
      v-model="show"
      :height="height"
      lang-type="fa"
      :lang-ext="langFa"
      :url="baseUrl"
      :width="width"
      :with-credentials="withCredentials"
      :params="headers"
      img-format="jpg"
      field="uploadfile"
      @crop-success="cropSuccess"
      @crop-upload-fail="cropUploadFail"
      @crop-upload-success="cropUploadSuccess"
    />
    <div v-if="preview && value" class="preview">
      <el-button
        v-if="value"
        class="remove"
        circle
        icon="el-icon-delete"
        size="mini"
        type="danger"
        @click="removeImage"
      />
      <img v-if="value" :src="mediaUrl(value)" class="rounded" />
    </div>
  </div>
</template>

<script>
import { UPLOAD_URL, MEDIA_URL } from '@/config/app.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    defaultImage: {
      type: String,
      default: '',
    },
    btnName: {
      type: String,
      default: 'انتخاب تصویر',
    },
    preview: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 48,
    },
    height: {
      type: Number,
      default: 48,
    },
  },
  data() {
    return {
      baseUrl: UPLOAD_URL,
      imgDataUrl: '',
      show: false,
      headers: {
        uid: null,
      },
      withCredentials: false,
      langFa: {
        hint: 'برای آپلود تصویر کلیک یا تصویر را درگ کنید.',
        loading: 'در حال آپلود....',
        noSupported:
          'مرورگر پشتیبانی نمی شود ، لطفاً از IE10 + یا سایر مرورگرها استفاده کنید',
        success: 'بارگذاری با موفقیت انجام شد',
        fail: 'بارگذاری انجام نشد',
        preview: 'پیش نمایش',
        btn: {
          off: 'لغو',
          close: 'بستن',
          back: 'بازگشت',
          save: 'ذخیره',
        },
        error: {
          onlyImg: 'فقط تصویر',
          outOfSize: 'حجم تصویر بیش از اندازه است: ',
          lowestPx: 'اندازه تصویر خیلی کم است. اندازه تصویر باید بیشتر از: ',
        },
      },
    }
  },
  computed: {
    image() {
      return `${MEDIA_URL}${this.value}`
    },
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl) {
      this.headers.uid = this.$user.nick_name
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] response  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(response) {
      this.$emit('input', response.path)
      // this.$msg
      //   .success()
      //   .setTitle('Upload')
      //   .setMessage('Upload success.')
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail() {
      this.show = false
    },
    removeImage() {
      this.$emit('input', '')
    },
  },
}
</script>

<style lang="scss">
.crop-wrap {
  background: #fdfcfc;
  border: 1px solid #dcdfe6;
  padding: 10px;
  border-radius: 4px;
  min-height: 150px;
  .preview {
    position: relative;
    min-width: 140px;
    min-height: 140px;
    .remove {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    img {
      border-radius: 5px;
      min-width: 120px;
      min-height: 120px;
    }
    @media (max-width: 420px) {
      img {
        width: 80px;
      }
    }
  }
}
</style>
