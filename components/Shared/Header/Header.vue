<template>
  <div id="header-container">
    <NetworkBar />
    <div id="header">
      <div class="container layout-h-reverse layout-justified text-right">
        <div class="right-side layout-h-reverse">
          <div
            :class="{ active: visibleMenu }"
            class="menu-mobile layout-v layout-center-center"
          >
            <i class="fa fa-bars fa-lg" @click="visibleMenu = !visibleMenu" />
          </div>
          <!-- logo -->
          <div id="logo">
            <nuxt-link to="/">
              <logo />
            </nuxt-link>
          </div>
          <!-- /logo -->
          <!-- navigation -->
          <div id="navigation" class="hidden-xs-only">
            <ul
              class="main-nav layout-h-reverse layout-justified layout-center"
            >
              <li>
                <nuxt-link to="/"> خانه </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/companies"> شرکت ها </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/company/create"> ثبت شرکت </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/faq"> سوالات متداول </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/about"> درباره ما </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contact"> تماس با ما </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- /navigation -->
          <!-- search -->
          <div
            class="search layout-v layout-center-center hidden-xs-only"
            style="width: 280px"
          >
            <SearchHeader v-model="companyName" />
          </div>
          <!-- /search -->
        </div>
        <div class="left-side text-left">
          <div class="menu">
            <el-dropdown v-if="$token" @command="onCommand">
              <span class="el-dropdown-link">
                <div class="avatar">
                  <el-image
                    :src="mediaUrl($user.profile_image)"
                    width="40"
                    height="40"
                    :alt="$user.last_name"
                  />
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>نظرات من</el-dropdown-item>
                <el-dropdown-item>تغییر کلمه عبور</el-dropdown-item> -->
                <el-dropdown-item command="myReview">
                  تجربه های من
                </el-dropdown-item>
                <el-dropdown-item command="myInterviews">
                  مصاحبه های من
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  تنظیمات
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  <i class="fa fa-power-off" />
                  <span class="text"> خروج </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-else class="no-token layout-h">
              <a @click="toggleDialog"> ورود / ثبت نام </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ active: visibleMenu }" class="menu-content">
      <ul class="main-nav layout-v layout-center-center">
        <li class="search">
          <SearchHeader
            v-model="companyName"
            @focus="onFocusSearch"
            @blur="onBlurSearch"
          />
        </li>
        <div
          :class="{ hidden: isFocus }"
          class="items layout-v layout-center-center full-width"
        >
          <li
            :class="{ active: activeMenuMobile == 'index' }"
            @click="redirectTo('/', 'index')"
          >
            خانه
          </li>
          <li
            :class="{ active: activeMenuMobile == 'companies' }"
            @click="redirectTo('/companies', 'companies')"
          >
            شرکت ها
          </li>
          <li
            :class="{ active: activeMenuMobile == 'company-create' }"
            @click="redirectTo('/company/create', 'terms')"
          >
            ثبت شرکت
          </li>
          <li
            :class="{ active: activeMenuMobile == 'faq' }"
            @click="redirectTo('/faq', 'faq')"
          >
            سوالات متداول
          </li>
          <li
            :class="{ active: activeMenuMobile == 'about' }"
            @click="redirectTo('/about', 'about')"
          >
            درباره ما
          </li>
          <li
            :class="{ active: activeMenuMobile == 'contact' }"
            @click="redirectTo('/contact', 'contact')"
          >
            تماس با ما
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchHeader from './SearchHeader'
import NetworkBar from './NetworkBar'

export default {
  components: {
    SearchHeader,
    NetworkBar,
  },
  data() {
    return {
      activeMenuMobile: this.$route.name,
      companyName: null,
      isFocus: false,
    }
  },
  computed: {
    visibleMenu: {
      get() {
        return this.$store.state.theme.visibleMenuMobile
      },
      set() {
        this.$store.commit('theme/TOGGLE_MENU_MOBILE')
      },
    },
  },
  mounted() {
    if (this.$route.query.company) {
      this.companyName = this.$route.query.company
    }
  },
  methods: {
    onCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('auth/logout')
          break
        case 'myReview':
          this.$router.push('/profile/reviews')
          break
        case 'myInterviews':
          this.$router.push('/profile/interviews')
          break
        case 'settings':
          this.$router.push('/settings')
          break
      }
    },
    redirectTo(url, menu) {
      this.activeMenuMobile = menu
      this.$router.push(url)
      this.visibleMenu = false
    },
    toggleDialog() {
      this.$store.commit('theme/TOGGLE_DIALOG')
    },
    onFocusSearch() {
      this.isFocus = true
    },
    onBlurSearch() {
      this.isFocus = false
    },
  },
}
</script>

