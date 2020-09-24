<template>
  <div class="hb-add-subaccount">
    <wx-header show-back>
      <span slot="headerTitle">{{ keyword }}子账号</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-add-subaccount-content flex flex-column">
        <div class="subaccount-con">
          <div class="subaccount-info">
            <el-form ref="subAccountForm" :model="subAccountForm" :rules="subAccountRules" label-width="100px">
              <el-form-item label-width="0" style="margin-bottom:10px;">
                <div class="form-title">子账号信息</div>
              </el-form-item>
              <el-form-item label="账号名称：" prop="username">
                <el-input :disabled="!!subUserId" :maxlength="20" v-model="subAccountForm.username" size="small" placeholder="请输入账号名称(数字和字母组合，不超过10个字符)" />
              </el-form-item>
              <el-form-item label="姓名：" prop="realName">
                <el-input :maxlength="12" v-model="subAccountForm.realName" size="small" placeholder="请输入真实姓名" />
              </el-form-item>
              <el-form-item v-if="!subUserId" id="loginState" label="登录密码：" prop="password">
                <el-input :maxlength="16" v-model="subAccountForm.password" size="small" show-password placeholder="请设置登录密码" @blur="loginFocusState=false" @focus="changeFocus" />
                <div v-if="loginFocusState" class="el-form-item__tips">8-16位数字、字母、符号的组合，且至少使用其中两种</div>
              </el-form-item>
              <el-form-item label="联系电话：" prop="phone">
                <el-input :maxlength="25" v-model="subAccountForm.phone" size="small" placeholder="请输入联系电话" />
              </el-form-item>
              <el-form-item label="单位名称：" prop="orgName">
                <el-input :maxlength="40" :value="subAccountForm.orgName" :disabled="true" size="small" readonly />
              </el-form-item>
              <el-form-item label="个人签章：">
                <div class="sign-container" style="margin-top:0;">
                  <div class="sign-one relative">
                    <div class="upload-area" @mouseenter="enterUserSign = true">
                      <input id="userSign" class="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImg($event, 'userSign')">
                      <img v-if="subAccountForm.userSign" :src="subAccountForm.userSign">
                      <label v-else for="userSign" class="upload-content"><i class="el-icon-plus" /></label>
                      <div v-if="enterUserSign && subAccountForm.userSign" class="float-layer" @mouseleave="enterUserSign = false">
                        <i class="el-icon-zoom-in" @click="previewImage('userSign')" />
                        <label for="userSign" class="el-icon-edit-outline" />
                        <i class="el-icon-delete" @click="subAccountForm.userSign = ''" />
                      </div>
                    </div>
                    <p class="usersign-tip absolute">只能上传JPG/PNG文件，且不超过500K</p>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input :maxlength="100" :rows="5" v-model="subAccountForm.remark" type="textarea" show-word-limit resize="none" placeholder="请填写备注信息" />
              </el-form-item>
            </el-form>
          </div>
          <div v-if="!isPersonalCenter" class="subaccount-limits">
            <el-form>
              <el-form-item label-width="0" style="margin-bottom:10px;">
                <div class="form-title">子账号权限</div>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="isReuse" :label="false">自定义</el-radio>
                <el-radio v-model="isReuse" :label="true">复用</el-radio>
                <el-select :disabled="!isReuse" v-model="reuseAccount" placeholder="请选择子账号" size="small" @change="changeSubAccoutRoleCheck">
                  <el-option v-for="item in reuseAccountList" v-show="item.username!=subAccountForm.username" :key="item.id" :label="item.realName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-form>
            <div class="tree-parent">
              <el-scrollbar class="role-scroll">
                <el-tree ref="hbRoleTree" :check-strictly="true" :data="permList" :props="props1" :node-key="props1.value" class="tree-content" show-checkbox default-expand-all @check="roleTreeChange" />
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="button-con">
          <el-button :loading="saveLoading" type="primary" size="small" @click="handleSaveSubAcount()">确定</el-button>
          <el-button size="small" @click="handleUserInfo">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
// import { fileUpload } from '@/api/common.js'
// import { subAccountPageList, getPermTree, addSubAccount, getSubAccountDetail, updateSubAccount } from '@/api/user.js'

