<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>容器题管理</span>
          <div class="right-part">
            <el-button v-if="buttons.indexOf('16')!=-1" size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-form ref="extraParam" inline>
            <el-form-item label="名称" prop="name">
              <el-input v-model="extraParam.name" clearable placeholder="请输入题目名称" />
            </el-form-item>
            <el-form-item label="类别" prop="category">
              <el-select v-model="extraParam.category" clearable placeholder="请选择类别">
                <el-option v-for="(item,index) in subject" :key="index" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="难易程度" prop="difficultyLevel">
              <el-select v-model="extraParam.difficultyLevel" clearable placeholder="请选择难易程度">
                <el-option label="简单" value="1" />
                <el-option label="一般" value="2" />
                <el-option label="困难" value="3" />
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
          </el-form>
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
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
            <el-table-column label="答题时间/分" align="center" prop="time" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="buttons.indexOf('18')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row.id)">编辑</el-button>
                <el-button v-if="buttons.indexOf('17')!=-1" size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                <el-button size="small" type="text" @click="answerDetail(scope.row.id)">作答详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" :subject="subject" @getList="getDockerQuestion" />
    <answerDetail v-model="showDetail" :main-id="mainId" />
  </div>
</template>
<script>
import { getDockerQuestion, delDockerQuestion } from '@/api/docker';
import { parseTime } from '@/utils/index';
import modify from './modify';
import answerDetail from './answerDetail';
export default {
  components: { modify, answerDetail },
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      questionType: ['容器', '附件', '选择'],
      showDetail: false,
      extraParam: {
        name: '',
        category: '',
        difficultyLevel: ''
      },
       subject: window.ctfjson.subject
    };
  },
  computed: {
    buttons() {
      return this.$store.state.buttons;
    }
  },
  mounted() {
    this.getDockerQuestion();
  },
  methods: {
    answerDetail(id) {
      this.showDetail = true;
      this.mainId = id;
    },
    addNew() {
      this.show = true;
      this.addSign = true;
      this.mainId = '';
    },
    handleEdit(id) {
      this.show = true;
      this.mainId = id;
      this.addSign = false;
    },
    parseTime(time) {
      return parseTime(time);
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delDockerQuestion({
            id: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.currentPage = 1;
              this.getDockerQuestion();
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    getDockerQuestion() {
      getDockerQuestion({
        category: this.extraParam.category,
        difficultyLevel: this.extraParam.difficultyLevel,
        labs: '',
        name: this.extraParam.name,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        userId: ''
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data.records;
          this.tableTotal = res.data.total;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDockerQuestion();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDockerQuestion();
    }
  }
};
</script>
<style  scoped>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
