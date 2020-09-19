<template>
  <div class="hb-device-list">
    <video-window :device-name="videoDeviceName" :device-code="videoDeviceCode" :vodeo-url="vodeoUrl" :play-video="playVideo" :stream-name="streamName" @closeVideoWindow="closeVideoWindow" />
    <wx-header>
      <span slot="headerTitle">设备管理</span>
      <span slot="headerOther" class="second-font">
        (共
        <em class="main-color">{{ deviceTotal }}</em>台设备)
      </span>
      <div slot="headerRight" class="flex">
        <el-input :maxlength="25" v-model="searchFilterText" size="small" clearable class="reset-input header-search" placeholder="输入设备编号/设备地点搜索" @clear="handleSearch" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="iconfont icon-search" @click="handleSearch" />
        </el-input>
        <i class="split-line" />
        <el-button size="small" class="header-search-more" icon="iconfont icon-more" disabled />
      </div>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="space-between">
          <div class="left-part">
            <el-date-picker v-model="timeRange" prefix-icon="iconfont icon-calendar" size="small" class="mr15 reset-input" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="handleDeviceDate" />
            <el-select v-model="deviceStatus" collapse-tags size="small" class="mr15 reset-input tag-status" placeholder="请选择设备状态" @change="handledeviceStatus">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
          <div class="right-part">
            <el-button v-show="true" v-if="btnPermissions.indexOf('100010110201') != -1" size="small" type="primary" @click="openDevices()">启用设备</el-button>
            <el-button v-show="true" v-if="btnPermissions.indexOf('100010110201') != -1" size="small" type="primary" @click="stopDevices()">停用设备</el-button>
            <el-button v-show="true" size="small" type="primary" @click="handleViewMultiVideo()">多设备实时监控</el-button>
            <el-button v-if="btnPermissions.indexOf('100010101') != -1" size="small" type="primary" icon="iconfont icon-add" @click="handleDeviceEdit(null)">添加设备</el-button>
            <el-button v-if="btnPermissions.indexOf('100010103') != -1" size="small" @click="handleDeviceDelete()">删除</el-button>
            <el-button v-if="false" size="small" @click="handleDeviceExport()">导出</el-button>
          </div>
        </div>
        <el-table ref="listTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="deviceList" :default-sort="defaultSort" class="list-table sh-table" tooltip-effect="dark" current-row-key="id" height="100%" @sort-change="handleSortChange" @selection-change="handleChangeSelection">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="code" label="设备编号" width="150">
            <template slot-scope="scope">
              <div class="flex device-code" style="align-items:center;">
                <el-button :disabled="btnPermissions.indexOf('100010102') == -1" style="padding-top:0;padding-bottom:0;" type="text" size="small" @click.native.prevent="handleDeviceDetail(scope.row.id)">{{ scope.row.code }}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="useStatus" width="60" label>
            <template slot-scope="scope">
              <el-tooltip :content="statusContent(scope.row.useStatus,scope.row.operationStatus)" placement="bottom" effect="light" popper-class="device-status-tooltip">
                <img v-show="scope.row.code" :src="statusIcon(scope.row.useStatus,scope.row.operationStatus)" class="device-status-icon" alt>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="单位名称" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.userName ? scope.row.userName : '--' }}</template>
          </el-table-column>
          <el-table-column label="设备地点" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.place ? scope.row.place : '--' }}</template>
          </el-table-column>
          <el-table-column label="设备添加时间" width="160" sortable="custom" prop="createTime" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.createTime ? scope.row.createTime : '--' }}</template>
          </el-table-column>
          <el-table-column width="85" label="小票" show-overflow-tooltip>
            <filter-panel slot="header" :filters="paperType" column-key="receiptState" title="小票" @change="handleFilterChange" />
            <template slot-scope="scope">
              <span v-if="scope.row.receiptStatus==null">未使用</span>
              <span v-else-if="scope.row.receiptStatus==0 || scope.row.receiptStatus==8" style="color:#67c23a">正常</span>
              <span v-else-if="scope.row.receiptStatus==7" style="color:#f46161">缺纸</span>
              <span v-else style="color:#f46161">故障</span>
            </template>
          </el-table-column>
          <el-table-column width="85" label="相纸" show-overflow-tooltip>
            <filter-panel slot="header" :filters="photoType" column-key="paperState" title="相纸" @change="handleFilterChange" />
            <template slot-scope="scope">
              <span v-if="scope.row.paperStatus==0" style="color:#67c23a">正常</span>
              <span v-else-if="scope.row.paperStatus==5" style="color:#f46161">缺纸</span>
              <span v-else-if="scope.row.paperStatus==null">未使用</span>
              <span v-else style="color:#f46161">故障</span>
            </template>
          </el-table-column>
          <el-table-column v-if="btnPermissions.indexOf('100010110201') != -1" width="120" label="运维状态" show-overflow-tooltip>
            <filter-panel slot="header" :filters="operationType" column-key="operationState" title="运维状态" @change="handleFilterChange" />
            <template slot-scope="scope">
              <span v-if="scope.row.operationStatus==0" style="color:#67c23a">启用</span>
              <span v-else-if="scope.row.operationStatus==1" style="color:#f46161">停用</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="185">
            <template slot-scope="scope">
              <el-button :disabled="btnPermissions.indexOf('100010101') == -1" size="small" type="text" @click.native.prevent="handleDeviceEdit(scope.row.id)">编辑</el-button>
              <el-button size="small" type="text" @click.native.prevent="viewVideo(scope.row)">实时监控</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination :current-page.sync="currentPage" :page-size="10" :page-sizes="[10, 20, 30]" :total="deviceTotal" background size="small" layout="prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import wxHeader from '@/components/header/index'
