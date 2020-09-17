<template>
  <div class="hb-device-info">
    <wx-header showBack>
      <span slot="headerTitle">设备信息</span>
      <span class="second-font" slot="headerOther">（设备编码 {{form.code}}）</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content device-info-con">
        <div class="info-left-part">
          <div class="part-title">
            <span class="part-title-left"></span>
            <span class="part-title-content" style="font-weight:bold">基本信息</span>
          </div>
          <el-form label-width="120px" style="margin-left:42px;margin-right: 20px;">
            <el-form-item label="单位名称：">{{ form.userName }}</el-form-item>
            <el-form-item
              label="设备地点："
            >{{ form.provinceName + form.cityName + form.areaName + form.place }}</el-form-item>
            <el-form-item label="设备负责人：">{{ form.principal }}</el-form-item>
            <el-form-item label="设备添加时间：">{{ form.createTime }}</el-form-item>
            <el-form-item label="设备添加者：">{{ user.realName}}</el-form-item>
            <el-form-item label="设备视频流地址：">{{ form.videoUrl }}</el-form-item>
            <el-form-item label="备注：">{{ form.remark }}</el-form-item>
          </el-form>
          <div class="info-btns">
            <el-button
              type="primary"
              v-if="btnPermissions.indexOf('100010101') != -1"
              size="small"
              @click="handleDeviceEdit()"
            >编辑设备</el-button>
          </div>
        </div>
        <div class="info-right-part">
          <div class="part-title">
            <span class="part-title-left"></span>
            <span class="part-title-content" style="font-weight:bold">状态信息</span>
          </div>
          <el-form label-width="120px" style="margin-left:42px;flex:1;">
            <el-form-item label="运行状态：">
              <div class="flex" style="align-items:center;">
                <span class="info-span" :style="useStyle" style="margin-top:5px">{{statusType}}</span>
              </div>
            </el-form-item>
            <el-form-item label="最近开机时间：">{{lastOpenTime}}</el-form-item>
            <el-form-item label="最近关机时间：">{{lastCloseTime}}</el-form-item>
            <el-form-item label="小票状态：">
              <div class="info-span-con">
                <span class="info-span" :style="xpStyle" style="margin-top:5px">{{xpType}}</span>
              </div>
            </el-form-item>
            <el-form-item label="相纸状态：">
              <div class="info-span-con">
                <span class="info-span" :style="xzStyle" style="margin-top:5px">{{xzType}}</span>
              </div>
            </el-form-item>
            <el-form-item label="相纸剩余：">
              <div class="info-span-con">
                <el-progress
                  :percentage="getPercentage"
                  :show-text="false"
                  :color="colors"
                  style="width:200px;margin-top:18px"
                ></el-progress>
                <div>
                  <span :style="xpNumberStyle" v-if="xpNumber">剩余：{{xpNumber}}张</span>
                </div>
                <span v-if="xpNumber == null" style="color:red">数量未知</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { deviceDetail, deviceRemoteControl } from '@/api/device.js'

