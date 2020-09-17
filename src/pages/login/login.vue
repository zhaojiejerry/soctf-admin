<template>
  <div class="zztjj-login">
    <div class="left-container">
      <el-carousel height="100%" class="banner-pic" :autoplay="false" arrow="never" indicator-position="none">
        <el-carousel-item>
            <img src="./login-bg.png" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
          class="demo-ruleForm login-container">
      <h3 class="title">账户登录</h3>
      <el-form-item prop="username">
        <el-input class="login-input" type="text" v-model="loginForm.username" @focus="readAccount = false" @keyup.enter.native="handleLogin" :readonly="readAccount" autocomplete="off" placeholder="请输入用户名">
          <i slot="prefix" class="icon-pic user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="login-input" type="password" v-model="loginForm.password" @focus="readPassword = false" @keyup.enter.native="handleLogin" :readonly="readPassword" autocomplete="off" placeholder="请输入密码">
          <i slot="prefix" class="icon-pic password"></i>
        </el-input>
      </el-form-item>
      <div class="check-line">
        <el-checkbox v-model="rememberPass" @change="handleChangeAuto" class="remember-pass">记住密码</el-checkbox>
        <el-checkbox v-model="autoLogin" @change="handleChangePass" class="auto-login">自动登录</el-checkbox>
      </div>
      <el-button type="primary" style="width:100%;" round @click.native.prevent="handleLogin" class="login-btn" :loading="loading">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码至少为6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordCopy: '',
      rememberPass: true, // 记住密码
      autoLogin: true, // 自动登录
      loginRules: {
        username: [{ validator: validateUsername, trigger: 'change' }],
        password: [{ validator: validatePassword, trigger: 'change' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined, // 重定向路径
      disabledBtn: false,
      // hack chrome表单自动填充
      readAccount: true,
      readPassword: true
    }
  },
  methods: {
    handleChangePass (val) {
      if (val) {
        this.rememberPass = true
      }
    },
    handleChangeAuto (val) {
      if (!val) {
        this.autoLogin = false
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let pwd = ''
          if (this.loginForm.password == this.passwordCopy) {
            pwd = this.passwordCopy
          } else {
            pwd = md5(this.loginForm.password)
          }
          this.$store.dispatch('login', {
            username: this.loginForm.username,
            password: pwd
          }).then((res) => {
            if (res.code == 0) {
              setCookie('Account', this.loginForm.username)
              setCookie('Remember', JSON.stringify(this.rememberPass))
              setCookie('AutoLogin', JSON.stringify(this.autoLogin))
              if (this.rememberPass) {
                setCookie('Password', pwd)
              } else {
                setCookie('Password', '')
              }
              this.$router.push({ path: this.redirect || '/' })
            }
            this.loading = false
          }).catch((error) => {
            console.log(error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.disabledBtn = (this.$route.params && this.$route.params.disableBtn) || false
    this.loginForm.username = getCookie('Account') || ''
    this.rememberPass = getCookie('Remember') ? JSON.parse(getCookie('Remember')) : false
    this.autoLogin = getCookie('AutoLogin') ? JSON.parse(getCookie('AutoLogin')) : false
    if (getCookie('Remember') && JSON.parse(getCookie('Remember'))) {
      this.loginForm.password = getCookie('Password') || ''
      this.passwordCopy = getCookie('Password') || ''
    } else {
      this.loginForm.password = ''
      this.passwordCopy = ''
    }
  },
  mounted () {
    if (getCookie('AutoLogin') && JSON.parse(getCookie('AutoLogin')) && !this.disabledBtn) {
      this.handleLogin()
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  .login-input {
    .el-input__inner {
      background-color: #fff7ef;
      border-radius: 24px;
      height: 48px;
      line-height: 48px;
      border-color: #fff7ef;
      font-size: 16px;
    }
    .el-form-item__error {
      left: 24px;
    }
    .el-input__prefix {
      vertical-align: middle;
    }
    &.el-input--prefix .el-input__inner {
      padding-left: 58px;
    }
    .icon-pic {
      display: inline-block;
      width: 18px;
      height: 21px;
      padding-top: 23px;
      padding-left: 33px;
      &.user {
          background: url(./user.png) no-repeat center;
      }
      &.password {
          background: url(./password.png) no-repeat center;
      }
    }
}

.login-container {
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #fe811c;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
      border-color: #ff0f0f;
  }
  .el-form-item__error {
      color: #ff0f0f;
      padding-left: 21px;
  }
}
</style>

<style lang="scss">
  .banner-pic .el-carousel__container {
    position: absolute;
    width: 100%;
  }
</style>

<style lang="scss" scoped>
  .zztjj-login {
    background-color: #f4f4f4;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 250px;
    box-sizing: border-box;
    @media screen and (max-width: 1450px) {
        padding: 40px 200px;
    }
    @media screen and (max-width: 1380px) {
        padding: 40px 150px;
    }
    @media screen and (max-width: 1290px) {
        padding: 40px 100px;
    }
    .left-container {
      flex: 1;
      margin-right: 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .title {
        flex: 0 0 60px;
        color: #333;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
            margin-left: 70px;
            margin-right: 20px;
        }
        h1 {
            font-size: 33px;
            font-weight: 600;
        }
      }
      .banner-pic {
        flex: 1;
        .el-carousel__item {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 100%;
            max-height: 100%;
            width: 100%\9;
          }
        }
      }
    }
  }
  .login-container {
    background-clip: padding-box;
    flex: 0 0 350px;
    padding: 32px 30px;
    background: #fff;
    border: 2px solid #ffece1;
    // box-shadow: 0px 0px 10px 0px #eec2a4;
    border-radius: 8px;
    box-sizing: border-box;
    .title {
      margin: 0 auto 25px auto;
      text-align: left;
      font-size: 20px;
      color: #ee7700;
    }

    .check-line {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      font-family: "Microsoft YaHei";
      font-size: 16px;
      letter-spacing: 20px;
      text-indent: 20px;
      transform: matrix( 1.00141843971631, 0, 0, 1.00148588410104, 0, 0);
      border-radius: 22px;
      padding: 13px 23px;
    }
  }
</style>
