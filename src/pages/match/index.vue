<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail">
      <wx-header show-back>
        <span slot="headerTitle">比赛管理</span>
      </wx-header>
      <div class="macthtable">
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id">
            <el-table-column prop="gameName" align="center" label="赛事名称" />
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
                {{ parseTime(scope.row.startTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="endTime" align="center" label="结束时间">
              <template slot-scope="scope">
                {{ parseTime(scope.row.endTime) }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.id)">编辑</el-button>
                <el-button v-if="scope.row.gameStatus==1" size="small" type="text" @click="handleDeviceDelete()">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30]" :total="subAccountTotal" background size="small" layout="prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wxHeader from '@/components/header/index'
import { getGameInfoListForPage, deleteGame } from '@/api/match'
import { parseTime } from '@/utils/index'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      subAccountList: [],
      subAccountTotal: 0,
      pageSize: 10,
      currentPage: 1,
      fileType: ['WP', '比赛资料', '其他'],
      gameStatus: ['未开始', '进行中', '已结束'],
      gameType: ['个人', '团队']
    }
  },
  mounted() {
    this.getGameInfoListForPage()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    handleSubAccountEdit() {},
    handleDeviceDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
              })
              this.currentPage = 1
              this.getWriteUpForPage()
            } else {
              this.$message({
                type: 'warning',
                message: '删除失败'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getGameInfoListForPage() {
      getGameInfoListForPage({
        currentPage: this.currentPage,
        extraParam: {},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.subAccountList = res.data
          this.subAccountTotal = res.count
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getGameInfoListForPage()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getGameInfoListForPage()
    },
    handleSubAccountStatusStatus(val) {
      this.subAccountStatus = val
      this.currentPage = 1
      this.getGameInfoListForPage()
    }
  }
}
</script>
<style  scoped>
.macthtable {
  margin: 0.8rem 0.2rem 0.2rem;
  background: white;
  padding-bottom: 0.2rem;
  height: calc(100vh - 120px);
  overflow: auto;
}
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>

