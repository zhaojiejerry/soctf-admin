<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="赛事名称" prop="gameName">
          <el-input v-model="ruleForm.gameName" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛类型" prop="gameType">
          <el-select v-model="ruleForm.gameType" class="itemwidth" placeholder="请选择比赛类型">
            <el-option label="个人" value="1" />
            <el-option label="团队" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="参赛者">
          <div class="itemwidth el-input" @click="getpsn">
            <div class="box">
              <el-tag v-for="(item,index) in joiners" :key="index" type="info" closable @close="handleClose(item,index)">
                {{ item.username }}
              </el-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="比赛时间" prop="description">
          <el-date-picker v-model="ruleForm.date" class="itemwidth" :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="比赛官网" prop="gameOfficeAddress">
          <el-input v-model="ruleForm.gameOfficeAddress" class="itemwidth" />
        </el-form-item>
        <el-form-item label="赛事描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛详细描述" prop="gameText">
          <el-input v-model="ruleForm.gameText" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛LOGO图片">
          <el-upload :show-file-list="false" :on-success="handleiconSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="/baseApi/oss">
            <img v-if="ruleForm.iconUrl" :src="ruleForm.iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事主图">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="/baseApi/oss">
            <img v-if="ruleForm.mainPic" :src="ruleForm.mainPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事说明">
          <el-upload :on-success="handleRemark" :file-list="remark" class="upload-demo" action="/baseApi/oss" @on-remove="handleRemove1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传md/pdf文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事积分说明">
          <el-upload :on-success="handleScoreRemark" :file-list="scoreRemark" class="upload-demo" action="/baseApi/oss" @on-remove="handleRemove2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传md/pdf文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisible" width="70%" title="参赛者">
      <el-form inline>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="extraParam.username" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="extraParam.company" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="extraParam.school" placeholder="请输入" clearable />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
      </el-form>
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableData" class="list-table" tooltip-effect="dark" @select="select" @select-all="selectAll">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" align="center" label="用户名" />
        <el-table-column prop="phone" align="center" label="电话号码" />
        <el-table-column prop="email" align="center" label="邮箱" />
        <el-table-column prop="school" align="center" label="学校" />
        <el-table-column prop="company" align="center" label="公司" />
      </el-table>
      <div class="pager-container mt30">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="subTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <el-button size="small" plain class="pagination-button">确定</el-button>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { modifyGameInfo, addGameInfo, getGameInfoDetail } from '@/api/match';
