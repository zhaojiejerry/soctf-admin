<template>
  <div class="hb-opt-list">
    <wx-header>
      <span slot="headerTitle">操作日志</span>
      <div slot="headerRight" class="flex">
        <el-input :maxlength="40" :placeholder="filterPlaceHolder" v-model="filterText" size="small" clearable class="reset-input header-search" @clear="timeFilterChange" @keyup.enter.native="timeFilterChange">
          <div slot="prepend" class="header-sort">
            <el-select ref="headerSort" v-model="filterType" size="small" popper-class="header-sort-select">
              <el-option value="ip">
                <i class="iconfont icon-name sort-icon" />
                <span class="sort-text">操作人IP</span>
              </el-option>
              <el-option value="serviceName">
                <i class="iconfont icon-all sort-icon" />
                <span class="sort-text">应用名称</span>
              </el-option>
              <el-option value="content">
                <i class="iconfont icon-dingdan sort-icon" />
                <span class="sort-text">操作内容</span>
              </el-option>
            </el-select>
            <i :class="filterIcon" class="header-icon iconfont" @click.stop="handleToggle" />
          </div>
          <el-button slot="append" icon="iconfont icon-search" @click="timeFilterChange" />
        </el-input>
        <i class="split-line" />
        <el-button size="small" class="header-search-more" icon="iconfont icon-more" disabled />
      </div>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="space-between">
          <div class="left-part">
            <el-date-picker v-model="timeRange" :default-time="['00:00:00', '23:59:59']" prefix-icon="iconfont icon-calendar" size="small" class="reset-input mr15 mb15" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:320px" @change="timeFilterChange" />
            <el-input v-model="operator" placeholder="请输入搜索的操作人" size="small" style="width:200px;margin-left:-4px" />
            <el-input v-model="permName" placeholder="请输入搜索的操作模块" size="small" style="width:200px;margin-left:10px" />
            <el-button size="small" type="primary" style="width:70px;height: 34px;letter-spacing: 6px; text-indent: 4px;margin-left:10px" @click="search">搜索</el-button>
          </div>
        </div>
        <el-table :header-cell-style="{background:'#edeef2', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px',height: '50px'}" :default-sort="{prop: 'createTime', order: 'descending'}" :data="optList" class="list-table opt-table sb-table" tooltip-effect="dark" height="100%" @sort-change="handleSortChange">
          <el-table-column show-overflow-tooltip label="操作平台" width="180" prop="operatorPlatform" />
          <el-table-column show-overflow-tooltip prop="operator" width="120" label="操作人" />
          <el-table-column prop="ip" width="120" label="操作人IP" />
          <el-table-column show-overflow-tooltip prop="serviceName" width="150" label="应用名称" />
          <el-table-column show-overflow-tooltip prop="permName" width="100" label="操作模块" />
          <el-table-column show-overflow-tooltip prop="content" label="操作内容" />
          <el-table-column show-overflow-tooltip prop="createTime" sortable="custom" width="180" label="创建时间" />
          <el-table-column show-overflow-tooltip prop="executeTime" label="执行时间(ms)" width="150" />
          <el-table-column show-overflow-tooltip prop="result" width="150" column-key="paystateone" label="操作状态">
            <filter-panel slot="header" :default-value="optStatusValue" :filters="optState" column-key="optstateone" title="操作状态" @change="filterChangeData" />
            <template slot-scope="scope">
              <span v-if="scope.row.result == 0 " class="table-opt-status" style="color: #67c23a;">成功</span>
              <span v-else class="table-opt-status" style="color: #ef4646;">失败</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination v-if="totalNum != 0" :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30]" :total="totalNum" background size="small" layout="prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
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
import { getLogList } from '@/api/user.js'
import filterPanel from '@/components/tableFilterPanel/filter-panel'

export default {
  name: 'LogList',
  components: {
    filterPanel
  },
  data() {
    return {
      permName: '',
      operator: '',
      totalNum: 0,
      filterType: 'content', // 关键字类型
      filterText: '', // 关键字text
      timeRange: [], // 时间段
      optList: [], // 订单列表
      currentPage: 1,
      pageSize: 10,
      formData: null,
      optStatus: [], // 支付状态
      typeValue: [],
      optoneValue: [],
      optStatusValue: [],
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      type: [], // 业务类型
      optState: [
        {
          value: '0',
          text: '成功'
        },
        {
          value: '1',
          text: '失败'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['btnPermissions']),
    filterPlaceHolder() {
      if (this.filterType == 'content') {
        return '请输入操作内容关键字'
      } else if (this.filterType == 'serviceName') {
        return '请输入应用名称'
      } else if (this.filterType == 'ip') {
        return '请输入操作人ip'
      }
    },
    filterIcon() {
      if (this.filterType == 'content') {
        return 'icon-dingdan'
      } else if (this.filterType == 'serviceName') {
        return 'icon-all'
      } else if (this.filterType == 'ip') {
        return 'icon-name'
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    filterChangeData(val) {
      val.key == 'optstateone' && (this.optStatusValue = val.value)
      this.optStatus = this.optStatusValue.join(',')
      this.currentPage = 1
      this.handleSearch()
    },
    handleCopySuccess(e) {
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    },
    handleCopyError() {
      this.$message({
        showClose: true,
        message: '复制失败',
        type: 'error'
      })
    },
    handleToggle() {
      if (this.$refs.headerSort.visible) {
        this.$refs.headerSort.blur()
      } else {
        this.$refs.headerSort.visible = true
      }
    },
    timeFilterChange() {
      if (this.timeRange) {
        const startTime = this.timeRange[0]
          ? new Date(this.timeRange[0]).getTime()
          : 0
        const endTime = this.timeRange[1]
          ? new Date(this.timeRange[1]).getTime()
          : 0
        const intervalTime = endTime - startTime
      }
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
    handleSortChange(obj) {
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
    handleSearch() {
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
        startTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[0] : '',
        endTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        operator: this.operator,
        permName: this.permName,
        result: this.optStatus
      }
      getLogList(this.formData)
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this_.optList = res.data.list
            this_.totalNum = parseInt(res.data.totalCount)
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    search() {
      this.currentPage = 1
      this.pageSize = 10
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
        startTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[0] : '',
        endTime:
          this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        pageNo: 1,
        pageSize: 10,
        orderBy: this.orderBy,
        orderType: this.orderType,
        operator: this.operator,
        permName: this.permName,
        result: this.optStatus
      }
      getLogList(this.formData)
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this_.optList = res.data.list
            this_.totalNum = parseInt(res.data.totalCount)
          }
        })
        .catch(() => {
          loading.close()
        })
    }
  }
}
</script>
<style lang="scss">
.el-input--small .el-input__inner {
  height: 33.5px;
}

.opt-table {
  .el-table__body {
    padding-left: 0.2rem;
  }
  th > .cell {
    padding-left: 0.3rem !important;
  }
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
.hb-opt-list {
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
    .table-opt-status {
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
        border: 1px solid#B69858;
      }
    }
  }
  .pager-container {
    text-align: center;
  }
}
</style>
