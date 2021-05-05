<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="layout-v">
      <ElCol :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
        <ElCard class="mb-50" :body-style="{ padding: '10px' }">
          <div class="content rtl">
            <p>
              ایده این کار از #سازمان_بد در سال 96 به ذهن ما خطور کرد. یکی از
              کاربران در این رابطه گفته:
            </p>

            <p class="q">
              «متاسفانه فرهنگ غلطی بین ما ایرانی‌ها وجود داره که خیلی مایل
              نیستیم درآمدمون رو به کسی بگیم. واقعا این فرهنگ توسط سرمایه‌دارها
              بین مردم رواج پیدا کرده، تا قشر کارگر و کارمند از حقوق همدیگه
              اطلاعی نداشته باشن و اعتراض نکنن که چرا فلانی بیشتر از من حقوق
              می‌گیره. چقدر خوبه که از این دست اطلاعات زیاد منتشر بشه و خودمون
              هم سعی کنیم با صداقت و دلسوزی به همکارامون اطلاعات کافی بدیم که
              هیچکس نتونه بهمون ظلم کنه.»
            </p>

            <p>ما کی هستیم؟</p>

            <p>
              ما چند تا دوست هستیم که با مشکل ناقص بودن اطلاعات درباره
              جامعه‌کاری در ایران برخوردیم. هدف ما جمع‌آوری اطلاعات در رابطه با
              تجربه‌کاری برای بهبود در انتخاب مسیر شغلی, تعیین حقوق و شناخت شرکت
              هاست. اگر شما هم مثل ما خلا اطلاعات در رابطه با تجربه‌کاری در
              ایران را حس کردید به ما بپیوندید.
            </p>

            <p>جاب گای؟</p>

            <p>
              اگر&nbsp;&nbsp; barney stinson در سریال How I met your
              mother&nbsp; رو بشناسید شاید این دیالوگ براتون آشنا باشه
            </p>

            <p class="image layout-h layout-center-center mt-20">
              <img
                src="/images/about/suit_up.png"
                alt="barney stinson"
                height="470"
              />
            </p>

            <p>
              <br />
              اند وی آر یور جاب گای :)
            </p>

            <p>
              اگر شما هم ایده‌ای برای بهبود جامعه کاری در ایران دارید با ما در
              میان بگذارید. در آخر تجربه‌کاری خودتون رو به اشتراک بگذارید و با
              معرفی ما به همکاران و دوستاتون از ما حمایت کنید.
            </p>
          </div>
        </ElCard>
      </ElCol>
    </el-row>
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
        class: 'page-about',
      },
      title: 'درباره ما',
      meta,
    }
  },
}
</script>

<style lang="scss" scope>
.content {
  font-size: 13px;
  line-height: 30px;
  .q {
    margin: 5px 25px;
    display: flex;
  }
  .image {
    width: 100%;
    text-align: center;
    img {
      width: 70%;
      height: auto;
      @media (max-width: 720px) {
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss">
.page-about {
  min-height: 900px;
  margin-top: 170px;
}
</style>
