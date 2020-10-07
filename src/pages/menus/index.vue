<template>
  <div style="height: 100%;">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>菜单管理</span>
        <div class="right-part">
          <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
        </div>
      </div>
      <div class="user-child-list">
        <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark" current-row-key="id">
          <el-table-column prop="permCode" align="center" label="权限编码" />
          <el-table-column prop="permName" align="center" label="权限名称" />
          <el-table-column prop="name" align="center" label="菜单名称" />
          <el-table-column prop="redirectUrl" align="center" label="路径" />
          <el-table-column prop="icon" align="center" label="图标">
            <template slot-scope="{row}">
              <span :class="row.icon" />
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="{row}">
              {{ row.permType==1?'菜单':'按钮' }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click.native.prevent="deletePermission(scope.row.permId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <modify v-model="show" :add-sign="addSign" :table-list="tableList" :rule-form="ruleForm" @getList="getPermissionList" />
  </div>
</template>
<script>
import { getPermissionList, deletePermission } from '@/api/permission'
import { parseTime } from '@/utils/index'
import modify from './modify'
import { copyObj } from '@/utils/index'
export default {
  components: { modify },
  data() {
    return {
      show: false,
      addSign: false,
      ruleForm: {},
      tableList: []
    }
  },
  mounted() {
    this.getPermissionList()
  },
  methods: {
    addNew() {
      this.show = true
      this.addSign = true
      this.ruleForm = {
        activeMenu: '',
        component: '',
        createTime: '',
        icon: '',
        name: '',
        parentId: '',
        path: '',
        permCode: '',
        permId: '',
        permName: '',
        permType: '',
        redirectUrl: '',
        sortOrder: 0
      }
    },
    handleSubAccountEdit(row) {
      this.show = true
      this.ruleForm = copyObj(row)
      this.addSign = false
    },
    deletePermission(id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePermission({
            permissionId: id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getPermissionList()
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
    getPermissionList() {
      getPermissionList().then((res) => {
        if (res.success) {
          this.tableList = res.data
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
