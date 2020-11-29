<template>
  <div>
    <div v-if="gameStatus==3" style="float: right;margin-bottom: 15px;">
      <el-button type="primary" size="small" icon="el-icon-download" :loading="loading" @click="exportRankingList">导出</el-button>
    </div>
    <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="rankingList" class="list-table" tooltip-effect="dark">
      <el-table-column align="center" label="排行">
        <template slot-scope="scope">
          <div class="order">
            <span>{{ (scope.$index+1)+(currentPage-1)*pageSize }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" :label="gameType==1?'用户名':'战队名'">
        <template slot-scope="{row}">
          <span>{{ gameType==1?row.userName:row.team_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="answer" align="center" label="解题数" />
      <el-table-column prop="first" align="center" label="一血数量" />
      <el-table-column prop="difference" align="center" label="与前一名分差" />
      <el-table-column prop="score" align="center" label="总分" />
      <template v-for="(item ,index) in handList">
        <el-table-column :key="index" align="center" :label="item[0].category">
          <el-table-column v-for="(i,j) in item" :key="j" align="center" width="100" :label="i.name" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="order">
                <div v-if="item[0].id=='123456'">
                  {{ row.details[0]!='N'?row.details[0]:'' }}
                </div>
                <div v-else>
                  <img v-if="row.details[getIndex(i.id)] == 1" src="@/assets/images/medal1.png" alt="">
                  <img v-else-if="row.details[getIndex(i.id)] == 2" src="@/assets/images/medal2.png" alt="">
                  <img v-else-if="row.details[getIndex(i.id)] == 3" src="@/assets/images/medal3.png" alt="">
                  <span v-else-if="row.details[getIndex(i.id)] != 'N'" class="el-icon-check" style="font-size: 25px;color: #2a842a;" />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getRankingListForPage,
  getRankingListForTop,
  exportRankingList
} from '@/api/match';
import { parseTime } from '@/utils/index';
var fileDownload = require('js-file-download');
export default {
  props: {
    activeName: {
      type: String,
      default: '1'
    },
    name: {
      type: String,
      default: ''
    },
    gameStatus: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      questionType: ['容器题', '附件题', '选择题'],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      gameId: '',
      handList: [],
      rankingList: [],
      gameType: 1,
      questionIds: '',
      questionId: [],
      loading: false
    };
  },
  watch: {
    activeName(val) {
      if (val == '5') {
        this.gameId = this.$route.query.gameId;
        this.gameType = this.$route.query.gameType;
        this.getRankingListForTop();
      }
    }
  },
  mounted() {
    if (this.activeName == '5') {
      this.gameId = this.$route.query.gameId;
      this.gameType = this.$route.query.gameType;
      this.getRankingListForTop();
    }
  },
  methods: {
    exportRankingList() {
      this.loading = true;
      exportRankingList({
        gameId: this.gameId
      }).then((res) => {
        this.loading = false;
        console.log(res);
        fileDownload(
          res,
          this.name +
            '成绩表' +
            '-' +
            parseTime(new Date(), '{y}-{m}-{d}') +
            '.xlsx'
        );
      });
    },
    getIndex(id) {
      return this.questionId.indexOf(id);
    },
    getRankingListForTop() {
      var that = this;
      getRankingListForTop({
        gameId: this.gameId
      }).then((res) => {
        if (res.success) {
          var list = res.data;
          this.questionIds = res.message;
          this.questionId = JSON.parse(res.message);
          that.getRankingListForPage();
          that.handList = list;
        }
      });
    },
    getRankingListForPage() {
      var that = this;
      getRankingListForPage({
        currentPage: this.currentPage,
        extraParam: {
          enable: 1,
          gameId: this.gameId,
          questionIds: this.questionIds
        },
        pageSize: this.pageSize
      }).then((res) => {
        that.rankingList = res.data;
        this.tableTotal = res.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRankingListForPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRankingListForPage();
    }
  }
};
</script>