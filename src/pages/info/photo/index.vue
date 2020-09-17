<template>
  <div class="hb-photo-list">
    <wx-header>
      <span slot="headerTitle">照相信息</span>
      <span class="second-font" slot="headerOther">
        (共<em class="main-color">{{ totalNum }}</em>个)
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
                <span class="sort-text">照相单号</span>
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
          <hb-user-area class="mr15 mb15" :value="deviceFilterCode" dataShow="device" holder="请选择区域" @getValue="handleDeviceFilterCode"></hb-user-area>
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
        </div>
        <el-table
          class="list-table photo-Table"
          :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
          :cell-style="{fontSize: '12px'}"
          tooltip-effect="dark"
          :data="healthList"
          current-row-key="id"
          :default-sort="defaultSort"
          @sort-change="handleSortChange"
          height="100%">
          <el-table-column
            show-overflow-tooltip
            prop="id"
            width="200"
            sortable="custom"
            label="照相单号"
            >
          </el-table-column>
          <el-table-column
            width="260"
            prop="relevanceId"
            label="关联体检单ID">
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
            width="96"
            label="支付状态">
            <filter-panel slot="header" column-key="paymentDone" title="支付状态" :default-value="payStatusValue" :filters="payStatusOptions" @change="handleFilterChange"></filter-panel>
            <template slot-scope="scope">
              <span class="table-pay-status" v-if="scope.row.paymentDone" style="color: #67c23a;">已支付</span>
              <span class="table-pay-status" v-if="!scope.row.paymentDone" style="color: #ef4646;">未支付</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            width="160"
            sortable="custom"
            label="拍照时间">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="devicePlace"
            label="拍照地点">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="deviceCode"
            width="175"
            label="设备编码">
          </el-table-column>
          <el-table-column
            width="70"
            label="照片">
            <template slot-scope="scope">
              <el-popover
                :visible-arrow="false"
                placement="left-start"
                popper-class="photo-popover"
                width="221"
                @show="handleShowPopImg(scope.$index)"
                @hide="handleHidePopImg"
                trigger="click">
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
                <img class="table-img-row" :class="{active: scope.$index == activeIndex}" :src="scope.row.currentImage" slot="reference" />
              </el-popover>
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
import { photoPageList } from '@/api/health.js'
import errorImg from './errorImg.png'
import filterPanel from '@/components/tableFilterPanel/filter-panel'
export default {
  components: {
    wxHeader,
    hbUserTree,
    hbUserArea,
    filterPanel
  },
  data () {
    return {
      errorImg: errorImg,
      onerrorImg: 'this.src="' + errorImg + '"',
      totalNum: 0, // 照相单总数
      btnTimeSelect: '', // '' today thisMonth all
      filterType: 'all', // 关键字类型
      filterText: '', // 关键字text
      userFilterId: '', // 单位名称筛选
      deviceFilterCode: '', // 设备所在区域
      timeRange: [], // 时间段
      healthList: [], // 体检单列表
      payStatus: '2', // 支付状态
      currentPage: 1,
      pageSize: 10,
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      sendMsgStatus: false, // 正在发送信息
      messageObj: null,
      formData: null,
      sendId: '',
      defaultSort: { prop: 'createTime', order: 'descending' },
      activeIndex: -1,
      payStatusValue: ['2'],
      payStatusOptions: [
        {
          value: '1',
          text: '未支付'
        },
        {
          value: '2',
          text: '已支付'
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
        return '请输入照相单号'
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
    timeFilterChange () {
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
    handleSearch () {
      this.activeIndex = -1
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
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        payStatus: this.payStatus
      }
      photoPageList(this.formData).then((res) => {
        loading.close()
        if (res.code == 0) {
          this.healthList = res.data.list
          this.totalNum = parseInt(res.data.totalCount)
        }
      }).catch(() => {
        loading.close()
      })
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
    handleFilterChange (val) {
      this.payStatus = val.value.join(',')
      this.currentPage = 1
      this.handleSearch()
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
    }
  },
  mounted () {
    this.payStatus = this.$route.query.payStatus || this.payStatus
    if (this.$route.query.time == 'today') {
      this.timeRange = this.todayTime()
    }
    this.handleSearch()
  }
}
</script>
<style lang="scss">
  .photo-Table{
    thead{
      tr{
        th:first-child{
          padding-left:32px;
        }
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
  .hb-photo-list {
    .mr15 {
      margin-right: 15px;
    }
    .mb15 {
      margin-bottom: 15px;
    }
    .mt30 {
      margin-top: 35px;
    }
    .list-table {
      .el-button--text {
        color: #409eff;
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
          border: 1px solid #FD7715;
        }
      }
    }
    .pager-container {
      text-align: center;
    }
  }
</style>
