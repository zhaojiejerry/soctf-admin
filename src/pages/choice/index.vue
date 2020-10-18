<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选择题管理</span>
          <div class="right-part">
            <el-button v-if="buttons.indexOf('13')!=-1" size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
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
            <el-table-column label="答题时间/分" align="center" prop="choiceTime" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="buttons.indexOf('15')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row.choiceId)">编辑</el-button>
                <el-button v-if="buttons.indexOf('14')!=-1" size="small" type="text" @click="handleDelete(scope.row.choiceId)">删除</el-button>
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
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getChoiceListForAdmin" />
  </div>
</template>
<script>
import { getChoiceListForAdmin, deleteChoiceQuestion } from '@/api/choice';
import { parseTime } from '@/utils/index';
import modify from './modify';
export default {
  components: { modify },
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      choiceType: ['单选', '多选']
    };
  },
  computed: {
    buttons() {
      return this.$store.state.buttons;
    }
  },
  mounted() {
    this.getChoiceListForAdmin();
  },
  methods: {
    addNew() {
      this.show = true;
      this.addSign = true;
      this.mainId = '';
    },
    parseTime(time) {
      return parseTime(time);
    },
    handleEdit(id) {
      this.show = true;
      this.mainId = id;
      this.addSign = false;
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteChoiceQuestion({
            choiceId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.currentPage = 1;
              this.getChoiceListForAdmin();
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
    getChoiceListForAdmin() {
      getChoiceListForAdmin({
        currentPage: this.currentPage,
        extraParam: {},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data;
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
<style  scoped>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
