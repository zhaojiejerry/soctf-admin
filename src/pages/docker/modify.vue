<template>
  <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
      <el-form-item label="题目名称" prop="name">
        <el-input v-model="ruleForm.name" class="itemwidth" />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="ruleForm.category" class="itemwidth" placeholder="请选择类别">
          <el-option v-for="(item,index) in subject" :key="index" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="访问方式" prop="frpType">
        <el-select v-model="ruleForm.frpType" class="itemwidth" placeholder="请选择访问方式">
          <el-option :value="1" label="DIRECT为ip直接访问" />
          <el-option :value="2" label="HTTP为域名访问" />
        </el-select>
      </el-form-item>
      <el-form-item label="难易程度" prop="difficultyLevel">
        <div class="itemwidth" style="padding-top: 10px;">
          <el-rate v-model="ruleForm.difficultyLevel" :max="3" />
        </div>
      </el-form-item>
      <el-form-item label="金币" prop="goldCoin">
        <el-input v-model.number="ruleForm.goldCoin" :min="0" class="itemwidth" />
      </el-form-item>
      <el-form-item label="分值" prop="value">
        <el-input v-model.number="ruleForm.value" :min="0" class="itemwidth" />
      </el-form-item>
      <el-form-item label="答题时间/分" prop="time">
        <el-input v-model.number="ruleForm.time" :min="0" class="itemwidth" />
      </el-form-item>
      <el-form-item label="描述" prop="questionDescribe">
        <el-input v-model="ruleForm.questionDescribe" type="textarea" class="itemwidth" />
      </el-form-item>
      <el-form-item label="容器目录" prop="dirName">
        <!-- <el-upload :on-success="handleUrl" :file-list="fileList" class="upload-demo" action="/baseApi/oss" @on-remove="handleRemove1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传md/pdf文件</div>
        </el-upload> -->
        <el-input v-model="ruleForm.dirName" class="itemwidth" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="ruleForm.label" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
          <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
        </el-select>
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
  editDockerQuestion,
  addDockerQuestion,
  getDockerQuestionById
} from '@/api/docker';
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
        challengeType: '',
        deploymentType: '',
        difficultyLevel: 0,
        dirName: '',
        enable: 0,
        frpType: 1,
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
      rules: {
				name: [{ required: true, message: '请输入题目名称', trigger: 'blur' }],
        dirName: [{ required: true, message: '请输入容器目录', trigger: 'blur' }],
        flag: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        category: [{ required: true, message: '请选择类别', trigger: 'change' }]
      },
      fileList: [],
      subject: []
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getDockerQuestionById();
        } else {
          this.ruleForm = {
            category: '',
            challengeType: '',
            deploymentType: '',
            difficultyLevel: 0,
            dirName: '',
            enable: 0,
            frpType: 1,
            goldCoin: 0,
            id: '',
            label: '',
            name: '',
            questionDescribe: '',
            questionType: 0,
            time: 0,
            value: 0
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
    handleUrl(response, file, fileList) {
      console.log(response, file, fileList);
      if (response.success) {
        this.fileList = [{ name: file.name, url: response.message }];
        this.ruleForm.dirName = response.message;
      } else {
        this.fileList = [];
        this.ruleForm.dirName = '';
        this.$message.error(response.message);
      }
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
      this.fileList = [];
      this.ruleForm.dirName = '';
    },
    getDockerQuestionById() {
      getDockerQuestionById({
        id: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data;
          this.ruleForm.difficultyLevel = parseInt(res.data.difficultyLevel);
          this.ruleForm.label = res.data.label == '' ? [] : this.getLabel(res.data.label);
          this.label = this.ruleForm.label;
          var dirName = res.data.url.split('/');
          this.fileList =
            res.data.dirName == ''
              ? []
              : [
                  {
                    name: dirName[dirName.length - 1],
                    url: res.data.dirName
                  }
                ];
        }
      });
    },
    getLabel(label) {
      return label.split('|');
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      // if (this.fileList.length == 0) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请上传容器附件'
      //   });
      //   return;
      // }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            editDockerQuestion({
              category: this.ruleForm.category,
              challengeType: this.ruleForm.challengeType,
              deploymentType: this.ruleForm.deploymentType,
              difficultyLevel: this.ruleForm.difficultyLevel,
              dirName: this.ruleForm.dirName,
              enable: this.ruleForm.enable,
              frpType: this.ruleForm.frpType,
              goldCoin: this.ruleForm.goldCoin,
              id: this.ruleForm.id,
              label: this.ruleForm.label.join('|'),
              name: this.ruleForm.name,
              questionDescribe: this.ruleForm.questionDescribe,
              questionType: 1,
              time: this.ruleForm.time,
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
            addDockerQuestion({
              category: this.ruleForm.category,
              challengeType: this.ruleForm.challengeType,
              deploymentType: this.ruleForm.deploymentType,
              difficultyLevel: this.ruleForm.difficultyLevel,
              dirName: this.ruleForm.dirName,
              enable: 1,
              frpType: this.ruleForm.frpType,
              goldCoin: this.ruleForm.goldCoin,
              id: '',
              label: this.ruleForm.label.join('|'),
              name: this.ruleForm.name,
              questionDescribe: this.ruleForm.questionDescribe,
              questionType: 1,
              time: this.ruleForm.time,
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
