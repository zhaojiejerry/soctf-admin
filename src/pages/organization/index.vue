<template>
  <div style="background-color: #edeef2;">
    <div>
      <div class="macthtable">
        <div class="right-part" style="padding: 10px;">
          <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id">
            <el-table-column prop="orgCode" align="center" label="机构编码" />
            <el-table-column prop="orgName" align="center" label="机构名称" />
            <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
            <el-table-column label="备注" align="center" prop="remark" show-overflow-tooltip />
            <el-table-column prop="createAt" align="center" label="创建时间">
              <template slot-scope="scope">
                {{ parseTime(scope.row.createAt) }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="handleDeviceDelete(scope.row.orgId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="subAccountTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <organizaModify v-model="showOrganiza" :add-sign="addOrganiza" :rule-form="ruleForm" @getList="getOrganizationListPage" />
  </div>
</template>
<script>
import { getOrganizationListPage, deleteOrganization } from '@/api/organization'
import { parseTime } from '@/utils/index'
import organizaModify from './organizaModify'
export default {
  components: { organizaModify },
  data() {
    return {
      showOrganiza: false,
      addOrganiza: false,
      subAccountList: [],
      subAccountTotal: 0,
      pageSize: 10,
      currentPage: 1,
      ruleForm: {}
    }
  },
  mounted() {
    this.getOrganizationListPage()
  },
  methods: {
    addNew() {
      this.showOrganiza = true
      this.addOrganiza = true
      this.ruleForm = {
        createAt: '',
        createBy: '',
        description: '',
        orgCode: '',
        orgId: '',
        orgName: '',
        remark: ''
      }
    },
    parseTime(time) {
      return parseTime(time)
    },
    handleSubAccountEdit(row) {
      this.showOrganiza = true
      this.addOrganiza = false
      this.ruleForm = row
    },
    handleDeviceDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrganization({
            answerId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getOrganizationListPage()
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getOrganizationListPage() {
      getOrganizationListPage({
        currentPage: this.currentPage,
        extraParam: {},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.subAccountList = res.data
          this.subAccountTotal = res.count
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrganizationListPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrganizationListPage()
    }
  }
}
</script>
<style  scoped>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
