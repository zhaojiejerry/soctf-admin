<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>武器库</span>
          <div class="right-part">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="weapName" align="center" label="工具名称" />
            <el-table-column prop="description" align="center" label="描述" />
            <el-table-column label="描述URL" align="center" prop="descUrl" show-overflow-tooltip />
            <el-table-column label="下载URL" align="center" prop="downloadUrl" show-overflow-tooltip />
            <el-table-column label="图片URL" align="center" prop="iconUrl" show-overflow-tooltip />
            <el-table-column label="官网URL" align="center" prop="orgUrl" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleEdit(scope.row.id)">编辑</el-button>
                <el-button size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getWeaponListForPage" />
  </div>
</template>
<script>
import { getWeaponListForPage, deleteWeaponTool } from '@/api/tool'
import { parseTime } from '@/utils/index'
import modify from './modify'
export default {
  components: { modify },
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  mounted() {
    this.getWeaponListForPage()
  },
  methods: {
    addNew() {
      this.show = true
      this.addSign = true
      this.mainId = ''
    },
    parseTime(time) {
      return parseTime(time)
    },
    handleEdit(id) {
      this.show = true
      this.mainId = id
      this.addSign = false
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWeaponTool({
            id: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getWeaponListForPage()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
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
    getWeaponListForPage() {
      getWeaponListForPage({
        currentPage: this.currentPage,
        extraParam: {},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data
          this.tableTotal = res.count
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getWeaponListForPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getWeaponListForPage()
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
