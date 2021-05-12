<template>
  <div class="upload">
    <client-only>
      <VueCoreImageUpload
        crop="local"
        resize="local"
        :crop-ratio="cropRatio"
        :url="server"
        :data="headers"
        :input-of-file="inputOfFile"
        :crop-btn="cropBtn"
        :extensions="extensions"
        :compress="compress"
        :min-width="minWidth"
        :max-width="maxWidth"
        credentials
        @imageuploaded="onCrpoServerImageUploaded"
      >
        <div v-if="cropSrc" class="upload--image cursor-pointer">
          <ElButton
            v-if="value"
            class="upload--image__remove"
            circle
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="onRemoveImage"
          />
          <ElAvatar :size="100" fit="cover" :src="mediaUrl(cropSrc)" />
        </div>
        <div v-else class="upload--image cursor-pointer">
          <ElAvatar :size="100" fit="cover" src="/images/no-image.png" />
        </div>
      </VueCoreImageUpload>
    </client-only>
  </div>
</template>

<script>
import { UPLOAD_URL } from '@/config/app.js'

export default {
  props: {
    value: {
      required: true,
      default: '',
    },
    minWidth: {
      type: Number,
      default: 200,
    },
    maxWidth: {
      type: Number,
      default: 200,
    },
    compress: {
      type: Number,
      default: 5,
    },
    extensions: {
      type: String,
      default: 'png,jpeg,jpg',
    },
    inputOfFile: {
      type: String,
      default: 'uploadfile',
    },
    cropRatio: {
      type: String,
      default: '1:1',
    },
  },
  data() {
    return {
      cropBtn: {
        ok: 'بارگذاری تصویر',
        cancel: 'لغو',
      },
      server: UPLOAD_URL,
      headers: {
        uid: null,
      },
    }
  },
  computed: {
    cropSrc: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    $isLogin: {
      immediate: true,
      handler(isLogin) {
        if (isLogin) this.headers.uid = this.$user.nick_name
      },
    },
  },
  methods: {
    onCrpoServerImageUploaded(res) {
      if (res.success) {
        this.cropSrc = res.path
      }
    },
    onRemoveImage() {
      this.cropSrc = null
    },
  },
}
</script>

<style lang="scss" scoped>
.upload {
  min-height: 100px;
  &--image {
    position: relative;
    width: 100px;
    &__remove {
      position: absolute;
      right: 5px;
      top: 5px;
      z-index: 2;
    }
  }
}
</style>
