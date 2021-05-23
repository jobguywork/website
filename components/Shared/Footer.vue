<template>
  <footer id="footer" class="rtl">
    <!-- Footer Top Section -->
    <div class="footer-top-section">
      <div class="container">
        <ElRow type="flex">
          <ElCol :span="24">
            <!-- Footer Rows Container -->
            <div class="footer-rows-container">
              <!-- Left Side -->
              <div class="footer-rows-left">
                <div class="footer-row">
                  <div class="footer-row-inner footer-logo">
                    <img src="/images/logo.svg" alt="جاب گای" />
                  </div>
                </div>
              </div>

              <!-- Right Side -->
              <div class="footer-rows-right">
                <!-- Social Icons -->
                <div class="footer-row">
                  <div class="footer-row-inner">
                    <ul class="footer-social-links">
                      <li>
                        <a
                          href="https://t.me/jobguy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i class="fa fa-telegram"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/JobguyIR"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i class="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/jobguy/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i class="fa fa-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/jobguywork/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i class="fa fa-github"></i>
                        </a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Footer Rows Container / End -->
          </ElCol>
        </ElRow>
      </div>
    </div>
    <!-- Footer Top Section / End -->

    <!-- Footer Middle Section -->
    <div class="footer-middle-section">
      <div class="container">
        <ElRow type="flex" class="layout-wrap" :gutter="30">
          <!-- Links -->
          <ElCol :xs="24" :md="6">
            <div class="footer-links">
              <h3>جاب‌گای چیست؟</h3>
              <div class="content">
                اونجا وضعیت چطوریه؟ یه سوال به همین کلیت و ابهام معمولا وقتی
                برای یه شرکت رزومه می‌فرستیم این سوال کلی و بزرگ برای همه پیش
                میاد.اونجا وضعیت چطوریه؟! دونستن تجربه‌های دیگران از کار یا
                مصاحبه تو شرکتای مختلف می‌تونه به همه کمک کنه به خود سازمان که
                بازخوردها رو مشاهده کنه به کارجوها که با چشم باز تصمیم بگیرن به
                نیروهای فعلی که حواسشون رو جمع کنن و ...
              </div>
            </div>
          </ElCol>

          <!-- Links -->
          <ElCol :xs="24" :md="6">
            <div class="footer-links">
              <h3>کارفرمایان</h3>
              <ul>
                <li>
                  <a href="https://hr.jobguy.work/" target="_blank">
                    <span>پنل منابع انسانی</span>
                  </a>
                </li>
                <li>
                  <nuxt-link to="/contact">
                    <span>تماس با ما</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </ElCol>

          <!-- Links -->
          <ElCol :xs="24" :md="6">
            <div class="footer-links">
              <h3>مشارکت در توسعه</h3>
              <ul>
                <li>
                  <a
                    href="https://github.com/jobguywork/backend"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>بک اند</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jobguywork/website"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>وب سایت</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jobguywork/hrwebsite"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>پنل منابع انسانی</span>
                  </a>
                </li>
                <li>
                  <nuxt-link to="/donate#wallets">
                    <span>حمایت مالی</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </ElCol>

          <!-- Links -->
          <ElCol :xs="24" :md="6">
            <div class="footer-links">
              <h3>لینک های مفید</h3>
              <ul>
                <li>
                  <nuxt-link to="/companies">
                    <span>شرکت ها</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/company/create">
                    <span>ثبت شرکت جدید</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/faq">
                    <span> سوالات متداول </span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/terms">
                    <span> قوانین </span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/about">
                    <span> درباره ما </span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </ElCol>
        </ElRow>
      </div>
    </div>
    <!-- Footer Middle Section / End -->

    <!-- Footer Copyrights -->
    <div class="footer-bottom-section">
      <div class="container">
        <ElRow type="flex" class="row">
          <ElCol :span="24">
            © {{ year }} - تمامی حقوق برای جاب گای محفوظ است.
          </ElCol>
        </ElRow>
      </div>
    </div>
    <!-- Footer Copyrights / End -->
  </footer>
</template>

<script>
import moment from 'moment-jalaali'

export default {
  data() {
    return {
      year: moment().format('jYYYY'),
    }
  },
}
</script>

