<template>
  <div>
    <el-form ref="extraParam" inline>
      <el-form-item label="名称" prop="questionName">
        <el-input v-model="extraParam.questionName" clearable placeholder="请输入题目名称" />
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
    <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark" @select="select" @select-all="selectAll">
      <el-table-column type="selection" :selectable="checkSelectable" align="center" width="55" />
      <el-table-column prop="name" align="center" label="题目名称" show-overflow-tooltip />
      <el-table-column prop="choiceDescription" align="center" label="文本描述" show-overflow-tooltip />
      <el-table-column label="题型" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ choiceType[scope.row.choiceType-1] }}
        </template>
      </el-table-column>
      <el-table-column label="难易程度" align="center" width="100">
        <template slot-scope="scope">
          <el-rate :value="parseInt(scope.row.difficultyLevel)" :max="3" disabled />
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center" prop="category" show-overflow-tooltip />
      <el-table-column label="分值" align="center" prop="choiceScore" show-overflow-tooltip />
      <el-table-column label="金币" align="center" prop="goldCoin" show-overflow-tooltip />
      <el-table-column label="答题时间/秒" align="center" prop="choiceTime" show-overflow-tooltip />
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getChoiceListForAdmin } from '@/api/choice';
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gameId: {
      type: String,
      default: ''
    },
    questionList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    subject: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      choiceType: ['单选', '多选'],
      questions: [],
      extraParam: {
        questionName: '',
        category: '',
        difficultyLevel: ''
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.clearAll();
    });
    this.getChoiceListForAdmin();
  },
  methods: {
    checkSelectable(row) {
      var item = this.questionList.find((i) => {
        return i.id == row.bankId;
      });
      return item == undefined;
    },
    clearAll() {
      this.$refs.multipleTable.clearSelection();
      this.questions = [];
    },
    select(selection, row) {
      console.log(selection, row);
      if (!selection.includes(row)) {
        const index = this.questions.findIndex((item) => {
          return item.bankId === row.bankId;
        });
        this.questions.splice(index, 1);
      } else {
        this.questions.push(row);
      }
    },
    selectAll(selection) {
      if (selection.length > 0) {
        this.tableList.forEach((v) => {
          const index = this.questions.findIndex((i) => {
            return i.bankId === v.bankId;
          });
          if (index === -1) {
            this.questions.push(v);
          }
        });
      } else {
        this.questions.forEach((item, index) => {
          this.tableList.forEach((ms) => {
            if (item.bankId == ms.bankId) {
              this.questions = this.questions.filter(
                (item) => item.bankId != ms.bankId
              );
            }
          });
        });
      }
    },
    getChoiceListForAdmin() {
      getChoiceListForAdmin({
        currentPage: this.currentPage,
        extraParam: {},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data;
          this.questions.forEach((a) => {
            this.tableList.forEach((b) => {
              if (a.bankId === b.bankId) {
                this.$refs.multipleTable.toggleRowSelection(b, true);
              }
            });
          });
          this.tableTotal = res.count;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getChoiceListForAdmin();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getChoiceListForAdmin();
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
</style>
