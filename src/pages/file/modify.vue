<template>
  <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
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
          <el-rate v-model="ruleForm.difficultyLevel" :max="3" />
        </div>
      </el-form-item>
      <el-form-item label="金币" prop="goldCoin">
        <el-input v-model.number="ruleForm.goldCoin" :min="1" class="itemwidth" />
      </el-form-item>
      <el-form-item label="分值" prop="value">
        <el-input v-model.number="ruleForm.value" :min="2" class="itemwidth" />
      </el-form-item>
      <el-form-item label="答题时间/分" prop="time">
        <el-input v-model.number="ruleForm.time" :min="1" class="itemwidth" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="ruleForm.label" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
          <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="附件地址" prop="url">
        <el-upload :on-success="handleUrl" :file-list="fileList" class="upload-demo" action="/baseApi/oss" @on-remove="handleRemove1">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div v-if="ruleForm.url" class="itemwidth" style="line-height: 25px;margin-top: 15px;">
          点击下载 :
          <a :download="ruleForm.url" :href="ruleForm.url" target="_blank" style="color: #B69858;cursor: pointer;">{{ ruleForm.url }}</a>
        </div>
      </el-form-item>
      <el-form-item label="描述" prop="questionDescribe">
        <el-input v-model="ruleForm.questionDescribe" type="textarea" class="itemwidth" />
      </el-form-item>
      <el-form-item label="是否可见" prop="enable">
        <el-switch v-model="ruleForm.enable" :width="50" :active-value="1" :inactive-value="0" />
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
  editFileQuestion,
  addFileQuestion,
  getFileQuestionById
} from '@/api/file';
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
        category: '',
        difficultyLevel: 0,
        enable: 1,
        flag: '',
        goldCoin: 1,
        id: '',
        label: [],
        name: '',
        questionDescribe: '',
        questionType: 0,
        time: 1,
        url: '',
        value: 1
      },
      rules: {
        name: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        flag: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        category: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        time: [
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
				value: [
				{
					required: true,
					message: '请输入分值',
					type: 'number',
					trigger: 'blur'
				}]
      },
      label: [],
      subject: [],
      fileList: []
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getFileQuestionById();
        } else {
          this.fileList = [];
          this.ruleForm = {
            category: '',
            difficultyLevel: 0,
            enable: 1,
            flag: '',
            goldCoin: 1,
            label: [],
            id: '',
            name: '',
            questionDescribe: '',
            questionType: 0,
            time: 1,
            url: '',
            value: 1
          };
        }
      }
    }
  },
  mounted() {
    this.getjson();
  },
  methods: {
    handleUrl(response, file, fileList) {
      console.log(response, file, fileList);
      if (response.success) {
        this.fileList = [{ name: response.message, url: response.message }];
        this.ruleForm.url = response.message;
      } else {
        this.fileList = [];
        this.ruleForm.url = '';
        this.$message.error(response.message);
      }
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
      this.fileList = [];
      this.ruleForm.Url = '';
    },
    getjson() {
      getjson('ctf.json').then((res) => {
        this.subject = res.subject;
      });
    },
    getFileQuestionById() {
      getFileQuestionById({
        id: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data;
          this.ruleForm.label = res.data.label ? res.data.label.split('|') : [];
          this.label = this.ruleForm.label;
          this.ruleForm.difficultyLevel = parseInt(res.data.difficultyLevel);
          if (res.data.url) {
            this.fileList = [
              {
                name: res.data.url,
                url: res.data.url
              }
            ];
          } else {
            this.fileList = [];
          }
        }
      });
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            editFileQuestion({
              category: this.ruleForm.category,
              difficultyLevel: this.ruleForm.difficultyLevel,
              enable: this.ruleForm.enable,
              flag: this.ruleForm.flag,
              goldCoin: this.ruleForm.goldCoin,
              id: this.ruleForm.id,
              label: this.ruleForm.label.join('|'),
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
            addFileQuestion({
              category: this.ruleForm.category,
              difficultyLevel: this.ruleForm.difficultyLevel,
              enable: this.ruleForm.enable,
              flag: this.ruleForm.flag,
              goldCoin: this.ruleForm.goldCoin,
              label: this.ruleForm.label.join('|'),
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
