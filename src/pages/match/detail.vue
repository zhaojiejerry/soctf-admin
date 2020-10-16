<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" title="比赛详情" @closed="back">
      <el-form ref="ruleForm" :model="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="赛事名称" prop="gameName">
              {{ ruleForm.gameName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="比赛类型" prop="gameType">
              {{ ruleForm.gameType == "1" ? "个人" : "团队" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="description">
              {{ ruleForm.startTime ? parseTime(ruleForm.startTime) : "" }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="description">
              {{ ruleForm.endTime ? parseTime(ruleForm.endTime) : "" }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="比赛官网" prop="gameOfficeAddress">
          {{ ruleForm.gameOfficeAddress }}
        </el-form-item>
        <el-form-item label="赛事描述" prop="description">
          {{ ruleForm.description }}
        </el-form-item>
        <el-form-item label="比赛详细描述" prop="gameText">
          {{ ruleForm.gameText }}
        </el-form-item>
        <el-form-item label="比赛LOGO图片">
          <img v-if="ruleForm.iconUrl" :src="ruleForm.iconUrl" class="avatar">
        </el-form-item>
        <el-form-item label="赛事主图">
          <img v-if="ruleForm.mainPic" :src="ruleForm.mainPic" class="avatar">
        </el-form-item>
        <el-form-item label="赛事说明">
          <a :href="ruleForm.remark" target="_blank">{{ ruleForm.remark }}</a>
        </el-form-item>
        <el-form-item label="赛事积分说明">
          <a :href="ruleForm.scoreRemark" target="_blank">{{ ruleForm.scoreRemark }}</a>
        </el-form-item>
        <el-form-item label="参赛者" />
        <div style=" width: 80%;  margin: auto;">
          <el-collapse v-if="ruleForm.gameType != '1'">
            <el-collapse-item v-for="(item,index) in teamInfos" :key="index" :title="item.teamName" :name="index">
              <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="item.sysUsers" class="list-table" tooltip-effect="dark">
                <el-table-column prop="username" align="center" label="用户名" />
                <el-table-column prop="phone" align="center" label="电话号码" />
                <el-table-column prop="email" align="center" label="邮箱" />
                <el-table-column prop="school" align="center" label="学校" />
                <el-table-column prop="company" align="center" label="公司" />
              </el-table>
            </el-collapse-item>
          </el-collapse>
          <el-table v-else ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="joiners" class="list-table" tooltip-effect="dark">
            <el-table-column prop="username" align="center" label="用户名" />
            <el-table-column prop="phone" align="center" label="电话号码" />
            <el-table-column prop="email" align="center" label="邮箱" />
            <el-table-column prop="school" align="center" label="学校" />
            <el-table-column prop="company" align="center" label="公司" />
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="back">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserInfosByGame, getGameInfoDetail } from '@/api/match';
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
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      ruleForm: {},
      teamInfos: [],
      joiners: []
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
.el-form-item__content {
  line-height: 40px !important;
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
