<template>
  <div class="hb-device-info">
    <wx-header showBack>
      <span slot="headerTitle">交易详情</span>
      <span class="order-title" slot="headerOther">(交易单号 {{detailsData.id}})</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="order-info-container">
        <ul>
          <li>
            <label>业务单号</label>
            <span
              @click="handleBusinessInfo(detailsData.reportId)"
              style="cursor: pointer;color: rgb(64, 158, 255)"
            >{{detailsData.reportId}}</span>
          </li>
          <li>
            <label>订单创建时间</label>
            <span>{{detailsData.createTime}}</span>
          </li>
          <li>
            <label>业务类型</label>
            <span>{{detailsData.typeName}}</span>
          </li>
          <li>
            <label>支付状态</label>
            <span v-if="detailsData.payStatus == 1 " style="color: #67c23a;">已支付</span>
            <span v-if="detailsData.payStatus == 0" style="color: #ef4646;">未支付</span>
            <span v-if="detailsData.payStatus == 2" style="color: #ef4646;">待付款</span>
            <span v-if="detailsData.payStatus == 10000" style="color: #ef4646;">已关闭</span>
            <span v-if="detailsData.payStatus == 9999" style="color: #ef4646;">已退款</span>
            <span v-if="detailsData.payStatus == 9998" style="color: #ef4646;">退款中</span>
            <span v-if="detailsData.payStatus == -9999" style="color: #ef4646;">退款失败</span>
          </li>
          <li>
            <label>支付方式</label>
            <span>{{detailsData.channelName}}</span>
          </li>
          <li v-if="detailsData.type == 3">
            <label>体检收费</label>
            <span>{{tjInfo.length>0 ? tjInfo[0].amount : ''}}</span>
          </li>
          <li v-if="detailsData.type == 2">
            <label>照相收费</label>
            <span>{{photoInfo.length > 0 ? photoInfo[0].amount : ''}}</span>
          </li>
          <li v-if="detailsData.type == 1">
            <label>体检收费</label>
            <span>{{tjInfo.length>0 ? tjInfo[0].amount : ''}}</span>
          </li>
          <li v-if="detailsData.type == 1">
            <label>照相收费</label>
            <span>{{photoInfo.length > 0 ? photoInfo[0].amount : ''}}</span>
          </li>
          <li>
            <label>办理设备编码</label>
            <span>{{detailsData.terminalNo}}</span>
          </li>
          <li>
            <label>商户号</label>
            <span>{{detailsData.partner || '' }}</span>
          </li>
          <li>
            <label>第三方支付单号</label>
            <span>{{detailsData.tradeNo || ''}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getOrderDetails } from '@/api/order.js'
export default {
  data () {
    return {
      detailsData: [],
      tjInfo: [],
      photoInfo: []
    }
  },
  created () {
    this.getData()
  },
  components: {
    wxHeader
  },
  methods: {
    handleBusinessInfo (id) {
      this.$router.push({
        name: 'businessInfo',
        query: {
          healthId: id
        }
      })
    },
    getData () {
      this.orderId = this.$route.query.orderId || ''
      let params = {
        orderId: this.orderId
      }
      getOrderDetails(params).then(res => {
        this.detailsData = res.data
        this.tjInfo = res.data.detailList.filter((item) => {
          return item.businessType == 1
        })
        this.photoInfo = res.data.detailList.filter((item) => {
          return item.businessType == 2
        })
        if (this.tjInfo.length == 0) {
          this.tjInfo = [
            {
              businessId: '',
              amount: 0
            }
          ]
        }
        if (this.photoInfo.length == 0) {
          this.photoInfo = [
            {
              businessId: '',
              amount: 0
            }
          ]
        }
      })
    }
  }

}
</script>
<style lang="scss">
.order-title {
  font-size: 12px;
  color: rgb(153, 153, 153);
  font-weight: normal;
}
.order-info-container {
  padding: 30px 50px 0px 100px;
  width: 1400px;
  height: 700px;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  ul {
    li {
      width: 33%;
      padding-bottom: 45px;
      text-align: left;
      label {
        font-size: 12px;
        color: rgb(51, 51, 51);
        width: 20%;
        display: inline-block;
      }
      span {
        font-size: 12px;
        margin-left: 10px;
        text-align: left;
        color: rgb(102, 102, 102);
      }
    }
  }
}
</style>