<style lang="scss" scoped>
#footer {
  background-color: #252c41;
  color: #858b9f;
  p {
    line-height: 24px;
  }
}

.footer-top-section {
  border-bottom: 1px solid #2e364e;
  .footer-logo img {
    height: 50px;
  }
}

.footer-rows-container {
  display: block;
  height: 96px;
  position: relative;
  z-index: 100;
}

.footer-row {
  padding: 0 40px;
  border-right: 1px solid #2e364e;
  border-left: 1px solid #2e364e;
  float: left;
  height: 100%;
}

.footer-row-inner {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  &.footer-logo {
    position: relative;
    top: auto;
    transform: translateY(0);
    top: 50%;
    position: relative;
    height: 46px;
    img {
      position: relative;
      top: 50%;
    }
  }
}

.footer-row {
  &:first-child {
    padding-left: 0;
    border-left: none;
  }
  &:last-child {
    padding-right: 0;
    border: none;
  }
}

.footer-rows-right {
  .footer-row:first-child {
    padding-left: 40px;
    border-left: 1px solid #2e364e;
  }
  float: right;
  height: 100%;
}

/* Social Icons */

.footer-social-links {
  list-style: none;
  margin: 0 -10px;
  margin-top: 5px;
  padding: 0;
  li {
    display: inline-block;
    padding: 0;
    margin: 0;
    a {
      font-size: 20px;
      padding: 0 10px;
      color: #fff;
      display: inline-block;
      transition: 0.3s;
      opacity: 0.5;
      transform: translate3d(0, -0.5px, 0);
      &:hover {
        opacity: 1;
      }
    }
  }
}

/* Middle Section */

.footer-middle-section {
  padding: 60px 0;
  position: relative;
  z-index: 10;
}

#footer {
  h3,
  h2 {
    font-size: 18px;
    color: #fff;
    margin: 0 0 15px 0;
    padding: 0;
    display: block;
  }
}

.footer-links h3 {
  font-size: 16px;
  color: #fff;
  margin: 0 0 15px 0;
  padding: 0;
  display: block;
}

#footer h3 i {
  position: relative;
  margin-right: 5px;
  top: 2px;
  font-size: 20px;
  font-weight: 400 !important;
}

.footer-links ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin-bottom: 0;
    display: block;
    &:first-child a {
      padding-top: 0;
    }
    &:last-child a {
      padding-bottom: 0;
    }
    a {
      color: #c0c0c0;
      display: block;
      line-height: 25px;
      position: relative;
      z-index: 100;
      padding: 4px 0;
      span {
        display: inline-block;
        position: relative;
      }
      &:hover {
        color: #fff;
      }
      span:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: -4px;
        background-color: $--color-primary;
        height: 2px;
        display: block;
        transition: all 0.25s, opacity 0.2s;
        z-index: -1;
        border-radius: 3px;
        opacity: 0.5;
        width: 0;
      }
      &:hover span:before {
        width: 100%;
        opacity: 1;
      }
    }
  }
}

/* Copyrights */

.footer-bottom-section {
  background: #1b2132;
  padding: 25px 0;
  text-align: center;
  strong {
    color: #fff;
    font-weight: 500;
  }
}

/* Footer Media Queries*/
@media (max-width: 992px) {
  #footer h3 {
    margin-top: 45px;
  }
  .footer-middle-section {
    padding-top: 0;
    padding-bottom: 45px;
  }
}

@media (max-width: 768px) {
  .content-left-offset,
  .content-right-offset {
    padding-left: 15px;
  }
  .footer-rows-container {
    height: auto;
    padding: 20px 0;
  }
  .footer-rows-left,
  .footer-rows-right {
    float: none;
    height: auto;
  }
  .footer-row-inner {
    &.footer-logo {
      img {
        top: 0;
      }
      top: 10;
      position: relative;
      height: 50px;
    }
    position: relative;
    top: 0;
    transform: translateY(0);
  }
  #footer .footer-row {
    padding: 0;
    float: none;
    padding: 20px 0 0 0;
    display: block;
    width: 100%;
    border: none;
  }
  .footer-rows-container {
    .footer-rows-left,
    .footer-rows-right {
      display: block;
    }
  }
}
</style>
