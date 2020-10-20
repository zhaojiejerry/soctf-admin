<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" title="比赛运维" @closed="back">
      <el-table v-if="type != '1'" ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="item.sysUsers" class="list-table" tooltip-effect="dark">
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
    <el-dialog :visible.sync="showAnswer" width="70%" :show-close="false" title="答题记录">
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
        <!-- <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="buttons.indexOf('73')!=-1" size="small" type="text" @click="deleteGame(scope.row.id)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAnswer=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserInfosByGame,
  getGameInfoDetail,
  getPaperInfoForGame
} from '@/api/match';
import { parseTime } from '@/utils/index';
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
      dialogTableVisible: false,
      ruleForm: {},
      teamInfos: [],
      joiners: [],
      showAnswer: false,
      questionList: [],
      joinerId: ''
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (this.gameStatu != '3') {
          this.getGameInfoDetail();
        } else {
          this.getUserInfosByGame();
        }
      }
    }
  },
  methods: {
    getPaperInfoForGame() {
      var that = this;
      getPaperInfoForGame({
        gameId: this.gameId,
        joinerId: this.joinerId,
        level: '',
        type: ''
      }).then((res) => {
        if (res.success) {
          that.questionList = res.data.questionBanks;
        }
      });
    },
    seeDetail(row) {
      this.joinerId = row;
      this.showAnswer = true;
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
          this.ruleForm = res.data;
        }
      });
    },
    getUserInfosByGame() {
      getUserInfosByGame({
        gameId: this.gameId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data.gameInfo;
          if (this.ruleForm.gameType == '1') {
            this.joiners = res.data.users;
          } else {
            this.teamInfos = res.data.teamInfos;
          }
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
