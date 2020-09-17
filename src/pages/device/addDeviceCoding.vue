<template>
  <div class="hb-device-code-edit">
    <wx-header showBack>
      <span slot="headerTitle">{{ '新建设备编码' }}</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex">
        <div class="coding-left-part">
          <el-form ref="deviceEditForm" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="设备型号：" prop="model">
              <el-select class="select-form" v-model="form.model" placeholder="请选择设备型号" size="small">
                <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="厂商名称：" prop="manufacturer">
              <el-select class="select-form" v-model="form.manufacturer" placeholder="请选择厂商名称" size="small">
                <el-option v-for="item in manufacturerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编码：" prop="deviceCode">
              <div class="code-area flex flex-column">
                <el-button size="small" class="create-code-button" :disabled="!form.model || !form.manufacturer" @click="handleDeviceCode">生成设备编码</el-button>
                <div class="code-content" v-show="!form.deviceCode">
                  <div class="code-itme-bg" v-for="i of 4" :key="'code1' + i"></div>
                  <div class="code-sperate">-</div>
                  <div class="code-itme-bg" v-for="i of 4" :key="'code2' + i"></div>
                  <div class="code-sperate">-</div>
                  <div class="code-itme-bg" v-for="i of 6" :key="'code3' + i"></div>
                  <div class="code-sperate">-</div>
                  <div class="code-itme-bg" v-for="i of 4" :key="'code4' + i"></div>
                </div>

                <div class="device-code" v-show="form.deviceCode">{{form.deviceCode}}</div>
                <span class="create-code-tip">选择设备型号和厂商名称后可生成设备编码</span>
              </div>
            </el-form-item>
            <el-form-item label="开关机卡mac地址：" prop="manufacturer">
              <el-input v-model="form.cardMacAddr"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex center-buttons">
                <el-button type="primary" size="small" :loading="saveLoading" @click="handleDeviceCodeSave">确定</el-button>
                <el-button size="small" @click="handleCodeList">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="coding-right-part flex">
          <div class="coding-add-buttons">
            <el-button size="small" icon="iconfont icon-add" v-if="btnPermissions.indexOf('10001020101') != -1" @click="handleCreateModel"><i></i>新建型号</el-button>
            <el-button size="small" icon="iconfont icon-add" v-if="btnPermissions.indexOf('10001020102') != -1" @click="handleCreateManufacturer">新建厂商</el-button>
          </div>
          <div class="coding-create-area">
            <div class="create-model" v-if="createModel">
              <el-form label-width="85px" :rules="modelRules" :model="modelForm" ref="modelForm" style="margin-top: 21px;">
                <el-form-item label="设备型号：" prop="jqdh">
                  <div class="input-con">
                    <input class="jqdh-input" :maxlength="4" v-model="modelForm.jqdh" placeholder="机器代号">
                    <span class="sperate"></span>
                    <input class="version-input" :maxlength="20" v-model="modelForm.version" placeholder="上市年份、系列、版本">
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" :loading="saveLoading" @click="handleSaveModel">确定</el-button>
                  <el-button size="small" @click="handleCancleCreateModel">取消</el-button>
                </el-form-item>
              </el-form>
            </div>

            <div class="create-manufacturer" v-if="createManufacturer">
              <el-form label-width="85px" style="margin-top: 21px;" ref="manufacturerForm" :model="manufacturerForm" :rules="manufacturerRules">
                <el-form-item label="厂商名称：" prop="manufacturerName">
                  <el-input size="small" :maxlength="20" v-model="manufacturerForm.manufacturerName" placeholder="请输入厂商名称"></el-input>
                </el-form-item>
                <el-form-item label="厂商代号：" prop="manufacturerNumber">
                  <el-input size="small" :maxlength="4" v-model="manufacturerForm.manufacturerNumber" placeholder="4位字母或数字"></el-input>
                </el-form-item>
                <el-form-item label="厂商地址：">
                  <el-input size="small" :maxlength="40" v-model="manufacturerForm.manufacturerAddress" placeholder="请输入厂商地址"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" :loading="saveLoading" @click="handleSaveManufacturer">确定</el-button>
                  <el-button size="small" @click="handleCancleCreateManufacturer">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { addDeviceCoding, getManufacturerList, getModelList, addDeviceModel, addDeviceManufacturer, generatorCode } from '@/api/deviceCoding'

