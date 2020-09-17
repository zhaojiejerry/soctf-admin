<template>
  <div class="hb-order-business-list">
    <wx-header>
      <span slot="headerTitle">业务订单</span>
      <span class="second-font" slot="headerOther">
        (
        <em class="main-color blod-text">{{ waitCheckNum }}</em>
        单待审核，共
        <em class="main-color blod-text">{{ totalNum }}</em>
        单)
        <div class="time-btn-group">
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('today')">今日</el-button>
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('thisMonth')">本月</el-button>
          <el-button size="mini" class="time-btn" round plain @click="timeBtnChange('all')">全部</el-button>
        </div>
      </span>
      <div class="flex" slot="headerRight">
        <el-input
          size="small"
          :maxlength="25"
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
              <el-option value="all">
                <i class="iconfont icon-all sort-icon"></i>
                <span class="sort-text">全部</span>
              </el-option>
              <el-option value="reportId">
                <i class="iconfont icon-dingdan sort-icon"></i>
                <span class="sort-text">业务单号</span>
              </el-option>
              <el-option value="driverIdentity">
                <i class="iconfont icon-idcard sort-icon"></i>
                <span class="sort-text">身份证号</span>
              </el-option>
              <el-option value="driverName">
                <i class="iconfont icon-name sort-icon"></i>
                <span class="sort-text">姓名</span>
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
        <div class="space-between">
          <div class="left-part">
            <hb-user-tree
              class="mb15 mr15"
              holder="请选择单位名称"
              :value="userFilterId"
              @getValue="handleUserFilterId"
            ></hb-user-tree>
            <hb-user-area
              class="mr15 mb15"
              :value="deviceFilterCode"
              data-show="device"
              holder="请选择设备地区"
              @getValue="handleDeviceFilterCode"
            ></hb-user-area>
            <el-select
              v-model="deviceCode"
              clearable
              placeholder="请选择设备地点"
              size="small"
              class="deviceselect"
              @change="handleDeviceSearch"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.code"
                :label="item.place"
                :value="item.code"
              ></el-option>
            </el-select>
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
              :disabled="btnPermissions.indexOf('100040403') == -1"
              type="primary"
              @click="clickExport"
              v-if="btnPermissions.indexOf('100040403') != -1 && !openExport"
            >体检数据导出</el-button>
            <el-button
              size="small"
              :disabled="btnPermissions.indexOf('100040402') == -1"
              type="primary"
              @click="exportHealth"
              v-if="btnPermissions.indexOf('100040402') != -1 && openExport"
            >导出</el-button>
            <el-button
              size="small"
              :disabled="btnPermissions.indexOf('100040402') == -1"
              @click="closeExport"
              v-if="btnPermissions.indexOf('100040402') != -1 && openExport"
            >关闭</el-button>
            <el-button
              size="small"
              :disabled="btnPermissions.indexOf('100040402') == -1"
              type="primary"
              @click="exportExcelData"
              v-if="btnPermissions.indexOf('100040402') != -1"
            >业务订单导出</el-button>
          </div>
          <!-- <el-select v-model="healthResultFilter" @change="handleHealthResult" size="small" class="mr15 mb15 reset-input tag-status" multiple collapse-tags placeholder="请选择体检结果">
            <el-option
              v-for="item in healthResultOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>-->
          <!-- <el-select v-model="healthCheckStatus" @change="handleHealthCheckStatus" size="small" class="mr15 mb15 reset-input tag-status" multiple collapse-tags placeholder="请选择审核状态">
            <el-option
              v-for="item in healthCheckStatusOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>-->
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
          @selection-change="handleChangeSelection"
          height="100%"
        >
          <el-table-column type="selection" width="45" v-if="openExport"></el-table-column>
          <el-table-column show-overflow-tooltip prop="id" width="150px" label="业务单号">
            <filter-panel
              slot="header"
              column-key="qualifiedState"
              :filters="qualifiedOptions"
              :defaultValue="defaultQualifiedState"
              @change="handleFilterChange"
              title="业务单号"
            ></filter-panel>
            <template slot-scope="scope">
              <el-button
                style="padding-top:0;padding-bottom:0;"
                :disabled="btnPermissions.indexOf('1000407') == -1"
                type="text"
                size="small"
                @click.native.prevent="handleHealthInfo(scope.row.id, scope.row.createTime)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="readStatus" align="left" width="40" label>
            <template slot-scope="scope">
              <el-tooltip
                content="中途退出"
                placement="bottom"
                effect="light"
                popper-class="device-status-tooltip"
                v-if="scope.row.qualifiedStatus == 2"
              >
                <i class="status-icon giveup-icon"></i>
              </el-tooltip>
              <el-tooltip
                content="体检不合格"
                placement="bottom"
                effect="light"
                popper-class="device-status-tooltip"
                v-if="scope.row.qualifiedStatus == 0"
              >
                <i class="status-icon not-icon"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip width="160px" label="业务类型">
            <filter-panel
              slot="header"
              column-key="typeState"
              title="业务类型"
              :filters="typeOptions"
              :defaultValue="defaultTypeState"
              @change="handleFilterChange"
            ></filter-panel>
            <template
              slot-scope="scope"
            >{{ scope.row.type == 1 ? '体检、照相' : scope.row.type == 2 ? '照相' : '体检' }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            width="200"
            sortable="custom"
            label="开始时间"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="driverName" width="120" label="姓名"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="devicePlace"
            min-width="200"
            max-width="300"
            label="设备地点"
          ></el-table-column>
          <el-table-column width="160px" label="订单状态">
            <filter-panel
              slot="header"
              column-key="paymentState"
              title="订单状态"
              :filters="payStatusOptions"
              :defaultValue="defaultPaymentStateValue"
              @change="handleFilterChange"
            ></filter-panel>
            <template slot-scope="scope">
              <span
                class="table-pay-status"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.payStatus == 2"
                style="color: #67c23a;"
              >已支付</span>
              <span
                class="table-pay-status"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.payStatus == 1"
                style="color: #ef4646;"
              >未支付</span>
              <span
                class="table-pay-status"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.payStatus == 3"
                style="color: #ef4646;"
              >全部退款</span>
              <span
                class="table-pay-status"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.payStatus == 4"
                style="color: #ef4646;"
              >部分退款</span>
            </template>
          </el-table-column>
          <el-table-column width="160px" label="审核状态">
            <filter-panel
              slot="header"
              column-key="checkState"
              title="审核状态"
              :filters="checkStateData"
              @change="handleFilterChange"
            ></filter-panel>
            <template slot-scope="scope">
              <template v-if="scope.row.type != 2">
                <span
                  class="table-check-status"
                  v-if="scope.row.checkStatus == 0"
                  style="color: #fd7715;"
                >待审核</span>
                <span
                  class="table-check-status"
                  v-if="scope.row.checkStatus == 1"
                  style="color: #67c23a;"
                >通过</span>
                <span
                  class="table-check-status"
                  v-if="scope.row.checkStatus == -1"
                  style="color: #ef4646;"
                >驳回</span>
                <span
                  class="table-check-status"
                  v-if="scope.row.checkStatus == -2"
                  style="color: #ef4646;"
                >自动驳回</span>
                <el-popover
                  :with="200"
                  trigger="hover"
                  popper-class="reject-popover"
                  placement="bottom-start"
                >
                  <div class="popRejectReason">
                    <p>驳回理由：</p>
                    <p class="reasonSpan">{{scope.row.checkReason}}</p>
                    <p class="checkerSpan">审核人：{{scope.row.checkBy}}</p>
                  </div>
                  <el-button
                    class="reject-btn"
                    v-show="scope.row.checkStatus == -1 && scope.row.checkReason"
                    icon="el-icon-more reject-icon"
                    slot="reference"
                    type="text"
                  ></el-button>
                </el-popover>
              </template>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="220px">
            <template slot-scope="scope">
              <el-popover
                :visible-arrow="false"
                placement="left-start"
                popper-class="photo-popover"
                width="220"
                @show="handleShowPopImg(scope.$index)"
                @hide="handleHidePopImg"
                trigger="click"
              >
                <div class="pop-photo-area">
                  <div class="part-one">
                    <span class="title">身份证照片</span>
                    <el-image class="pop-el-image" :src="scope.row.identityImage" alt="身份证照片">
                      <div slot="error" class="image-slot">
                        <img :src="errorImg" />
                      </div>
                    </el-image>
                  </div>
                  <div class="part-one part-second">
                    <span class="title">现场拍摄照片</span>
                    <el-image :src="scope.row.currentImage" alt="现场拍摄照片">
                      <div slot="error" class="image-slot">
                        <img :src="errorImg" />
                      </div>
                    </el-image>
                  </div>
                </div>
                <span slot="reference" v-show="scope.row.type == 2" class="spanclick">照相详情</span>
              </el-popover>
              <span
                class="spanclick"
                v-if="scope.row.type == 1 && btnPermissions.indexOf('1000405') != -1"
                @click="handleHealthDetail(scope.row.id, scope.row.createTime)"
              >体检详情</span>
              <span
                class="spanclick"
                v-if="scope.row.type == 3 && btnPermissions.indexOf('1000405') != -1"
                @click="handleHealthDetail(scope.row.id, scope.row.createTime)"
              >体检详情</span>
              <span
                class="spanclick"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.checkStatus == 1  && scope.row.type == 1 "
                @click="handlePreviewReport(scope.row.reportFile, scope.$index, scope.row.id)"
              >预览</span>
              <span
                class="spanclick"
                v-if="scope.row.qualifiedStatus == 1 &&  scope.row.checkStatus == 1  && scope.row.type == 3"
                @click="handlePreviewReport(scope.row.reportFile, scope.$index, scope.row.id)"
              >预览</span>
              <span
                class="spanclick"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.checkStatus == 1 && scope.row.type == 1 && btnPermissions.indexOf('100040401') != -1"
                @click="handleSendMessage(scope.row.id)"
              >上传报告</span>
              <span
                class="spanclick"
                v-if="scope.row.qualifiedStatus == 1 && scope.row.checkStatus == 1 && scope.row.type == 3 && btnPermissions.indexOf('100040401') != -1"
                @click="handleSendMessage(scope.row.id)"
              >上传报告</span>
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
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import hbUserTree from '@/components/userTree/index'
import hbUserArea from '@/components/userArea/index'
import { healthPageList, healthUpload, healthPreview, getDeviceListByUserId, exportSixOne } from '@/api/health.js'
import filterPanel from '@/components/tableFilterPanel/filter-panel'
import { businessPageList, exportBusinessExcel } from '@/api/order.js'
import errorImg from './errorImg.png'
import moment from 'moment'
import constant from '@/api/api'
import { exportExcel } from '@/utils/exportExcel'
export default {
  name: 'business',
  components: {
    wxHeader,
    hbUserTree,
    hbUserArea,
    filterPanel
  },
  data () {
    return {
      openExport: false,
      errorImg: errorImg,
      onerrorImg: 'this.src="' + errorImg + '"',
      defaultPaymentStateValue: [],
      defaultTypeState: [],
      defaultQualifiedState: [],
      healthStateValue: [],
      paymentStateValue: [],
      qualifiedStateValue: [],
      checkStateValue: [],
      deviceList: [],
      deviceCode: '',
      typeState: [],
      qualifiedState: [],
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
      qualifiedStatus: '', // 合格状态
      type: '', // 业务类型
      defaultCurrentPage: 1,
      currentPage: 1,
      pageSize: 10,
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      sendMsgStatus: false, // 正在发送信息
      messageObj: null,
      formData: null,
      selectOrder: [], // 多选框选中行
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
        },
        {
          value: 3,
          text: '全部退款'
        },
        {
          value: 4,
          text: '部分退款'
        }
      ],
      typeOptions: [
        {
          value: 1,
          text: '体检、照相'
        },
        {
          value: 2,
          text: '照相'
        },
        {
          value: 3,
          text: '体检'
        }
      ],
      qualifiedOptions: [
        {
          value: 1,
          text: '合格'
        },
        {
          value: 2,
          text: '中途退出'
        },
        {
          value: 0,
          text: '不合格'
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
    ...mapGetters(['btnPermissions']),
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
    exportHealth () {
      if (!this.selectOrder.length) {
        this.$message({
          showClose: false,
          message: '请先选中业务订单再导出',
          type: 'warning'
        })
        return
      }
      let orderIdArr = []
      this.selectOrder.forEach((tiem, index) => {
        orderIdArr.push(tiem.id)
      })
      exportSixOne(orderIdArr)
    },
    handleChangeSelection (val) {
      this.selectOrder = val
    },
    clickExport () {
      this.openExport = true
    },
    closeExport () {
      this.openExport = false
    },
    getDeviceListByUserId () {
      getDeviceListByUserId().then((res) => {
        if (res.code == 0) {
          this.deviceList = res.data
        } else {
          console.log('获取用户设备列表失败')
        }
      }).catch(() => {
      })
    },
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
    exportExcelData () {
      this.formData = {
        search: this.filterText,
        searchType: this.filterType,
        userId: this.userFilterId,
        areaId: this.deviceFilterCode,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss'),
        qualifiedStatus: this.qualifiedStatus,
        checkStatus: this.healthCheckStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        payStatus: this.payStatus,
        types: this.type,
        deviceCode: this.deviceCode
      }
      exportExcel('/api' + constant.exportBusinessExcel, this.formData)
      // exportBusinessExcel(this.formData).then(res => {
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
      val.key == 'typeState' && (this.typeState = val.value)
      val.key == 'qualifiedState' && (this.qualifiedStateValue = val.value)
      this.healthResultFilter = this.healthStateValue
      this.payStatus = this.paymentStateValue.join(',')
      this.type = this.typeState.join(',')
      this.qualifiedStatus = this.qualifiedStateValue.join(',')
      this.healthCheckStatus = this.checkStateValue
      this.currentPage = 1
      this.handleSearch()
    },
    handleDeviceSearch () {
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
        startTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[0] : '',
        endTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        qualifiedStatus: this.qualifiedStatus,
        checkStatus: this.healthCheckStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        payStatus: this.payStatus,
        types: this.type,
        deviceCode: this.deviceCode
      }
      businessPageList(this.formData)
        .then(res => {
          loading.close()
          if (res.code == 0) {
            this.healthList = res.data.list
            this.totalNum = parseInt(res.data.totalCount)
            this.waitCheckNum = parseInt(res.data.uncheckCount)
            this.$nextTick(() => {
              this.$refs.listTable.bodyWrapper.scrollTop = 0
            })
          } else {
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleHealthInfo (id, createTime) {
      if (this.orderBy == 'ID') {
        this.formData.indexValue = id
      } else if (this.orderBy == 'CREATE_TIME') {
        this.formData.indexValue = id
      }
      this.$router.push({
        name: 'businessInfo',
        query: {
          healthId: id
        }
      })
    },
    handleHealthDetail (id, createTime) {
      if (this.orderBy == 'ID') {
        this.formData.indexValue = id
      } else if (this.orderBy == 'CREATE_TIME') {
        this.formData.indexValue = id
      }
      this.$router.push({
        name: 'businessDetail',
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
        }).then(res => {
          if (res.code == 0) {
            file = res.data.reportUrl
            this.healthList[index].reportFile = file
            url = 'https://view.officeapps.live.com/op/view.aspx?src=' + file
            window.open(url, '_blank')
          }
        })
      }
    },
    handleShowPopImg (index) {
      const _this = this
      setTimeout(() => {
        _this.activeIndex = index
      }, 200)
    },
    handleHidePopImg () {
      this.activeIndex = -1
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
      })
        .then(res => {
          this.sendMsgStatus = false
          if (res.code == 0) {
            this.messageObj = this.$message.success('发送成功')
          }
        })
        .catch(() => {
          this.sendMsgStatus = false
        })
    }
  },
  mounted () {
    this.getDeviceListByUserId()
    if (this.$route.query.payStatus) {
      this.payStatus = this.$route.query.payStatus
      this.defaultPaymentStateValue = this.payStatus.split(',').map(Number)
      this.paymentStateValue = this.payStatus.split(',').map(Number)
    }
    if (this.$route.query.types) {
      this.type = this.$route.query.types
      this.defaultTypeState = this.type.split(',').map(Number)
      this.typeState = this.type.split(',').map(Number)
    }
    if (this.$route.query.time == 'today') {
      this.timeRange = this.todayTime()
    }
    this.handleSearch()
  },
  beforeRouteLeave (to, from, next) {
    if (to && (to.name == 'businessDetail' || to.name == 'businessInfo')) {
      this.$store.commit('ADD_CACHED_VIEW', 'business')
      next()
    } else {
      this.$store.commit('DEL_ALL_CACHED_VIEWS')
      next()
    }
  }
}
</script>
<style lang="scss">
.el-popover.reject-popover {
  background-color: #ffefe7 !important;
  &.el-popper[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: #ffefe7 !important;
    &::after {
      border-bottom-color: #ffefe7 !important;
    }
  }
  &.el-popper[x-placement^="top"] .popper__arrow {
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
    color: #fd7715;
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
.device-status-tooltip {
  border: 1px solid #dcdcdc !important;
  &[x-placement^="bottom"] .popper__arrow {
    border-bottom-color: #dcdcdc !important;
    &::after {
      border-bottom-color: #ffffff !important;
    }
  }
  &[x-placement^="top"] .popper__arrow {
    border-top-color: #dcdcdc !important;
    &::after {
      border-top-color: #ffffff !important;
    }
  }
}
.hb-order-business-list {
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
  .time-btn-group {
    display: inline-block;
    margin-left: 25px;
    .time-btn {
      &:hover {
        border: 1px solid #dcdfe6;
        color: #606266;
      }
      &:focus {
        border-color: #fd7715 !important;
        color: #fd7715 !important;
      }
      &.active {
        border-color: #fd7715 !important;
        color: #fd7715 !important;
      }
    }
  }
  .deviceselect {
    .el-input--small .el-input__inner {
      height: 33px;
      font-size: 12px;
    }
    margin-right: 15px;
  }
  .list-table {
    .el-button--text {
      color: #409eff;
      font-size: 12px;
    }
    .spanclick {
      color: #409eff;
      font-size: 12px;
      cursor: pointer;
    }
    .spanclick + .spanclick {
      margin-left: 5px;
    }
    .table-pay-status {
      display: inline-block;
      border-radius: 4px;
      width: 54px;
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
        background: url("./read.png") no-repeat center center;
      }
      &.unread-icon {
        background: url("./unread.png") no-repeat center center;
      }
      &.failed-icon {
        background: url("./error.png") no-repeat center center;
      }
      &.not-icon {
        background: url("./not.png") no-repeat center center;
      }
      &.giveup-icon {
        background: url("./giveup.png") no-repeat center center;
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
  .blod-text {
    font-weight: bold;
  }
}
</style>
