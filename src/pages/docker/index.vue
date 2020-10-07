<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>容器题管理</span>
          <div class="right-part">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id">
            <el-table-column prop="name" align="center" label="题目名称" />
            <el-table-column prop="questionDescribe" align="center" label="文本描述" />
            <el-table-column label="题型" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ questionType[scope.row.questionType-1] }}
              </template>
            </el-table-column>
            <el-table-column label="难易程度" align="center">
              <template slot-scope="scope">
                <el-rate :value="parseInt(scope.row.difficultyLevel)" disabled />
              </template>
            </el-table-column>
            <el-table-column label="类别" align="center" prop="category" show-overflow-tooltip />
            <el-table-column label="分值" align="center" prop="value" show-overflow-tooltip />
            <el-table-column label="金币" align="center" prop="goldCoin" show-overflow-tooltip />
            <el-table-column label="答题时间/秒" align="center" prop="time" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.id)">编辑</el-button>
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
      </el-card>
    </div>
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getDockerQuestion" />
  </div>
</template>
<script>
import { getDockerQuestion, delDockerQuestion } from '@/api/docker'
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
      questionType: ['容器', '附件', '选择']
    }
  },
  mounted() {
    this.getDockerQuestion()
  },
  methods: {
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
    parseTime(time) {
      return parseTime(time)
    },
    handleDeviceDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delDockerQuestion({
            id: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getDockerQuestion()
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
    getDockerQuestion() {
      getDockerQuestion({
        category: '',
        difficultyLevel: '',
        labs: '',
        name: '',
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        userId: ''
      }).then((res) => {
        if (res.success) {
          this.subAccountList = res.data.records
          this.subAccountTotal = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDockerQuestion()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDockerQuestion()
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