export default {
  components: {
    wxHeader
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  data () {
    const validateManufacturerNumber = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9]+$/
      if (value.length == 0) {
        callback(new Error('请输入厂商代码'))
      } else if (!reg.test(value)) {
        callback(new Error('厂商代码只能输入中英文和数字'))
      } else {
        callback()
      }
    }

    const validateModelJqdh = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9]+$/
      if (value.length == 0) {
        callback(new Error('请输入型号代码'))
      } else if (!reg.test(value)) {
        callback(new Error('设备型号只能输入中英文和数字'))
      } else if (this.modelForm.version.length == 0) {
        callback(new Error('请输入型号名称'))
      } else {
        callback()
      }
    }

    return {
      saveLoading: false,
      form: {
        model: '',
        manufacturer: '',
        deviceCode: '', // 设备编码
        cardMacAddr: ''
      },
      rules: {
        model: [
          { required: true, message: '请选择设备型号', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '请选择厂商', trigger: 'blur' }
        ],
        deviceCode: [
          { required: true, message: '请先生成设备编码' }
        ]
      },
      createModel: false,
      createManufacturer: false,
      modelForm: {
        jqdh: '', // 机器代号
        version: '' // 上市年份、系列、版本
      },
      modelRules: {
        jqdh: [
          {validator: validateModelJqdh, trigger: 'blur'}
        ]
      },
      manufacturerForm: {
        manufacturerName: '', // 厂商名字
        manufacturerNumber: '', // 厂商代号
        manufacturerAddress: '' // 厂商地址
      },
      manufacturerRules: {
        manufacturerNumber: [
          { validator: validateManufacturerNumber, trigger: 'blur' }
        ],
        manufacturerName: [
          {required: true, message: '请输入厂商名字', trigger: 'blur'}
        ]
      },
      modelList: [],
      manufacturerList: []
    }
  },
  methods: {
    handleDeviceCodeSave () {
      const _this = this
      this.$refs.deviceEditForm.validate(valid => {
        let word = '新建'
        if (valid) {
          // let modelItem = this.modelList.find(item => {
          //   return item.code == this.form.model
          // })

          // let manufacturerItem = this.manufacturerList.find(item => {
          //   return item.code == this.form.manufacturer
          // })

          let formData = {
            code: this.form.deviceCode,
            modelId: this.form.model,
            manufacturerId: this.form.manufacturer,
            cardMacAddr: this.form.cardMacAddr
          }
          this.saveLoading = true
          addDeviceCoding(formData).then((res) => {
            this.saveLoading = false
            if (res.code == 0) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: word + '设备编码成功！'
              })
              if (!this.deviceId) {
                // 新建跳回列表页
                this.handleCodeList()
              }
            }
          }).catch(() => {
            this.saveLoading = false
          })
        } else {
          this.$message.error(word + '设备编码失败，请输入相关信息')
        }
      })
    },
    handleCodeList () {
      this.$router.push({
        name: 'deviceCoding'
      })
    },
    handleDeviceCode () {
      // 根据厂商和设备型号的id ===》》 code
      let modelCodeIndex = this.modelList.findIndex((value, index, array) => {
        return value.id == this.form.model
      })
      let manufacturerCodeIndex = this.manufacturerList.findIndex((value, index, array) => {
        return value.id == this.form.manufacturer
      })

      generatorCode({
        modelCode: this.modelList[modelCodeIndex].code,
        manufacturerCode: this.manufacturerList[manufacturerCodeIndex].code
      }).then(res => {
        if (res.code == 0) {
          this.form.deviceCode = res.data
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '生成设备编码失败',
          type: 'error'
        })
      })
    },
    handleCreateModel () {
      this.createManufacturer = false
      this.createModel = true
    },
    handleSaveModel () {
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          addDeviceModel({
            code: this.modelForm.jqdh,
            name: this.modelForm.jqdh + '-' + this.modelForm.version
          }).then((response) => {
            if (response.code == 0) {
              // 更新modelList
              getModelList().then((res) => {
                if (res.code == 0) {
                  this.modelList = res.data
                  this.form.model = response.data

                  this.handleCancleCreateModel()
                }
              })
            }
          }).catch(() => {
            this.$message({
              showClose: true,
              message: '创建设备型号失败:',
              type: 'error'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '新建设备型号失败'
          })
        }
      })
    },
    handleCancleCreateModel () {
      this.createModel = false
      this.modelForm.jqdh = ''
      this.modelForm.version = ''
    },
    handleCreateManufacturer () {
      this.createModel = false
      this.createManufacturer = true
    },
    handleSaveManufacturer () {
      this.$refs.manufacturerForm.validate(valid => {
        if (valid) {
          addDeviceManufacturer({
            name: this.manufacturerForm.manufacturerName,
            code: this.manufacturerForm.manufacturerNumber,
            address: this.manufacturerForm.manufacturerAddress
          }).then((response) => {
            if (response.code == 0) {
              // 更新manufacturerList
              getManufacturerList().then((res) => {
                if (res.code == 0) {
                  this.manufacturerList = res.data
                  this.form.manufacturer = response.data

                  this.handleCancleCreateManufacturer()
                }
              })
            }
          }).catch(() => {
            this.$message({
              showClose: true,
              message: '创建厂商失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: '创建厂商失败'
          })
        }
      })
    },
    handleCancleCreateManufacturer () {
      this.createManufacturer = false
      this.manufacturerForm.manufacturerNumber = ''
      this.manufacturerForm.manufacturerAddress = ''
      this.manufacturerForm.manufacturerName = ''
    }
  },
  created () {
    getManufacturerList().then((res) => {
      if (res.code == 0) {
        this.manufacturerList = res.data
      }
    })
    getModelList().then((res) => {
      if (res.code == 0) {
        this.modelList = res.data
      }
    })
  }
}
</script>

