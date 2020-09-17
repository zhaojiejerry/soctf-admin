<template>
  <div class="hb-device-edit">
    <wx-header showBack>
      <span slot="headerTitle">{{ deviceId ? '编辑设备' : '添加设备' }}</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content">
        <el-form ref="deviceEditForm" :model="form" :rules="rules" label-width="100px" >
          <el-form-item v-if="deviceId == ''" label="设备编码：" prop="code">
            <el-input size="small" :maxlength="25" v-model="form.code" placeholder="请输入或粘贴设备编码"></el-input>
          </el-form-item>
          <el-form-item v-if="deviceId != ''" label="设备编码：">
            <el-input disabled size="small" :maxlength="25" v-model="form.code" placeholder="请输入或粘贴设备编码"></el-input>
          </el-form-item>
          <el-form-item label="设备地点：" prop="area" :rules="[{required:true,validator: validateArea, trigger: 'change'}]">
            <hb-area-select :province="form.province" :city="form.city" :area="form.area" @getValue="handleAreaList"></hb-area-select>
          </el-form-item>
          <el-form-item label="" prop="place">
            <el-input size="small" :maxlength="60" v-model="form.place" placeholder="请输入详细地址，例如街道，门牌号"></el-input>
          </el-form-item>
          <el-form-item label="设备负责人：" prop="principal">
            <el-input size="small" :maxlength="60" v-model="form.principal" placeholder="请输入设备负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="视频流地址：" prop="videoUrl">
            <el-input size="small" :maxlength="200" v-model="form.videoUrl" placeholder="请输入设备视频流地址"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" show-word-limit :maxlength="100" resize="none" :rows="5" v-model="form.remark" placeholder="请填写备注信息"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex" style="justify-content:center;">
              <el-button :disabled="disableSubmit" type="primary" size="small" :loading="saveLoading" @click="handleDeviceSave">确定</el-button>
              <el-button size="small" @click="handleDeviceList">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import hbAreaSelect from '@/components/areaSelect/index'
import { updateDevice, deviceDetail } from '@/api/device.js'

export default {
  components: {
    wxHeader,
    hbAreaSelect
  },
  data () {
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
    return {
      deviceId: '',
      saveLoading: false,
      disableSubmit: false,
      form: {
        username: '',
        realName: '',
        province: '',
        city: '',
        area: '',
        place: '',
        principal: '',
        remark: '',
        ip: '',
        videoUrl: ''
      },
      rules: {
        address: [
          { validator: validateAddress, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入设备编码', trigger: 'blur' }
        ]
      },
      excludeProvince: ['810000', '820000', '830000']
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
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
    handleAreaList (val) {
      this.form.province = val.province
      this.form.city = val.city
      this.form.area = val.area
    },
    handleDeviceList () {
      this.$router.push({
        name: 'deviceList'
      })
    },
    handleDeviceSave () {
      const _this = this
      this.$refs.deviceEditForm.validate(valid => {
        let word = ''
        if (this.deviceId == '') {
          word = '新建'
        } else {
          word = '编辑'
        }
        if (this.form.code == '') {
          this.$message.error('设备编码不能为空')
          return
        }
        if (valid) {
          let formData = {
            code: this.form.code,
            userId: this.user.id,
            province: this.form.province,
            city: this.form.city,
            area: this.form.area,
            place: this.form.place,
            principal: this.form.principal,
            remark: this.form.remark,
            videoUrl: this.form.videoUrl,
            id: this.form.id || null
          }
          this.saveLoading = true
          updateDevice(formData).then((res) => {
            this.saveLoading = false
            if (res.code == 0) {
              this.disableSubmit = true
              this.$message({
                type: 'success',
                duration: 2000,
                message: word + '设备成功！',
                onClose: () => {
                  _this.handleDeviceList()
                }
              })
            }
          }).catch(() => {
            this.saveLoading = false
          })
        } else {
          this.$message.error(word + '设备不成功，请重新编辑')
        }
      })
    }
  },
  created () {
    this.deviceId = this.$route.query.deviceId || ''
    if (this.deviceId) {
      deviceDetail({
        deviceId: this.deviceId
      }).then((res) => {
        if (res.code == 0) {
          this.form.code = res.data.code || ''
          this.form.province = res.data.province || ''
          this.form.city = res.data.city || ''
          this.form.area = res.data.area || ''
          this.form.place = res.data.place || ''
          this.form.principal = res.data.principal || ''
          this.form.remark = res.data.remark || ''
          this.form.videoUrl = res.data.videoUrl || ''
          this.form.id = res.data.id || ''
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss">
  .hb-device-edit {
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
    .el-textarea {
      font-size: 13px;
    }
    .el-textarea .el-input__count {
      line-height: normal;
    }
  }
</style>
