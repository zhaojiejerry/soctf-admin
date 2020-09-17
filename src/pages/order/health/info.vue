<template>
  <div class="hb-business-info">
    <wx-header showBack>
      <span slot="headerTitle">业务订单信息</span>
      <span class="second-font" slot="headerOther" style="color:#999999">(业务单号{{healthId}})</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="big-container1">
          <span class="health-list-header-title">详细信息</span>
          <div class="info-container">
            <ul>
              <li>
                <label>办理人姓名:</label>
                <span>{{healthData.driverName}}</span>
              </li>
              <li>
                <label>办理人身份证:</label>
                <span
                  :title="healthData.driverIdentity"
                  class="ellipsis"
                >{{healthData.driverIdentity}}</span>
              </li>
              <li>
                <label>办理业务:</label>
                <span v-if="healthData.type == 1" class="ellipsis">体检、照相</span>
                <span v-if="healthData.type == 2" class="ellipsis">仅照相</span>
                <span v-if="healthData.type == 3" class="ellipsis">体检</span>
              </li>
              <li>
                <label>办理时间:</label>
                <span :title="healthData.createTime" class="ellipsis">{{healthData.createTime}}</span>
              </li>
              <li>
                <label>办理设备编码:</label>
                <span :title="healthData.deviceCode" class="ellipsis">{{healthData.deviceCode}}</span>
              </li>
              <li>
                <label>办理详情:</label>
                <span
                  v-if="healthData.type == 1"
                  @click="handleHealthDetail()"
                  style="cursor: pointer;color: rgb(64, 158, 255);"
                  class="ellipsis"
                >体检详情</span>
                <span v-if="healthData.type == 2">仅照相</span>
                <span
                  v-if="healthData.type == 3"
                  @click="handleHealthDetail()"
                  style="cursor: pointer;color: rgb(64, 158, 255)"
                  class="ellipsis"
                >体检详情</span>
              </li>
              <li>
                <label>支付状态:</label>
                <span v-if="healthData.payStatus == 2" style="color: #67c23a;">已支付</span>
                <span v-if="healthData.payStatus == 1" style="color: #ef4646;">未支付</span>
                <span v-if="healthData.payStatus == 3" style="color: #ef4646;">全部退款</span>
                <span v-if="healthData.payStatus == 4" style="color: #ef4646;">部分退款</span>
              </li>
              <li v-if="healthData.type == 1||healthData.type == 3">
                <label>审核状态:</label>
                <span v-if="healthData.checkStatus == 0" style="color: #fa8c20;">待审核</span>
                <span v-if="healthData.checkStatus == 1" style="color: #67c23a;">已审核</span>
                <span v-if="healthData.checkStatus == -1" style="color: #ef4646;">驳回</span>
                <span v-if="healthData.checkStatus == -2" style="color: #ef4646;">自动驳回</span>
              </li>
              <li v-if="refundTotalAmount">
                <label>累计退款:</label>
                <span>{{refundTotalAmount}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="big-container">
          <span class="order-list-header-title">关联交易记录</span>
          <div class="record-container">
            <template>
              <el-table
                :data="orderData"
                height="100%"
                :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold',fontSize: '14px'}"
                :cell-style="{fontSize: '12px'}"
              >
                <div slot="empty">
                  <p>
                    <img src="./暂无内容.png" />
                  </p>
                  <p style="color: #999999;font-size: 12px;margin-top: -50px">暂无关联交易记录</p>
                </div>
                <el-table-column prop="id" label="交易单号" width="225">
                  <template slot-scope="scope">
                    <span
                      @click="handleRecordDetail(scope.row.id)"
                      style="cursor: pointer;color: rgb(64, 158, 255)"
                    >{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="交易订单创建时间" width="235"></el-table-column>
                <el-table-column prop="typeName" label="业务类型">
                  <template
                    slot-scope="scope"
                  >{{ scope.row.type == 1 ? '体检+拍照' : scope.row.type == 2 ? '拍照' : '体检' }}</template>
                </el-table-column>
                <el-table-column prop="payAmount" label="金额" width="160">
                  <template slot-scope="scope">
                    <span v-if="scope.row.payAmount > 0 ">+{{scope.row.payAmount}}</span>
                    <span v-else>{{scope.row.payAmount}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="channelName" label="支付方式"></el-table-column>
                <el-table-column prop="payStatusName" label="支付状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.payStatus == 1" style="color: #67c23a;">已支付</span>
                    <span v-if="scope.row.payStatus == 0" style="color: #ef4646;">未支付</span>
                    <span v-if="scope.row.payStatus == 2" style="color: #ef4646;">待付款</span>
                    <span v-if="scope.row.payStatus == 10000" style="color: #ef4646;">已关闭</span>
                    <span v-if="scope.row.payStatus == 9999" style="color: #ef4646;">已退款</span>
                    <span v-if="scope.row.payStatus == 9998" style="color: #ef4646;">退款中</span>
                    <span v-if="scope.row.payStatus == -9999" style="color: #ef4646;">退款失败</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="button-container">
            <el-button
              style="width: 100px"
              type="primary"
              @click="refund"
              v-if="this.orderData.length>0 && healthData.payStatus == 2 && btnPermissions.indexOf('1000408') != -1"
            >退款</el-button>
            <el-button
              style="width: 100px"
              type="primary"
              @click="refund"
              v-if="this.orderData.length>0 && healthData.payStatus == 4 && btnPermissions.indexOf('1000408') != -1"
            >退款</el-button>
          </div>
        </div>
        <el-dialog
          title="退款"
          :visible.sync="DialogVisible"
          width="453px"
          custom-class="check-bill-dialog"
          center
          style="text-align: center"
          @close="resetForm"
        >
          <div class="refundInfo">
            <el-form label-width="100px" ref="refundForm" :model="form" :rules="rules">
              <div class="money">
                <el-form-item label="支付金额：">
                  <span>{{payAmount}}</span>
                </el-form-item>
                <el-form-item label="剩余可退：">
                  <span>{{sykt}}</span>
                </el-form-item>
              </div>
              <el-form-item label="退款金额：" prop="refundAmount">
                <el-input style="width: 91%" placeholder="请输入退款金额" v-model="form.refundAmount"></el-input>
              </el-form-item>
              <div class="code">
                <el-form-item label="验证码：" prop="messageCode">
                  <el-input
                    placeholder="请输入验证码"
                    style="width: 50%"
                    resize="none"
                    v-model="form.messageCode"
                    prop="code"
                  ></el-input>
                  <el-button @click="send" style="width: 40%" :disabled="disabled=!show">
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s后重新发送</span>
                  </el-button>
                </el-form-item>
              </div>
              <div class="refundButton">
                <el-button type="primary" @click="refundSubmit" :loading="loadingbut">确定</el-button>
                <el-button @click="closeDialogVisible">取消</el-button>
              </div>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getOrderDetails, getOrdersByReportId, getBizOrderDetails } from '@/api/order.js'
import { getHealthById } from '@/api/health.js'
import { sendMessage, checkCodeA, checkCodeB, editPhone, refundOrder, sendSmsA } from '@/api/user.js'
export default {
  name: 'businessInfo',
  data () {
    const validateAmount = (rule, value, callback) => {
      console.log(this.sykt)
      const mobileReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/
      if (!mobileReg.test(value) || value == 0) {
        callback(new Error('请输入合法金额'))
      } else if (this.sykt - value < 0) {
        callback(new Error('剩余退款额度不足'))
      } else {
        callback()
      }
    }
    return {
      healthId: '',
      healthData: '',
      payAmount: '',
      loadingbut: false,
      orderData: [],
      refundTotalAmount: '',
      DialogVisible: false,
      detailsData: [],
      tjInfo: [],
      photoInfo: [],
      messageId: '',
      sykt: 0,
      filterStr: '',
      filterNumer: '',
      phone: '',
      form: {
        refundAmount: '',
        messageCode: ''
      },
      rules: {
        messageCode: [{ required: true, message: '请输入验证码' }],
        refundAmount: [{ required: true, validator: validateAmount, trigger: 'change' }]
      },
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null
    }
  },
  computed: {
    ...mapGetters(['btnPermissions'])
  },
  created () {
    this.healthId = this.$route.query.healthId || ''
    console.log(this.healthId)
    if (!this.healthId) {
      if (!this.isPlatform) {
        this.$message.error('体检单不存在')
      }
    } else {
      this.getData()
      this.getRecord()
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'user'
  //   ])
  // },
  components: {
    wxHeader
  },
  methods: {
    closeDialogVisible () {
      this.DialogVisible = false
    },
    handleHealthDetail () {
      this.$router.push({
        name: 'businessDetail',
        query: {
          healthId: this.$route.query.healthId
        }
      })
    },
    handleRecordDetail (id) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          orderId: id
        }
      })
    },
    send () {
      if (!this.timer) {
        this.$refs.refundForm.validateField('refundAmount', (amountError) => {
          if (!amountError) {
            sendSmsA({
              signType: 0,
              templateType: 0,
              useType: 0
            }).then((res) => {
              if (res.code == 0) {
                this.$message({
                  message: '短信已发送',
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
    refundSubmit () {
      this.$refs.refundForm.validate(valid => {
        if (valid) {
          this.loadingbut = true
          refundOrder({
            messageId: this.messageId,
            messageCode: this.form.messageCode,
            reportId: this.healthId,
            refundAmount: this.form.refundAmount
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: '退款成功！',
                onClose: () => {
                  this.DialogVisible = false
                  this.loadingbut = false
                  this.getRecord()
                  this.getData()
                }
              })
            } else {
              this.loadingbut = false
            }
          })
        }
      })
    },
    resetForm () {
      this.$refs.refundForm.resetFields()
    },
    refund () {
      this.sykt = parseFloat(this.payAmount - this.refundTotalAmount).toFixed(2)
      this.DialogVisible = true
    },
    getData () {
      const _this = this
      const loading = _this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.record-container')
      })
      getBizOrderDetails({
        reportId: this.healthId
      }, false).then((res) => {
        if (res.code == 0) {
          loading.close()
          this.healthData = res.data
        } else {
          loading.close()
        }
      }).catch(() => {
        loading.close()
      })
    },
    getRecord () {
      const _this = this
      getOrdersByReportId({
        reportId: this.healthId
      }).then((res) => {
        if (res.code == 0) {
          this.orderData = res.data.orderVOList || []
          this.refundTotalAmount = res.data.totalRefund || 0
          this.payAmount = res.data.payAmount
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss">
.hb-business-info {
  background-color: #edeef2;
}
.health-list-header-title {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 16px;
  font-size: 16px;
  color: #333333;
  border-left: 4px solid #fd7715;
  width: 76px;
}
.order-list-header-title {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 16px;
  font-size: 16px;
  color: #333333;
  border-left: 4px solid #fd7715;
  width: 108px;
}

.info-container {
  padding: 30px 0 0 0;
  ul {
    li {
      width: 33%;
      display: inline-block;
      padding-bottom: 30px;
      text-align: left;
      position: relative;
      overflow: hidden;
      label {
        box-sizing: border-box;
        font-size: 12px;
        color: #999999;
        width: 160px;
        padding-left: 80px;
        display: inline-block;
        position: absolute;
        left: 0;
      }
      span {
        font-size: 12px;
        padding-left: 180px;
        text-align: left;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
.big-container1 {
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  padding: 15px 18px;
  flex: 0 0 190px;
}
.big-container {
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
  box-sizing: border-box;
  padding: 15px 18px 30px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .record-container {
    padding: 15px 0 75px 0;
    box-sizing: border-box;
    flex: 1;
    overflow: hidden;
  }
  .button-container {
    text-align: center;
  }
}
.refundInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  .money {
    display: flex;
    flex-direction: row;
  }
  .code {
    display: flex;
    flex-direction: row;
  }
  .refundButton {
    text-align: center;
  }
  label {
    font-size: 12px;
    color: rgb(102, 102, 102);
    text-align: right;
    width: 80px;
    display: inline-block;
  }
  .el-textarea__inner {
    height: 70px;
    font-size: 12px;
  }
}
</style>
