<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>比赛管理</span>
          <div class="right-part">
            <el-button v-if="buttons.indexOf('31')!=-1" size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <el-form ref="ruleForm" inline>
          <el-form-item label="赛事名称" prop="gameName">
            <el-input v-model="extraParam.gameName" clearable placeholder="请输入赛事名称" />
          </el-form-item>
          <el-form-item label="赛事状态" prop="gameStatus">
            <el-select v-model="extraParam.gameStatus" clearable placeholder="请选择赛事状态" @change="handleCurrentChange(1)">
              <el-option v-for="(item, index) in gameStatus" :key="index" :label="item" :value="index+1" />
            </el-select>
          </el-form-item>
          <el-form-item label="比赛类型" prop="gameType">
            <el-select v-model="extraParam.gameType" clearable placeholder="请选择比赛类型" @change="handleCurrentChange(1)">
              <el-option label="个人" :value="1" />
              <el-option label="团队" :value="2" />
            </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
        </el-form>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="gameName" align="center" label="赛事名称" show-overflow-tooltip />
            <el-table-column prop="gameText" align="center" show-overflow-tooltip label="比赛详细描述" />
            <el-table-column prop="gameStatus" align="center" label="赛事状态">
              <template slot-scope="scope">
                {{ gameStatus[scope.row.gameStatus-1] }}
              </template>
            </el-table-column>
            <el-table-column label="比赛类型" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ gameType[scope.row.gameType-1] }}
              </template>
            </el-table-column>
            <el-table-column prop="startTime" align="center" label="开始时间">
              <template slot-scope="scope">
                {{ scope.row.startTime?parseTime(scope.row.startTime):'' }}
              </template>
            </el-table-column>
            <el-table-column prop="endTime" align="center" label="结束时间">
              <template slot-scope="scope">
                {{ scope.row.endTime?parseTime(scope.row.endTime):'' }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="left" label="操作" width="200">
              <template slot-scope="scope">
                <el-button v-if="scope.row.gameStatus!=3&&buttons.indexOf('33')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row.gameId)">编辑</el-button>
                <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('32')!=-1" size="small" type="text" @click="deleteGame(scope.row.gameId)">删除</el-button>
                <!-- <el-button v-if="scope.row.gameStatus==3" size="small" type="text" @click="seeDetail(scope.row)">查看详情</el-button> -->
                <el-button v-if="buttons.indexOf('38')!=-1" size="small" type="text" @click="seeOperations(scope.row)">运维管理</el-button>
                <el-button v-if="scope.row.gameStatus==2&&buttons.indexOf('30')!=-1" size="small" type="text" @click="seeLive(scope.row)">观看比赛</el-button>
                <!-- <el-button v-if="scope.row.gameStatus==3&&buttons.indexOf('34')!=-1" size="small" type="text" @click="seeScore(scope.row)">比赛成绩</el-button> -->
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
    <achievement v-model="showAchievement" :type="type" :game-id="gameId" />
    <live v-model="showLive" :type="type" :game-id="gameId" />
    <!-- <DevOps v-model="showOperations" :type="type" :game-id="gameId" :game-statu="gameStatu" /> -->
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getGameInfoListForPage" />
    <!-- <paperInfo v-model="showPaperInfo" :game-id="gameId" /> -->
    <matchDetail v-model="showDetail" :game-id="gameId" :game-statu="gameStatu" />
  </div>
</template>
<script>
import { getGameInfoListForPage, deleteGame } from '@/api/match';
import { parseTime } from '@/utils/index';
import modify from './modify';
import achievement from './dialog/achievement';
// import paperInfo from './paperInfo';
import live from './dialog/live';
import matchDetail from './dialog/detail';
// import DevOps from './DevOps';
export default {
  components: {
    modify,
    // description,
    achievement,
    live,
    // operations,
    // paperInfo,
    matchDetail
    // DevOps
  },
  data() {
    return {
      showDetail: false,
      show: false,
      addSign: false,
      mainId: '',
      dialogTableVisible: false,
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      gameId: '',
      gameStatus: ['未开始', '进行中', '已结束'],
      gameType: ['个人', '团队'],
      extraParam: {},
      showAchievement: false,
      type: '1',
      showLive: false,
      showOperations: false,
      showPaperInfo: false,
      gameStatu: '1'
    };
  },
  computed: {
    buttons() {
      return this.$store.state.buttons;
    }
  },
  mounted() {
    this.getGameInfoListForPage();
  },
  methods: {
    seeOperations(item) {
      // console.log(item);
      this.$router.push({
        path: '/operationsGame',
        query: {
          gameId: item.gameId,
          gameType: item.gameType
        }
      });
    },
    parseTime(time) {
      return parseTime(time);
    },
    seeDetail(row) {
      this.showDetail = true;
      this.gameId = row.gameId;
      this.gameStatu = row.gameStatus;
    },
    seePaper(id) {
      this.showPaperInfo = true;
      this.gameId = id;
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
    seeLive(row) {
      this.showLive = true;
      this.gameId = row.gameId;
      this.type = row.gameType;
    },
    seeScore(row) {
      this.showAchievement = true;
      this.gameId = row.gameId;
      this.type = row.gameType;
    },
    operationsGame(row) {
      this.showOperations = true;
      this.gameId = row.gameId;
      this.type = row.gameType;
      this.gameStatu = row.gameStatus;
    },
    deleteGame(id) {
      this.$confirm('此操作将永久删除该比赛, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteGame({
            gameId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.currentPage = 1;
              this.getGameInfoListForPage();
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
    getGameInfoListForPage() {
      var extraParam = {};
      for (var key in this.extraParam) {
        if (this.extraParam[key] != '') {
          extraParam[key] = this.extraParam[key];
        }
      }
      getGameInfoListForPage({
        currentPage: this.currentPage,
        extraParam: extraParam,
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
      this.getGameInfoListForPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGameInfoListForPage();
    },
    handleSubAccountStatusStatus(val) {
      this.subAccountStatus = val;
      this.currentPage = 1;
      this.getGameInfoListForPage();
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

