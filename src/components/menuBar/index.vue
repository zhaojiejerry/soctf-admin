
<template>
  <div class="wx-menu">
    <div class="sys-name">
      <img class="icon-logo" src="./logo.png">

      {{ sysName }}
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :unique-opened="true" class="hb-menu" mode="vertical" background-color="#333333" text-color="#fff" active-text-color="#FD7715" @select="select">
        <menu-one v-for="route in navRoutes" :key="route.path" :item="route" :base-path="route.path" />
        <!-- <el-menu-item index="1-1">问题管理</el-menu-item>
        <el-menu-item index="1-2">比赛管理</el-menu-item> -->
      </el-menu>
    </el-scrollbar>
    <div class="tips-user">
      <!-- <el-button class="tips-one" size="small" icon="iconfont icon-message tips-icon" type="text">消息</el-button>
      <i class="split"></i>-->
      <el-button class="tips-one" size="small" icon="iconfont icon-user tips-icon" type="text" @click.stop="userDialog = !userDialog">{{ userName }}</el-button>
    </div>
    <div v-clickoutside="outClose" v-show="userDialog" class="user-dialog">
      <p class="user-item" @click="handleChangeCommand('personalCenter')">个人中心</p>
      <p class="user-item" @click="handleChangeCommand('editPassword')">修改密码</p>
      <p class="user-item" @click="handleChangeCommand('logout')">退出</p>
    </div>
    <el-dialog :visible.sync="passDialog" :append-to-body="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" width="430px" title="修改密码" custom-class="pass-dialog" @close="closePassDialog">
      <el-form ref="passForm" :model="passForm" :rules="passRules" label-width="90px" label-position="right" class="pass-form">
        <el-form-item label="原密码：" prop="oldPass">
          <el-input :maxlength="16" v-model="passForm.oldPass" type="password" show-password size="small" placeholder="请输入原密码" autocomplete="off" />
        </el-form-item>
        <el-form-item id="loginStateone" label="新密码：" prop="newPass">
          <el-input :maxlength="16" v-model="passForm.newPass" type="password" size="small" placeholder="请输入新密码" autocomplete="off" @blur="loginblurState" @focus="changeFocus" />
          <div v-if="loginFocusState" class="el-form-item__tips">8-16位数字、字母、符号的组合，且至少使用其中两种</div>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPass">
          <el-input :maxlength="16" v-model="passForm.confirmPass" type="password" size="small" placeholder="请确认新密码" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="my-footer">
        <el-button size="small" type="primary" @click="savePassword('passForm')">确 定</el-button>
        <el-button size="small" @click="passDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="signDialog" :append-to-body="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" width="425px" title="修改签字签章" custom-class="sign-dialog" @open="openSignDialog">
      <div class="sign-input">
        <div class="input-suffix">
          <span class="input-title">医生姓名：</span>
          <el-input :maxlength="10" v-model="signForm.doctorName" size="small" placeholder="请输入值班医生姓名" />
        </div>
        <div class="input-suffix">
          <span class="input-title">医院名称：</span>
          <el-input :maxlength="20" v-model="signForm.hospitalName" size="small" placeholder="请输入医院名称" />
        </div>
      </div>
      <div class="sign-container">
        <div class="sign-one">
          <div class="title">医师签字</div>
          <div class="upload-area" @mouseenter="enterUserSign = true">
            <input id="userSign" class="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event, 'userSign')">
            <img v-if="signForm.userSign" :src="signForm.userSign">
            <label v-else for="userSign" class="upload-content">
              <i class="el-icon-plus" />
            </label>
            <div v-if="enterUserSign && signForm.userSign" class="float-layer" @mouseleave="enterUserSign = false">
              <i class="el-icon-zoom-in" @click="previewImage('userSign')" />
              <label for="userSign" class="el-icon-edit-outline" />
              <i class="el-icon-delete" @click="signForm.userSign = ''" />
            </div>
          </div>
        </div>
        <div class="sign-one">
          <div class="title">机构签章</div>
          <div class="upload-area" @mouseenter="enterHospitalSign = true">
            <input id="hospitalSign" class="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event, 'hospitalSign')">
            <img v-if="signForm.hospitalSign" :src="signForm.hospitalSign">
            <label v-else for="hospitalSign" class="upload-content">
              <i class="el-icon-plus" />
            </label>
            <div v-if="enterHospitalSign && signForm.hospitalSign" class="float-layer" @mouseleave="enterHospitalSign = false">
              <i class="el-icon-zoom-in" @click="previewImage('hospitalSign')" />
              <label for="hospitalSign" class="el-icon-edit-outline" />
              <i class="el-icon-delete" @click="signForm.hospitalSign = ''" />
            </div>
          </div>
        </div>
      </div>
      <div class="tips">只能上传JPG/PNG文件，且不超过500K</div>
      <div slot="footer" class="my-footer">
        <el-button size="small" type="primary" @click="saveSign">确 定</el-button>
        <el-button size="small" @click="signDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="previewDialog" :append-to-body="true" :show-close="true" width="488px" custom-class="preview-dialog-2">
      <img :src="previewImg" class="preview-img">
    </el-dialog>
    <span class="version">v{{ version }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menuOne from './menuOne'
import md5 from 'js-md5'
import { editPassword, getSign, updateSign } from '@/api/login.js'
import { fileUpload } from '@/api/common.js'
import { getCookie, removeCookie } from '@/utils/auth'
import { clickoutside } from '@/utils/directives'
import { navRoutes } from '@/router'
export default {
  components: {
    menuOne
  },
  directives: {
    clickoutside
  },
  data() {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    const validateNewPass = (rule, value, callback) => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)/
      this.loginFocusState = false
      if ((value.length > 16 || value.length < 8) && reg.test(value)) {
        callback(new Error('长度8-16位'))
      } else if (value.length <= 16 && value.length >= 8 && !reg.test(value)) {
        callback(new Error('数字、字母、符号的组合，且至少使用其中两种'))
      } else if ((value.length > 16 || value.length < 8) && !reg.test(value)) {
        if (!reg.test(value)) {
          callback(
            new Error('8-16位数字、字母、符号的组合，且至少使用其中两种')
          )
        }
      } else {
        callback()
      }
    }
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      navRoutes: [],
      loginFocusState: false,
      sysName: window.HaiboCONF.sysName,
      version: window.HaiboCONF.version,
      userDialog: false,
      passDialog: false,
      passForm: {
        oldPass: '',
        newPass: '',
        confirmPass: ''
      },
      passRules: {
        oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
        newPass: [{ validator: validateNewPass, trigger: 'blur' }],
        confirmPass: [{ validator: validateConfirmPass, trigger: 'blur' }]
      },
      signDialog: false, // 签章弹框
      previewDialog: false,
      signForm: {
        signId: '',
        userSign: '',
        hospitalSign: '',
        doctorName: '',
        hospitalName: ''
      },
      enterUserSign: false,
      enterHospitalSign: false,
      previewImg: ''
    }
  },
  computed: {
    ...mapGetters(['user']),
    userName() {
      return getCookie('Account') || ''
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created() {
    this.navRoutes = navRoutes
  },
  methods: {
    select(index, indexPath) {
      switch (index) {
        case '1-1':
          this.$router.push({ path: '/question' })
          break
        case '1-2':
          this.$router.push({ path: '/match' })
          break
        default:
          break
      }
    },
    loginblurState() {
      this.loginFocusState = false
    },
    changeFocus() {
      const state = document.getElementById('loginStateone')
      const stateClass = state.getElementsByClassName('el-form-item__error')[0]
      if (!stateClass) {
        this.loginFocusState = true
      }
    },
    handleChangeCommand(command) {
      this.userDialog = false
      switch (command) {
        case 'personalCenter':
          if (this.user.type == 0) {
            this.$router.push({
              name: 'subAccountPersonal',
              query: {
                subUserId: this.user.id,
                isPersonalCenter: true
              }
            })
          } else {
            this.$router.push({
              name: 'personalDetail',
              query: {
                userId: this.user.id,
                isPersonalCenter: true
              }
            })
          }
          break
        case 'editInfo':
          this.signDialog = true
          break
        case 'editPassword':
          this.passDialog = true
          break
        case 'logout':
          this.logout()
          break
      }
    },
    closePassDialog() {
      this.passForm.oldPass = ''
      this.passForm.newPass = ''
      this.passForm.confirmPass = ''
      this.$refs.passForm.resetFields()
    },
    savePassword(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求成功
          editPassword({
            oldPassword: md5(_this.passForm.oldPass),
            newPassword: md5(_this.passForm.newPass)
          }).then((res) => {
            if (res.code == 0) {
              _this.$alert('密码修改成功，请重新登录', '提示', {
                confirmButtonText: '确定',
                callback: async (action) => {
                  await _this.$store.dispatch('logout')
                  _this.$router.push({
                    name: 'login',
                    params: { disableBtn: true }
                  })
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    logout() {
      const _this = this
      this.$confirm('确认要退出登录吗?', '退出', {
        distinguishCancelAndClose: true,
        confirmButtonText: '取消',
        cancelButtonText: '退出',
        customClass: 'redConfirm',
        confirmButtonClass: 'rightBtn',
        cancelButtonClass: 'leftBtn'
      })
        .then()
        .catch(async (action) => {
          if (action === 'cancel') {
            await _this.$store.dispatch('logout')
            _this.$router.push({ name: 'login', params: { disableBtn: true } })
          }
        })
    },
    outClose() {
      this.userDialog = false
    },
    uploadImg(e, id) {
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(e.target.value)) {
        this.$message.error('图片类型错误')
        return false
      }
      if (file.size / 1024 > 500) {
        this.$message.error('图片文件过大')
        return false
      }
      const formdata = new FormData()
      formdata.append('file', file)
      fileUpload(formdata).then((res) => {
        if (res.code == 0) {
          this.signForm[id] = res.data
          this.enterUserSign = false
          this.enterHospitalSign = false
        }
      })
      const reader = new FileReader()
      reader.onload = (e) => {
        document.getElementById(id).value = '' // 解决同一张图片上传两次，第二次不触发change事件
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    previewImage(str) {
      this.previewImg = this.signForm[str]
      this.previewDialog = true
    },
    openSignDialog() {
      this.enterUserSign = false
      this.enterHospitalSign = false
      getSign()
        .then((res) => {
          if (res.code == 0) {
            this.signForm.signId =
              (res.data && res.data.length > 0 && res.data[0].id) || ''
            this.signForm.userSign =
              (res.data && res.data.length > 0 && res.data[0].doctorSign) || ''
            this.signForm.hospitalSign =
              (res.data && res.data.length > 0 && res.data[0].orgSign) || ''
            this.signForm.doctorName =
              (res.data && res.data.length > 0 && res.data[0].doctorName) || ''
            this.signForm.hospitalName =
              (res.data && res.data.length > 0 && res.data[0].hospitalName) ||
              ''
          } else {
            this.signForm.signId = ''
            this.signForm.userSign = ''
            this.signForm.hospitalSign = ''
            this.signForm.doctorName = ''
            this.signForm.hospitalName = ''
          }
        })
        .catch(() => {
          this.signForm.signId = ''
          this.signForm.userSign = ''
          this.signForm.hospitalSign = ''
          this.signForm.doctorName = ''
          this.signForm.hospitalName = ''
        })
    },
    saveSign() {
      const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
      if (this.signForm.doctorName) {
        if (!reg.test(this.signForm.doctorName)) {
          this.$message.closeAll()
          this.$message.error('医生姓名只允许输入中英文')
          return false
        }
      }
      if (this.signForm.hospitalName) {
        if (!reg.test(this.signForm.hospitalName)) {
          this.$message.closeAll()
          this.$message.error('医院名称只允许输入中英文')
          return false
        }
      }
      updateSign({
        id: this.signForm.signId,
        doctorSign: this.signForm.userSign,
        orgSign: this.signForm.hospitalSign,
        doctorName: this.signForm.doctorName,
        hospitalName: this.signForm.hospitalName
      }).then((res) => {
        if (res.code == 0) {
          this.$message.success('修改签字签章成功')
          this.signDialog = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.version {
  position: absolute;
  left: 7px;
  bottom: 20px;
  font-size: 12px;
  color: #ffffff;
  height: 10px;
  line-height: 10px;
}
.wx-menu {
  height: 100%;
  .sys-name {
    position: absolute;
    top: 0;
    left: 0;
    width: 235px;
    height: 60px;
    background-color: #fd7715;
    font-size: 18px;
    color: #fff;
    line-height: 60px;
    text-align: center;
    .icon-logo {
      display: inline-block;
      height: 28px;
      margin-right: 3px;
      vertical-align: middle;
    }
    .version {
      position: absolute;
      left: 12px;
      bottom: 2px;
      font-size: 12px;
      color: #ffffff;
      height: 10px;
      line-height: 10px;
    }
  }
  .tips-user {
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 235px;
    height: 80px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .split {
      margin-left: 25px;
      margin-right: 25px;
      display: inline-block;
      height: 20px;
      width: 1px;
      background-color: #fff;
    }
    .tips-one {
      color: #fff;
      &:hover {
        color: #fd7715;
        .icon-user {
          color: #fd7715 !important;
        }
      }
    }
    .tips-icon {
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .user-dialog {
    width: 125px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 235px;
    bottom: 20px;
    padding: 5px 0;
    .user-item {
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      padding-left: 23px;
      cursor: pointer;
      &:hover {
        color: #fd7715;
        background: rgba(253, 97, 21, 0.1);
      }
    }
  }
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    top: 60px;
    height: calc(100% - 140px);
  }

  .is-horizontal {
    display: none;
  }
}

.hb-menu {
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }

  .iconfont {
    margin-right: 10px;
    font-size: 14px;
    color: #fff;
  }

  &.el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  .el-submenu.is-opened {
    .el-submenu__title {
      background-color: #000 !important;
    }
    .nest-menu .el-menu-item {
      padding-left: 43px !important;
      background-color: #000 !important;
    }
  }
  .el-submenu__icon-arrow {
    color: #fff;
  }
  .submenu-title-noDropdown,
  .el-submenu__title {
    height: 46px;
    line-height: 46px;
    &:hover {
      background-color: #000 !important;
    }
  }

  .is-active > .el-submenu__title {
    color: #ffffff !important;
  }

  .is-active .iconfont {
    color: #fd7715 !important;
  }

  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 235px !important;
    background-color: #333333 !important;

    &:hover {
      background-color: #000 !important;
    }
  }
  .nest-menu .is-active {
    background-color: #000 !important;
    .active-prefix {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #fd7715;
    }
  }
  .nest-menu .el-menu-item:hover {
    span {
      color: #fd7715;
    }
    .active-prefix {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #fd7715;
    }
  }
}
</style>
