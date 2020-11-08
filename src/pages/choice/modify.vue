<template>
  <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item label="题目名称" prop="name">
        <el-input v-model="ruleForm.name" class="itemwidth" />
      </el-form-item>
      <el-form-item label="选择题类型" prop="choiceType">
        <el-select v-model="ruleForm.choiceType" class="itemwidth" placeholder="请选择类型">
          <el-option label="单选" value="1" />
          <el-option label="多选" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="选项">
        <div v-for="(item,index) in optionVos" :key="index">
          <el-input v-model="item.optionDescription" class="itemwidth" />
          <span v-if="index==0" class="el-icon-circle-plus-outline" style="font-size: 25px;vertical-align: middle;" @click="plus" />
          <span v-else class="el-icon-remove-outline" style="font-size: 25px;vertical-align: middle;" @click="remove(index)" />
        </div>
      </el-form-item>
      <el-form-item label="正确答案" prop="correctAnswer">
        <el-select v-model="ruleForm.correctAnswer" :multiple="ruleForm.choiceType==2" class="itemwidth" placeholder="请选择标签">
          <el-option v-for="(item,index) in optionVos" :key="index" :label="item.optionDescription" :value="item.optionCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="ruleForm.category" class="itemwidth" placeholder="请选择类别">
          <el-option v-for="(item,index) in subject" :key="index" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="难易程度" prop="difficultyLevel">
        <div class="itemwidth" style="padding-top: 10px;">
          <el-rate v-model="ruleForm.difficultyLevel" :max="3" />
        </div>
      </el-form-item>
      <el-form-item label="金币" prop="goldCoin">
        <el-input v-model.number="ruleForm.goldCoin" :min="1" class="itemwidth" />
      </el-form-item>
      <el-form-item label="分值" prop="choiceScore">
        <el-input v-model.number="ruleForm.choiceScore" :min="1" class="itemwidth" />
      </el-form-item>
      <!-- <el-form-item label="答题时间/分" prop="choiceTime">
        <el-input v-model.number="ruleForm.choiceTime" :min="0" class="itemwidth" />
      </el-form-item> -->
      <el-form-item label="描述" prop="choiceDescription">
        <el-input v-model="ruleForm.choiceDescription" type="textarea" class="itemwidth" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="ruleForm.label" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
          <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" class="itemwidth" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="back">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  modifyChoiceQuestion,
  addChoiceQuestion,
  getOneChoiceQuestion
} from '@/api/choice';
import { getjson } from '@/api/common';
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
      ruleForm: {
        bankId: '',
        category: '',
        choiceDescription: '',
        choiceId: '',
        choiceScore: 1,
        choiceTime: 1,
        choiceType: '',
        correctAnswer: '',
        difficultyLevel: 0,
        goldCoin: 1,
        label: '',
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
        category: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        choiceTime: [
          {
            required: true,
            message: '请输入答题时间',
            type: 'number',
            trigger: 'blur'
          }
				],
				goldCoin: [
				{
					required: true,
					message: '请输入金币',
					type: 'number',
					trigger: 'blur'
				}],
				choiceScore: [
				{
					required: true,
					message: '请输入分值',
					type: 'number',
					trigger: 'blur'
				}]
      },
      fileList: [],
			subject: [],
			optionVos: []
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getOneChoiceQuestion();
        } else {
					this.optionVos = [
              {
                optionCode: String.fromCharCode(64 + 1),
                optionDescription: ''
              }
            ]
          this.ruleForm = {
            bankId: '',
            category: '',
            choiceDescription: '',
            choiceId: '',
            choiceScore: 1,
            choiceTime: 1,
            choiceType: '',
            correctAnswer: '',
            difficultyLevel: 0,
            goldCoin: 1,
            label: '',
						name: '',
            optionArray: '',
            remark: '',
            solved: false
          };
        }
      }
    }
  },
  mounted() {
    this.getjson();
  },
  methods: {
    getjson() {
      getjson('ctf.json').then((res) => {
        this.subject = res.subject;
      });
    },
    plus() {
      this.optionVos.push({
        optionCode: String.fromCharCode(
          64 + this.optionVos.length + 1
        ),
        optionDescription: ''
      });
      console.log(this.optionVos);
    },
    remove(index) {
      this.optionVos.splice(index, 1);
    },
    getOneChoiceQuestion() {
      getOneChoiceQuestion({
        choiceId: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data;
          this.ruleForm.label = res.data.label ? res.data.label.split('|') : [];
					this.label = this.ruleForm.label;
					var correctAnswer = JSON.parse(res.data.correctAnswer)
          this.ruleForm.correctAnswer = res.data.choiceType == 2 ? correctAnswer : correctAnswer[0];
					this.ruleForm.difficultyLevel = parseInt(res.data.difficultyLevel);
					this.optionVos = res.data.optionVos
        }
      });
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
					var correctAnswer = this.ruleForm.choiceType == 2 ? this.ruleForm.correctAnswer : [this.ruleForm.correctAnswer]
          if (!this.addSign) {
            modifyChoiceQuestion({
              bankId: this.ruleForm.bankId,
              category: this.ruleForm.category,
              choiceDescription: this.ruleForm.choiceDescription,
              choiceId: this.ruleForm.choiceId,
              choiceScore: this.ruleForm.choiceScore,
              choiceTime: this.ruleForm.choiceTime,
              choiceType: this.ruleForm.choiceType,
              correctAnswer: JSON.stringify(correctAnswer),
              difficultyLevel: this.ruleForm.difficultyLevel,
              goldCoin: this.ruleForm.goldCoin,
              label: this.ruleForm.label.join('|'),
              name: this.ruleForm.name,
              optionArray: this.ruleForm.optionArray,
              optionVos: this.optionVos,
              remark: this.ruleForm.remark,
							solved: this.ruleForm.solved
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
          } else {
            addChoiceQuestion({
              bankId: '',
              category: this.ruleForm.category,
              choiceDescription: this.ruleForm.choiceDescription,
              choiceId: '',
              choiceScore: this.ruleForm.choiceScore,
              choiceTime: this.ruleForm.choiceTime,
              choiceType: this.ruleForm.choiceType,
              correctAnswer: JSON.stringify(correctAnswer),
              difficultyLevel: this.ruleForm.difficultyLevel,
              goldCoin: this.ruleForm.goldCoin,
              label: this.ruleForm.label.join('|'),
              name: this.ruleForm.name,
              optionArray: this.ruleForm.optionArray,
              optionVos: this.optionVos,
              remark: this.ruleForm.remark,
							solved: false
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
.el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
}
.el-upload-list {
  width: 400px;
}
</style>
