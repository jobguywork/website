<template>
  <div class="container full-height">
    <ElRow
      type="flex"
      justify="center"
      align="middle"
      class="contact layout-v layout-center-center"
    >
      <ElCol :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
        <ElCard class="mb-50" :body-style="{ padding: '10px' }">
          <div class="content rtl">
            <img
              src="/images/contact-us.webp"
              alt="ایجاد شرکت جدید"
              height="360"
            />
            <p class="mt-40">
              هر گونه پیشنهاد، انتقاد و کمبود اطلاعات شرکت‌های مد نظرتون رو با
              استفاده از ایمیل زیر با ما در میان بگذارید.
            </p>
            <p>پیشاپیش ممنون :)</p>
            <p>
              <span class="help-block ltr mr-5">jobguyir@gmail.com</span>
            </p>
            <p>
              <span class="help-block ltr mr-5">
                https://twitter.com/JobguyIR
              </span>
            </p>
            <p>
              <span class="help-block ltr mr-5">https://t.me/jobguy</span>
            </p>
            <div class="create-company mt-50">
              <p>
                <i class="fa fa-building-o ml-5"></i>
                برای ثبت شرکت
                <nuxt-link to="/company/create"> اینجا </nuxt-link> کلیک کنید.
              </p>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
import { DOMAIN_TITLE } from '@/config/app.js'

export default {
  head() {
    let meta = []
    meta = [
      {
        property: 'og:site_name',
        content: DOMAIN_TITLE,
      },
      {
        property: 'og:title',
        content: DOMAIN_TITLE,
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ]
    return {
      bodyAttrs: {
        class: 'page-contact',
      },
      title: 'تماس با ما',
      meta,
    }
  },
}
</script>

<style lang="scss" scope>
.contact {
  img {
    max-height: 360px;
    display: block;
    margin: auto;
    @media (max-width: 740px) {
      width: 100%;
      height: auto;
    }
  }
  .content {
    line-height: 28px;
  }
  .create-company {
    font-size: 15px;
    font-weight: 600;
    a {
      color: rgb(81, 1, 255);
    }
  }
  .full-height {
    .company-questions-wrap {
      height: calc(100vh - 155px);
    }
  }
  .help-block {
    border-radius: 4px;
    background-color: #eee;
    display: inline-block;
    padding: 0 10px;
    font-size: 12px;
    line-height: 27px;
    color: #757575;
  }
}
</style>

<style lang="scss">
.page-contact {
  margin-top: 170px;
}
</style>
