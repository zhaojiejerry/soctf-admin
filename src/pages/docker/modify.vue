<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail" style="">
      <wx-header show-back>
        <span slot="headerTitle">容器题编辑</span>
      </wx-header>
    </div>
    <div class="macthtable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="答案/文档标题" prop="title">
          <el-input v-model="ruleForm.title" class="itemwidth" />
        </el-form-item>
        <el-form-item label="文档类型" prop="fileType">
          <el-select v-model="ruleForm.fileType" class="itemwidth" placeholder="请选择文档类型">
            <el-option label="WP" value="1" />
            <el-option label="比赛资料" value="2" />
            <el-option label="其他" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="文档描述" prop="mainBody">
          <el-input v-model="ruleForm.mainBody" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答案/文档描述" prop="answerDescription">
          <el-input v-model="ruleForm.answerDescription" class="itemwidth" />
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-select v-model="ruleForm.label" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
            <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="type">
          <el-input v-model="ruleForm.type" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答案/文档OSS路径">
          <el-upload ref="upload" :on-success="handleSuccess" :file-list="fileList" class="upload-demo" action="/api/oss" @on-remove="handleRemove" @before-upload="beforeUpload">
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
import { getCookie } from '@/utils/auth'
import {
  editDockerQuestion,
  addDockerQuestion,
  getDockerQuestionById
} from '@/api/docker'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      ruleForm: {
        category: '',
        challengeType: '',
        deploymentType: '',
        difficultyLevel: '',
        dirName: '',
        enable: 0,
        frpType: 0,
        goldCoin: 0,
        id: '',
        label: '',
        name: '',
        questionDescribe: '',
        questionType: 0,
        time: 0,
        value: 0
      },
      label: [],
      rules: {},
      fileList: []
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getDockerQuestionById()
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList)
      // this.fileList = fileList.slice(-3);
    },
    beforeUpload(file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = []
    },
    getDockerQuestionById() {
      getDockerQuestionById({
        questionId: this.$route.query.id
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
          // this.ruleForm.label = res.data.label.split('|')
          // this.label = res.data.label.split('|')
          var fileUrl = res.data.fileUrl.split('/')
          this.fileList = [
            {
              name: fileUrl[fileUrl.length - 1],
              url: res.data.fileUrl
            }
          ]
        }
      })
    },
    back() {
      this.$router.push({ path: '/question' })
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            editDockerQuestion({
              answerDescription: this.ruleForm.answerDescription,
              fileType: this.ruleForm.fileType,
              fileUrl: this.ruleForm.fileUrl,
              id: this.ruleForm.id,
              label: this.ruleForm.label.join('|'),
              mainBody: this.ruleForm.mainBody,
              questionId: this.ruleForm.questionId,
              title: this.ruleForm.title,
              type: this.ruleForm.type
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$router.push({ path: '/question' })
              } else {
                this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
          } else {
            addDockerQuestion({
              answerDescription: this.ruleForm.answerDescription,
              createAt: new Date(),
              createById: getCookie('usrId'),
              fileType: this.ruleForm.fileType,
              fileUrl: this.ruleForm.fileUrl,
              id: 0,
              label: this.ruleForm.label.join('|'),
              mainBody: this.ruleForm.mainBody,
              questionId: '',
              title: this.ruleForm.title,
              type: this.ruleForm.type
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.$router.push({ path: '/question' })
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
</style>
