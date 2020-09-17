<template>
  <div class="hb-user-edit">
    <wx-header showBack>
      <span slot="headerTitle">{{ userId ? '编辑用户' : '新建用户' }}</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content">
        <el-form ref="userEditForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label-width="0" style="margin-bottom:10px;">
            <div class="form-title">账号信息</div>
          </el-form-item>
          <el-form-item label="账号名称：" prop="username">
            <el-input
              :disabled="userId != ''"
              size="small"
              :maxlength="20"
              v-model="form.username"
              placeholder="请输入账号名称(数字和字母组合，不超过10个字符)"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="realName">
            <el-input size="small" :maxlength="12" v-model="form.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item id="loginState" v-if="!userId" label="登录密码：" prop="password">
            <el-input
              size="small"
              show-password
              :maxlength="16"
              @blur="loginFocusState=false"
              @focus="changeFocus"
              v-model="form.password"
              placeholder="请设置登录密码"
            ></el-input>
            <div v-if="loginFocusState" class="el-form-item__tips">8-16位数字、字母、符号的组合，且至少使用其中两种</div>
          </el-form-item>
          <el-form-item label="用户角色：" prop="roleId">
            <el-select
              v-if="!isPersonalCenter"
              class="select-form"
              v-model="form.roleId"
              placeholder="请选择用户角色"
              size="small"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-input v-if="isPersonalCenter" :disabled="true" readonly v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="用户类型：" v-if="form.type != 1" prop="type">
            <el-radio-group
              v-model="form.type"
              class="radio-form"
              size="small"
              :disabled="userId != '' || isPersonalCenter"
            >
              <el-radio v-for="item in userTypeList" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="0" style="margin-bottom:10px;">
            <div class="form-title">单位信息</div>
          </el-form-item>
          <el-form-item label="单位名称：" prop="orgName">
            <el-input size="small" :maxlength="40" v-model="form.orgName" placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="所属上级：" v-if="form.type != 1" prop="parentId">
            <hb-user-tree
              holder="请选择所属上级"
              v-if="!isPersonalCenter"
              :disabled="isPersonalCenter"
              :dropdownWidth="375"
              :value="form.parentId"
              @getValue="handleUserFilterId"
            ></hb-user-tree>
            <el-input v-if="isPersonalCenter" :disabled="true" readonly v-model="form.parentName"></el-input>
            <p style="color: #666666;" v-if="form.type == 4">上级单位即体检医院</p>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <div class="phoneInput">
              <el-input
                size="small"
                :maxlength="25"
                v-model="form.phone"
                readonly
                placeholder="请输入联系电话"
                v-if="form.phone"
              ></el-input>
              <el-button type="primary" @click="changePhone" size="mini" v-if="form.phone">更换手机号</el-button>
              <el-button type="primary" @click="bindPhone" size="mini" v-if="!form.phone">绑定手机号</el-button>
            </div>
          </el-form-item>
          <el-form-item
            label="单位地址："
            prop="area"
            :rules="[{required: true, validator: validateArea, trigger: 'change'}]"
          >
            <hb-area-select
              :province="form.province"
              :city="form.city"
              :area="form.area"
              @getValue="handleAreaList"
            ></hb-area-select>
          </el-form-item>
          <el-form-item label prop="address">
            <el-input
              size="small"
              :maxlength="40"
              v-model="form.address"
              placeholder="请输入详细地址，例如街道，门牌号"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="0" style="margin-bottom:10px;">
            <div class="form-title">附加信息</div>
          </el-form-item>
          <el-form-item>
            <div class="sign-container">
              <div class="sign-one">
                <div class="title">
                  <span v-show="form.type == 3" class="title-small" style="color:#F56C6C">*</span>
                  个人签章
                </div>
                <div class="upload-area" @mouseenter="enterUserSign = true">
                  <input
                    class="file-upload"
                    type="file"
                    id="userSign"
                    accept="image/png, image/jpeg, image/jpg"
                    @change="uploadImg($event, 'userSign')"
                  />
                  <img v-if="form.userSign" :src="form.userSign" />
                  <label style="background:#fff" v-else for="userSign" class="upload-content">
                    <i class="el-icon-plus"></i>
                  </label>
                  <div
                    class="float-layer"
                    v-if="enterUserSign && form.userSign"
                    @mouseleave="enterUserSign = false"
                  >
                    <i class="el-icon-zoom-in" @click="previewImage('userSign')"></i>
                    <label for="userSign" class="el-icon-edit-outline"></label>
                    <i class="el-icon-delete" @click="form.userSign = ''"></i>
                  </div>
                </div>
                <p class="suggestion">建议长宽比：233px*100px</p>
              </div>
              <div class="sign-one">
                <div class="title">
                  <span v-show="form.type == 3" class="title-small" style="color:#F56C6C">*</span>
                  单位签章
                </div>
                <div class="upload-area" @mouseenter="enterOrgSign = true">
                  <input
                    class="file-upload"
                    type="file"
                    id="orgSign"
                    accept="image/png, image/jpeg, image/jpg"
                    @change="uploadImg($event, 'orgSign')"
                  />
                  <img v-if="form.orgSign" :src="form.orgSign" />
                  <label style="background:#fff" v-else for="orgSign" class="upload-content">
                    <i class="el-icon-plus"></i>
                  </label>
                  <div
                    class="float-layer"
                    v-if="enterOrgSign && form.orgSign"
                    @mouseleave="enterOrgSign = false"
                  >
                    <i class="el-icon-zoom-in" @click="previewImage('orgSign')"></i>
                    <label for="orgSign" class="el-icon-edit-outline"></label>
                    <i class="el-icon-delete" @click="form.orgSign = ''"></i>
                  </div>
                </div>
                <p class="suggestion">建议长宽比：300px*300px</p>
              </div>
            </div>
            <p class="suggestion" style="width:400px">只能上传JPG_PNG文件，且不超过500K</p>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              type="textarea"
              show-word-limit
              :maxlength="100"
              resize="none"
              :rows="5"
              v-model="form.remark"
              placeholder="请填写备注信息"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="disableSubmit"
              type="primary"
              size="small"
              :loading="saveLoading"
              @click="handleUserSave"
            >确定</el-button>
            <el-button size="small" @click="handleUserList">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      :visible.sync="previewDialog"
      :append-to-body="true"
      width="488px"
      custom-class="preview-dialog-2"
      :show-close="true"
    >
      <img class="preview-img" :src="previewImg" />
    </el-dialog>
    <div class="bindphoneDialog">
      <el-dialog
        title="绑定手机号"
        :visible.sync="bindPhoneDialogVisible"
        width="400px"
        height="240px"
        center
        style="text-align: center"
        @close="resetForm"
      >
        <div class="bindPhone">
          <el-form label-width="70px" ref="phoneForm" :model="phoneForm" :rules="bindPhoneRules">
            <div class="phoneNumber">
              <el-form-item label="手机号:" prop="phoneNumber">
                <el-input placeholder="请输入手机号" size="small" v-model="phoneForm.phoneNumber"></el-input>
              </el-form-item>
            </div>
            <!-- <div class="code"> -->
            <el-form-item label="验证码:" prop="code">
              <el-input
                placeholder="请输入验证码"
                style="width: 50%"
                size="small"
                resize="none"
                prop="code"
                v-model="phoneForm.code"
              ></el-input>
              <el-button
                @click="send"
                style="width: 94px;height:31px;margin-left:5px"
                :disabled="disabled=!show"
                size="small"
              >
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{count}} s后重新发送</span>
              </el-button>
            </el-form-item>
            <!-- </div> -->
            <div class="refundButton" style="text-align: center">
              <el-button type="primary" size="small" @click="editPhone" v-if="userId">更新</el-button>
              <el-button type="primary" size="small" @click="bindSub" v-else>确认</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div class="bindphoneDialog">
      <el-dialog
        title="更换手机号"
        :visible.sync="changePhoneDialogVisible"
        width="420px"
        height="240px"
        center
        style="text-align: center"
        @close="resetChangeForm"
      >
        <div class="bindPhone">
          <el-form
            label-width="90px"
            ref="changePhoneForm"
            :model="changePhoneForm"
            :rules="phoneRules"
          >
            <div class="phoneNumber">
              <el-form-item label="当前手机号:" prop="phoneNumber">
                <span>{{form.phone}}</span>
              </el-form-item>
            </div>
            <!-- <div class="code"> -->
            <el-form-item label="验证码:" prop="code">
              <el-input
                placeholder="请输入验证码"
                style="width: 50%"
                size="small"
                resize="none"
                prop="code"
                v-model="changePhoneForm.code"
              ></el-input>
              <el-button
                @click="sendDelete"
                style="width: 94px;height:31px;margin-left:5px"
                :disabled="disabled=!show2"
                size="small"
              >
                <span v-show="show2" @click="sendDelete">发送验证码</span>
                <span v-show="!show2" class="count2">{{count2}} s后重新发送</span>
              </el-button>
            </el-form-item>
            <!-- </div> -->
            <div class="refundButton" style="text-align: center">
              <el-button type="primary" size="small" @click="deleteBind">验证</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import hbUserTree from '@/components/userTree/index'
