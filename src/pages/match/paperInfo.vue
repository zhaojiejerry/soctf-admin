<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" :show-close="false" title="比赛试题">
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="questionList" class="list-table" tooltip-effect="dark">
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
            <el-button v-if="buttons.indexOf('73')!=-1" size="small" type="text" @click="deleteGame(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPaperInfoForGame, deleteQuestions } from '@/api/match';
export default {
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
      questionList: [],
      questionType: ['容器', '附件', '选择']
    };
  },
  computed: {
    buttons() {
      return this.$store.state.buttons;
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getPaperInfoForGame();
      }
    }
  },
  methods: {
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
    },
    close() {
      this.$emit('input', false);
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
          that.questionList = res.data.questionBanks;
        }
      });
    }
  }
};
</script>