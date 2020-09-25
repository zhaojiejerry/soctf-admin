<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail" style="">
      <wx-header show-back>
        <span slot="headerTitle">赛事编辑</span>
      </wx-header>
    </div>
    <div class="macthtable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="赛事名称" prop="gameName">
          <el-input v-model="ruleForm.gameName" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛类型" prop="gameType">
          <el-select v-model="ruleForm.gameType" class="itemwidth" placeholder="请选择比赛类型">
            <el-option label="个人" value="1" />
            <el-option label="团队" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="比赛时间" prop="description">
          <el-date-picker v-model="ruleForm.date" class="itemwidth" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="赛事描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛官网" prop="gameOfficeAddress">
          <el-input v-model="ruleForm.gameOfficeAddress" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛详细描述" prop="gameText">
          <el-input v-model="ruleForm.gameText" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="比赛LOGO图片">
          <el-upload :show-file-list="false" :on-success="handleiconSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="/api/oss">
            <img v-if="iconUrl" :src="iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事主图">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="/api/oss">
            <img v-if="mainPic" :src="mainPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事说明">
          <el-upload :on-change="handleRemark" :file-list="remark" class="upload-demo" action="/api/oss" @on-remove="handleRemove1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传md/pdf文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="赛事积分说明">
          <el-upload :on-change="handleScoreRemark" :file-list="scoreRemark" class="upload-demo" action="/api/oss" @on-remove="handleRemove2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传md/pdf文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import wxHeader from '@/components/header/index'
import { modifyGameInfo, addGameInfo, getGameInfoDetail } from '@/api/match'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      ruleForm: {
        date: [],
        description: '',
        endTime: '',
        gameId: '',
        gameName: '',
        gameOfficeAddress: '',
        gameStatus: '',
        gameText: '',
        gameType: '',
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
      iconUrl: '',
      mainPic: ''
    }
  },
  mounted() {
    console.log(this.$route.query.id)
    if (this.$route.query.id) {
      this.getGameInfoDetail()
    }
  },
  methods: {
    handleRemark(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.success) {
        this.remark = [{ name: file.name, url: response.message }]
        this.ruleForm.remark = response.message
      } else {
        this.remark = []
        this.ruleForm.remark = ''
        this.$message.error(response.message)
      }
    },
    handleScoreRemark(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.success) {
        this.scoreRemark = [{ name: file.name, url: response.message }]
        this.ruleForm.scoreRemark = response.message
      } else {
        this.scoreRemark = []
        this.ruleForm.scoreRemark = ''
        this.$message.error(response.message)
      }
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList)
      this.remark = []
      this.ruleForm.remark = ''
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
      this.scoreRemark = []
      this.ruleForm.scoreRemark = ''
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.mainPic = URL.createObjectURL(file.raw)
      } else {
        this.mainPic = ''
        this.$message.error(res.message)
      }
    },
    handleiconSuccess(res, file) {
      if (res.success) {
        this.iconUrl = URL.createObjectURL(file.raw)
      } else {
        this.iconUrl = ''
        this.$message.error(res.message)
      }
    },

    beforeAvatarUpload(file) {
      console.log(file.type)
      const isJPG = file.type == 'image/jpeg' || 'image/png' || 'image/git'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG /png /git 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getGameInfoDetail() {
      getGameInfoDetail({
        gameId: this.$route.query.id
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
          this.ruleForm.date = [res.data.startTime, res.data.endTime]
          var remark = res.data.remark.split('/')
          this.remark = [
            {
              name: remark[remark.length - 1],
              url: res.data.remark
            }
          ]
          var scoreRemark = res.data.scoreRemark.split('/')
          this.scoreRemark = [
            {
              name: scoreRemark[scoreRemark.length - 1],
              url: res.data.scoreRemark
            }
          ]
        }
      })
    },
    back() {
      this.$router.push({ path: '/match' })
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
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
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
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
              iconUrl: this.iconUrl,
              joinerIds: [],
              mainPic: this.mainPic,
              organizer: this.ruleForm.organizer,
              remark: this.ruleForm.remark,
              scoreRemark: this.ruleForm.scoreRemark,
              startTime: this.ruleForm.date[0]
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '新增失败'
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style>
.itemwidth {
  width: 375px;
}
.el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
}
.el-upload-list {
  width: 500px;
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