export default {
  components: {
    wxHeader
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (value.length == 0) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else if (value.length > 10) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      const mobileReg = /^((\+?86)|(\(\+86\)))?1(3|4|5|6|7|8|9)\d{9}$/
      const guhuaReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,16}$/
      if (value.length == 0) {
        callback(new Error('请输入电话号码'))
      } else if (!mobileReg.test(value) && !guhuaReg.test(value)) {
        callback(new Error('请输入有效的电话号码'))
      } else {
        callback()
      }
    }

    const validateRealname = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/
      if (value.length == 0) {
        callback(new Error('12位以内汉字、字母和数字'))
      } else if (!reg.test(value)) {
        callback(new Error('12位以内汉字、字母和数字'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
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

    return {
      loginFocusState: false,
      saveLoading: false,
      userId: '',
      subUserId: '',
      enterUserSign: false,
      isReuse: false,
      reuseAccount: '',
      reuseAccountList: [], // 子账号列表
      permList: [], // 子账号所有权限
      checkedList: [], // 子账号已经拥有权限
      props1: {
        value: 'id',
        label: function (data, node) {
          return data.meta.title
        },
        children: 'children',
        disabled: this.disabledFn
      },
      subAccountForm: {
        username: '',
        realName: '',
        password: '',
        phone: '',
        primaryId: '',
        userSign: '',
        remark: '',
        orgName: '',
        primaryType: ''
      },
      subAccountRules: {
        username: [
          { validator: validateUsername, trigger: 'change', required: true }
        ],
        realName: [
          {
            validator: validateRealname,
            required: true,
            message: '请输入真实姓名',
            trigger: 'change'
          }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'change' }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['btnPermissions', 'user']),
    keyword() {
      if (this.subUserId) {
        return '编辑'
      } else {
        return '新建'
      }
    }
  },
  created() {
    this.userId = this.$route.query.userId || ''
    this.subUserId = this.$route.query.subUserId || ''
    this.subAccountForm.orgName = this.$route.query.orgName || ''
    this.isPersonalCenter = this.$route.query.isPersonalCenter || ''
    this.subAccountForm.primaryType = this.$route.query.primaryType || ''
    if (this.subUserId) {
      this.handleSubAccountDetail()
    }

    // 查询可复用的子账号列表
    if (!this.isPersonalCenter) {
      this.handleSearchSubAccount()
    }

    // 查询权限树
    this.handleSearchPermTree()
  },
  methods: {
    disabledFn() {
      if (this.user.type == 0) {
        return true
      } else {
        return false
      }
    },
    changeFocus() {
      const state = document.getElementById('loginState')
      const stateClass = state.getElementsByClassName('el-form-item__error')[0]
      if (!stateClass) {
        this.loginFocusState = true
      }
    },
    changeSubAccoutRoleCheck() {
      const this_ = this
      getSubAccountDetail({
        userId: this_.reuseAccount
      })
        .then((res) => {
          if (res.code == 0) {
            this_.checkedList = res.data.checkedList
            this_.$refs.hbRoleTree.setCheckedKeys(res.data.checkedList)
          } else {
            this_.$message({
              type: 'error',
              message: '查询子账号权限失败'
            })
          }
        })
        .catch(() => {
          this_.$message({
            type: 'error',
            message: '查询子账号权限失败'
          })
        })
    },
    roleTreeChange(p1, p2) {
      const _this = this
      let checkedKeys = p2.checkedKeys
      if (checkedKeys.includes(p1.id)) {
        // 设置勾选的时候同时勾选父节点
        this.parentIds = []
        this.getParentIds(p1)
        checkedKeys = [...new Set([...checkedKeys, ...this.parentIds])]
        this.$refs.hbRoleTree.setCheckedKeys(checkedKeys)
      } else {
        // 取消勾选的时候同时取消子节点
        this.childIds = []
        this.getChildIds(p1)
        if (this.childIds.length > 0) {
          const b = new Set(_this.childIds)
          checkedKeys = [
            ...new Set(
              checkedKeys.filter((x) => {
                return !b.has(x)
              })
            )
          ]
          this.$refs.hbRoleTree.setCheckedKeys(checkedKeys)
        }
      }
      if (this.isReuse) {
        this.isReuse = false
      }
    },
    getParentIds(data) {
      if (!data.pid || data.pid == -1) {
        return false
      }
      this.parentIds.push(data.pid)
      const node = this.$refs.hbRoleTree.getNode(data.pid)
      if (node) {
        this.getParentIds(node.data)
      }
    },
    getChildIds(data) {
      const _this = this
      if (data.children && data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          _this.childIds.push(data.children[i].id)
          _this.getChildIds(data.children[i])
        }
      }
    },
    handleSearchSubAccount() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('tbody')
      })

      subAccountPageList({
        pageNo: 1,
        pageSize: 100,
        primaryId: this.userId
      })
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.reuseAccountList = res.list
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleSaveSubAcount() {
      const _this = this
      _this.$refs.subAccountForm.validate((valid) => {
        if (valid) {
          if (
            this.subAccountForm.primaryType == 3 &&
            !this.subAccountForm.userSign
          ) {
            this.$message({
              type: 'error',
              message: '医院的子账号必须设置个人签章'
            })
            return false
          }
          let formData
          if (!this.subUserId) {
            formData = {
              username: this.subAccountForm.username,
              realName: this.subAccountForm.realName,
              password: this.subAccountForm.password,
              phone: this.subAccountForm.phone,
              primaryId: this.userId,
              userSign: this.subAccountForm.userSign,
              remark: this.subAccountForm.remark,
              permList: this.$refs.hbRoleTree.getCheckedKeys(false)
            }

            this.saveLoading = true
            addSubAccount(formData)
              .then((res) => {
                this.saveLoading = false
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.keyword + '子账号成功',
                    onClose: () => {
                      this.handleUserInfo()
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: this.keyword + '子账号失败:' + res.msg
                  })
                }
              })
              .catch((error) => {
                console.log(error)
                this.saveLoading = false
                this.$message({
                  type: 'error',
                  message: this.keyword + '子账号失败:' + error
                })
              })
          } else {
            formData = {
              id: this.subUserId,
              realName: this.subAccountForm.realName,
              phone: this.subAccountForm.phone,
              userSign: this.subAccountForm.userSign,
              remark: this.subAccountForm.remark,
              permList: this.isPersonalCenter
                ? []
                : this.$refs.hbRoleTree.getCheckedKeys(false),
              isPersonalCenter: this.isPersonalCenter
            }

            this.saveLoading = true
            updateSubAccount(formData)
              .then((res) => {
                this.saveLoading = false
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: this.keyword + '子账号成功',
                    onClose: () => {
                      if (!this.isPersonalCenter) {
                        this.handleUserInfo()
                      }
                    }
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: this.keyword + '子账号失败:' + res.msg
                  })
                }
              })
              .catch((error) => {
                console.log(error)
                this.saveLoading = false
                this.$message({
                  type: 'error',
                  message: this.keyword + '子账号失败:' + error
                })
              })
          }
        } else {
          this.$message({
            type: 'error',
            message: this.keyword + '子账号失败，请重新编辑'
          })
        }
      })
    },
    handleUserInfo() {
      if (this.isPersonalCenter) {
        this.$router.back(-1)
      } else {
        this.$router.push({
          name: 'userDetail',
          query: {
            userId: this.userId
          }
        })
      }
    },
    previewImage(str) {
      this.previewImg = this.subAccountForm[str]
      this.previewDialog = true
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
          this.subAccountForm[id] = res.data
          this.enterUserSign = false
          this.entercompanySign = false
        }
      })
      const reader = new FileReader()
      reader.onload = (e) => {
        document.getElementById(id).value = '' // 解决同一张图片上传两次，第二次不触发change事件
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    handleSearchPermTree() {
      getPermTree({
        userId: this.userId,
        enable: false
      })
        .then((res) => {
          if (res.code == 0) {
            this.permList = res.data.treeList
            this.checkedList = res.data.checkedList
          } else {
            this.$message({
              type: 'error',
              message: '查询权限树出错:' + res.msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: '查询权限树出错'
          })
        })
    },
    handleSubAccountDetail() {
      getSubAccountDetail({
        userId: this.subUserId,
        isPersonalCenter: this.isPersonalCenter
      })
        .then((res) => {
          if (res.code == 0) {
            this.subAccountForm.username = res.data.username || ''
            this.subAccountForm.realName = res.data.realName || ''
            this.subAccountForm.phone = res.data.phone || ''
            this.subAccountForm.userSign = res.data.userSign || ''
            this.subAccountForm.remark = res.data.remark || ''
            this.subAccountForm.orgName = res.data.orgName || ''
            this.subAccountForm.primaryType = res.data.primaryType || ''
            this.$refs.hbRoleTree.setCheckedKeys(res.data.checkedList)
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.hb-add-subaccount {
  background: #edeef2;
  .form-title {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
  .form-title:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #fd7715;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }
  .el-form-item__content {
    width: 380px;
    display: flex;
    align-items: center;
  }
  .hb-add-subaccount-content {
    flex-grow: 1;
    box-sizing: border-box;
    min-width: 1000px;
    padding: 22px 27px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    .subaccount-con {
      width: 100%;
      flex: 1;
      display: flex;
      .subaccount-info {
        flex: 656;
        margin-right: 20px;
        padding: 17px;
        background: #ffffff;
      }
      .subaccount-limits {
        flex: 431;
        background: #ffffff;
        padding: 17px 20px;
        display: flex;
        flex-direction: column;
        .tree-parent {
          flex: 1;
          position: relative;
          .role-scroll {
            position: absolute;
            width: 100%;
            height: 100%;
            .el-tree-node__expand-icon {
              color: #333;
            }
            .el-tree-node__expand-icon.is-leaf {
              color: transparent;
            }
            .el-tree-node:focus > .el-tree-node__content {
              background-color: #fff1e7;
              color: #fd7715;
            }
            .el-tree-node__content:hover {
              background-color: #fff1e7;
              color: #fd7715;
            }
          }
        }
      }
    }
    .button-con {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
