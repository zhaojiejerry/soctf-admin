<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail" style="">
      <wx-header show-back>
        <span slot="headerTitle">选择题编辑</span>
      </wx-header>
    </div>
    <div class="macthtable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="题目名称" prop="name">
          <el-input v-model="ruleForm.name" class="itemwidth" />
        </el-form-item>
        <el-form-item label="选择题类型" prop="choiceType">
          <el-select v-model="ruleForm.choiceType" class="itemwidth" placeholder="请选择题类型">
            <el-option label="单选" value="1" />
            <el-option label="多选" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="选项">
          <div v-for="(item,index) in ruleForm.optionVos" :key="index">
            <el-input v-model="item.optionDescription" class="itemwidth" />
            <span v-if="index==0" class="el-icon-circle-plus-outline" style="font-size: 25px;vertical-align: middle;" @click="plus" />
            <span v-else class="el-icon-remove-outline" style="font-size: 25px;vertical-align: middle;" @click="remove(index)" />
          </div>
        </el-form-item>
        <el-form-item label="正确答案" prop="correctAnswer">
          <el-select v-model="ruleForm.correctAnswer" :multiple="ruleForm.choiceType==2" class="itemwidth" placeholder="请选择标签">
            <el-option v-for="(item,index) in ruleForm.optionVos" :key="index" :label="item.optionDescription" :value="item.optionCode" />
          </el-select>
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
        <el-form-item label="分值" prop="choiceScore">
          <el-input v-model.number="ruleForm.choiceScore" :min="0" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答题时间/秒" prop="choiceTime">
          <el-input v-model.number="ruleForm.choiceTime" :min="0" class="itemwidth" />
        </el-form-item>
        <el-form-item label="描述" prop="choiceDescription">
          <el-input v-model="ruleForm.choiceDescription" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" class="itemwidth" />
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
  modifyChoiceQuestion,
  addChoiceQuestion,
  getOneChoiceQuestion
} from '@/api/choice'
import { getjson } from '@/api/common'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      ruleForm: {
        bankId: '',
        category: '',
        choiceDescription: '',
        choiceId: '',
        choiceScore: 0,
        choiceTime: 0,
        choiceType: '',
        correctAnswer: '',
        difficultyLevel: 0,
        goldCoin: 0,
        name: '',
        optionArray: '',
        optionVos: [
          {
            optionCode: String.fromCharCode(64 + 1),
            optionDescription: ''
          }
        ],
        remark: '',
        solved: false
      },
      label: [],
      rules: {
        name: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        choiceType: [
          { required: true, message: '请选择选择题类型', trigger: 'change' }
        ],
        correctAnswer: [
          { required: true, message: '请选择答案', trigger: 'change' }
        ],
        category: [{ required: true, message: '请选择类别', trigger: 'change' }]
      },
      fileList: [],
      subject: []
    }
  },
  mounted() {
    this.getjson()
    if (this.$route.query.id) {
      this.getOneChoiceQuestion()
    }
  },
  methods: {
    getjson() {
      getjson('ctf.json').then((res) => {
        this.subject = res.subject
      })
    },
    plus() {
      this.ruleForm.optionVos.push({
        optionCode: String.fromCharCode(
          64 + this.ruleForm.optionVos.length + 1
        ),
        optionDescription: ''
      })
      console.log(this.ruleForm.optionVos)
    },
    remove(index) {
      this.ruleForm.optionVos.splice(index, 1)
    },
    getOneChoiceQuestion() {
      getOneChoiceQuestion({
        choiceId: this.$route.query.id
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
          this.ruleForm.difficultyLevel = parseInt(res.data.difficultyLevel)
        }
      })
    },
    back() {
      this.$router.push({ path: '/choice' })
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            modifyChoiceQuestion({
              bankId: this.ruleForm.bankId,
              category: this.ruleForm.category,
              choiceDescription: this.ruleForm.choiceDescription,
              choiceId: this.ruleForm.choiceId,
              choiceScore: this.ruleForm.choiceScore,
              choiceTime: this.ruleForm.choiceTime,
              choiceType: this.ruleForm.choiceType,
              correctAnswer:
                this.ruleForm.choiceType == 2
                  ? this.ruleForm.correctAnswer.join(',')
                  : this.ruleForm.correctAnswer,
              difficultyLevel: this.ruleForm.difficultyLevel,
              goldCoin: this.ruleForm.goldCoin,
              name: this.ruleForm.name,
              optionArray: this.ruleForm.optionArray,
              optionVos: this.ruleForm.optionVos,
              remark: this.ruleForm.remark,
              solved: this.ruleForm.solved
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$router.push({ path: '/choice' })
              } else {
                this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
          } else {
            addChoiceQuestion({
              bankId: '',
              category: this.ruleForm.category,
              choiceDescription: this.ruleForm.choiceDescription,
              choiceId: '',
              choiceScore: this.ruleForm.choiceScore,
              choiceTime: this.ruleForm.choiceTime,
              choiceType: this.ruleForm.choiceType,
              correctAnswer:
                this.ruleForm.choiceType == 2
                  ? this.ruleForm.correctAnswer.join(',')
                  : this.ruleForm.correctAnswer,
              difficultyLevel: this.ruleForm.difficultyLevel,
              goldCoin: this.ruleForm.goldCoin,
              name: this.ruleForm.name,
              optionArray: this.ruleForm.optionArray,
              optionVos: this.ruleForm.optionVos,
              remark: this.ruleForm.remark,
              solved: false
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.$router.push({ path: '/choice' })
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
