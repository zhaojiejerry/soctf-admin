<template>
  <div class="hb-device-info">
    <wx-header showBack>
      <span slot="headerTitle">订单详情</span>
      <span class="second-font" slot="headerOther">(业务单号{{detailsData.id}})</span>
    </wx-header>
    <div class="hb-main-container">
      <table class="orderDetailsTable">
        <tr>
          <th>办理人姓名：</th>
          <td>许超</td>
        </tr>
        <tr>
          <th>办理人身份证：</th>
          <td>1901KB00190812E0A2</td>
        </tr>
        <tr>
          <th>办理设备：</th>
          <td>1901KB00190812E0A2</td>
        </tr>
        <tr>
          <th>办理业务:</th>
          <td>体检、照相</td>
        </tr>
        <tr>
          <th>办理详情：</th>
          <td>体检详情</td>
        </tr>
        <tr>
          <th>办理时间：</th>
          <td>2019-11-23 12:30:32</td>
        </tr>
        <tr>
          <th>体检收费：</th>
          <td>40</td>
        </tr>
        <tr>
          <th>打印照片收费：</th>
          <td>20</td>
        </tr>
        <tr>
          <th>审核状态：</th>
          <td>已审核</td>
        </tr>
        <tr>
          <th>支付状态：</th>
          <td>已支付</td>
        </tr>
        <tr>
          <th>累计退款：</th>
          <td>20</td>
        </tr>
      </table>
      <div>
        <el-button style="width: 100px">退款</el-button>
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
    //  this.getData();
  },
  components: {
    wxHeader
  },
  methods: {
    getData () {
      this.orderId = this.$route.query.orderId || ''
      let params = {
        orderId: this.orderId
      }
      getOrderDetails(params).then(res => {
        this.detailsData = res.data
        this.tjInfo = res.data.detailList.filter(item => {
          return item.businessType == 1
        })
        this.photoInfo = res.data.detailList.filter(item => {
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
.orderDetailsTable {
  padding-top: 80px;
  tr {
    display: block;
    width: 100%;
    margin-bottom: 36px;
    td,
    th {
      display: inline-block;
      width: 25%;
    }
    th {
      text-align: right;
    }
    td {
      text-align: left;
    }
  }
}
</style>
