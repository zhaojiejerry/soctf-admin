<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户管理</span>
          <div class="right-part">
            <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id">
            <el-table-column prop="username" align="center" label="用户名" />
            <el-table-column label="昵称" align="center" prop="realName" show-overflow-tooltip />
            <el-table-column prop="createAt" align="center" label="性别">
              <template slot-scope="scope">
                {{ scope.row.gender==1?'男':'女' }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" align="center" label="手机号" />
            <el-table-column label="地区" align="center" prop="area" show-overflow-tooltip />
            <el-table-column label="个人简介" align="center" prop="remark" show-overflow-tooltip />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="handleDeviceDelete(scope.row.usrId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="subAccountTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <modify v-model="show" :add-sign="addSign" :rule-form="ruleForm" @getList="getUserInfoList" />
  </div>
</template>
<script>
import { getUserInfoList, deleteUser } from '@/api/user'
import { parseTime } from '@/utils/index'
import modify from './modify'
export default {
  components: { modify },
  data() {
    return {
      ruleForm: {},
      show: false,
      addSign: false,
      mainId: '',
      subAccountList: [],
      subAccountTotal: 0,
      pageSize: 10,
      currentPage: 1,
      fileType: ['WP', '比赛资料', '其他']
    }
  },
  mounted() {
    this.getUserInfoList()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    addNew() {
      this.show = true
      this.addSign = true
      this.ruleForm = {
        address: '',
        area: '',
        company: '',
        email: '',
        gameId: '',
        gender: 1,
        goldCoin: 0,
        idcardNo: '',
        idcardTyp: '',
        joinGame: true,
        password: '',
        phone: '',
        portrait: '',
        realName: '',
        remark: '',
        roleIds: [],
        school: '',
        score: 0,
        signature: '',
        specialRoleId: 0,
        teamId: '',
        teamOwner: true,
        userTyp: '',
        username: '',
        usrBranch: '',
        usrId: '',
        usrOrganization: '',
        usrStatus: '',
        usrSuper: ''
      }
    },
    handleSubAccountEdit(row) {
      this.show = true
      this.ruleForm = row
      this.addSign = false
    },
    handleDeviceDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser({
            usrId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.currentPage = 1
              this.getUserInfoList()
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
    getUserInfoList() {
      getUserInfoList({
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
      this.getUserInfoList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserInfoList()
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
