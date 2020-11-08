<template>
  <div>
    <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="rankingList" class="list-table" tooltip-effect="dark">
      <el-table-column align="center" label="排行">
        <template slot-scope="scope">
          <div class="order">
            <span>{{ (scope.$index+1)+(currentPage-1)*pageSize }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" :label="gameType==1?'战队名':'用户名'">
        <template slot-scope="{row}">
          <span>{{ gameType==1?row.userName:row.team_name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="answer" align="center" label="解题数" />
      <el-table-column prop="score" align="center" label="总分" />
      <el-table-column v-for="(item ,index) in handList" :key="index" align="center" :label="item.name">
        <el-table-column v-for="(i,j) in item.children" :key="j" align="center" :label="i.titleNumber.toString()">
          <template slot-scope="{row}">
            <div class="order">
              <img v-if="row.details[i.titleNumber-1] == 1" src="@/assets/images/medal1.png" alt="">
              <img v-else-if="row.details[i.titleNumber-1] == 2" src="@/assets/images/medal2.png" alt="">
              <img v-else-if="row.details[i.titleNumber-1] == 3" src="@/assets/images/medal3.png" alt="">
              <span v-else-if="row.details[i.titleNumber-1] != 'N'" class="el-icon-check" style="font-size: 25px;color: #2a842a;" />
              <span v-else>{{ row.details[i.titleNumber-1] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getRankingListForPage, getRankingListForTop } from '@/api/match';
export default {
  data() {
    return {
      questionType: ['容器题', '附件题', '选择题'],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      gameId: '',
      handList: [],
      rankingList: [],
      gameType: 1
    };
  },
  mounted() {
    this.gameId = this.$route.query.gameId;
    this.gameType = this.$route.query.gameType;
    this.getRankingListForTop();
    this.getRankingListForPage();
  },
  methods: {
    getRankingListForTop() {
      var that = this;
      getRankingListForTop({
        gameId: this.gameId
      }).then((res) => {
        var list = [];
        for (let index = 0; index < this.questionType.length; index++) {
          var item = {
            name: this.questionType[index],
            children: []
          };
          res.data.forEach((element) => {
            if (index + 1 == element.questionType) {
              item.children.push(element);
            }
          });
          list.push(item);
        }
        that.handList = list;
        console.log(list);
      });
    },
    getRankingListForPage() {
      var that = this;
      getRankingListForPage({
        currentPage: this.currentPage,
        extraParam: {
          enable: 1,
          gameId: this.gameId
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