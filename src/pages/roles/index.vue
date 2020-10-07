<template>
  <div style="height: 100%;">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>角色管理</span>
        <div class="right-part">
          <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
          <el-button size="small" type="primary" @click="authorization">权限管理</el-button>
        </div>
      </div>
      <div class="user-child-list">
        <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="roleInfoList" class="list-table" tooltip-effect="dark" current-row-key="id">
          <el-table-column prop="roleCode" align="center" label="角色编码" />
          <el-table-column prop="roleName" align="center" label="角色名称" />
          <el-table-column prop="icon" align="center" label="图标">
            <template slot-scope="{row}">
              <span :class="row.icon" />
            </template>
          </el-table-column>
          <el-table-column label="等级" align="center" prop="roleLevel" show-overflow-tooltip />
          <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click.native.prevent="deleteRole(scope.row)">删除</el-button>
              <el-button size="small" type="text" @click.native.prevent="deleteRole(scope.row)">关联权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <modify v-model="show" :add-sign="addSign" :rule-form="ruleForm" @getList="getRoleInfoList" />
    <el-dialog :visible.sync="showAuthorization" :show-close="false" title="权限管理">
      <el-button size="small" style="float: right;margin-bottom: 10px;" type="primary" icon="iconfont icon-add" @click="addauth">新增</el-button>
      <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="authorizationList" class="list-table" tooltip-effect="dark" current-row-key="id">
        <el-table-column prop="authCode" align="center" label="权限编码" />
        <el-table-column prop="authName" align="center" label="权限名称" />
        <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
        <el-table-column label="备注" align="center" prop="remark" show-overflow-tooltip />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAuthorization=false">关闭</el-button>
      </div>
    </el-dialog>
    <addAuthorization v-model="showAdd" :rule-form="addForm" />
  </div>
</template>
<script>
import { getAuthorizationList, getRoleInfoList, deleteRole } from '@/api/role'
import { parseTime } from '@/utils/index'
import modify from './modify'
import addAuthorization from './addAuthorization'
import { copyObj } from '@/utils/index'
export default {
  components: { modify, addAuthorization },
  data() {
    return {
      show: false,
      addSign: false,
      ruleForm: {},
      addForm: {},
      showAuthorization: false,
      showAdd: false,
      authorizationList: [],
      roleInfoList: []
    }
  },
  mounted() {
    this.getRoleInfoList()
    this.getAuthorizationList()
  },
  methods: {
    authorization() {
      this.showAuthorization = true
    },
    parseTime(time) {
      return parseTime(time)
    },
    addauth() {
      this.showAdd = true
      this.addForm = {
        authCode: '',
        authId: '',
        authName: '',
        createAt: '',
        createBy: '',
        description: '',
        remark: ''
      }
    },
    addNew() {
      this.show = true
      this.addSign = true
      this.ruleForm = {
        createBy: '',
        createTime: '',
        description: '',
        icon: '',
        orgId: '',
        roleCode: '',
        roleId: '',
        roleLevel: '',
        roleName: '',
        updateBy: '',
        updateTime: ''
      }
    },
    handleSubAccountEdit(row) {
      this.show = true
      this.ruleForm = copyObj(row)
      this.addSign = false
    },
    deleteRole(id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRole({
            roleId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getRoleInfoList()
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
    getRoleInfoList() {
      getRoleInfoList().then((res) => {
        if (res.success) {
          this.roleInfoList = res.data
        }
      })
    },
    getAuthorizationList() {
      getAuthorizationList().then((res) => {
        if (res.success) {
          this.authorizationList = res.data
        }
      })
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
