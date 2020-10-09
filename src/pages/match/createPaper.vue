<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="生成试卷">
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark" @select="select" @select-all="selectAll">
        <el-table-column type="selection" width="55" />
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
      </el-table>
      <div class="pager-container mt30">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <el-button size="small" plain class="pagination-button">确定</el-button>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="createPaperInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getWriteUpForPage } from '@/api/question'
import { createPaperInfo } from '@/api/match'
import { parseTime } from '@/utils/index'
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gameId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      fileType: ['WP', '比赛资料', '其他'],
      questions: []
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getWriteUpForPage()
      }
    }
  },
  mounted() {},
  methods: {
    select(selection, row) {
      console.log(selection, row)
      if (!selection.includes(row)) {
        const index = this.questions.findIndex((item) => {
          return item.questionId === row.questionId
        })
        this.questions.splice(index, 1)
      } else {
        this.questions.push(row)
      }
    },
    selectAll(selection) {
      if (selection.length > 0) {
        this.tableList.forEach((v) => {
          const index = this.questions.findIndex((i) => {
            return i.questionId === v.questionId
          })
          if (index === -1) {
            this.questions.push(v)
          }
        })
      } else {
        this.questions.forEach((item, index) => {
          this.tableList.forEach((ms) => {
            if (item.questionId == ms.questionId) {
              this.questions = this.questions.filter(
                (item) => item.questionId != ms.questionId
              )
            }
          })
        })
      }
    },
    createPaperInfo() {
      if (this.questions.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择题目'
        })
        return
      }
      var questionIds = []
      this.questions.forEach((element) => {
        questionIds.push(element.questionId)
      })
      createPaperInfo({
        gameId: this.gameId,
        questionIds: questionIds
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '试卷生成成功'
          })
          this.close()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    parseTime(time) {
      return parseTime(time)
    },
    close() {
      this.$emit('input', false)
    },
    getWriteUpForPage() {
      getWriteUpForPage({
        currentPage: this.currentPage,
        extraParam: {
          fileType: 2
        },
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data
          this.questions.forEach((a) => {
            this.tableList.forEach((b) => {
              if (a.questionId === b.questionId) {
                this.$refs.multipleTable.toggleRowSelection(b, true)
              }
            })
          })
          this.tableTotal = res.count
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
<style>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