import { getUserInfoList } from '@/api/user';
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addSign: {
      type: Boolean,
      default: false
    },
    mainId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      joiners: [],
      ruleForm: {
        date: [],
        description: '',
        endTime: '',
        gameId: '',
        gameName: '',
        gameOfficeAddress: '',
        gameStatus: '',
        gameText: '',
        gameType: '1',
        gameWay: '',
        iconUrl: '',
        joinerIds: [],
        mainPic: '',
        organizer: '',
        remark: '',
        scoreRemark: '',
        startTime: ''
      },
      rules: {
        gameName: [
          { required: true, message: '请输入赛事名称', trigger: 'blur' }
        ],
        gameType: [
          { required: true, message: '请选择比赛类型', trigger: 'change' }
        ]
      },
      remark: [],
      scoreRemark: [],
      tableData: [],
      subTotal: 0,
      pageSize: 10,
      currentPage: 1,
      extraParam: {
				userType: '1',
				usrStatus: '1'
			},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 8.64e7; // 选当前时间之后的时间
        }
      }
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
					this.getGameInfoDetail();
        } else {
          this.joiners = [];
          this.remark = [];
          this.scoreRemark = [];
          this.ruleForm = {
            date: [],
            description: '',
            endTime: '',
            gameId: '',
            gameName: '',
            gameOfficeAddress: '',
            gameStatus: '',
            gameText: '',
            gameType: '1',
            gameWay: '',
            iconUrl: '',
            joinerIds: [],
            mainPic: '',
            organizer: '',
            remark: '',
            scoreRemark: '',
            startTime: ''
          };
        }
      }
    }
  },
  mounted() {
		this.$nextTick(() => {
			// this.$refs.multipleTable.clearSelection();
			this.getUserInfoList();
		})
  },
  methods: {
    getpsn() {
			this.dialogTableVisible = true;
			this.$nextTick(() => {
				this.$refs.multipleTable.clearSelection();
				this.joiners.forEach((a) => {
					this.tableData.forEach((b) => {
						if (a.usrId == b.usrId) {
							console.log(b)
							this.$refs.multipleTable.toggleRowSelection(b, true);
						}
					});
				});
			})
    },
    handleClose(item, index) {
      this.joiners.splice(index, 1);
      this.$refs.multipleTable.toggleRowSelection(item);
    },
    select(selection, row) {
      console.log(selection, row);
      if (!selection.includes(row)) {
        const index = this.joiners.findIndex((item) => {
          return item.usrId == row.usrId;
        });
        this.joiners.splice(index, 1);
      } else {
        this.joiners.push(row);
      }
    },
    selectAll(selection) {
      if (selection.length > 0) {
        this.tableData.forEach((v) => {
          const index = this.joiners.findIndex((i) => {
            return i.usrId == v.usrId;
          });
          if (index == -1) {
            this.joiners.push(v);
          }
        });
      } else {
        this.joiners.forEach((item, index) => {
          this.tableData.forEach((ms) => {
            if (item.usrId == ms.usrId) {
              this.joiners = this.joiners.filter(
                (item) => item.usrId != ms.usrId
              );
            }
          });
        });
      }
    },
    getUserInfoList() {
      var extraParam = {};
      for (var key in this.extraParam) {
        if (this.extraParam[key] != '') {
          extraParam[key] = this.extraParam[key];
        }
      }
      getUserInfoList({
        currentPage: this.currentPage,
        extraParam: extraParam,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
					this.tableData = res.data;
					console.log(this.joiners)
          this.joiners.forEach((a) => {
            this.tableData.forEach((b) => {
              if (a.usrId == b.usrId) {
								console.log(b)
                this.$refs.multipleTable.toggleRowSelection(b, true);
              }
            });
          });
          this.subTotal = res.count;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserInfoList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserInfoList();
    },
    handleRemark(response, file, fileList) {
      if (response.success) {
        this.remark = [{ name: response.message, url: response.message }];
        this.ruleForm.remark = response.message;
      } else {
        this.remark = [];
        this.ruleForm.remark = '';
        this.$message.error(response.message);
      }
    },
    handleScoreRemark(response, file, fileList) {
      if (response.success) {
        this.scoreRemark = [{ name: response.message, url: response.message }];
        this.ruleForm.scoreRemark = response.message;
      } else {
        this.scoreRemark = [];
        this.ruleForm.scoreRemark = '';
        this.$message.error(response.message);
      }
    },
    handleRemove1(file, fileList) {
      this.remark = [];
      this.ruleForm.remark = '';
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
      this.scoreRemark = [];
      this.ruleForm.scoreRemark = '';
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.ruleForm.mainPic = URL.createObjectURL(file.raw);
      } else {
        this.ruleForm.mainPic = '';
        this.$message.error(res.message);
      }
    },
    handleiconSuccess(res, file) {
      if (res.success) {
        this.ruleForm.iconUrl = URL.createObjectURL(file.raw);
      } else {
        this.ruleForm.iconUrl = '';
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type == 'image/jpeg' || 'image/png' || 'image/git';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG /png /git 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getGameInfoDetail() {
      getGameInfoDetail({
        gameId: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data;
          this.joiners = res.data.joiners ? res.data.joiners : [];
          this.ruleForm.date = [res.data.startTime, res.data.endTime];
          if (res.data.remark) {
            this.remark = [
              {
                name: res.data.remark,
                url: res.data.remark
              }
            ];
          } else {
            this.remark = [];
          }
          if (res.data.scoreRemark) {
            this.scoreRemark = [
              {
                name: res.data.scoreRemark,
                url: res.data.scoreRemark
              }
            ];
          } else {
            this.scoreRemark = [];
          }
        }
      });
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      var joiners = [];
      this.joiners.forEach((element) => {
        joiners.push(element.usrId);
      });
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          if (!this.addSign) {
            this.$confirm(
              '每次修改，分配到每个用户的比赛秘钥都会变化, 是否继续?',
              '提示',
              {
                type: 'warning'
              }
            )
              .then(() => {
                modifyGameInfo({
                  description: this.ruleForm.description,
                  endTime: this.ruleForm.date[1],
                  gameId: this.ruleForm.gameId,
                  gameName: this.ruleForm.gameName,
                  gameOfficeAddress: this.ruleForm.gameOfficeAddress,
                  gameStatus: this.ruleForm.gameStatus,
                  gameText: this.ruleForm.gameText,
                  gameType: this.ruleForm.gameType,
                  gameWay: this.ruleForm.gameWay,
                  iconUrl: this.ruleForm.iconUrl,
                  joinerIds: joiners,
                  mainPic: this.ruleForm.mainPic,
                  organizer: this.ruleForm.organizer,
                  remark: this.ruleForm.remark,
                  scoreRemark: this.ruleForm.scoreRemark,
                  startTime: this.ruleForm.date[0]
                }).then((res) => {
                  if (res.success) {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    });
                    this.back();
                    this.$emit('getList');
                  } else {
                    this.$message({
                      type: 'warning',
                      message: res.message
                    });
                  }
                });
              })
              .catch(() => {});
          } else {
            addGameInfo({
              description: this.ruleForm.description,
              endTime: this.ruleForm.date[1],
              gameId: '',
              gameName: this.ruleForm.gameName,
              gameOfficeAddress: this.ruleForm.gameOfficeAddress,
              gameStatus: '1',
              gameText: this.ruleForm.gameText,
              gameType: this.ruleForm.gameType,
              gameWay: this.ruleForm.gameWay,
              iconUrl: this.ruleForm.iconUrl,
              joinerIds: joiners,
              mainPic: this.ruleForm.mainPic,
              organizer: this.ruleForm.organizer,
              remark: this.ruleForm.remark,
              scoreRemark: this.ruleForm.scoreRemark,
              startTime: this.ruleForm.date[0]
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                });
                this.back();
                this.$emit('getList');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                });
              }
            });
          }
        }
      });
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
.box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 0.04rem;
  border: 0.01rem solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  min-height: 0.42rem;
  line-height: 0.4rem;
  outline: none;
  padding: 0 0.15rem;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 375px;
}
.el-tag {
  margin-right: 5px;
  height: 0.3rem;
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
