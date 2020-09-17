<template>
  <div class="hb-user-list">
    <wx-header>
      <span slot="headerTitle">设备编码库</span>
      <span class="second-font" slot="headerOther">(共<em class="main-color">{{ deviceCodingTotal }}</em>个编码)</span>
      <div class="flex" slot="headerRight">
        <el-input size="small" :maxlength="25" class="reset-input header-search" placeholder="输入设备编码/厂商名称搜索" clearable @clear="handleSearch" v-model="deviceCodingFilterText" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="iconfont icon-search" @click="handleSearch"></el-button>
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
              v-model="timeRange"
              size="small"
              class="mr15 reset-input"
              type="datetimerange"
              @change="handleDeviceCodingDate"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
            <el-select v-model="status" @change="handleDeviceCodingStatus" size="small" class="mr15 reset-input tag-status" multiple placeholder="请选择使用状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="right-part">
            <el-button v-show="btnPermissions.indexOf('100010201') != -1" size="small" type="primary" icon="iconfont icon-add"  @click="handleDeviceAdd()">新建设备编码</el-button>
          </div>
        </div>
        <el-table
          ref="listTable"
          class="list-table"
          :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
          :cell-style="{fontSize: '12px'}"
          tooltip-effect="dark"
          :data="deviceCodingList"
          current-row-key="id"
          height="100%">
          <el-table-column
            prop="status"
            align="right"
            width="40"
            label="">
            <template slot-scope="scope">
              <i v-if="scope.row.status == 1" class="status-icon" style="background-color: #67C23A;"></i>
              <i v-else class="status-icon"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="设备编码"
            width="190"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.code }}
              <i class="iconfont icon-copy fuzhi-deviceCode"
                v-clipboard:copy="scope.row.code"
                v-clipboard:success="handleCopySuccess"
                v-clipboard:error="handleCopyError"
                v-show="scope.row.code"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="modelName"
            label="设备型号"
            width="130"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.modelName ? scope.row.modelName : '--' }}
            </template>
          </el-table-column>
          <el-table-column
            label="厂商名称"
            width="220"
            prop="manufacturerName"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{  scope.row.manufacturerName ? scope.row.manufacturerName : '--' }}
            </template>
          </el-table-column>
          <el-table-column
            label="厂商地址"
            prop="manufacturerAddress"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{  scope.row.manufacturerAddress ? scope.row.manufacturerAddress : '--' }}
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            label="激活时间"
            prop="activationTime"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.activationTime ? scope.row.activationTime : '--' }}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            width="120"
            label="使用状态">
            <template slot-scope="scope">
              <span :style="{color: scope.row.status == '1' ? '#67c23a' : '#cccccc'}">{{scope.row.status == "1" ? '使用中' : '未使用'}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination
            background
            size="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            :page-sizes="[10, 20, 30]"
            layout="prev, pager, next, sizes, jumper, slot"
            :total="deviceCodingTotal">
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
import { userPageList, userToggleStatus, userResetPassword } from '@/api/user.js'
import { getDeviceCodingList } from '@/api/deviceCoding.js'

export default {
  name: 'deviceCoding',
  components: {
    wxHeader
  },
  data () {
    return {
      deviceCodingTotal: 0,
      deviceCodingList: [],
      deviceCodingFilterText: '',
      timeRange: '', // 时间范围
      startTime: '',
      endTime: '',
      status: [], // 使用状态
      statusOptions: [
        {
          id: 0,
          name: '未使用'
        },
        {
          id: 1,
          name: '使用中'
        }
      ],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  methods: {
    handleSearch () {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.view-container')
      })
      getDeviceCodingList({
        deviceCode: this.deviceCodingFilterText,
        startTime: this.startTime || '',
        endTime: this.endTime || '',
        status: this.status.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then((res) => {
        loading.close()
        if (res.code == 0) {
          this.deviceCodingList = res.list
          this.deviceCodingTotal = parseInt(res.totalCount)
          this.$nextTick(() => {
            this.$refs.listTable.bodyWrapper.scrollTop = 0
          })
        }
      }).catch(() => {
        loading.close()
      })
    },
    handleDeviceCodingDate (val) {
      this.startTime = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
      this.endTime = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      this.handleSearch()
    },
    handleDeviceCodingStatus (val) {
      this.status = val
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
    handleDeviceAdd () {
      this.$router.push({
        name: 'addDeviceCoding'
      })
    }
  },
  mounted () {
    this.handleSearch()
  }
}
</script>
<style lang="scss">
  .fuzhi-deviceCode{
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
  .fuzhi-deviceCode:hover{
    color: #fd7715;
  }
  .hb-user-list {
    .ml15 {
      margin-left: 15px;
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
  }
</style>
