<template>
  <div>
    <el-card class="box-card" style="position: relative;">
      <div style="position: absolute;right: 20px;z-index: 999;">
        <el-button v-if="ruleForm.gameStatus==1" size="small" type="primary" @click="startGame">发布比赛</el-button>
        <el-button v-if="ruleForm.gameStatus!=3" size="small" type="primary" @click="sendGameToken">发送通知</el-button>
        <el-button v-if="ruleForm.gameStatus==2" size="small" type="primary" @click="endGame">结束比赛</el-button>
        <el-button v-if="ruleForm.gameStatus==2" size="small" type="primary" @click="reviseGame">修改成绩</el-button>
        <el-button size="small" type="primary" @click="seeDescription">比赛说明</el-button>
        <el-button v-if="ruleForm.confidential==0&&ruleForm.gameStatus==2" size="small" type="primary" @click="releaseScore">发布成绩</el-button>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="比赛信息" name="1">
          <el-form ref="ruleForm" :model="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="赛事名称:" prop="gameName">
                  {{ ruleForm.gameName }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="比赛类型:" prop="gameType">
                  {{ ruleForm.gameType == "1" ? "个人" : "团队" }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间:" prop="description">
                  {{ ruleForm.startTime ? parseTime(ruleForm.startTime) : "" }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间:" prop="description">
                  {{ ruleForm.endTime ? parseTime(ruleForm.endTime) : "" }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="比赛官网:" prop="gameOfficeAddress">
                  {{ ruleForm.gameOfficeAddress }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="赛事描述:" prop="description">
                  {{ ruleForm.description }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="比赛详细描述:" prop="gameText">
                  {{ ruleForm.gameText }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="比赛LOGO图片:">
              <img v-if="ruleForm.iconUrl" :src="ruleForm.iconUrl" class="avatar">
            </el-form-item>
            <el-form-item label="赛事主图:">
              <img v-if="ruleForm.mainPic" :src="ruleForm.mainPic" class="avatar">
            </el-form-item>
            <el-form-item label="赛事说明:">
              <a :href="ruleForm.remark" target="_blank">{{ ruleForm.remark }}</a>
            </el-form-item>
            <el-form-item label="赛事积分说明:">
              <a :href="ruleForm.scoreRemark" target="_blank">{{ ruleForm.scoreRemark }}</a>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="人员管理" name="2">
          <el-table v-if="ruleForm.gameType != '1'" ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="joiners" class="list-table" tooltip-effect="dark">
            <el-table-column prop="teamname" align="center" label="团队名称" />
            <el-table-column prop="username" align="center" label="用户名" />
            <el-table-column prop="phone" align="center" label="电话号码" />
            <el-table-column prop="email" align="center" label="邮箱" />
            <el-table-column prop="school" align="center" label="学校" />
            <el-table-column prop="company" align="center" label="公司" />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="text" @click="seeDetail(row)">答题管理</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-button style="margin: 0 5px;" size="small" type="text">提交记录</el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button size="small" type="text" @click="getEndReport(row.usrId)">个人</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button size="small" type="text" @click="getEndReport(row.teamId)">团队</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button size="small" type="text" @click="breakGame(row)">禁赛</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-else ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="joiners" class="list-table" tooltip-effect="dark">
            <el-table-column prop="username" align="center" label="用户名" />
            <el-table-column prop="phone" align="center" label="电话号码" />
            <el-table-column prop="email" align="center" label="邮箱" />
            <el-table-column prop="school" align="center" label="学校" />
            <el-table-column prop="company" align="center" label="公司" />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="text" @click="seeDetail(row)">答题管理</el-button>
                <el-button size="small" type="text" @click="getEndReport(row.usrId)">提交记录</el-button>
                <el-button size="small" type="text" @click="breakGame(row)">禁赛</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="题目管理" name="3">
          <subjectPage :game-status="ruleForm.gameStatus" :active-name="activeName" />
        </el-tab-pane>
        <el-tab-pane label="赛事公告" name="4">
          <noticePage :game-status="ruleForm.gameStatus" :active-name="activeName" />
        </el-tab-pane>
        <el-tab-pane v-if="ruleForm.gameStatus!=1" label="比赛结果" name="5">
          <resultPage :active-name="activeName" />
        </el-tab-pane>
        <el-tab-pane v-if="ruleForm.gameStatus!=1" label="抄袭记录" name="6">
          <plagiarizePage :active-name="activeName" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :visible.sync="showAnswer" width="80%" :show-close="false" title="答题记录">
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="paperList" class="list-table" tooltip-effect="dark">
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
        <el-table-column label="是否已攻克" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.solved?'已攻克':'未攻克' }}
          </template>
        </el-table-column>
        <el-table-column v-if="ruleForm.gameStatus==2" fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.solved" size="small" type="text" @click="assist(scope.row)">协助攻克</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAnswer=false">关闭</el-button>
      </div>
    </el-dialog>
    <answerPage v-model="showPage" :game-type="ruleForm.gameType" :game-id="gameId" :question-type="type" :challenge-id="challengeId" :user-id="userId" :team-id="teamId" @getPaperInfoForGame="getPaperInfo" />
    <operations v-model="showRevise" :type="ruleForm.gameType" :game-id="gameId" />
    <description v-model="showDescription" :game-id="gameId" />
    <el-dialog :visible.sync="showRecord" width="80%" :show-close="false" title="提交记录">
      <el-select v-model="isRight" style="margin-bottom: 15px;" clearable placeholder="是否正确" @change="getEndReportList">
        <el-option label="错误" value="0" />
        <el-option label="正确" value="1" />
        <!-- <el-option label="全部" value="2" /> -->
      </el-select>
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="recordList" class="list-table" tooltip-effect="dark">
        <el-table-column prop="name" align="center" label="题目名称" show-overflow-tooltip />
        <el-table-column align="center" label="提交时间">
          <template slot-scope="{row}">{{ parseTime(row.answerTime) }}</template>
        </el-table-column>
        <el-table-column align="center" label="提交答案">
          <template slot-scope="{row}">{{ row.userFlag }}</template>
        </el-table-column>
        <el-table-column align="center" label="正确答案">
          <template slot-scope="{row}">{{ row.rightFlag }}</template>
        </el-table-column>
        <el-table-column label="分数" align="center" prop="result" show-overflow-tooltip />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRecord=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  // getGameInfoDetail,
  getPaperInfoForGame,
  breakGame,
  getEndReportList,
  endGame,
  startGame,
  rankingInDB,
  sendGameToken,
  getUserInfosByGame
} from '@/api/match';
import { parseTime } from '@/utils/index';
import subjectPage from './components/subject';
import noticePage from './components/notice';
import resultPage from './components/result';
import answerPage from './dialog/answer';
import plagiarizePage from './components/plagiarize';
import operations from './dialog/operations';
import description from './dialog/description';
export default {
  components: {
    answerPage,
    subjectPage,
    noticePage,
    resultPage,
    plagiarizePage,
    operations,
    description
  },
  data() {
    return {
      showRevise: false,
      showDescription: false,
      showRecord: false,
      recordList: [],
      activeName: '1',
      gameId: '',
      ruleForm: {},
      teamInfos: [],
      joiners: [],
      questionType: ['容器题', '附件题', '选择题'],
      gameStatus: ['未开始', '进行中', '已结束'],
      showPage: false,
      showAnswer: false,
      userId: '',
      teamId: '',
      challengeId: '',
      paperList: [],
      type: 0,
      isRight: '',
      joinerId: ''
    };
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        console.log(val);
        if (val.name == 'operationsGame') {
          this.activeName = '1';
          this.gameId = this.$route.query.gameId;
          this.getGameInfoDetail();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.activeName = '1';
    this.gameId = this.$route.query.gameId;
    this.getGameInfoDetail();
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex);
      // if (columnIndex === 0) {
      //   return {
      //     rowspan: row.sysUsers.length,
      //     colspan: 1
      //   };
      // }
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    },
    getGameInfoDetail() {
      getUserInfosByGame({
        gameId: this.gameId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data.gameInfo;
          if (this.ruleForm.gameType == '1') {
            this.joiners = res.data.users ? res.data.users : [];
          } else {
            this.joiners = [];
            var teamInfos = res.data.teamInfos ? res.data.teamInfos : [];
            var arr = [];
            teamInfos.forEach((team) => {
              team.sysUsers.forEach((user) => {
                user.teamname = team.teamName;
                user.teamId = team.teamId;
                arr.push(user);
              });
            });
            this.joiners = arr;
          }
        }
      });
    },
    reviseGame() {
      this.showRevise = true;
    },
    seeDescription() {
      this.showDescription = true;
    },
    releaseScore() {
      this.$confirm('是否要发布成绩?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rankingInDB({
            gameId: this.gameId
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '成绩发布成功'
              });
              this.getGameInfoDetail();
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
            message: '已取消发布成绩'
          });
        });
    },
    endGame() {
      this.$confirm('此操作将结束改比赛, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          endGame({
            gameId: this.gameId
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '比赛已结束'
              });
              this.getGameInfoDetail();
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
            message: '已取消结束比赛'
          });
        });
    },
    sendGameToken() {
      this.$confirm('是否要发送赛事密钥短信通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sendGameToken({
            gameId: this.gameId
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '发送赛事密钥短信成功'
              });
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
            message: '已取消发送'
          });
        });
    },
    startGame() {
      this.$confirm('是否要发布比赛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          startGame({
            gameId: this.gameId
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '比赛发布成功'
              });
              this.getGameInfoDetail();
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
            message: '已取消发布'
          });
        });
    },
    getEndReport(joinerId) {
      this.joinerId = joinerId;
      this.showRecord = true;
      this.isRight = '';
      this.getEndReportList();
    },
    getEndReportList() {
      var that = this;
      getEndReportList({
        gameId: this.gameId,
        joinerId: this.joinerId,
        isRight: this.isRight
      }).then((res) => {
        if (res.success) {
          that.recordList = res.data;
        }
      });
    },
    parseTime(time) {
      return parseTime(time);
    },
    breakGame(row) {
      this.$confirm(
        '确认要将该' + this.ruleForm.gameType == 1
          ? '用户'
          : '用户及其团队' + '禁赛吗？',
        '提示'
      ).then(() => {
        breakGame({
          gameId: this.gameId,
          joinerId: this.ruleForm.gameType == 1 ? row.usrId : row.teamId
        }).then((res) => {
          if (res.success) {
            this.getGameInfoDetail();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        });
      });
    },
    seeDetail(row) {
      this.userId = row.usrId;
      this.teamId = this.ruleForm.gameType == 1 ? '' : row.teamId;
      this.showAnswer = true;
      this.getPaperInfo();
    },
    assist(row) {
      this.challengeId = row.id;
      this.type = row.questionType;
      this.showPage = true;
    },
    getPaperInfo() {
      var that = this;
      getPaperInfoForGame({
        gameId: this.gameId,
        joinerId: this.ruleForm.gameType == 1 ? this.userId : this.teamId,
        level: '',
        type: ''
      }).then((res) => {
        if (res.success) {
          that.paperList = res.data.questionBanks;
        }
      });
    }
    // getGameInfoDetail() {
    //   getGameInfoDetail({
    //     gameId: this.gameId
    //   }).then((res) => {
    //     if (res.success) {
    //       this.ruleForm = res.data;
    //       this.joiners = res.data.joiners;
    //     }
    //   });
    // }
  }
};
</script>
<style  scoped>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>