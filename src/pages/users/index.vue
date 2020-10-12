<template>
  <div style="background-color: #edeef2;">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户管理</span>
          <div class="right-part">
            <el-button v-if="buttons.indexOf('22')!=-1" size="small" type="primary" icon="el-icon-plus" @click="addNew">新增</el-button>
          </div>
        </div>
        <div class="user-child-list">
          <el-form ref="ruleForm" inline>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="extraParam.username" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="公司" prop="company">
              <el-input v-model="extraParam.company" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="用户类型" prop="userType">
              <el-select v-model="extraParam.userType" clearable>
                <el-option label="用户端" value="1" />
                <el-option label="管理端" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="学校" prop="school">
              <el-input v-model="extraParam.school" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="用户状态" prop="usrStatus">
              <el-select v-model="extraParam.usrStatus" clearable>
                <el-option label="正常" value="1" />
                <el-option label="不可用" value="2" />
              </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">查询</el-button>
          </el-form>
          <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
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
                <el-button v-if="buttons.indexOf('24')!=-1" size="small" type="text" @click.native.prevent="handleEdit(scope.row)">编辑</el-button>
                <el-button v-if="buttons.indexOf('23')!=-1" size="small" type="text" @click="handleDelete(scope.row.usrId)">删除</el-button>
                <el-button v-if="buttons.indexOf('70')!=-1" size="small" type="text" @click="handleRole(scope.row)">关联角色</el-button>
                <el-button v-if="buttons.indexOf('71')!=-1" size="small" type="text" @click="handleDetails(scope.row)">用户详情</el-button>
                <el-button v-if="buttons.indexOf('26')!=-1" size="small" type="text" @click="handleReward(scope.row)">奖励</el-button>
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
    <modify v-model="show" :add-sign="addSign" :rule-form="ruleForm" @getList="getUserInfoList" />
    <el-dialog :visible.sync="showRoleInfo" :show-close="false" title="关联角色">
      <el-table ref="multipleTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="roleInfoList" class="list-table" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column prop="roleCode" align="center" label="角色编码" />
        <el-table-column prop="roleName" align="center" label="角色名称" />
        <el-table-column label="等级" align="center" prop="roleLevel" show-overflow-tooltip />
        <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="showRoleInfo=false">关闭</el-button>
      </div>
    </el-dialog>
    <detailsPage v-model="showDetails" :rule-form="ruleForm" @getUserInfoList="getUserInfoList" />
    <el-dialog :visible.sync="showReward" width="30%" :show-close="false" title="奖励">
      <el-form :model="reward" label-width="100px">
        <el-form-item label="积分" prop="score">
          <el-input-number v-model="reward.score" :min="0" />
        </el-form-item>
        <el-form-item label="金币" prop="goldCoin">
          <el-input-number v-model="reward.goldCoin" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addScoreToUser">确定</el-button>
        <el-button @click="showReward=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserInfoList, deleteUser, linkUserRole, addScoreToUser } from '@/api/user'
import { getRoleInfoList } from '@/api/role'
import { parseTime } from '@/utils/index'
import modify from './modify'
import { copyObj } from '@/utils/index'
import detailsPage from './details'
export default {
  components: { modify, detailsPage },
  data() {
    return {
      ruleForm: {},
      show: false,
      addSign: false,
      mainId: '',
      tableList: [],
      tableTotal: 0,
      pageSize: 10,
      currentPage: 1,
      roleInfoList: [],
      showRoleInfo: false,
      usrId: '',
			multipleSelection: [],
			showDetails: false,
			extraParam: {},
			showReward: false,
			reward: {
				'goldCoin': 0,
				'score': 0
			}
    }
	},
	computed: {
    buttons() {
      return this.$store.state.buttons
    }
  },
  mounted() {
    this.getUserInfoList()
		this.getRoleInfoList()
  },
  methods: {
		handleReward(row) {
			this.showReward = true
			this.ruleForm = copyObj(row)
			this.reward = {
				'goldCoin': 0,
				'score': 0
			}
		},
		addScoreToUser() {
			var data = {
				'goldCoin': this.reward.goldCoin,
				'score': this.reward.score,
				'userId': this.ruleForm.usrId
			}
			addScoreToUser(data).then((res) => {
				if (res.success) {
					this.$message({
						type: 'success',
						message: '奖励成功'
					})
				} else {
					this.$message({
						type: 'warning',
						message: res.message
					})
				}
			})
		},
		handleDetails(row) {
			this.showDetails = true
      this.ruleForm = copyObj(row)
		},
    parseTime(time) {
      return parseTime(time)
    },
    getRoleInfoList() {
      getRoleInfoList().then((res) => {
        if (res.success) {
          this.roleInfoList = res.data
        }
      })
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
    handleEdit(row) {
      this.show = true
      this.ruleForm = copyObj(row)
      this.addSign = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleRole(row) {
      this.showRoleInfo = true
      this.usrId = row.usrId
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
        if (row.roleIds) {
          row.roleIds.forEach((a) => {
            this.roleInfoList.forEach((b) => {
              if (a == b.roleId) {
                this.$refs.multipleTable.toggleRowSelection(b, true)
              }
            })
          })
        }
      })
    },
    onSubmit() {
      var roleIds = []
      this.multipleSelection.forEach((element) => {
        roleIds.push(element.roleId)
      })
      linkUserRole({
        usrId: this.usrId,
        roleIds: roleIds
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '角色关联成功'
          })
          this.showRoleInfo = false
          this.getUserInfoList()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    handleDelete(id) {
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
    getUserInfoList() {
			var extraParam = {}
			for (var key in this.extraParam) {
				if (this.extraParam[key] != '') {
					extraParam[key] = this.extraParam[key]
				}
			}
      getUserInfoList({
        currentPage: this.currentPage,
        extraParam: extraParam,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data
          this.tableTotal = res.count
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
