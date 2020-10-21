<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" title="比赛运维" @closed="back">
      <el-table v-if="type != '1'" ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="joiners" class="list-table" tooltip-effect="dark">
        <el-table-column prop="teamName" align="center" label="团队名称" />
        <el-table-column prop="phone" align="center" label="电话号码" />
        <el-table-column prop="email" align="center" label="邮箱" />
        <el-table-column prop="school" align="center" label="学校" />
        <el-table-column prop="company" align="center" label="公司" />
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="seeDetail(scope.row)">答题记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-else ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="joiners" class="list-table" tooltip-effect="dark">
        <el-table-column prop="username" align="center" label="用户名" />
        <el-table-column prop="phone" align="center" label="电话号码" />
        <el-table-column prop="email" align="center" label="邮箱" />
        <el-table-column prop="school" align="center" label="学校" />
        <el-table-column prop="company" align="center" label="公司" />
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="seeDetail(scope.row)">答题记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="back">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showAnswer" width="80%" :show-close="false" title="答题记录">
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="questionList" class="list-table" tooltip-effect="dark">
        <el-table-column prop="name" align="center" label="题目名称" show-overflow-tooltip />
        <el-table-column prop="questionDescribe" align="center" label="文本描述" show-overflow-tooltip />
        <el-table-column label="题型" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ questionTypes[scope.row.questionType-1] }}
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
        <el-table-column label="题型" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.solved?'已攻克':'未攻克' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.solved" size="small" type="text" @click="assist(scope.row)">协助攻克</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAnswer=false">关闭</el-button>
      </div>
    </el-dialog>
    <answerPage v-model="showPage" :game-type="type" :game-id="gameId" :question-type="questionType" :challenge-id="challengeId" :user-id="userId" :team-id="teamId" @getPaperInfoForGame="getPaperInfoForGame" />
  </div>
</template>
<script>
import { getGameInfoDetail, getPaperInfoForGame } from '@/api/match';
import { parseTime } from '@/utils/index';
import answerPage from './answer';
export default {
  components: {
    answerPage
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gameId: {
      type: String,
      default: ''
    },
    gameStatu: {
      type: String,
      default: '1'
    },
    type: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      showPage: false,
      dialogTableVisible: false,
      ruleForm: {},
      teamInfos: [],
      joiners: [],
      showAnswer: false,
      questionList: [],
      userId: '',
      teamId: '',
      questionType: 1,
      questionTypes: ['容器', '附件', '选择'],
      challengeId: ''
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.getGameInfoDetail();
      }
    }
  },
  methods: {
    assist(row) {
      this.challengeId = row.id;
			this.questionType = row.questionType;
			this.showPage = true
    },
    getPaperInfoForGame() {
      var that = this;
      getPaperInfoForGame({
        gameId: this.gameId,
        joinerId: this.type == 1 ? this.userId : this.teamId,
        level: '',
        type: ''
      }).then((res) => {
        if (res.success) {
          that.questionList = res.data.questionBanks;
        }
      });
    },
    seeDetail(row) {
      this.userId = row.usrId;
      this.showAnswer = true;
      this.getPaperInfoForGame();
    },
    back() {
      this.$emit('input', false);
    },
    parseTime(time) {
      return parseTime(time);
    },
    getGameInfoDetail() {
      getGameInfoDetail({
        gameId: this.gameId
      }).then((res) => {
        if (res.success) {
          this.joiners = res.data.joiners;
        }
      });
    }
  }
};
</script>
<style>
.el-collapse-item__header {
  padding-left: 20px;
}
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
.el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
}
.el-upload-list {
  width: 400px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
