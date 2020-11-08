<template>
  <div>
    <div style="margin-bottom: 10px;text-align: right;">
      <el-button type="primary" size="medium" @click="handleCreatePaper">新增</el-button>
    </div>
    <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="questionList" class="list-table" tooltip-effect="dark">
      <el-table-column prop="name" align="center" label="题目名称" show-overflow-tooltip />
      <el-table-column prop="questionDescribe" align="center" label="文本描述" show-overflow-tooltip />
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
      <el-table-column label="答题时间/秒" align="center" prop="time" />
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="deleteGame(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <createPaper v-model="dialogTableVisible" :game-id="gameId" :question-list="questionList" @getList="getPaperInfoForGame" />
  </div>
</template>
<script>
import { getPaperInfoForGame, deleteQuestions } from '@/api/match';
import createPaper from '../dialog/createPaper';
export default {
  components: {
    createPaper
  },
  data() {
    return {
      questionList: [],
      gameId: '',
      dialogTableVisible: false,
      questionType: ['容器题', '附件题', '选择题']
    };
  },
  mounted() {
    this.gameId = this.$route.query.gameId;
    this.getPaperInfoForGame();
  },
  methods: {
    handleCreatePaper() {
      this.dialogTableVisible = true;
    },
    getPaperInfoForGame() {
      var that = this;
      getPaperInfoForGame({
        gameId: this.gameId,
        joinerId: '',
        level: '',
        type: ''
      }).then((res) => {
        if (res.success) {
          that.questionList = res.data.questionBanks
            ? res.data.questionBanks
            : [];
        }
      });
    },
    deleteGame(id) {
      this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteQuestions({
            gameId: this.gameId,
            questionIds: [id]
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getPaperInfoForGame();
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>