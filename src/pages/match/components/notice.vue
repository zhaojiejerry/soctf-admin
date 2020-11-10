<template>
  <div>
    <div style="margin-bottom: 10px;text-align: right;">
      <el-button v-if="gameStatus!=3" type="primary" size="medium" @click="addNew">新增</el-button>
    </div>
    <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
      <el-table-column prop="title" align="center" label="标题" />
      <el-table-column prop="body" align="center" label="内容">
        <template slot-scope="{row}">
          <div v-html="row.body" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="公告类型">
        <template slot-scope="scope">
          {{ scope.row.type=='1' ? '系统公告':'赛事公告' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否显示" width="100">
        <template slot-scope="scope">
          <el-switch :value="scope.row.enable" :disabled="gameStatus!=3" :width="50" :active-value="1" :inactive-value="0" @change="changeEnable(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="createAt" align="center" label="创建时间" />
      <el-table-column v-if="gameStatus!=3" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click.native.prevent="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="text" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager-container mt30">
      <el-pagination :current-page.sync="page" :page-size="size" :total="total" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="sizeChange" @current-change="currentChange">
        <el-button size="small" plain class="pagination-button">确定</el-button>
      </el-pagination>
    </div>
    <modify v-model="show" :game-id="gameId" show :add-sign="addSign" :main-id="mainId" :game-list="gameList" @getList="getNoticeListForAdmin" />
  </div>
</template>
<script>
import { getNoticeListForAdmin, delNoticeById, updNotice } from '@/api/notice';
import { getGameInfoListForPage } from '@/api/match';
import { parseTime } from '@/utils/index';
import modify from '@/pages/notices/modify';
export default {
  components: {
    modify
  },
  props: {
    gameStatus: {
      type: String,
      default: '1'
    },
    activeName: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      tableList: [],
      page: 1,
      size: 10,
      total: 0,
      gameId: '',
      show: false,
      addSign: false,
      mainId: '',
      gameList: []
    };
  },
  watch: {
    // $route: {
    //   handler(val, oldVal) {
    //     if (val.name == 'operationsGame') {
    //       this.gameId = this.$route.query.gameId;
    //       this.getNoticeListForAdmin();
    //       this.getGameInfoListForPage();
    //     }
    //   },
    //   deep: true
    // },
    activeName(val) {
      if (val == '4') {
        this.gameId = this.$route.query.gameId;
        this.getNoticeListForAdmin();
        this.getGameInfoListForPage();
      }
    }
  },
  mounted() {
    if (this.activeName == '4') {
      this.gameId = this.$route.query.gameId;
      this.getNoticeListForAdmin();
      this.getGameInfoListForPage();
    }
  },
  methods: {
    changeEnable(row) {
      console.log(row);
      updNotice({
        enable: row.enable == 0 ? 1 : 0,
        gameId: row.gameId,
        id: row.id
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.getNoticeListForAdmin();
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          });
        }
      });
    },
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
          delNoticeById({
            id: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.page = 1;
              this.getNoticeListForAdmin();
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
    getNoticeListForAdmin() {
      getNoticeListForAdmin({
        gameId: this.gameId,
        pageNo: this.page,
        pageSize: this.size,
        type: '5'
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    sizeChange(val) {
      this.size = val;
      this.getNoticeListForAdmin();
    },
    currentChange(val) {
      this.page = val;
      this.getNoticeListForAdmin();
    }
  }
};
</script>