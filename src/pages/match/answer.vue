<template>
  <div>
    <el-dialog :visible.sync="value" width="60%" title="题目详情" @closed="back">
      <div>
        <el-form label-width="100px" class="myform">
          <el-form-item label="难易程度">
            <el-rate :value="parseInt(questionObj.difficultyLevel)" :max="3" disabled />
          </el-form-item>
          <el-form-item label="题目名称">
            {{ questionObj.name }}
          </el-form-item>
          <el-form-item label="题目描述">
            <div class="subject" style="white-space: pre-line;max-height: 300px;overflow: auto;" v-text="questionObj.questionDescribe" />
          </el-form-item>
          <el-form-item v-if="questionType =='1'&&containers.containerUrl" label="题目地址">
            <a class="subject" :href="containers.containerUrl" target="_blank">{{ containers.containerUrl }}</a>
          </el-form-item>
          <el-form-item v-if="questionType=='2'&&containers.containerUrl" label="附件下载地址">
            <a class="subject" :href="containers.containerUrl" target="_blank" :download="containers.containerUrl">{{ containers.containerUrl }}</a>
          </el-form-item>
          <el-form-item v-if="questionType=='3'" label="题目类型">
            <span class="subject">{{ questionObj.choiceType==1?'单选':'多选' }}</span>
            <div>{{ questionObj.choiceDescription }}</div>
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
        <div v-if="questionType!='3'&&Status == 1" style="margin: 30px auto; width: 70%;">
          <el-input v-model="containers.flag" type="textarea" :rows="2" placeholder="flag..." />
        </div>
      </div>
      <div style="text-align: center;margin-top: 30px;">
        <el-button v-if="questionType==1&& Status==0" :loading="loading" type="primary" @click="open">开启环境</el-button>
        <el-button v-if="questionType==1&& Status==1" :loading="loading" type="primary" @click="destruction">销毁环境</el-button>
        <el-button v-if="questionType==1&& Status==2" :loading="loading" type="primary" @click="destruction">重启环境</el-button>
        <el-button v-if="questionType==2&& Status==0" :loading="loading" type="primary" @click="start">开始做题</el-button>
        <el-button v-if="questionType==2&& Status==1" :loading="loading" type="primary" @click="giveup">放弃答题</el-button>
        <el-button v-if="questionType==2&& Status==2" :loading="loading" type="primary" @click="start">重新做题</el-button>
        <el-button v-if="questionType!=3&&Status == 1" type="primary" @click="onSubmit">提交答案</el-button>
        <el-button v-if="questionType==3&&!questionObj.correctAnswer" type="primary" @click="onSubmit">提交答案</el-button>
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
  getChoiceOneForUser
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
      type: Number,
      default: 1
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
				console.log(this.questionType)
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
            this.getChoiceOneForUser();
            break;
          }
        }
      }
    }
  },
  methods: {
		// 销毁
    destruction() {
			this.loading = true
      switch (parseInt(this.gameType)) {
        case 1: {
					this.indComRenounce()
          break;
        }
        case 2: {
					this.teamComRenounce()
          break;
        }
      }
		},
		// 开启
    open() {
			this.loading = true
      switch (parseInt(this.gameType)) {
        case 1: {
					this.indComNewContainer()
          break;
        }
        case 2: {
					this.teamComNewContainer()
          break;
        }
      }
		},
		// 开始
    start() {
			this.loading = true
      switch (parseInt(this.gameType)) {
        case 1: {
					this.indComNewFile()
          break;
        }
        case 2: {
					this.teamComNewFile()
          break;
        }
      }
		},
		// 放弃
    giveup() {
			this.loading = true
      switch (parseInt(this.gameType)) {
        case 1: {
					this.fileIndComRenounce()
          break;
        }
        case 2: {
					this.fileTeamComRenounce()
          break;
        }
      }
    },
    back() {
      this.$emit('input', false);
		},
		// 选择题详情
    getChoiceOneForUser() {
      var that = this;
      getChoiceOneForUser({
        choiceId: this.challengeId
      }).then((res) => {
        that.questionObj = res.data;
      });
		},
		// 提交
    onSubmit() {
			this.$confirm('确定要提交答案?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          switch (parseInt(this.gameType)) {
						case 1: {
							this.onSubmitPsn()
							break;
						}
						case 2: {
							this.onSubmitTeam()
							break;
						}
					}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
		},
		onSubmitTeam() {
			switch (parseInt(this.questionType)) {
				case 1: {
					this.teamComSubmitAnswers()
					break;
				}
				case 2: {
					this.teamSubmitAnswers()
					break;
				}
				case 3: {
					this.submitAnswersForTeam()
					break;
				}
			}
		},
		onSubmitPsn() {
			switch (parseInt(this.questionType)) {
				case 1: {
					this.indComSubmitAnswers()
					break;
				}
				case 2: {
					this.fileIndComSubmitAnswers()
					break;
				}
				case 3: {
					this.submitAnswersForGame()
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
				this.loading = false
        if (res.success) {
          that.$message({
            type: 'success',
            message: '环境已被销毁'
					});
					that.$emit('getPaperInfoForGame')
					that.getDockerQuestionAndStatus()
        } else {
          this.$message({
            type: 'warning',
            message: '环境销毁失败'
          });
        }
      });
    },
    // 团队附件放弃答题
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
				this.loading = false
        if (res.success) {
          that.$message({
            type: 'success',
            message: '已放弃做题'
					});
					that.$emit('getPaperInfoForGame')
					that.getFileQuestionAndStatus();
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
				this.loading = false
        if (res.success) {
          that.containers = res.data;
					that.Status = 1;
					that.getFileQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
				this.loading = false
        if (res.success) {
          that.containers = res.data;
					that.Status = 1;
					that.getDockerQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
        userFlag: this.containers.flag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.getDockerQuestionAndStatus();
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
					});
					that.$emit('getPaperInfoForGame')
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
        userFlag: this.containers.flag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          that.$message({
            type: 'success',
            message: '恭喜回答正确'
          });
					that.getFileQuestionAndStatus();
					that.$emit('getPaperInfoForGame')
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
        userFlag: this.containers.flag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
					that.getFileQuestionAndStatus();
					that.$emit('getPaperInfoForGame')
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
        userFlag: this.containers.flag,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
					that.getDockerQuestionAndStatus();
					that.$emit('getPaperInfoForGame')
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
        mold: parseInt(this.gameType) + 1,
        teamId: this.gameType == 1 ? '' : this.teamId,
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
        mold: parseInt(this.gameType) + 1,
        teamId: this.gameType == 1 ? '' : this.teamId,
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
				this.loading = false
        if (res.success) {
          that.containers = res.data;
					that.Status = 1;
					that.getFileQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
				this.loading = false
        if (res.success) {
          that.containers = res.data;
					that.Status = 1;
					that.getDockerQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
				this.loading = false
        if (res.success) {
          this.$message({
            type: 'success',
            message: '环境已被销毁'
					});
					that.getDockerQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
				this.loading = false
        if (res.success) {
          this.$message({
            type: 'success',
            message: '已放弃做题'
					});
					that.getFileQuestionAndStatus()
					that.$emit('getPaperInfoForGame')
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
      var answerDetailVos = [{
				answer: this.questionObj.choiceType == 1 ? this.radio : this.checked.join(','),
				choiceId: this.challengeId,
				remark: ''
			}];
      submitAnswersForGame({
        answerDetailVos: answerDetailVos,
        gameId: this.gameId,
        paperId: '',
        solveTime: this.answerTime,
        teamId: '',
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '恭喜回答正确'
					});
					this.$emit('getPaperInfoForGame')
					this.getChoiceOneForUser();
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
      var answerDetailVos = [{
				answer: this.questionObj.choiceType == 1 ? this.radio : this.checked.join(','),
				choiceId: this.challengeId,
				remark: ''
			}];
      submitAnswersForTeam({
        answerDetailVos: answerDetailVos,
        gameId: this.gameId,
        paperId: '',
        solveTime: 0,
        teamId: this.teamId,
        userId: this.userId
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '恭喜回答正确'
					});
					this.$emit('getPaperInfoForGame')
					this.getChoiceOneForUser();
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
<style>
.myform .el-form-item{
	margin-bottom: 0px !important;
}
.myform .el-form-item__label{
  font-weight: bold;
}
</style>