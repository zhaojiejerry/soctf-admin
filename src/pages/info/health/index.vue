<template>
  <div class="hb-health-list">
    <wx-header>
      <span slot="headerTitle">体检单</span>
      <span class="second-font" slot="headerOther">
        (<em class="main-color">{{ waitCheckNum }}</em>单待审核，共{{ totalNum }}单)
        <div class="time-btn-group">
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('today')">今日</el-button>
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('thisMonth')">本月</el-button>
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('all')">全部</el-button>
        </div>
      </span>
      <div class="flex" slot="headerRight">
        <el-input size="small" :maxlength="25" clearable class="reset-input header-search" :placeholder="filterPlaceHolder" v-model="filterText" @clear="timeFilterChange" @keyup.enter.native="timeFilterChange">
          <div class="header-sort" slot="prepend">
            <el-select ref="headerSort" size="small" popper-class="header-sort-select" v-model="filterType">
              <el-option value="all">
                <i class="iconfont icon-all sort-icon"></i>
                <span class="sort-text">全部</span>
              </el-option>
              <el-option value="reportId">
                <i class="iconfont icon-dingdan sort-icon"></i>
                <span class="sort-text">体检单号</span>
              </el-option>
              <el-option value="driverIdentity">
                <i class="iconfont icon-idcard sort-icon"></i>
                <span class="sort-text">身份证号</span>
              </el-option>
              <el-option value="driverName">
                <i class="iconfont icon-name sort-icon"></i>
                <span class="sort-text">姓名</span>
              </el-option>
              <el-option value="deviceCode">
                <i class="iconfont icon-bianma sort-icon"></i>
                <span class="sort-text">设备编码</span>
              </el-option>
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
        <div class="space-start">
          <hb-user-tree class="mb15 mr15" holder="请选择单位名称" :value="userFilterId" @getValue="handleUserFilterId"></hb-user-tree>
          <hb-user-area class="mr15 mb15" :value="deviceFilterCode" dataShow="device" holder="请选择设备地点" @getValue="handleDeviceFilterCode"></hb-user-area>
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
            :default-time="['00:00:00', '23:59:59']" />
          <!-- <el-select v-model="healthResultFilter" @change="handleHealthResult" size="small" class="mr15 mb15 reset-input tag-status" multiple collapse-tags placeholder="请选择体检结果">
            <el-option
              v-for="item in healthResultOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          <!-- <el-select v-model="healthCheckStatus" @change="handleHealthCheckStatus" size="small" class="mr15 mb15 reset-input tag-status" multiple collapse-tags placeholder="请选择审核状态">
            <el-option
              v-for="item in healthCheckStatusOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </div>
        <el-table
          ref="listTable"
          class="list-table"
          :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
          :cell-style="{fontSize: '12px'}"
          tooltip-effect="dark"
          :data="healthList"
          current-row-key="id"
          :default-sort="defaultSort"
          @sort-change="handleSortChange"
          height="100%">
          <el-table-column
            prop="readStatus"
            align="right"
            width="40"
            label="">
            <template slot-scope="scope">
              <!-- 0:未读  1:已读 -->
              <i v-if="scope.row.readStatus == 1" class="status-icon read-icon"></i>
              <i v-else class="status-icon unread-icon"></i>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="id"
            width="200"
            sortable="custom"
            label="体检单号">
            <template slot-scope="scope">
              <el-button style="padding-top:0;padding-bottom:0;" :disabled="btnPermissions.indexOf('100020101') == -1" type="text" size="small" @click.native.prevent="handleHealthDetail(scope.row.id, scope.row.createTime)">{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="driverIdentity"
            width="150"
            label="身份证">
            <template slot-scope="scope">
              {{ scope.row.driverIdentity }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="driverName"
            width="75"
            label="姓名">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            width="160"
            sortable="custom"
            label="体检时间">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="devicePlace"
            label="设备地点">
          </el-table-column>
          <el-table-column
            prop="qualifiedStatus"
            width="100"
            label="体检结果">
            <filter-panel slot="header" column-key="healthState" title="体检结果" :filters="healthStateData" @change="handleFilterChange"></filter-panel>
            <template slot-scope="scope">
              <span v-if="scope.row.qualifiedStatus == 0" style="color: #ef4646">不合格</span>
              <span v-if="scope.row.qualifiedStatus == 1" style="color: #67c23a">合格</span>
              <span v-if="scope.row.qualifiedStatus == 2" style="color: #999999">中途退出</span>
            </template>
          </el-table-column>
          <el-table-column
            width="96"
            label="支付状态">
            <filter-panel slot="header" column-key="paymentState" title="支付状态" :filters="payStatusOptions" @change="handleFilterChange"></filter-panel>
            <template slot-scope="scope">
              <span class="table-pay-status" v-if="scope.row.qualifiedStatus == 1 && scope.row.paymentDone" style="color: #67c23a;">已支付</span>
              <span class="table-pay-status" v-if="scope.row.qualifiedStatus == 1 && !scope.row.paymentDone" style="color: #ef4646;">未支付</span>
            </template>
          </el-table-column>
          <el-table-column
            width="96"
            label="审核状态">
            <filter-panel slot="header" column-key="checkState" title="审核状态" :filters="checkStateData" @change="handleFilterChange"></filter-panel>
            <template slot-scope="scope">
              <i class="iconfont icon-need-check table-check-status" v-if="scope.row.checkStatus == 0" style="color: #fd7715;"></i>
              <span class="table-check-status" v-if="scope.row.checkStatus == 0" style="color: #fd7715;">待审核</span>
              <i class="iconfont icon-check-pass table-check-status" v-if="scope.row.checkStatus == 1" style="color: #67c23a;"></i>
              <span class="table-check-status" v-if="scope.row.checkStatus == 1" style="color: #67c23a;">通过</span>
              <i class="iconfont icon-auto-reject table-check-status" v-if="scope.row.checkStatus == -1" style="color: #ef4646;"></i>
              <span class="table-check-status" v-if="scope.row.checkStatus == -1" style="color: #ef4646;">驳回</span>
              <i class="iconfont icon-auto-reject table-check-status" v-if="scope.row.checkStatus == -2" style="color: #ef4646;"></i>
              <span class="table-check-status" v-if="scope.row.checkStatus == -2" style="color: #ef4646;">自动驳回</span>
              <el-popover
                :with="200"
                trigger="hover"
                popper-class="reject-popover"
                placement="bottom-start">
                <div class="popRejectReason">
                  <p>驳回理由：</p>
                  <p class="reasonSpan">{{scope.row.checkReason}}</p>
                  <p class="checkerSpan">审核人：{{scope.row.checkBy}}</p>
                </div>
                <el-button class="reject-btn" v-show="scope.row.checkStatus == -1 && scope.row.checkReason" icon="el-icon-more reject-icon" slot="reference" type="text"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button v-if="scope.row.qualifiedStatus == 1 && scope.row.paymentDone && scope.row.checkStatus == 0" size="small" type="text" @click.native.prevent="handleHealthDetail(scope.row.id, scope.row.createTime)">审核</el-button>
              <el-button v-if="scope.row.qualifiedStatus == 1 && scope.row.paymentDone && scope.row.checkStatus == 1" size="small" type="text" @click.native.prevent="handlePreviewReport(scope.row.reportFile, scope.$index, scope.row.id)">预览</el-button>
              <el-button v-if="scope.row.qualifiedStatus == 1 && scope.row.paymentDone && scope.row.checkStatus == 1 && btnPermissions.indexOf('100020102') != -1" size="small" type="text" @click.native.prevent="handleSendMessage(scope.row.id)">发送信息</el-button>
              <img v-if="sendMsgStatus && scope.row.id == sendId" src="./send.gif" class="send-msg" />
            </template>
          </el-table-column>
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
            :total="totalNum">
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import hbUserTree from '@/components/userTree/index'
import hbUserArea from '@/components/userArea/index'
import { healthPageList, healthUpload, healthPreview } from '@/api/health.js'
import filterPanel from '@/components/tableFilterPanel/filter-panel'
export default {
  name: 'health',
  components: {
    wxHeader,
    hbUserTree,
    hbUserArea,
    filterPanel
  },
  data () {
    return {
      healthStateValue: [],
      paymentStateValue: [],
      checkStateValue: [],
      totalNum: 0, // 体检单总数
      waitCheckNum: 0, // 待审核数量
      btnTimeSelect: '', // '' today thisMonth all
      filterType: 'all', // 关键字类型
      filterText: '', // 关键字text
      userFilterId: '', // 单位名称筛选
      deviceFilterCode: '', // 设备所在区域
      timeRange: [], // 时间段
      healthResultFilter: [], // 体检结果
      healthCheckStatus: [], // 审核状态
      healthList: [], // 体检单列表
      payStatus: '', // 支付状态
      defaultCurrentPage: 1,
      currentPage: 1,
      pageSize: 10,
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      sendMsgStatus: false, // 正在发送信息
      messageObj: null,
      formData: null,
      sendId: '',
      healthResultOptions: [
        {
          id: '1',
          name: '合格'
        },
        {
          id: '0',
          name: '不合格'
        },
        {
          id: '2',
          name: '中途退出'
        }
      ],
      healthStateData: [
        {
          value: 1,
          text: '合格'
        },
        {
          value: 0,
          text: '不合格'
        },
        {
          value: 2,
          text: '中途退出'
        }
      ],
      healthCheckStatusOptions: [
        {
          id: '0',
          name: '待审核'
        },
        {
          id: '1',
          name: '通过'
        },
        {
          id: '-1',
          name: '驳回'
        }
      ],
      defaultSort: { prop: 'createTime', order: 'descending' },
      payStatusOptions: [
        {
          value: 1,
          text: '未支付'
        },
        {
          value: 2,
          text: '已支付'
        }
      ],
      checkStateData: [
        {
          value: '0',
          text: '待审核'
        },
        {
          value: '1',
          text: '通过'
        },
        {
          value: '-1',
          text: '驳回'
        },
        {
          value: '-2',
          text: '自动驳回'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ]),
    filterPlaceHolder () {
      if (this.filterType == 'all') {
        return '请输入关键字'
      } else if (this.filterType == 'reportId') {
        return '请输入体检单号'
      } else if (this.filterType == 'driverIdentity') {
        return '请输入身份证号'
      } else if (this.filterType == 'driverName') {
        return '请输入姓名'
      } else if (this.filterType == 'deviceCode') {
        return '请输入设备编码'
      }
    },
    filterIcon () {
      if (this.filterType == 'all') {
        return 'icon-all'
      } else if (this.filterType == 'reportId') {
        return 'icon-dingdan'
      } else if (this.filterType == 'driverIdentity') {
        return 'icon-idcard'
      } else if (this.filterType == 'driverName') {
        return 'icon-name'
      } else if (this.filterType == 'deviceCode') {
        return 'icon-bianma'
      }
    }
  },
  methods: {
    computeIdentity (str) {
      if (str) {
        return str.substr(0, 10) + '****' + str.substr(-4)
      } else {
        return '--'
      }
    },
    computeName (str) {
      if (str) {
        let result = ''
        for (let i = 0; i < str.length; i++) {
          if (i == 0) {
            result = str.substr(0, i + 1)
          } else {
            result += '*'
          }
        }
        return result
      } else {
        return '--'
      }
    },
    todayTime () {
      let zero = ' 00:00:00'
      let points23 = ' 23:59:59'
      let date = new Date()
      const seperator = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let today = year + seperator + month + seperator + strDate
      return [today + zero, today + points23]
    },
    thisMonthTime () {
      let zero = ' 00:00:00'
      let points23 = ' 23:59:59'
      const date = new Date()
      date.setDate(1)
      let month = parseInt(date.getMonth() + 1)
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let firstDay = date.getFullYear() + '-' + month + '-' + day + zero
      let currentMonth = date.getMonth()
      const nextMonth = ++currentMonth
      const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      const oneDay = 1000 * 60 * 60 * 24
      const lastTime = new Date(nextMonthFirstDay - oneDay)
      month = parseInt(lastTime.getMonth() + 1)
      day = lastTime.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      let lastDay = date.getFullYear() + '-' + month + '-' + day + points23
      return [firstDay, lastDay]
    },
    handleToggle () {
      if (this.$refs.headerSort.visible) {
        this.$refs.headerSort.blur()
      } else {
        this.$refs.headerSort.visible = true
      }
    },
    handleUserFilterId (id) {
      this.userFilterId = id
      this.currentPage = 1
      this.handleSearch()
    },
    handleDeviceFilterCode (id) {
      this.deviceFilterCode = id
      this.currentPage = 1
      this.handleSearch()
    },
    timeBtnChange (str) {
      // if (str == this.btnTimeSelect) {
      //   this.btnTimeSelect = ''
      // } else {
      //   this.btnTimeSelect = str
      // }
      this.btnTimeSelect = str
      if (this.btnTimeSelect == '' || this.btnTimeSelect == 'all') {
        this.timeRange = []
      } else if (this.btnTimeSelect == 'today') {
        this.timeRange = this.todayTime()
      } else if (this.btnTimeSelect == 'thisMonth') {
        this.timeRange = this.thisMonthTime()
      }
      this.currentPage = 1
      this.handleSearch()
    },
    timeFilterChange () {
      this.currentPage = 1
      this.handleSearch()
    },
    handleHealthResult (val) {
      this.healthResultFilter = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleHealthCheckStatus (val) {
      this.healthCheckStatus = val
      this.currentPage = 1
      this.handleSearch()
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
    handleFilterChange (val) {
      val.key == 'healthState' && (this.healthStateValue = val.value)
      val.key == 'paymentState' && (this.paymentStateValue = val.value)
      val.key == 'checkState' && (this.checkStateValue = val.value)
      this.healthResultFilter = this.healthStateValue
      this.payStatus = this.paymentStateValue.join(',')
      this.healthCheckStatus = this.checkStateValue
      this.currentPage = 1
      this.handleSearch()
    },
    handleSearch () {
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
        userId: this.userFilterId,
        areaId: this.deviceFilterCode,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : '',
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        qualifiedStatus: this.healthResultFilter.join(','),
        checkStatus: this.healthCheckStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        payStatus: this.payStatus
      }
      healthPageList(this.formData).then((res) => {
        loading.close()
        if (res.code == 0) {
          this.healthList = res.data.list
          this.totalNum = parseInt(res.data.totalCount)
          this.waitCheckNum = parseInt(res.data.uncheckCount)
          this.$nextTick(() => {
            this.$refs.listTable.bodyWrapper.scrollTop = 0
          })
        } else {
          localStorage.removeItem('healthCondition')
        }
      }).catch(() => {
        loading.close()
        localStorage.removeItem('healthCondition')
      })
    },
    handleHealthDetail (id, createTime) {
      if (this.orderBy == 'ID') {
        this.formData.indexValue = id
      } else if (this.orderBy == 'CREATE_TIME') {
        this.formData.indexValue = id
      }
      localStorage.setItem('healthCondition', JSON.stringify(this.formData))
      this.$router.push({
        name: 'healthDetail',
        query: {
          healthId: id
        }
      })
    },
    handlePreviewReport (file, index, reportId) {
      if (this.messageObj) {
        this.messageObj.close()
        this.messageObj = null
      }
      let url = ''
      if (file) {
        url = 'https://view.officeapps.live.com/op/view.aspx?src=' + file
        window.open(url, '_blank')
      } else {
        healthPreview({
          reportId: reportId
        }).then((res) => {
          if (res.code == 0) {
            file = res.data.reportUrl
            this.healthList[index].reportFile = file
            url = 'https://view.officeapps.live.com/op/view.aspx?src=' + file
            window.open(url, '_blank')
          }
        })
      }
    },
    handleSendMessage (id) {
      this.sendId = id
      this.sendMsgStatus = true
      if (this.messageObj) {
        this.messageObj.close()
        this.messageObj = null
      }
      healthUpload({
        reportId: id
      }).then((res) => {
        this.sendMsgStatus = false
        if (res.code == 0) {
          this.messageObj = this.$message.success('发送成功')
        }
      }).catch(() => {
        this.sendMsgStatus = false
      })
    }
  },
  mounted () {
    let searchCondition = JSON.parse(localStorage.getItem('healthCondition'))
    if (searchCondition) {
      this.filterText = searchCondition.search
      this.filterType = searchCondition.searchType
      this.userFilterId = searchCondition.userId
      this.deviceFilterCode = searchCondition.areaId
      if (searchCondition.startTime && searchCondition.endTime) {
        this.timeRange = [searchCondition.startTime, searchCondition.endTime]
      }
      this.healthResultFilter = searchCondition.qualifiedStatus ? searchCondition.qualifiedStatus.split(',') : []
      this.healthCheckStatus = searchCondition.checkStatus ? searchCondition.checkStatus.split(',') : []
      this.currentPage = searchCondition.pageNo
      this.defaultCurrentPage = searchCondition.pageNo
      this.pageSize = searchCondition.pageSize
      this.orderBy = searchCondition.orderBy
      this.orderType = searchCondition.orderType
      if (this.orderBy == 'ID') {
        this.defaultSort.prop = 'id'
      } else if (this.orderBy == 'CREATE_TIME') {
        this.defaultSort.prop = 'createTime'
      }
      if (this.orderType == 'DESC') {
        this.defaultSort.order = 'descending'
      } else {
        this.defaultSort.order = 'ascending'
      }
    }

    this.payStatus = this.$route.query.payStatus || ''
    this.healthCheckStatus = [this.$route.query.checkStatus] || []
    if (this.$route.query.time == 'today') {
      this.timeRange = this.todayTime()
    }
    this.handleSearch()
  }
}
</script>
<style lang="scss">
  .el-popover.reject-popover {
    background-color: #ffefe7 !important;
    &.el-popper[x-placement^=bottom] .popper__arrow {
      border-bottom-color: #ffefe7 !important;
      &::after {
        border-bottom-color: #ffefe7 !important;
      }
    }
    &.el-popper[x-placement^=top] .popper__arrow {
      border-top-color: #ffefe7 !important;
      &::after {
        border-top-color: #ffefe7 !important;
      }
    }
    .popRejectReason {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0;
      color: #FD7715;
      padding: 4px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }
    .reasonSpan {
      word-wrap: break-word;
      word-break: break-all;
      width: 170px;
    }
    .checkerSpan {
      text-align: right;
    }
  }
  .hb-health-list {
    .mr15 {
      margin-right: 15px;
    }
    .mb15 {
      margin-bottom: 15px;
    }
    .mt30 {
      margin-top: 35px;
    }
    .time-btn-group {
      display: inline-block;
      margin-left: 25px;
      .time-btn {
        &:hover {
          border: 1px solid #DCDFE6;
          color: #606266;
        }
        &:focus {
          border-color: #FD7715 !important;
          color: #FD7715 !important;
        }
        &.active {
          border-color: #FD7715 !important;
          color: #FD7715 !important;
        }
      }
    }
    .list-table {
      .el-button--text {
        color: #409eff;
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
      .table-check-status {
        display: inline-block;
        height: 18px;
        line-height: 18px;
        vertical-align: middle;
      }
      .status-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-size: contain;
        vertical-align: middle;
        &.read-icon {
          background: url('./read.png') no-repeat center center
        }
        &.unread-icon {
          background: url('./unread.png') no-repeat center center
        }
      }
      .reject-btn {
        padding: 0;
        margin-left: 3px;
        vertical-align: middle;
      }
      .reject-icon {
        color: #ef4646;
        background-color: rgba(239, 70, 70, 0.2);
        border-radius: 50%;
        padding: 1px;
        font-size: 10px;
      }
      .send-msg {
        height: 12px;
        vertical-align: text-top;
      }
    }
    .pager-container {
      text-align: center;
    }
  }
</style>
