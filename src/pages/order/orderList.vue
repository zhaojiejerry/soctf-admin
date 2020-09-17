<template>
  <div class="hb-order-list">
    <wx-header>
      <span slot="headerTitle">交易记录</span>
      <span class="second-font" slot="headerOther">
        (共
        <em class="main-color">{{ Number(totalNum) }}</em>个订单，总计
        <em class="main-color">{{ Number(amount_involved) }}</em>元，实收
        <em class="main-color">{{ Number(amount_successful) }}</em>元)
      </span>
      <div class="flex" slot="headerRight">
        <el-input
          size="small"
          :maxlength="20"
          clearable
          class="reset-input header-search"
          :placeholder="filterPlaceHolder"
          v-model="filterText"
          @clear="timeFilterChange"
          @keyup.enter.native="timeFilterChange"
        >
          <div class="header-sort" slot="prepend">
            <el-select
              ref="headerSort"
              size="small"
              popper-class="header-sort-select"
              v-model="filterType"
            >
              <el-option value="searchAll">
                <i class="iconfont icon-all sort-icon"></i>
                <span class="sort-text">全部</span>
              </el-option>
              <el-option value="orderId">
                <i class="iconfont icon-dingdan sort-icon"></i>
                <span class="sort-text">交易单号</span>
              </el-option>
              <el-option value="partner">
                <i class="iconfont icon-bianma sort-icon"></i>
                <span class="sort-text">商户号</span>
              </el-option>
              <!-- <el-option value="reportId">
                <i class="iconfont icon-idcard sort-icon"></i>
                <span class="sort-text">业务编号</span>
              </el-option>
              <el-option value="deviceCode">
                <i class="iconfont icon-bianma sort-icon"></i>
                <span class="sort-text">设备编码</span>
              </el-option>
              <el-option value="tradeNo">
                <i class="iconfont icon-name sort-icon"></i>
                <span class="sort-text">收款编号</span>
              </el-option>-->
            </el-select>
            <i class="header-icon iconfont" :class="filterIcon" @click.stop="handleToggle"></i>
          </div>
          <el-button slot="append" icon="iconfont icon-search" @click="timeFilterChange"></el-button>
        </el-input>
        <i class="split-line"></i>
        <el-button size="small" class="header-search-more" icon="iconfont icon-more" disabled></el-button>
      </div>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="space-between">
          <div class="left-part">
            <el-date-picker
              prefix-icon="iconfont icon-calendar"
              size="small"
              class="reset-input mr15 mb15"
              type="datetimerange"
              v-model="timeRange"
              range-separator="至"
              @change="timeFilterChange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            />
          </div>
          <div class="right-part">
            <el-button
              size="small"
              :disabled="btnPermissions.indexOf('100040101') == -1"
              type="primary"
              @click="exportExcelData"
            >订单导出</el-button>
          </div>
        </div>
        <el-table
          class="list-table order-table"
          :header-cell-style="{background:'#edeef2', color:'#333333', fontWeight: 'bold'}"
          :cell-style="{fontSize: '12px'}"
          :default-sort="{prop: 'createTime', order: 'descending'}"
          tooltip-effect="dark"
          :data="orderList"
          current-row-key="id"
          @sort-change="handleSortChange"
          height="100%"
        >
          <el-table-column show-overflow-tooltip label="交易单号" width="280">
            <template slot-scope="scope">
              <el-button
                type="text"
                :disabled="btnPermissions.indexOf('100040102') == -1"
                @click="goOrderDetails(scope.row.id)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="type"
            width="120"
            column-key="typeone"
            label="业务类型"
          >
            <filter-panel
              slot="header"
              column-key="typeone"
              title="业务类型"
              :default-value="typeValue"
              :filters="typeOptions"
              @change="filterChangeData"
            ></filter-panel>
            <template
              slot-scope="scope"
            >{{ scope.row.type == 1 ? '体检、拍照' : scope.row.type == 2 ? '照相' : '体检' }}</template>
          </el-table-column>
          <el-table-column prop="payAmount" width="120" label="支付金额"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="channel"
            width="100"
            column-key="payone"
            label="支付方式"
          >
            <filter-panel
              slot="header"
              column-key="payone"
              title="支付方式"
              :default-value="payoneValue"
              :filters="payMethods"
              @change="filterChangeData"
            ></filter-panel>
            <template slot-scope="scope">{{ filterPayWay(scope.row.channel) }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="payStatus"
            width="100"
            column-key="paystateone"
            label="支付状态"
          >
            <filter-panel
              slot="header"
              column-key="paystateone"
              title="支付状态"
              :default-value="payStatusValue"
              :filters="payState"
              @change="filterChangeData"
            ></filter-panel>
            <template slot-scope="scope">
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == 1 "
                style="color: #67c23a;"
              >已支付</span>
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == 0"
                style="color: #ef4646;"
              >未支付</span>
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == 2"
                style="color: #ef4646;"
              >待付款</span>
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == 10000"
                style="color: #ef4646;"
              >已关闭</span>
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == 9999"
                style="color: #ef4646;"
              >已退款</span>
              <span
                class="table-pay-status"
                v-if="scope.row.payStatus == -9999"
                style="color: #ef4646;"
              >退款失败</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="partner" label="商户号"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            sortable="custom"
            width="180"
            label="订单创建时间"
          ></el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination
            v-if="totalNum != 0"
            background
            size="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            layout="prev, pager, next, sizes, jumper, slot"
            :total="totalNum"
          >
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getOrderList, getOrderStatistics, getMerchantPayChannel } from '@/api/order.js'
import filterPanel from '@/components/tableFilterPanel/filter-panel'
import constant from '@/api/api'
import { exportExcel } from '@/utils/exportExcel'
export default {
  name: 'orderList',
  components: {
    wxHeader,
    filterPanel
  },
  data () {
    return {
      amount_successful: 0,
      amount_involved: 0,
      totalNum: 0, // 照相单总数
      filterType: 'searchAll', // 关键字类型
      filterText: '', // 关键字text
      timeRange: [], // 时间段
      orderList: [], // 订单列表
      currentPage: 1,
      pageSize: 10,
      formData: null,
      payStatus: ['1'], // 支付状态
      typeValue: [],
      payoneValue: [],
      payStatusValue: ['1'],
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      // payStatusOptions: [
      //   {
      //     value: '0',
      //     text: '未支付'
      //   },
      //   {
      //     value: '1',
      //     text: '已支付'
      //   }
      // ],
      channel: [], // 收款方式
      channelOptions: [
      ],
      type: [], // 业务类型
      typeOptions: [
        {
          value: '1',
          text: '体检、拍照'
        },
        {
          value: '2',
          text: '拍照'
        },
        {
          value: '3',
          text: '体检'
        }
      ],
      payMethods: [
        {
          value: '0',
          text: '支付宝'
        },
        {
          value: '1',
          text: '微信支付'
        },
        {
          value: '2',
          text: '银联商务'
        },
        {
          value: '3',
          text: '工商银行'
        },
        {
          value: '4',
          text: '农业银行'
        }
      ],
      payState: [
        {
          value: '1',
          text: '已支付'
        },
        {
          value: '0',
          text: '未支付'
        },
        {
          value: '2',
          text: '待付款'
        },
        {
          value: '10000',
          text: '已关闭'
        },
        {
          value: '9999',
          text: '已退款'
        },
        {
          value: '-9999',
          text: '退款失败'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ]),
    filterPlaceHolder () {
      if (this.filterType == 'searchAll') {
        return '请输入关键字'
      } else if (this.filterType == 'orderId') {
        return '请输入订单编号'
      } else if (this.filterType == 'reportId') {
        return '请输入业务编号'
      } else if (this.filterType == 'deviceCode') {
        return '请输入设备编号'
      } else if (this.filterType == 'tradeNo') {
        return '请输入收款编号'
      } else if (this.filterType == 'partner') {
        return '请输入商户号'
      }
    },
    filterIcon () {
      if (this.filterType == 'searchAll') {
        return 'icon-all'
      } else if (this.filterType == 'orderId') {
        return 'icon-dingdan'
      } else if (this.filterType == 'reportId') {
        return 'icon-idcard'
      } else if (this.filterType == 'tradeNo') {
        return 'icon-name'
      } else if (this.filterType == 'deviceCode') {
        return 'icon-bianma'
      } else if (this.filterType == 'partner') {
        return 'icon-bianma'
      }
    }
  },
  methods: {
    filterChangeData (val) {
      (val.key == 'typeone') && (this.typeValue = val.value);
      (val.key == 'payone') && (this.payoneValue = val.value);
      (val.key == 'paystateone') && (this.payStatusValue = val.value)
      this.type = this.typeValue
      this.channel = this.payoneValue
      this.payStatus = this.payStatusValue
      this.currentPage = 1
      this.handleSearch()
      this.handleUpdateMoney()
    },
    filterPayWay (channel) {
      let arr = this.channelOptions.filter(item => { return item.value == channel })
      if (arr.length > 0) {
        return arr[0].txt ? arr[0].txt : ''
      } else {
        return ''
      }
    },
    goDeviceInfo (deviceCode) {
      this.$router.push({
        name: 'deviceInfo',
        query: {
          deviceCode: deviceCode
        }
      })
    },
    // 跳转编码详情
    goOrderDetails (id) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          orderId: id
        }
      })
    },
    handleCopySuccess (e) {
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    handleCopyError () {
      this.$message({
        showClose: true,
        message: '复制失败',
        type: 'error'
      })
    },
    handleToggle () {
      if (this.$refs.headerSort.visible) {
        this.$refs.headerSort.blur()
      } else {
        this.$refs.headerSort.visible = true
      }
    },
    timeFilterChange () {
      // 判断所选日期有没有超过31天
      if (this.timeRange) {
        const startTime = this.timeRange[0] ? new Date(this.timeRange[0]).getTime() : 0
        const endTime = this.timeRange[1] ? new Date(this.timeRange[1]).getTime() : 0
        const intervalTime = endTime - startTime
        if (intervalTime > 31 * 24 * 60 * 60 * 1000) {
          this.$message({
            type: 'error',
            message: '筛选时间最长不超过一个月'
          })
          this.timeRange = []
          return
        }
      }
      this.currentPage = 1
      this.handleSearch()
      this.handleUpdateMoney()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleSortChange (obj) {
      if (obj.prop == 'id') {
        this.orderBy = 'ID'
      } else if (obj.prop == 'createTime') {
        this.orderBy = 'CREATE_TIME'
      }
      if (!obj.order || obj.order == 'descending') {
        this.orderType = 'DESC'
      } else {
        this.orderType = 'ASC'
      }
      this.handleSearch()
    },
    handleSearch () {
      const this_ = this
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.view-container')
      })
      this.formData = {
        search: this.filterText,
        searchType: this.filterType,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : '',
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        type: this.type.join(','),
        channel: this.channel.join(','),
        payStatus: this.payStatus.join(','),
        orderBy: this.orderBy,
        orderType: this.orderType
      }
      getOrderList(this.formData).then((res) => {
        loading.close()
        if (res.code == 0) {
          this_.orderList = res.list
          this_.totalNum = parseInt(res.totalCount)
        }
      }).catch(() => {
        loading.close()
      })
    },
    handleUpdateMoney () {
      this.formData = {
        search: this.filterText,
        searchType: this.filterType,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : '',
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        type: this.type.join(','),
        channel: this.channel.join(','),
        payStatus: this.payStatus.join(',')
      }
      getOrderStatistics(this.formData).then((res) => {
        if (res.code == 0) {
          this.amount_involved = res.data.amount_involved
          this.amount_successful = res.data.amount_successful
        }
      }).catch(() => {
      })
    },
    initPayChannel () {
      getMerchantPayChannel().then(res => {
        if (res.code == 0) {
          this.channelOptions = res.data
        } else {
          this.$message({
            type: 'error',
            message: '获取支付渠道失败'
          })
        }
        this.handleSearch()
        this.handleUpdateMoney()
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取支付渠道失败'
        })
        this.handleSearch()
        this.handleUpdateMoney()
      })
    },
    exportExcelData () {
      this.formData = {
        search: this.filterText,
        searchType: this.filterType,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss'),
        type: this.type.join(','),
        channel: this.channel.join(','),
        payStatus: this.payStatus.join(',')
      }
      exportExcel('/api' + constant.exportExcelApi, this.formData)
      // exportExcel(this.formData).then(res => {
      //   if (res.code == 0) {
      //     this.$message({
      //       type: 'success',
      //       message: '导出成功'
      //     })
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'error',
      //     message: '导出失败'
      //   })
      // })
    }
  },
  mounted () {
    this.initPayChannel()
  },
  beforeRouteLeave (to, from, next) {
    if (to && to.name == 'orderDetail') {
      this.$store.commit('ADD_CACHED_VIEW', 'orderList')
      next()
    } else {
      this.$store.commit('DEL_ALL_CACHED_VIEWS')
      next()
    }
  }
}
</script>
<style lang="scss">
.order-table {
  tbody {
    td {
      padding: 4px 0;
    }
  }
}
.el-popover.photo-popover {
  .pop-photo-area {
    display: flex;
    justify-content: space-between;
    .part-one {
      width: 95px;
      text-align: left;
      &.part-second {
        margin-left: 30px;
      }
      .title {
        font-size: 12px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 10px;
        display: inline-block;
      }
      .pop-el-image {
        width: 95px;
        height: 140px;
      }
      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.hb-order-list {
  .mr15 {
    margin-right: 15px;
  }
  .mb15 {
    margin-bottom: 15px;
    height: 33px;
  }
  .mt30 {
    margin-top: 28px;
  }
  .list-table {
    .el-button--text {
      color: #409eff;
      font-size: 12px;
    }
    .el-table__column-filter-trigger {
      line-height: normal;
    }
    .table-pay-status {
      display: inline-block;
      border-radius: 4px;
      width: 44px;
      height: 18px;
      line-height: 18px;
      vertical-align: middle;
      text-align: center;
    }
    .table-img-row {
      width: 23px;
      height: 34px;
      position: absolute;
      top: 6px;
      left: 10px;
      box-sizing: border-box;
      display: inline-block;
      outline: none;
      cursor: pointer;
      &.active {
        border: 1px solid #fd7715;
      }
    }
  }
  .pager-container {
    text-align: center;
  }
}
</style>