import hbAreaSelect from '@/components/areaSelect/index'
import { fileUpload } from '@/api/common.js'
import { getUserById, editUser, addUser, sendMessage, checkCodeA, checkCodeB, editPhone } from '@/api/user.js'
import { roleList } from '@/api/role.js'

export default {
  components: {
    wxHeader,
    hbUserTree,
    hbAreaSelect
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (value.length == 0) {
        callback(new Error('10位以内字母或数字'))
      } else if (value.length > 10) {
        callback(new Error('10位以内字母或数字'))
      } else if (!reg.test(value)) {
        callback(new Error('10位以内字母或数字'))
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
    const validateMobilePhone = (rule, value, callback) => {
      const mobileReg = /^((\+?86)|(\(\+86\)))?1(3|4|5|6|7|8|9)\d{9}$/
      if (value.length == 0) {
        callback(new Error('请输入手机号码'))
      } else if (!mobileReg.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      } else {
        callback()
      }
    }
    const validateRealname = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/
      if (value.length == 0) {
        callback(new Error('请输入单位名称'))
      } else if (!reg.test(value)) {
        callback(new Error('单位名称只能输入中英文和数字'))
      } else {
        callback()
      }
    }
    const validateOrgName = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/
      if (value.length == 0) {
        callback(new Error('请输入单位名称'))
      } else if (!reg.test(value)) {
        callback(new Error('单位名称只能输入中英文和数字'))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/
      if (value.length == 0) {
        callback(new Error('请输入详细地址'))
      } else if (!reg.test(value)) {
        callback(new Error('地址只能输入中英文和数字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // const reg = /^[a-zA-Z0-9]+$/
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)/
      this.loginFocusState = false
      if ((value.length > 16 || value.length < 8) && reg.test(value)) {
        callback(new Error('长度8-16位'))
      } else if (value.length <= 16 && value.length >= 8 && !reg.test(value)) {
        callback(new Error('数字、字母、符号的组合，且至少使用其中两种'))
      } else if ((value.length > 16 || value.length < 8) && !reg.test(value)) {
        if (!reg.test(value)) {
          callback(new Error('8-16位数字、字母、符号的组合，且至少使用其中两种'))
        }
      } else {
        callback()
      }
    }
    const validateRealNameT = (rule, value, callback) => {
      const regName = /^[\u4e00-\u9fa5]{2,4}$/
      if (!regName.test(value)) {
        callback(new Error('请输入真实姓名'))
      } else {
        callback()
      }
    }
    return {
      filterStr: '',
      filterNumer: '',
      phoneForm: {
        phoneNumber: '',
        code: ''
      },
      phoneNumer: '',
      changePhoneForm: {
        phoneNumber: '',
        code: ''
      },
      phoneRules: {
        phoneNumber: [{ required: true, message: '请输手机号' }],
        code: [{ required: true, message: '请输入验证码' }]
      },
      bindPhoneRules: {
        phoneNumber: [{ required: true, validator: validateMobilePhone, trigger: 'change' }],
        code: [{ required: true, message: '请输入验证码' }]
      },
      show: true, // 初始启用按钮
      show2: true,
      count: '', // 初始化次数
      count2: '', // 解除倒数计次数
      timer: null,
      timer2: null, // 解除倒数
      signatureType: false,
      isPersonalCenter: false,
      userId: '',
      saveLoading: false,
      disableSubmit: false,
      enterUserSign: false,
      enterOrgSign: false,
      parentIdCopy: '',
      previewImg: '',
      previewDialog: false,
      loginFocusState: false,
      changePhoneDialogVisible: false,
      bindPhoneDialogVisible: false,
      messageId: '',
      form: {
        username: '',
        realName: '',
        orgName: '',
        password: '',
        roleId: '',
        roleName: '',
        type: '', // 1.公司 2.代理商 3.医院 4.驾校
        parentId: '', // 体检医院ID type 123传userId 4传parentId
        phone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        remark: '',
        userSign: '',
        orgSign: ''
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'change' }
        ],
        realName: [
          { required: true, validator: validateRealNameT, message: '请输入真实姓名', trigger: 'change' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'change' }
        ],
        orgName: [
          { required: true, validator: validateOrgName, trigger: 'change' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        parentId: [
          { required: true, message: '请选择上级单位', trigger: 'change' }
        ],
        address: [
          { required: true, validator: validateAddress, trigger: 'change' }
        ]
      },
      roleList: [],
      userTypeList: [],
      excludeProvince: ['810000', '820000', '830000']
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    resetForm () {
      this.$refs.phoneForm.resetFields()
    },
    resetChangeForm () {
      this.$refs.changePhoneForm.resetFields()
    },
    phoneNumFilter (phone) {
      // 1字符串转化成数组
      let phoneArr = [...phone]
      // 2.将数组中的4-7位变成*
      phoneArr.map((res, index) => {
        if (index > 2 && index < 7) {
          this.filterStr += '*'
          console.log(this.filterStr)
          // return '*';
        } else {
          this.filterStr += res
          // return res;
        }
      })
      return this.filterStr
    },
    send () {
      if (!this.timer) {
        this.$refs.phoneForm.validateField('phoneNumber', (phoneError) => {
          if (!phoneError) {
            sendMessage({
              signType: 0,
              templateType: 0,
              useType: 5,
              phoneNumber: this.phoneForm.phoneNumber
            }).then((res) => {
              if (res.code == 0) {
                this.$message({
                  message: '发送成功',
                  type: 'success'
                })
                this.messageId = res.data.messageId
              } else {
                this.show = true
                clearInterval(this.timer) // 清除定时器
                this.timer = null
              }
            }).catch(() => {
              this.show = true
              clearInterval(this.timer) // 清除定时器
              this.timer = null
            })
            this.count = 90
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= 90) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer) // 清除定时器
                this.timer = null
              }
            }, 1000)
          }
        })
      }
    },
    sendDelete () {
      if (!this.timer2) {
        sendMessage({
          signType: 0,
          templateType: 0,
          useType: 5,
          phoneNumber: this.form.phone
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
            this.messageId = res.data.messageId
          } else {
            this.show2 = true
            clearInterval(this.timer2) // 清除定时器
            this.timer2 = null
          }
        }).catch(() => {
          this.show2 = true
          clearInterval(this.timer2) // 清除定时器
          this.timer2 = null
        })
        this.count2 = 90
        this.show2 = false
        this.timer2 = setInterval(() => {
          if (this.count2 > 0 && this.count2 <= 90) {
            this.count2--
          } else {
            this.show2 = true
            clearInterval(this.timer2) // 清除定时器
            this.timer2 = null
          }
        }, 1000)
      }
    },
    bindPhone () {
      this.bindPhoneDialogVisible = true
    },
    bindSub () {
      this.$refs.phoneForm.validate((valid) => {
        if (valid) {
          checkCodeA({
            messageId: this.messageId,
            code: this.phoneForm.code
          }).then((res) => {
            if (res.code == 0) {
              console.log('验证成功')
              this.$message({
                message: '验证成功',
                type: 'success'
              })
              this.bindPhoneDialogVisible = false
              this.form.phone = this.phoneForm.phoneNumber
            } else {
              this.$message.error('验证失败')
            }
          })
        }
      })
    },
    editPhone () {
      this.$refs.phoneForm.validate((valid) => {
        if (valid) {
          editPhone({
            messageId: this.messageId,
            code: this.phoneForm.code,
            userId: this.userId,
            phone: this.phoneForm.phoneNumber
          }).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.form.phone = this.phoneForm.phoneNumber
              this.bindPhoneDialogVisible = false
            } else {
              this.$message.error('更新失败')
            }
          })
        }
      })
    },
    deleteBind () {
      this.$refs.changePhoneForm.validateField('code', (codeError) => {
        if (!codeError) {
          checkCodeB({
            messageId: this.messageId,
            code: this.changePhoneForm.code
          }).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: '解绑成功',
                type: 'success'
              })
              this.changePhoneDialogVisible = false
              this.bindPhoneDialogVisible = true
            }
          })
        }
      })
    },
    changePhone () {
      this.changePhoneDialogVisible = true
    },
    changeFocus () {
      const state = document.getElementById('loginState')
      const stateClass = state.getElementsByClassName('el-form-item__error')[0]
      if (!stateClass) {
        this.loginFocusState = true
      }
    },
    handleUserFilterId (id) {
      this.form.parentId = id
    },
    previewImage (str) {
      this.previewImg = this.form[str]
      this.previewDialog = true
    },
    uploadImg (e, id) {
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(e.target.value)) {
        this.$message.error('图片类型错误，只能上传JPG/PNG文件')
        return false
      }
      if (file.size / 1024 > 500) {
        this.$message.error('图片文件过大，不超过500k')
        return false
      }
      console.log(file)
      let formdata = new FormData()
      formdata.append('file', file)
      fileUpload(formdata).then((res) => {
        if (res.code == 0) {
          this.form[id] = res.data
          this.enterUserSign = false
          this.enterOrgSign = false
        }
      })
      let reader = new FileReader()
      reader.onload = e => {
        document.getElementById(id).value = '' // 解决同一张图片上传两次，第二次不触发change事件
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    validateArea (rule, value, callback) {
      if (this.excludeProvince.indexOf(this.form.province) != -1) {
        callback(new Error('系统暂不支持该地区'))
      } else {
        if (this.form.province && this.form.city && this.form.area) {
          callback()
        } else {
          callback(new Error('请选择完整的省/市/区'))
        }
      }
    },
    validateParentId (rule, value, callback) {
      if (this.form.type != 4) {
        callback()
      } else {
        if (!value) {
          callback(new Error('请选择体检医院'))
        } else {
          callback()
        }
      }
    },
    handleAreaList (val) {
      this.form.province = val.province
      this.form.city = val.city
      this.form.area = val.area
    },
    handleUserList () {
      this.$router.push({
        name: 'user'
      })
    },
    handleUserSave () {
      console.log(this.phoneForm.phoneNumber)
      const _this = this
      this.$refs.userEditForm.validate(valid => {
        let word = ''
        if (this.userId == '') {
          word = '新建'
        } else {
          word = '编辑'
        }
        if (valid) {
          // 医院类型判断签章是否正确上传
          if (this.form.type == 3) {
            this.signatureType = true
            if (!this.form.userSign || !this.form.orgSign) {
              this.$message({
                type: 'error',
                duration: 2000,
                message: '医院类型用户请先正确上传签章'
              })
              return
            }
          }

          if (this.userId == '') {
            let formData = {
              username: this.form.username,
              realName: this.form.realName,
              password: this.form.password,
              roleId: this.form.roleId,
              type: this.form.type,
              orgName: this.form.orgName,
              parentId: this.form.parentId,
              phone: this.form.phone,
              province: this.form.province,
              city: this.form.city,
              area: this.form.area,
              address: this.form.address,
              remark: this.form.remark,
              userSign: this.form.userSign,
              orgSign: this.form.orgSign,
              messageId: this.messageId
            }

            this.saveLoading = true
            addUser(formData).then((res) => {
              this.saveLoading = false
              if (res.code == 0) {
                this.disableSubmit = true
                this.$message({
                  type: 'success',
                  duration: 2000,
                  message: word + '用户成功！',
                  onClose: () => {
                    _this.handleUserList()
                  }
                })
              } else {
                this.saveLoading = false
                // this.$message.error(word + '用户不成功，请重新编辑')
              }
            }).catch(() => {
              this.saveLoading = false
              // this.$message.error(word + '用户不成功，请重新编辑')
            })
          } else {
            let formData = {
              id: this.userId,
              realName: this.form.realName,
              roleId: this.form.roleId,
              parentId: this.form.parentId,
              phone: this.form.phone,
              orgName: this.form.orgName,
              province: this.form.province,
              city: this.form.city,
              area: this.form.area,
              address: this.form.address,
              remark: this.form.remark,
              userSign: this.form.userSign,
              orgSign: this.form.orgSign,
              isPersonalCenter: this.isPersonalCenter
            }

            this.saveLoading = true
            editUser(formData).then((res) => {
              this.saveLoading = false
              if (res.code == 0) {
                this.disableSubmit = true
                this.$message({
                  type: 'success',
                  duration: 2000,
                  message: word + '用户成功！',
                  onClose: () => {
                    if (!_this.isPersonalCenter) {
                      _this.handleUserList()
                    }
                  }
                })
              } else {
                this.saveLoading = false
                // this.$message.error(word + '用户不成功，请重新编辑')
              }
            }).catch(() => {
              this.saveLoading = false
              // this.$message.error(word + '用户不成功，请重新编辑')
            })
          }
        } else {
          this.$message.error(word + '用户不成功，请重新编辑')
        }
      })
    }
  },
  created () {
    let userType = [
      // {
      //   id: 1,
      //   name: '公司'
      // },
      {
        id: 2,
        name: '代理商'
      },
      {
        id: 3,
        name: '医院'
      },
      {
        id: 4,
        name: '驾校'
      }
    ]
    this.userTypeList = userType.filter((val) => val.id >= parseInt(this.user.type))
    this.form.type = this.userTypeList[0].id
    this.userId = this.$route.query.userId || ''
    this.isPersonalCenter = this.$route.query.isPersonalCenter || this.user.id == this.userId || false
    if (this.userId) {
      getUserById({
        userId: this.userId,
        isPersonalCenter: this.isPersonalCenter
      }).then((res) => {
        if (res.code == 0) {
          // bugfix 可能是v-if 多处绑定userId,导致子组件重复渲染
          // this.userId = res.data.id
          this.filterNumer = this.phoneNumFilter(res.data.phone)
          this.form.username = res.data.username || ''
          this.form.realName = res.data.realName || ''
          this.form.roleId = res.data.roleList.length ? res.data.roleList[0].id : ''
          this.form.roleName = res.data.roleList.length ? res.data.roleList[0].roleName : ''
          this.form.type = res.data.type || ''
          this.form.orgName = res.data.orgName || ''
          this.form.parentId = (!res.data.parentId || res.data.parentId == -1) ? '' : res.data.parentId
          this.form.phone = res.data.phone || ''
          this.form.province = res.data.province || ''
          this.form.city = res.data.city || ''
          this.form.area = res.data.area || ''
          this.form.address = res.data.address || ''
          this.form.remark = res.data.remark || ''
          this.form.orgSign = res.data.orgSign || ''
          this.form.userSign = res.data.userSign || ''
          this.parentIdCopy = res.data.parentId
        }
      })
    }
    if (!this.isPersonalCenter) {
      roleList().then((res) => {
        if (res.code == 0) {
          this.roleList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss">
.hb-user-edit {
  background-color: #edeef2;
  .suggestion {
    color: rgb(153, 153, 153);
    font-size: 12px;
    width: 200px;
  }
  .phoneInput {
    display: flex;
    flex-direction: row;
    .el-button {
      width: 100px;
      height: 32px;
      margin-top: 5px;
      font-size: 12px;
      margin-left: 5px;
    }
    .el-button--primary {
      color: #fd7715;
      background-color: #f4f4f5;
      border-color: #fd7715;
    }
  }
  .slot-input {
    width: 100% !important;
  }
  .el-form-item__label {
    font-size: 12px;
    color: #666666;
  }
  .el-form-item__content {
    font-size: 12px;
    width: 375px;
  }
  .select-form {
    width: 100%;
  }
  .radio-form {
    display: flex;
    margin-top: 13px;
  }
  .el-textarea .el-input__count {
    line-height: normal;
  }
  .form-title {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
  .form-title:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #fd7715;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }
  .view-password {
    cursor: pointer;
  }
  .bindphoneDialog {
    .el-dialog--center {
      text-align: left;
    }
    .bindPhone {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .el-input__inner {
        height: 30px;
      }
      .el-form-item__content {
        width: 350px;
      }
      .phoneNumber {
        .el-input__inner {
          width: 80%;
        }
        span {
          color: rgb(51, 51, 51);
        }
      }
      .code {
        display: flex;
        flex-direction: row;
        .el-button {
          color: rgb(253, 119, 21);
          height: 30px;
          width: 100px;
        }
      }
      .bindButton {
        text-align: center;
      }
      label {
        font-size: 12px;
        color: rgb(102, 102, 102);
        display: inline-block;
        text-align: left;
      }
    }
  }
}
</style>