export default {
  components: {
    wxHeader
  },
  data () {
    return {
      useStatus: '',
      receiptStatus: '',
      paperStatus: '',
      lastCloseTime: '',
      lastOpenTime: '',
      xpNumber: 0,
      percentage: 0,
      colors: [ // 状态颜色
        { color: '#f56c6c', percentage: 51 / 750 * 100 },
        { color: '#f3b631', percentage: 101 / 750 * 100 },
        { color: '#67c23a', percentage: 100 }
      ],
      PHOTO_PRINTER_ERRORMSG: {
        '0': '空闲',
        '1': '正在打印',
        '2': '未找到打印机',
        '3': '打印机初始化错误',
        '4': '打印机错误',
        '5': '缺纸',
        '6': '缺色带',
        '7': '头部冷却',
        '8': '电机冷却',
        '9': '打印机门打开',
        '10': '卡纸',
        '11': '色带错误',
        '12': '纸张定义错误',
        '13': '数据错误',
        '14': '废料箱错误',
        '15': '头部电压错误',
        '16': '头部位置错误',
        '17': '风扇停止错误',
        '18': '剪纸器错误',
        '19': '夹送辊错误',
        '20': '头部温度异常',
        '21': '介质温度异常',
        '22': '色带张力误差',
        '23': '模块错误',
        '24': '电机温度异常',
        '25': '系统错误',
        '26': 'flshprog mode',
        '27': '长时间未收到状态反馈'
      },
      REMIN_PRINTER_ERRORMSG: {
        '0': '打印机正常',
        '1': '打印机未连接或未上电',
        '2': '打印机和调用库不匹配',
        '3': '打印机打印头打开',
        '4': '打印机切刀未复位',
        '5': '打印机打印头过热',
        '6': '打印机黑标错误',
        '7': '打印机缺纸',
        '8': '打印机纸将尽',
        '9': '打印机卡纸'
      },
      deviceId: '',
      form: {
        username: '',
        realName: '',
        province: '',
        provinceName: '',
        city: '',
        cityName: '',
        area: '',
        areaName: '',
        place: '',
        principal: '',
        remark: '',
        videoUrl: '',
        createTime: '',
        userName: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'btnPermissions'
    ]),
    getPercentage () {
      return this.xpNumber / 750 * 100
    },
    xpPercentage () {
      if (this.receiptStatus == 0 || this.receiptStatus == 8) {
        return 100
      } else if (this.receiptStatus == 7) {
        return 0
      }
    },
    xpStyle () {
      if (this.receiptStatus == 0 || this.receiptStatus == 8) {
        return { background: this.colors[2].color }
      } else if (this.receiptStatus == 7) {
        return { background: this.colors[0].color }
      } else if (this.receiptStatus == null) {
        return { background: '#cccccc', color: '#444' }
      } else {
        return { background: this.colors[0].color, width: '1.3rem' }
      }
    },
    xpNumberStyle () {
      if (this.xpNumber > 100) {
        return { color: 'green' }
      } else if (this.xpNumber > 50) {
        return { color: 'rgb(243, 182, 49)' }
      } else {
        return { color: 'red' }
      }
    },
    xpType () {
      if (this.receiptStatus == 0 || this.receiptStatus == 8) {
        return '正常'
      } else if (this.receiptStatus == 7) {
        return '缺纸'
      } else if (this.receiptStatus == null) {
        return '未使用'
      } else {
        return this.REMIN_PRINTER_ERRORMSG[this.receiptStatus]
      }
    },
    xzPercentage () {
      // return 100
      if (this.paperStatus == 5) {
        return 0
      } else if (this.paperStatus == 0) {
        return 100
      } else if (this.paperStatus == null) {
        return 0
      } else {
        return 0
      }
    },
    xzStyle () {
      // return {background: this.colors[4].color}
      if (this.paperStatus == 5) {
        return { background: this.colors[0].color }
      } else if (this.paperStatus == 0) {
        return { background: this.colors[2].color }
      } else if (this.paperStatus == null) {
        return { background: '#cccccc', color: '#444' }
      } else {
        return { background: this.colors[0].color, width: '1.2rem' }
      }
    },
    useStyle () {
      // return {background: this.colors[4].color}
      if (this.useStatus == 0) {
        return { background: this.colors[0].color }
      } else if (this.useStatus == 2) {
        return { background: this.colors[0].color }
      } else if (this.useStatus == 1) {
        return { background: this.colors[2].color }
      } else {
        return { background: '#cccccc', color: '#444' }
      }
    },
    xzType () {
      if (this.paperStatus == 5) {
        return '缺纸'
      } else if (this.paperStatus == 0) {
        return '正常'
      } else if (this.paperStatus == null) {
        return '未使用'
      } else {
        return this.PHOTO_PRINTER_ERRORMSG[this.paperStatus]
      }
    },
    statusType () {
      if (this.useStatus == 0) {
        return '关机'
      } else if (this.useStatus == 2) {
        return '故障'
      } else if (this.useStatus == 1) {
        return '开机'
      } else {
        return '未知状态'
      }
    },
    statusIcon () {
      if (this.form.useStatus == 0) {
        return require('@/pages/device/images/poweroff.png')
      } else if (this.form.useStatus == 2) {
        return require('@/pages/device/images/error.png')
      } else {
        return require('@/pages/device/images/normal.png')
      }
    }
  },
  methods: {
    deviceRemoteControl (type) {
      deviceRemoteControl({
        deviceCode: this.form.code,
        instruction: type
      }).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '指令发送成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '指令发送失败:' + res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '指令发送失败, 请重试'
        })
      })
    },
    handleDeviceEdit () {
      this.$router.push({
        name: 'editDevice',
        query: {
          deviceId: this.deviceId || ''
        }
      })
    }
  },
  created () {
    let deviceId = this.$route.query.deviceId || ''
    let deviceCode = this.$route.query.deviceCode || ''
    if (!deviceId && !deviceCode) {
      this.$message.error('设备不存在')
    } else {
      deviceDetail({
        deviceId: deviceId,
        deviceCode: deviceCode
      }).then((res) => {
        if (res.code == 0) {
          this.deviceId = res.data.id || ''
          this.form.code = res.data.code || ''
          this.form.province = res.data.province || ''
          this.form.provinceName = res.data.provinceName || ''
          this.form.city = res.data.city || ''
          this.form.cityName = res.data.cityName || ''
          this.form.area = res.data.area || ''
          this.form.areaName = res.data.areaName || ''
          this.form.place = res.data.place || ''
          this.form.principal = res.data.principal || ''
          this.form.remark = res.data.remark || ''
          this.form.videoUrl = res.data.videoUrl || ''
          this.form.createTime = res.data.createTime ? moment(res.data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
          this.form.userName = res.data.userName || ''
          this.useStatus = res.data.useStatus || ''
          this.paperStatus = res.data.paperStatus
          this.receiptStatus = res.data.receiptStatus
          this.xpNumber = res.data.deviceModules.photoPaperQuantity
          this.lastCloseTime = res.data.lastCloseTime
          this.lastOpenTime = res.data.lastOpenTime
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss">
.hb-device-info {
  background-color: #edeef2;
  .el-form-item__label {
    font-size: 12px;
    color: #999999;
  }
  .el-form-item__content {
    font-size: 12px;
    word-wrap: break-word;
  }
  .device-info-con {
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 22px 27px 0 27px;
    .info-left-part {
      background-color: #ffffff;
      border-radius: 4px;
      flex: 400;
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .info-right-part {
      background-color: #ffffff;
      border-radius: 4px;
      flex: 600;
      margin-left: 25px;
      margin-top: 15px;
      display: flex;
      flex-direction: column;
    }
    .part-title {
      display: flex;
      align-items: center;
      margin: 16px 23px;
      .part-title-left {
        width: 4px;
        height: 16px;
        background-color: #fd7715;
      }
      .part-title-content {
        font-size: 16px;
        margin-left: 18px;
      }
    }
    .info-btns {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 27px;
    }
    .paper-status {
      display: flex;
      flex-direction: row;
    }
    .info-consumable-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 128px;
      position: relative;
      .icon-xiangce {
        position: absolute;
        top: 39px;
        left: 52px;
        font-size: 25px;
        color: #666666;
      }
    }
    .info-consumable-item-top {
      width: 128px;
      height: 106px;
      background-color: #67c23a;
    }
    .info-consumable-item-bottom {
      max-width: 58px;
      min-width: 48px;
      height: 24px;
      line-height: 24px;
      background-color: #67c23a;
      border-radius: 12px;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
    }
    .info-span {
      display: inline-block;
      width: 48px;
      height: 25px;
      line-height: 25px;
      border-radius: 4px;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
