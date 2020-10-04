<template>
  <div style="background-color: #edeef2;">
    <div>
      <div class="macthtable">
        <div class="right-part" style="padding: 10px;">
          <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id">
            <el-table-column prop="title" align="center" label="标题" />
            <el-table-column prop="mainBody" align="center" label="文本描述" />
            <el-table-column prop="createAt" align="center" label="创建时间">
              <template slot-scope="scope">
                {{ parseTime(scope.row.createAt) }}
              </template>
            </el-table-column>
            <el-table-column label="文档类型" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ fileType[scope.row.fileType-1] }}
              </template>
            </el-table-column>
            <el-table-column label="答案描述" align="center" prop="answerDescription" show-overflow-tooltip />
            <el-table-column label="分类" align="center" prop="type" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.questionId)">编辑</el-button>
                <el-button size="small" type="text" @click="handleDeviceDelete(scope.row.id)">删除</el-button>
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
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getWriteUpForPage" />
  </div>
</template>
<script>
import { getWriteUpForPage, deleteWriteUp } from '@/api/question'
import { parseTime } from '@/utils/index'
import modify from './modify'
export default {
  components: { modify },
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      subAccountList: [],
      subAccountTotal: 0,
      pageSize: 10,
      currentPage: 1,
      fileType: ['WP', '比赛资料', '其他']
    }
  },
  mounted() {
    this.getWriteUpForPage()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    addNew() {
      this.show = true
      this.addSign = true
      this.mainId = ''
    },
    handleSubAccountEdit(id) {
      this.show = true
      this.mainId = id
      this.addSign = false
    },
    handleDeviceDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWriteUp({
            answerId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getWriteUpForPage()
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
    getWriteUpForPage() {
      getWriteUpForPage({
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
      this.getWriteUpForPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getWriteUpForPage()
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