<style lang="scss">
  .hb-device-code-edit {
    background-color: #edeef2;
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
      justify-content: space-between;
      margin-top: 13px;
    }
    .el-textarea .el-input__count {
      line-height: normal;
    }
  }
  .coding-right-part{
    flex: 1;
    margin-left: 10px;
    margin-top: 5px;
    .coding-add-buttons{
      display: flex;
      flex-direction: column;
      margin-right: 17px;
      .el-button+.el-button{
        margin: 26px 0 0 0;
      }
    }
  }
  .code-area{
    height: 139px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    align-items: center;
    .create-code-button{
      width: 103px;
      margin-top: 22px;
    }
    .device-code{
      font-size: 20px;
      color: #333333;
      margin-top: 5px;
      position: relative;
      top: 5px;
    }
    .code-content{
      width: 264px;
      margin-top: 20px;
      height: 20px;
      display: flex;
      .code-itme-bg{
        width: 7px;
        height: 20px;
        background-color: #ededed;
        margin-right: 8px;
      }
      .code-sperate{
        margin-right: 8px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
    .create-code-tip{
      font-size: 12px;
      color: #333333;
    }
  }
  .center-buttons{
    justify-content: center;
  }
  .create-manufacturer{
    width: 373px;
    height: 235px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-form-item__content {
      font-size: 12px;
      width: 275px;
    }
  }
  .create-model{
    width: 373px;
    height: 132px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px
      rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    border: solid 1px #dcdcdc;
    .input-con{
      width: 271px;
      height: 34px;
      background-color: #ffffff;
      border-radius: 4px;
      border: solid 1px #dcdcdc;
      display: flex;
      align-items: center;
      .jqdh-input{
        width: 63px;
        border: none;
        height: 96%;
        padding: 0 0 0 15px;
        color: #333333;
        font-size: 12px;
      }
      .sperate{
        width: 10px;
        height: 2px;
        background: #000000;
        margin: 0 6px;
      }
      .version-input{
        width: 140px;
        border: none;
        height: 96%;
        padding: 0 15px;
        color: #333333;
      }
    }
  }
</style>
