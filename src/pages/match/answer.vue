<template>
  <div>
    <el-dialog :visible.sync="value" width="60%" title="比赛运维" @closed="back">
      <div style="min-height:300px">
        <el-form label-width="100px">
          <el-form-item label="题目名称">
            {{ questionObj.name }}
          </el-form-item>
          <el-form-item label="题目描述">
            <div class="subject" style="white-space: pre-line; vertical-align: text-top;" v-text="questionObj.questionDescribe" />
          </el-form-item>
          <el-form-item v-if="questionType =='1'&&containers.containerUrl" label="题目地址">
            <a class="subject" :href="containers.containerUrl" target="_blank">{{ containers.containerUrl }}</a>
          </el-form-item>
          <el-form-item v-if="questionType=='2'&&containers.containerUrl" label="附件下载地址">
            <a class="subject" :href="containers.containerUrl" target="_blank" :download="containers.containerUrl">{{ containers.containerUrl }}</a>
          </el-form-item>
          <el-form-item v-if="questionType=='3'" label="题目类型">
            <span class="subject">{{ questionObj.choiceType==1?'单选':'多选' }}</span>
            <div style="margin-top: 25px;">{{ questionObj.choiceDescription }}</div>
            <!-- 选择题类型（1-单选，2-多选） -->
            <div v-if="questionObj.choiceType==1">
              <el-radio-group v-model="radio" class="radio">
                <el-radio v-for="(item, index) in questionObj.optionVos" :key="index" :label="item.optionCode">{{ item.optionDescription }}</el-radio>
              </el-radio-group>
            </div>
            <div v-if="questionObj.choiceType==2">
              <el-checkbox-group v-model="checked" class="checked">
                <el-checkbox v-for="(item, index) in questionObj.optionVos" :key="index" :label="item.optionCode">{{ item.optionDescription }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button v-if="questionType==1&& Status==0" :loading="loading" type="primary" @click="open">开启环境</el-button>
        <el-button v-if="questionType==1&& Status==1" :loading="loading" type="primary" @click="destruction">销毁环境</el-button>
        <el-button v-if="questionType==1&& Status==2" :loading="loading" type="primary" @click="destruction">重启环境</el-button>
        <el-button v-if="questionType==2&& Status==0" :loading="loading" type="primary" @click="start">开始做题</el-button>
        <el-button v-if="questionType==2&& Status==1" :loading="loading" type="primary" @click="giveup">放弃答题</el-button>
        <el-button v-if="questionType==2&& Status==2" :loading="loading" type="primary" @click="start">重新做题</el-button>
        <el-button v-if="questionType!=3&&Status == 1" type="primary" @click="onSubmit">提交答案</el-button>
        <el-button v-if="questionType==3&&!questionObj.choiceScore" type="primary" @click="onSubmit">提交答案</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  indComNewFile,
  fileIndComRenounce,
  fileIndComSubmitAnswers,
  getFileQuestionAndStatus,
  fileTeamComRenounce,
  teamSubmitAnswers,
  teamComNewFile
} from '@/api/file';
import {
  indComNewContainer,
  indComRenounce,
  indComSubmitAnswers,
  getDockerQuestionAndStatus,
  teamComNewContainer,
  teamComRenounce,
  teamComSubmitAnswers
} from '@/api/docker';
import {
  submitAnswersForTeam,
  submitAnswersForGame,
  getOneChoiceQuestion
} from '@/api/choice';
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    challengeId: {
      type: String,
      default: ''
    },
    gameId: {
      type: String,
      default: ''
    },
    gameType: {
      type: String,
      default: '1'
    },
    questionType: {
      type: String,
      default: '1'
    },
    userId: {
      type: String,
      default: ''
    },
    teamId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      questionObj: {},
      radio: '',
      checked: [],
      containers: {},
      Status: 0,
      loading: false
    };
  },
  watch: {
    value(val) {
      if (val) {
        switch (parseInt(this.questionType)) {
          case 1: {
            this.getDockerQuestionAndStatus();
            break;
          }
          case 2: {
            this.getFileQuestionAndStatus();
            break;
          }
          case 3: {
            this.getOneChoiceQuestion();
            break;
          }
        }
      }
    }
  },
  methods: {
    destruction() {
      switch (parseInt(this.gameType)) {
        case 1: {
          break;
        }
        case 2: {
          break;
        }
      }
    },
    open() {
      switch (parseInt(this.gameType)) {
        case 1: {
          break;
        }
        case 2: {
          break;
        }
      }
    },
    start() {
      switch (parseInt(this.gameType)) {
        case 1: {
          break;
        }
        case 2: {
          break;
        }
      }
    },
    giveup() {
      switch (parseInt(this.gameType)) {
        case 1: {
          break;
        }
        case 2: {
          break;
        }
      }
    },
    back() {
      this.$emit('input', false);
    },
    getOneChoiceQuestion() {
      var that = this;
      getOneChoiceQuestion({
        choiceId: this.challengeId
      }).then((res) => {
        that.questionObj = res.data;
      });
    },
    onSubmit() {
      switch (parseInt(this.questionType)) {
        case 1: {
          break;
        }
        case 2: {
          break;
        }
        case 3: {
          break;
        }
      }
    },
    // 团队容器销毁
    teamComRenounce() {
      var that = this;
      teamComRenounce({
        challengeId: that.challengeId,
        close: 1,
        containersId: that.containers.containersId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userFlag: '',
        userId: that.userId
      }).then((res) => {
        if (res.success) {
          that.Status = 2;
          that.$message({
            type: 'success',
            message: '环境已被销毁'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '环境销毁失败'
          });
        }
      });
    },
    // 团队附件销毁
    fileTeamComRenounce() {
      var that = this;
      fileTeamComRenounce({
        challengeId: that.challengeId,
        close: 1,
        containersId: that.containers.containersId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userFlag: '',
        userId: that.userId
      }).then((res) => {
        if (res.success) {
          that.Status = 2;
          that.$message({
            type: 'success',
            message: '已放弃做题'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '放弃做题失败'
          });
        }
      });
    },
    // 团队附件开启
    teamComNewFile() {
      var that = this;
      teamComNewFile({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.containers = res.data;
          that.Status = 1;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 团队容器开启
    teamComNewContainer() {
      var that = this;
      teamComNewContainer({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.containers = res.data;
          that.Status = 1;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 团队容器提交答案
    teamComSubmitAnswers() {
      var that = this;
      teamComSubmitAnswers({
        challengeId: this.challengeId,
        close: 0,
        containersId: this.containers.containersId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userFlag: this.userFlag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.Status = 2;
          that.getDockerQuestionAndStatus();
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 团队附件提交答案
    teamSubmitAnswers() {
      var that = this;
      teamSubmitAnswers({
        challengeId: this.challengeId,
        close: 0,
        containersId: this.containers.containersId,
        gameId: this.gameId,
        mold: 3,
        teamId: this.teamId,
        userFlag: this.userFlag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
          that.getFileQuestionAndStatus();
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 个人附件提交答案
    fileIndComSubmitAnswers() {
      var that = this;
      fileIndComSubmitAnswers({
        challengeId: this.challengeId,
        close: 0,
        containersId: this.containers.containersId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userFlag: this.userFlag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.getFileQuestionAndStatus();
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 个人容器提交答案
    indComSubmitAnswers() {
      var that = this;
      indComSubmitAnswers({
        challengeId: this.challengeId,
        close: 0,
        containersId: this.containers.containersId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userFlag: this.userFlag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.getDockerQuestionAndStatus();
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 容器详情
    getDockerQuestionAndStatus() {
      var that = this;
      getDockerQuestionAndStatus({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: parseInt(this.type) + 1,
        teamId: this.type == 1 ? '' : this.teamId,
        userId: this.userId
      }).then((res) => {
        that.questionObj = res.data.question;
        that.Status = res.data.Status;
        if (that.Status == 1) {
          that.containers = res.data.containers;
        }
      });
    },
    // 附件详情
    getFileQuestionAndStatus() {
      var that = this;
      getFileQuestionAndStatus({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userId: this.userId
      }).then((res) => {
        that.questionObj = res.data.question;
        that.Status = res.data.Status;
        if (that.Status == 1) {
          that.containers = res.data.containers;
        }
      });
    },
    // 个人附件开启
    indComNewFile() {
      var that = this;
      indComNewFile({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.containers = res.data;
          that.Status = 1;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 个人容器开启
    indComNewContainer() {
      var that = this;
      indComNewContainer({
        challengeId: this.challengeId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.containers = res.data;
          that.Status = 1;
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 个人容器销毁
    indComRenounce() {
      var that = this;
      indComRenounce({
        challengeId: that.challengeId,
        close: 1,
        containersId: that.containers.containersId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userFlag: '',
        userId: that.userId
      }).then((res) => {
        if (res.success) {
          that.Status = 2;
          this.$message({
            type: 'success',
            message: '环境已被销毁'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '环境销毁失败'
          });
        }
      });
    },
    // 个人放弃做题
    fileIndComRenounce() {
      var that = this;
      fileIndComRenounce({
        challengeId: that.challengeId,
        close: 1,
        containersId: that.containers.containersId,
        gameId: this.gameId,
        mold: 2,
        teamId: '',
        userFlag: '',
        userId: that.userId
      }).then((res) => {
        if (res.success) {
          that.Status = 2;
          this.$message({
            type: 'success',
            message: '已放弃做题'
          });
        } else {
          this.$message({
            type: 'warning',
            message: '放弃做题失败'
          });
        }
      });
    },
    // 选择题个人提交答案
    submitAnswersForGame() {
      var answerDetailVos = [];
      if (this.questionObj.choiceType == 1) {
        answerDetailVos = [
          {
            answer: this.radio,
            choiceId: this.challengeId,
            remark: ''
          }
        ];
      } else {
        this.checked.forEach((element) => {
          answerDetailVos.push({
            answer: element,
            choiceId: this.challengeId,
            remark: ''
          });
        });
      }
      submitAnswersForGame({
        answerDetailVos: answerDetailVos,
        gameId: this.gameId,
        paperId: '',
        solveTime: this.answerTime,
        teamId: '',
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          this.getPaperInfoForGame();
          this.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
    // 选择题团队提交答案
    submitAnswersForTeam() {
      var answerDetailVos = [];
      if (this.questionObj.choiceType == 1) {
        answerDetailVos = [
          {
            answer: this.radio,
            choiceId: this.challengeId,
            remark: ''
          }
        ];
      } else {
        console.log(this.checked);
        this.checked.forEach((element) => {
          answerDetailVos.push({
            answer: element,
            choiceId: this.challengeId,
            remark: ''
          });
        });
      }
      submitAnswersForTeam({
        answerDetailVos: answerDetailVos,
        gameId: this.gameId,
        paperId: '',
        solveTime: 0,
        teamId: this.teamId,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          this.getPaperInfoForGame();
          this.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    }
  }
};
</script>