<style lang="scss" scoped>
#header-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.12);
  #header {
    position: relative;
    z-index: 999;
    padding: 0;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.12);
    font-size: 16px;
    height: 62px;
    background-color: #fff;
    .container {
      padding: 0 15px;
      width: 100%;
      max-width: 100%;
      .right-side {
        // width: 80%;
        height: 62px;
        .menu-mobile {
          padding-right: 5px;
          padding-left: 20px;
          i {
            transition: 0.35s;
            background: #eee;
            padding: 14px;
            border-radius: 4px;
          }
        }
        .menu-mobile.active {
          i {
            background: $--color-primary;
            color: #fff;
          }
        }
        .menu-mobile,
        #logo {
          display: flex;
          border-left: 1px solid #e0e0e0;
          height: 62px;
          vertical-align: top;
          padding-left: 15px;
          padding-right: 15px;
          position: relative;
          img {
            height: 42px;
            width: auto;
            top: 50%;
            position: relative;
            transform: translate3d(0, -50%, 0);
          }
        }
        #navigation {
          .main-nav {
            padding-left: 20px;
            height: 62px;
            margin: 0;
          }
          li {
            list-style: none;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 62px;
            transition: 0.35s;
            a {
              transition: 0.35s;
              padding: 0 25px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .nuxt-link-exact-active,
          li:hover {
            background: $--color-primary;
            color: #fff;
            a {
              color: #fff;
            }
          }
        }
      }
      .left-side {
        // width: 20%;
        height: 62px;
        .menu {
          padding-right: 10px;
          display: inline-block;
          height: 100%;
          border-right: 1px solid #e0e0e0;
          text-align: left;
          position: relative;
          width: auto;
          justify-content: center;
          align-items: center;
          display: flex;
          .el-dropdown {
            cursor: pointer;
            top: 0;
            bottom: 0;
            margin: auto;
            padding-right: 5px;
            // position: absolute;
            .el-dropdown-menu__item {
              color: #666;
            }
            .avatar {
              // position: absolute;
              top: 0;
              bottom: 0;
              margin: auto;
              ::v-deep {
                img {
                  border-radius: 100%;
                  width: 45px;
                  height: 45px;
                }
              }
            }
          }
          .no-token {
            a {
              cursor: pointer;
              margin: 0 10px;
              border: solid 2px $--color-primary;
              font-weight: 500;
              font-size: 12px;
              line-height: 26px;
              padding: 0 10px;
              border-radius: 4px;
              user-select: none;
              transition: background-color 0.15s ease-in-out,
                border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }
            a.nuxt-link-exact-active,
            a:hover {
              color: #fff;
              background: $--color-primary;
            }
          }
        }
      }
    }
  }
  .menu-content {
    display: flex;
    height: calc(100vh - 62px);
    width: 100%;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    transition: 0.35s;
    top: -100vh;
    position: fixed;
    .hidden {
      display: none;
    }
    @media (max-width: 768px) {
      height: calc(100vh - 62px);
    }
    .main-nav {
      width: 100%;
      list-style: none;
      padding: 0;
      .search {
        margin-bottom: 10px;
        border: none;
      }
      li {
        line-height: 45px;
        display: block;
        width: 78%;
        text-align: center;
        border: 1px solid #e0e0e0;
        margin-bottom: 10px;
        border-radius: 3px;
        a {
          font-size: 20px;
        }
        &.active {
          background: $--color-primary;
          border: none;
          color: #fff;
        }
      }
    }
  }
  .menu-content.active {
    top: 62px;
    opacity: 1;
    visibility: visible;
    @media (max-width: 768px) {
      top: 62px;
    }
  }
  @media (max-width: 768px) {
    #header,
    .right-side,
    .menu-mobile,
    #logo,
    .left-side {
      height: 62px !important;
    }
    .right-side {
      width: auto;
    }
    #navigation li a {
      font-size: 13px;
      padding: 0 15px !important;
    }
  }
  @media (max-width: 420px) {
    .right-side {
      justify-content: right;
    }
    #logo {
      width: 135px;
      padding-left: 15px !important;
      padding-right: 15px !important;
      text-align: center;
      border-left: 0 !important;
      img {
        width: 100% !important;
        height: auto !important;
      }
    }
    .no-token {
      a {
        font-size: 12px;
        margin: 0 4px !important;
      }
    }
  }
  @media (max-width: 360px) {
    .container {
      padding: 0 5px !important;
    }
    #logo {
      display: none !important;
    }
    .left-side {
      .menu {
        padding-right: 20px !important;
      }
    }
    .menu-mobile {
      padding: 0 10px;
      i {
        font-size: 15px;
      }
    }
  }
  @media (min-width: 420px) {
    .menu-mobile {
      display: none !important;
    }
  }
}
</style>
