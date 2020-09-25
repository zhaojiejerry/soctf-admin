<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail" style="">
      <wx-header show-back>
        <span slot="headerTitle">文件题编辑</span>
      </wx-header>
    </div>
    <div class="macthtable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="题目名称" prop="name">
          <el-input v-model="ruleForm.name" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答案" prop="flag">
          <el-input v-model="ruleForm.flag" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="ruleForm.category" class="itemwidth" placeholder="请选择类别">
            <el-option v-for="(item,index) in subject" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="难易程度" prop="difficultyLevel">
          <div class="itemwidth" style="padding-top: 10px;">
            <el-rate v-model="ruleForm.difficultyLevel" />
          </div>
        </el-form-item>
        <el-form-item label="金币" prop="goldCoin">
          <el-input v-model.number="ruleForm.goldCoin" :min="0" class="itemwidth" />
        </el-form-item>
        <el-form-item label="分值" prop="value">
          <el-input v-model.number="ruleForm.value" :min="0" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答题时间/秒" prop="time">
          <el-input v-model.number="ruleForm.time" :min="0" class="itemwidth" />
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="ruleForm.url" class="itemwidth" />
        </el-form-item>
        <el-form-item label="描述" prop="questionDescribe">
          <el-input v-model="ruleForm.questionDescribe" type="textarea" class="itemwidth" />
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
  editFileQuestion,
  addFileQuestion,
  getFileQuestionById
} from '@/api/file'
import { getjson } from '@/api/common'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      ruleForm: {
        category: '',
        difficultyLevel: 0,
        enable: 0,
        flag: '',
        goldCoin: 0,
        id: '',
        name: '',
        questionDescribe: '',
        questionType: 0,
        time: 0,
        url: '',
        value: 0
      },
      rules: {
        name: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        flag: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        category: [{ required: true, message: '请选择类别', trigger: 'change' }]
      },
      subject: []
    }
  },
  mounted() {
    this.getjson()
    if (this.$route.query.id) {
      this.getFileQuestionById()
    }
  },
  methods: {
    getjson() {
      getjson('ctf.json').then((res) => {
        this.subject = res.subject
      })
    },
    getFileQuestionById() {
      getFileQuestionById({
        id: this.$route.query.id
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
          this.ruleForm.difficultyLevel = parseInt(res.data.difficultyLevel)
        }
      })
    },
    back() {
      this.$router.push({ path: '/file' })
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            editFileQuestion({
              category: this.ruleForm.category,
              difficultyLevel: this.ruleForm.difficultyLevel,
              enable: this.ruleForm.enable,
              flag: this.ruleForm.flag,
              goldCoin: this.ruleForm.goldCoin,
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              questionDescribe: this.ruleForm.questionDescribe,
              questionType: 2,
              time: this.ruleForm.time,
              url: this.ruleForm.url,
              value: this.ruleForm.value
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$router.push({ path: '/file' })
              } else {
                this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
          } else {
            addFileQuestion({
              category: this.ruleForm.category,
              difficultyLevel: this.ruleForm.difficultyLevel,
              enable: 1,
              flag: this.ruleForm.flag,
              goldCoin: this.ruleForm.goldCoin,
              id: new Date().getTime(),
              name: this.ruleForm.name,
              questionDescribe: this.ruleForm.questionDescribe,
              questionType: 2,
              time: this.ruleForm.time,
              url: this.ruleForm.url,
              value: this.ruleForm.value
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.$router.push({ path: '/file' })
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
