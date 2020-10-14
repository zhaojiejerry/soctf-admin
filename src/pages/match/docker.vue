<template>
  <div>
    <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark" @select="select" @select-all="selectAll">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="name" align="center" label="题目名称" />
      <el-table-column prop="questionDescribe" align="center" label="文本描述" />
      <el-table-column label="题型" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ questionType[scope.row.questionType-1] }}
        </template>
      </el-table-column>
      <el-table-column label="难易程度" align="center" width="100">
        <template slot-scope="scope">
          <el-rate :value="parseInt(scope.row.difficultyLevel)" :max="3" disabled />
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center" prop="category" show-overflow-tooltip />
      <el-table-column label="分值" align="center" prop="value" show-overflow-tooltip />
      <el-table-column label="金币" align="center" prop="goldCoin" show-overflow-tooltip />
      <el-table-column label="答题时间/秒" align="center" prop="time" show-overflow-tooltip />
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getDockerQuestion } from '@/api/docker';
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
      activeName: 'first',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      questions: [],
      questionType: ['容器', '附件', '选择']
    };
  },
  mounted() {
    this.getDockerQuestion();
  },
  methods: {
    clearAll() {
      this.$refs.multipleTable.clearSelection();
      this.questions = [];
    },
    select(selection, row) {
      console.log(selection, row);
      if (!selection.includes(row)) {
        const index = this.questions.findIndex((item) => {
          return item.id === row.id;
        });
        this.questions.splice(index, 1);
      } else {
        this.questions.push(row);
      }
    },
    selectAll(selection) {
      if (selection.length > 0) {
        this.tableList.forEach((v) => {
          const index = this.questions.findIndex((i) => {
            return i.id === v.id;
          });
          if (index === -1) {
            this.questions.push(v);
          }
        });
      } else {
        this.questions.forEach((item, index) => {
          this.tableList.forEach((ms) => {
            if (item.id == ms.id) {
              this.questions = this.questions.filter(
                (item) => item.id != ms.id
              );
            }
          });
        });
      }
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
          this.tableList = res.data.records;
          this.questions.forEach((a) => {
            this.tableList.forEach((b) => {
              if (a.id === b.id) {
                this.$refs.multipleTable.toggleRowSelection(b, true);
              }
            });
          });
          this.tableTotal = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDockerQuestion();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDockerQuestion();
    }
  }
};
</script>
<style>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
