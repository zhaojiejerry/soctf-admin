<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
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
        <el-form-item v-if="ruleForm.fileType==1" label="关联题目">
          <div class="itemwidth el-input" @click="dialogTableVisible=true">
            <div class="el-input__inner">
              {{ question }}
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="ruleForm.fileType==2" label="赛事" prop="gameId">
          <el-select v-model="ruleForm.gameId" class="itemwidth" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in gameList" :key="index" :label="item.gameName" :value="item.gameId">
              {{ item.gameName }}
              <span style="float: right;">{{ gameStatus[item.gameStatus-1] }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档描述" prop="mainBody">
          <el-input v-model="ruleForm.mainBody" type="textarea" class="itemwidth" />
        </el-form-item>
        <!-- <el-form-item label="答案描述" prop="answerDescription">
          <el-input v-model="ruleForm.answerDescription" class="itemwidth" />
        </el-form-item> -->
        <el-form-item label="标签" prop="label">
          <el-select v-model="ruleForm.label" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
            <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="type">
          <el-input v-model="ruleForm.type" class="itemwidth" />
        </el-form-item>
        <el-form-item label="答案/文档OSS路径">
          <el-upload ref="upload" :on-success="handleSuccess" :file-list="fileList" class="upload-demo" action="/baseApi/oss" @on-remove="handleRemove">
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
    <el-dialog :visible.sync="dialogTableVisible" :show-close="false" width="70%" title="关联题目">
      <el-form inline>
        <el-form-item label="名称">
          <el-input v-model="name" clearable />
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="category" placeholder="请选择类别" clearable>
            <el-option v-for="(item,index) in subject" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
      </el-form>
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subList" highlight-current-row class="list-table" tooltip-effect="dark" @row-click="rowClick">
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
        <el-table-column label="答题时间/秒" align="center" prop="time" show-overflow-tooltip />
      </el-table>
      <div class="pager-container mt30">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="subTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          <el-button size="small" plain class="pagination-button">确定</el-button>
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isOK">确 定</el-button>
        <el-button @click="dialogTableVisible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCookie } from '@/utils/auth';
import { modifyWriteUp, addWriteUp, getAllQuestion } from '@/api/question';
import { getGameInfoListForPage } from '@/api/match';
import { parseTime } from '@/utils/index';
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
    ruleForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      question: '',
      label: [],
      rules: {
        title: [
          { required: true, message: '请输入答案/文档标题', trigger: 'blur' }
        ],
        fileType: [
          { required: true, message: '请选择文档类型', trigger: 'change' }
        ]
      },
      fileList: [],
      subList: [],
      subTotal: 0,
      pageSize: 10,
      currentPage: 1,
      questionRow: [],
      questionType: ['容器', '附件', '选择'],
      name: '',
      category: '',
      subject: [],
      gameList: [],
      gameStatus: ['未开始', '进行中', '已结束']
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.label = this.ruleForm.label;
        if (!this.addSign) {
          this.question = this.ruleForm.questionName;
          console.log(this.question);
          if (this.ruleForm.fileUrl) {
            this.fileList = [
              {
                name: this.ruleForm.fileUrl,
                url: this.ruleForm.fileUrl
              }
            ];
          } else {
            this.fileList = [];
          }
          console.log(this.label);
        } else {
          this.question = '';
          this.fileList = [];
        }
      }
    }
  },
  mounted() {
    this.getAllQuestion();
    this.getjson();
    this.getGameInfoListForPage();
  },
  methods: {
    getGameInfoListForPage() {
      getGameInfoListForPage({
        currentPage: 0,
        extraParam: {},
        pageSize: 0
      }).then((res) => {
        if (res.success) {
          this.gameList = res.data;
        }
      });
    },
    getjson() {
      getjson('/home/ctf.json').then((res) => {
        this.subject = res.subject;
      });
    },
    parseTime(time) {
      return parseTime(time);
    },
    rowClick(row) {
      console.log(row);
      this.questionRow = [row];
    },
    getAllQuestion() {
      getAllQuestion({
        pageSize: this.pageSize,
        category: this.category,
        difficultyLevel: '',
        labs: '',
        name: this.name,
        pageNo: this.currentPage,
        userId: ''
      }).then((res) => {
        if (res.success) {
          this.subList = res.data.records;
          this.subTotal = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllQuestion();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllQuestion();
    },
    handleSuccess(response, file, fileList) {
      if (response.success) {
        this.fileList = [{ name: response.message, url: response.message }];
        this.ruleForm.fileUrl = response.message;
      } else {
        this.fileList = [];
        this.ruleForm.fileUrl = '';
        this.$message.error(response.message);
      }
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.ruleForm.fileUrl = '';
    },
    back() {
      this.$emit('input', false);
    },
    isOK() {
      if (this.questionRow.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择关联题目'
        });
        return;
      }
      this.question = this.questionRow[0].name;
      this.ruleForm.questionId = this.questionRow[0].id;
      this.dialogTableVisible = false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            modifyWriteUp({
              answerDescription: this.ruleForm.answerDescription,
              fileType: this.ruleForm.fileType,
              fileUrl: this.ruleForm.fileUrl,
              id: this.ruleForm.id,
              label: this.ruleForm.label.join('|'),
              mainBody: this.ruleForm.mainBody,
              questionId:
                this.ruleForm.fileType == 1 ? this.ruleForm.questionId : '',
              title: this.ruleForm.title,
              type: this.ruleForm.type,
              gameId: this.ruleForm.gameId
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
            addWriteUp({
              answerDescription: this.ruleForm.answerDescription,
              createAt: new Date(),
              createById: getCookie('usrId'),
              fileType: this.ruleForm.fileType,
              fileUrl: this.ruleForm.fileUrl,
              id: 0,
              label: this.ruleForm.label.join('|'),
              mainBody: this.ruleForm.mainBody,
              questionId:
                this.ruleForm.fileType == 1 ? this.ruleForm.questionId : '',
              title: this.ruleForm.title,
              type: this.ruleForm.type,
              gameId: this.ruleForm.gameId
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
.el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
}
.el-upload-list {
  width: 400px;
}
</style>
