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
          <el-form-item label="赛事状态" prop="gameStatus">
            <el-select v-model="extraParam.gameStatus" clearable placeholder="请选择赛事状态">
              <el-option v-for="(item, index) in gameStatus" :key="index" :label="item" :value="index+1" />
            </el-select>
          </el-form-item>
          <el-form-item label="比赛类型" prop="gameType">
            <el-select v-model="extraParam.gameType" clearable placeholder="请选择比赛类型">
              <el-option label="个人" value="1" />
              <el-option label="团队" value="2" />
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
            <el-table-column fixed="right" align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button v-if="scope.row.gameStatus!=3&&buttons.indexOf('33')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row.gameId)">编辑</el-button>
                <el-button size="small" type="text" @click="seeDetail(scope.row)">查看详情</el-button>
                <el-dropdown style="margin-left: 10px;">
                  <el-button size="small" type="text">更多操作 <i class="el-icon-arrow-down el-icon--right" /></el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('32')!=-1" size="small" type="text" @click="deleteGame(scope.row.gameId)">删除</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('61')!=-1" size="small" type="text" @click="handleCreatePaper(scope.row.gameId)">生成试卷</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('36')!=-1" size="small" type="text" @click="startGame(scope.row.gameId)">发布比赛</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('74')!=-1" size="small" type="text" @click="sendGameToken(scope.row.gameId)">发送通知</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==2&&buttons.indexOf('60')!=-1" size="small" type="text" @click="endGame(scope.row.gameId)">结束比赛</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==2&&buttons.indexOf('30')!=-1" size="small" type="text" @click="seeLive(scope.row.gameId)">观看比赛</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==2&&buttons.indexOf('38')!=-1" size="small" type="text" @click="operationsGame(scope.row)">运维管理</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==1&&buttons.indexOf('40')!=-1" size="small" type="text" @click="seeDescription(scope.row.gameId)">比赛说明</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <!-- <el-button v-if="scope.row.gameStatus==3&&buttons.indexOf('37')!=-1" size="small" type="text" @click="releaseScore(scope.row.gameId)">发布成绩</el-button> -->
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="scope.row.gameStatus==3&&buttons.indexOf('34')!=-1" size="small" type="text" @click="seeScore(scope.row)">比赛成绩</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="buttons.indexOf('72')!=-1" size="small" type="text" @click="seePaper(scope.row.gameId)">比赛试题</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
    <createPaper v-model="dialogTableVisible" :game-id="gameId" />
    <description v-model="showDescription" :game-id="gameId" />
    <achievement v-model="showAchievement" :type="type" :game-id="gameId" />
    <live v-model="showLive" :type="type" :game-id="gameId" />
    <DevOps v-model="showOperations" :type="type" :game-id="gameId" :game-statu="gameStatu" />
    <!-- <operations v-model="showOperations" :type="type" :game-id="gameId" /> -->
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getGameInfoListForPage" />
    <paperInfo v-model="showPaperInfo" :game-id="gameId" />
    <matchDetail v-model="showDetail" :game-id="gameId" :game-statu="gameStatu" />
  </div>
</template>
<script>
import {
  getGameInfoListForPage,
  deleteGame,
  endGame,
  startGame,
  rankingInDB,
  sendGameToken
} from '@/api/match';
import createPaper from './createPaper';
import { parseTime } from '@/utils/index';
import modify from './modify';
import description from './description';
import achievement from './achievement';
// import operations from './operations';
import paperInfo from './paperInfo';
import live from './live';
import matchDetail from './detail';
import DevOps from './DevOps';
export default {
  components: {
    createPaper,
    modify,
    description,
    achievement,
    live,
    // operations,
    paperInfo,
    matchDetail,
    DevOps
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
      showDescription: false,
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
    seeLive(id) {
      this.showLive = true;
      this.gameId = id;
    },
    handleCreatePaper(id) {
      this.dialogTableVisible = true;
      this.gameId = id;
    },
    seeDescription(id) {
      this.showDescription = true;
      this.gameId = id;
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
    releaseScore(id) {
      this.$confirm('是否要发布成绩?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rankingInDB({
            gameId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '成绩发布成功'
              });
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
            message: '已取消发布成绩'
          });
        });
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
    endGame(id) {
      this.$confirm('此操作将结束改比赛, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          endGame({
            gameId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '比赛已结束'
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
            message: '已取消结束比赛'
          });
        });
    },
    startGame(id) {
      this.$confirm('是否要发布比赛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          startGame({
            gameId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '比赛发布成功'
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
            message: '已取消发布'
          });
        });
    },
    sendGameToken(id) {
      this.$confirm('是否要发送赛事密钥短信通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sendGameToken({
            gameId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '发送赛事密钥短信成功'
              });
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
            message: '已取消发送'
          });
        });
    },
    getGameInfoListForPage() {
      getGameInfoListForPage({
        currentPage: this.currentPage,
        extraParam: this.extraParam,
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

