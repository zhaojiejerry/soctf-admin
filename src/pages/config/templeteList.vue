<template>
  <div class="hb-user-list">
    <wx-header>
      <span slot="headerTitle">功能配置</span>
      <span class="second-font" slot="headerOther">(共<em class="main-color">{{ templateTotal }}</em>个模板)</span>
      <div class="flex" slot="headerRight">
        <el-input size="small" :maxlength="20" clearable class="reset-input header-search" placeholder="输入模板名称/模板描述搜索" v-model="search" @clear="handleSearch" @keyup.enter.native="handleSearch">
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
              v-model="timeRange"
              size="small"
              class="mr15 reset-input"
              type="datetimerange"
              @change="handleDeviceCodingDate"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
            <el-select v-model="useStatus" @change="handleUseStatus" size="small" class="mr15 reset-input tag-status" multiple placeholder="请选择使用状态">
              <el-option
                v-for="item in useOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="right-part">
            <el-button v-show="btnPermissions.indexOf('100010201') != -1" size="small" type="primary" icon="iconfont icon-add"  @click="handleTempleteAdd()">新建模板</el-button>
          </div>
        </div>
        <el-table
          class="list-table mb-table"
          :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
          :cell-style="{fontSize: '12px'}"
          tooltip-effect="dark"
          :data="templateList"
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
            prop="name"
            label="模板名称"
            width="190"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="模板描述"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.remark ? scope.row.remark : '-' }}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="220"
            prop="createTime"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{  scope.row.createTime ? scope.row.createTime : '-' }}
            </template>
          </el-table-column>
          <el-table-column
            label="创建者"
            width="120"
            prop="userName"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{  scope.row.userName ? scope.row.userName : '-' }}
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
          <el-table-column
            fixed="right"
            label="操作"
            width="185">
            <template slot-scope="scope">
              <el-button size="small" v-if="btnPermissions.indexOf('10030101') != -1" type="text" @click.native.prevent="handleTempleteEdit(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination
            background
            size="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="defaultCurrentPage"
            :page-size="10"
            :page-sizes="[10, 20, 30]"
            layout="prev, pager, next, sizes, jumper"
            :total="templateTotal">
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
import { getTemplateList, editTemplate } from '@/api/template.js'

export default {
  name: 'templeteList',
  components: {
    wxHeader
  },
  data () {
    return {
      templateTotal: 0,
      templateList: [],
      search: '',
      timeRange: '', // 时间范围
      startTime: '',
      endTime: '',
      useStatus: [], // 使用状态
      useOptions: [
        {
          id: 1,
          name: '使用中'
        },
        {
          id: 0,
          name: '未使用'
        }
      ],
      defaultCurrentPage: 1,
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
      getTemplateList({
        startTime: this.startTime || '',
        endTime: this.endTime || '',
        status: this.useStatus.join(','),
        search: this.search,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then((res) => {
        loading.close()
        if (res.code == 0) {
          this.templateList = res.list
          this.templateTotal = parseInt(res.totalCount)
        }
      }).catch(() => {
        loading.close()
      })
    },
    handleDeviceCodingDate (val) {
      if (val) {
        this.startTime = moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.startTime = ''
        this.endTime = ''
      }
      this.handleSearch()
    },
    handleTempleteEdit (templateId) {
      this.$router.push({
        name: 'addTemplete',
        query: {
          templateId: templateId
        }
      })
    },
    handleUseStatus (val) {
      this.useStatus = val
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
    handleTempleteAdd () {
      this.$router.push({
        name: 'addTemplete'
      })
    }
  },
  mounted () {
    this.handleSearch()
  }
}
</script>
<style lang="scss">
  .mb-table{
    td{
      padding:8px 0;
    }
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