import videoWindow from '@/components/videoWindow/index'
import {
  getDeviceList,
  deleteDevice,
  deviceEnable,
  deviceDisable
} from '@/api/device.js'
import filterPanel from '@/components/tableFilterPanel/filter-panel'
export default {
  name: 'DeviceList',
  components: {
    wxHeader,
    videoWindow,
    filterPanel
  },
  data() {
    return {
      videoDeviceName: '',
      videoDeviceCode: '',
      vodeoUrl: '',
      playVideo: false,
      streamName: '',
      deviceTotal: 0,
      searchFilterText: '',
      timeRange: '', // 时间范围
      startTime: '',
      endTime: '',
      userFilterId: null, // 用户ID
      userFilterCode: null, // 用户所在区域
      deviceStatus: '', // 设备状态
      xpStatus: [], // 小票状态
      xzStatus: [], // 相纸状态
      ywStatus: [], // 运维状态
      selectDevice: [], // 多选框选中行
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      statusOptions: [
        {
          id: 0,
          name: '关机'
        },
        {
          id: 1,
          name: '开机'
        }
      ],
      paperType: [
        { text: '正常', value: '0,8' },
        { text: '缺纸', value: 7 },
        { text: '故障', value: '1,2,3,4,5,6,9' }
      ],
      operationType: [
        { text: '停用', value: 1 },
        { text: '启用', value: 0 }
      ],
      photoType: [
        { text: '正常', value: 0 },
        { text: '缺纸', value: 5 },
        {
          text: '故障',
          value:
            '1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27'
        }
      ],
      deviceList: [],
      currentPage: 1,
      pageSize: 10,
      messageObj: null,
      defaultSort: { prop: 'createTime', order: 'descending' }
    }
  },
  computed: {
    ...mapGetters(['btnPermissions', 'multiVideoVisible'])
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    openDevices() {
      if (!this.selectDevice.length) {
        this.$message({
          showClose: false,
          message: '请先选中设备再启用',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定启用选中设备吗?', '启用设备', {
        distinguishCancelAndClose: true,
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        customClass: 'redConfirm',
        confirmButtonClass: 'rightBtn',
        cancelButtonClass: 'leftBtn'
      })
        .then()
        .catch(async (action) => {
          if (action === 'cancel') {
            const deviceCodeArr = []

            this.selectDevice.forEach((item, index) => {
              deviceCodeArr.push(item.code)
            })

            const loading = this.$loading({
              lock: true,
              text: '加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)',
              target: document.querySelector('.view-container')
            })
            deviceEnable({
              deviceCodes: deviceCodeArr.join(',')
            })
              .then((res) => {
                if (res.code == 0) {
                  this.$message({
                    showClose: true,
                    message: '启用设备成功',
                    type: 'success'
                  })
                  loading.close()
                  this.handleSearch()
                }
              })
              .catch(() => {
                loading.close()
              })
          }
        })
    },
    stopDevices() {
      if (!this.selectDevice.length) {
        this.$message({
          showClose: false,
          message: '请先选中设备再停用',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定停用选中设备吗?', '停用设备', {
        distinguishCancelAndClose: true,
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        customClass: 'redConfirm',
        confirmButtonClass: 'rightBtn',
        cancelButtonClass: 'leftBtn'
      })
        .then()
        .catch(async (action) => {
          if (action === 'cancel') {
            const deviceCodeArr = []

            this.selectDevice.forEach((item, index) => {
              deviceCodeArr.push(item.code)
            })

            const loading = this.$loading({
              lock: true,
              text: '加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)',
              target: document.querySelector('.view-container')
            })
            deviceDisable({
              deviceCodes: deviceCodeArr.join(',')
            })
              .then((res) => {
                if (res.code == 0) {
                  this.$message({
                    showClose: true,
                    message: '停用设备成功',
                    type: 'success'
                  })
                  loading.close()
                  this.handleSearch()
                }
              })
              .catch(() => {
                loading.close()
              })
          }
        })
    },
    handleFilterChange(val) {
      val.key == 'paperState' && (this.xzStatus = val.value)
      val.key == 'operationState' && (this.ywStatus = val.value)
      val.key == 'receiptState' && (this.xpStatus = val.value)
      this.handleSearch()
    },
    closeVideoWindow() {
      this.videoDeviceName = ''
      this.videoDeviceCode = ''
      this.vodeoUrl = ''
      this.streamName = ''
      this.playVideo = false
    },
    viewVideo(deviceData) {
      if (!deviceData.videoUrl) {
        this.$message({
          type: 'error',
          message: '该设备没有配置直播地址'
        })
        return
      }
      this.videoDeviceName = deviceData.userName || ''
      this.videoDeviceCode = deviceData.code || ''
      this.vodeoUrl = deviceData.videoUrl || ''
      this.streamName = deviceData.streamName || ''
      this.playVideo = true
    },
    statusIcon(status, operationStatus) {
      if (status == 1) {
        return require('@/pages/device/images/normal.png')
      } else if (status == 0) {
        return require('@/pages/device/images/poweroff.png')
      }
    },
    statusContent(status, operationStatus) {
      if (status == 1) {
        return '开机'
      } else if (status == 0) {
        return '关机'
      }
    },
    handleSearch() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.view-container')
      })
      getDeviceList({
        search: this.searchFilterText,
        startTime: this.startTime,
        endTime: this.endTime,
        useStatus: this.deviceStatus,
        paperStatus: this.xzStatus.join(','),
        operationStatus: this.ywStatus.join(','),
        receiptStatus: this.xpStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      })
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.deviceList = res.list
            this.deviceTotal = parseInt(res.totalCount)
            this.$nextTick(() => {
              this.$refs.listTable.bodyWrapper.scrollTop = 0
            })
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleChangeSelection(val) {
      this.selectDevice = val
    },
    handleSortChange(obj) {
      if (obj.prop == 'createTime') {
        this.orderBy = 'CREATE_TIME'
      }
      if (!obj.order || obj.order == 'descending') {
        this.orderType = 'DESC'
      } else {
        this.orderType = 'ASC'
      }
      this.handleSearch()
    },
    handleDeviceDate(val) {
      if (val) {
        this.startTime = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.handleSearch()
    },
    handledeviceStatus(val) {
      this.deviceStatus = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleXPStatus(val) {
      this.xpStatus = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleXZStatus(val) {
      this.xzStatus = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleDeviceDelete() {
      if (!this.selectDevice.length) {
        this.$message({
          showClose: false,
          message: '请先选中设备再删除',
          type: 'warning'
        })
        return
      }

      this.$confirm('确定删除选中设备吗?', '删除设备', {
        distinguishCancelAndClose: true,
        confirmButtonText: '取消',
        cancelButtonText: '确定',
        customClass: 'redConfirm',
        confirmButtonClass: 'rightBtn',
        cancelButtonClass: 'leftBtn'
      })
        .then()
        .catch(async (action) => {
          if (action === 'cancel') {
            const deviceIdArr = []

            this.selectDevice.forEach((tiem, index) => {
              deviceIdArr.push(tiem.id)
            })

            const loading = this.$loading({
              lock: true,
              text: '加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)',
              target: document.querySelector('.view-container')
            })

            deleteDevice({
              deviceIds: deviceIdArr.join(',')
            })
              .then((res) => {
                loading.close()
                if (res.code == 0) {
                  this.$message({
                    showClose: true,
                    message: '删除设备成功',
                    type: 'success'
                  })
                }
                this.handleSearch()
              })
              .catch(() => {
                loading.close()
              })
          }
        })
    },
    handleDeviceExport() {},
    handleViewMultiVideo() {
      this.$store.commit('setMultiVideoVisible', !this.multiVideoVisible)
    },
    handleDeviceEdit(id) {
      if (id) {
        this.$router.push({
          name: 'editDevice',
          query: {
            deviceId: id
          }
        })
      } else {
        this.$router.push({
          name: 'editDevice'
        })
      }
    },
    handleDeviceDetail(deviceId) {
      this.$router.push({
        name: 'deviceInfo',
        query: {
          deviceId: deviceId
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to && to.name == 'deviceInfo') {
      this.$store.commit('ADD_CACHED_VIEW', 'deviceList')
      next()
    } else {
      this.$store.commit('DEL_ALL_CACHED_VIEWS')
      next()
    }
  }
}
</script>
<style lang="scss">
.testLoading {
  width: 100px;
  height: 100px;
  background-color: red;
}
.sh-table {
  td {
    padding: 8px 0;
  }
}
.device-status-tooltip {
  border: 1px solid #dcdcdc !important;
  &[x-placement^='bottom'] .popper__arrow {
    border-bottom-color: #dcdcdc !important;
    &::after {
      border-bottom-color: #ffffff !important;
    }
  }
  &[x-placement^='top'] .popper__arrow {
    border-top-color: #dcdcdc !important;
    &::after {
      border-top-color: #ffffff !important;
    }
  }
}
.hb-device-list {
  .device-status-icon {
    margin-left: 10px;
    height: 16px;
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 3.4rem;
  }
  .el-select {
    width: 180px;
  }
  .el-pagination .el-select {
    width: auto;
  }
  .mr15 {
    margin-right: 15px;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .mt30 {
    margin-top: 35px;
  }
  .icon-add {
    margin-right: 5px;
    font-size: 12px;
  }
  .list-table {
    .device-code {
      font-size: 12px;
    }
    .status-icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #cccccc;
    }
    .el-button--text {
      color: #409eff;
    }
  }
  .pager-container {
    text-align: center;
  }
  .status-switch {
    margin-left: -23px;
  }
  .paper-out {
    display: inline-block;
    width: 34px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #f46161;
    border-radius: 4px;
    color: #ffffff;
  }
  .paper-low {
    display: inline-block;
    width: 34px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #f3b631;
    border-radius: 4px;
    color: #ffffff;
  }
}
</style>
