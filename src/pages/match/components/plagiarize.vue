<template>
  <div>
    <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="cheatList" class="list-table" tooltip-effect="dark">
      <el-table-column v-if="gameType==2" prop="team_name" align="center" label="团队名" />
      <el-table-column v-if="gameType==1" prop="username" align="center" label="用户名" />
      <el-table-column prop="name" align="center" label="题目名" />
      <el-table-column prop="score" align="center" label="提交时间">
        <template slot-scope="{row}">
          {{ parseTime(row.answer_time) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否正确">
        <template slot-scope="{row}">
          <el-switch :value="row.result>0" :width="50" :active-value="true" :inactive-value="false" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="result" align="center" label="分值" />
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getCheat } from '@/api/match';
import { parseTime } from '@/utils/index';
export default {
  data() {
    return {
      gameId: '',
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      cheatList: [],
      gameType: 1
    };
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        if (val.name == 'operationsGame') {
          this.gameId = this.$route.query.gameId;
          this.gameType = this.$route.query.gameType;
          this.getCheat();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.gameId = this.$route.query.gameId;
    this.gameType = this.$route.query.gameType;
    this.getCheat();
  },
  methods: {
    parseTime(time) {
      return parseTime(time);
    },
    getCheat() {
      var that = this;
      getCheat({
        currentPage: this.cheatPage,
        extraParam: {
          gameId: this.gameId
        },
        pageSize: this.cheatSize
      }).then((res) => {
        // console.log(res);
        that.cheatList = res.data;
        that.tableTotal = res.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCheat();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCheat();
    }
  }
};
</script>