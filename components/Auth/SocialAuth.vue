<template>
  <div class="social mt-20">
    <button class="google" type="button" @click="onGoogle">
      <img src="/images/google.svg" alt="Google" />
      <span class="text"> ادامه با گوگل </span>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onGoogle() {
      this.hello('google')
        .login({
          response_type: 'token id_token',
          scope: 'openid, email',
        })
        .then(async () => {
          const authRes = this.hello('google').getAuthResponse()

          try {
            const res = await this.$axios.post('/authnz/social_login/google/', {
              token: authRes.id_token,
            })

            this.$store.dispatch('auth/setToken', res.data.data.token)
            this.$store.dispatch('auth/setUser', res.data.data.user)

            this.$store.commit('theme/TOGGLE_DIALOG')

            this.$message.success({
              message: 'خوش آمدید.',
            })
          } catch (error) {}
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.social {
  button {
    position: relative;
    border: none;
    width: 100%;
    background: transparent;
    border: 1px solid rgba(76, 87, 102, 0.1);
    color: #000;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    line-height: 40px;
    cursor: pointer;
    img {
      position: absolute;
      right: 20px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .text {
      font-weight: 500;
    }
  }
  button.google {
    background: #fff;
  }
  button.google:hover {
    background: rgba(76, 87, 102, 0.1);
  }
}
</style>
