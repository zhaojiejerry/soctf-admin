<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公告列表</span>
          <div class="right-part">
            <el-button v-if="buttons.indexOf('42')!=-1" size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-form ref="ruleForm" inline>
            <el-form-item label="公告类型" prop="userType">
              <el-select v-model="type" clearable @change="handleCurrentChange(1)">
                <el-option label="系统公告" value="1" />
                <el-option label="赛事公告" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="赛事" prop="gameId">
              <el-select v-model="gameId" clearable @change="handleCurrentChange(1)">
                <el-option v-for="(item,index) in gameList" :key="index" :label="item.gameName" :value="item.gameId">
                  {{ item.gameName }}
                  <span style="float: right;">{{ gameStatus[item.gameStatus-1] }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="title" align="center" label="标题" />
            <!-- <el-table-column prop="body" align="center" label="内容">
              <template slot-scope="{row}">
                <div v-html="row.body" />
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="公告类型">
              <template slot-scope="scope">
                {{ scope.row.type=='1' ? '系统公告':'赛事公告' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否显示" width="100">
              <template slot-scope="scope">
                <el-switch :value="scope.row.enable" :width="50" :active-value="1" :inactive-value="0" disabled />
              </template>
            </el-table-column>
            <el-table-column prop="createAt" align="center" label="创建时间" />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="buttons.indexOf('41')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row.id)">编辑</el-button>
                <el-button v-if="buttons.indexOf('43')!=-1" size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <modify v-model="show" :add-sign="addSign" :main-id="mainId" :game-list="gameList" @getList="getNoticeListForAdmin" />
  </div>
</template>
<script>
import { getNoticeListForAdmin, delNoticeById } from '@/api/notice'
import { parseTime } from '@/utils/index'
import modify from './modify'
import { getGameInfoListForPage } from '@/api/match';
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
			type: '',
			gameList: [],
			gameId: '',
			gameStatus: ['未开始', '进行中', '已结束']
    }
	},
	computed: {
    buttons() {
      return this.$store.state.buttons
    }
  },
  mounted() {
    this.getNoticeListForAdmin()
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
    addNew() {
      this.show = true
      this.addSign = true
      this.mainId = ''
    },
    parseTime(time) {
      return parseTime(time)
    },
    handleEdit(id) {
      this.show = true
      this.mainId = id
      this.addSign = false
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delNoticeById({
            id: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getNoticeListForAdmin()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
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
    getNoticeListForAdmin() {
      getNoticeListForAdmin({
        gameId: this.gameId,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        type: this.type
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data.records
          this.tableTotal = res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getNoticeListForAdmin()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getNoticeListForAdmin()
    }
  }
}
</script>
<style  scoped>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
