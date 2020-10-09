<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="300px">
        <el-card class="box-card" style="height: 99%;">
          <div slot="header" class="clearfix">
            <span>权限角色</span>
          </div>
          <div style="margin: -0.2rem;">
            <el-table :data="roleInfoList" :show-header="false" highlight-current-row tooltip-effect="dark" @row-click="rowClick">
              <el-table-column prop="roleName" align="left" label="角色名称">
                <template slot-scope="{row}">
                  <span :class="row.icon" />{{ row.roleName }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-aside>
      <el-main style="padding: 0 0 0 0.2rem;">
        <div style="height: 100%;">
          <el-card class="box-card" style="height: 99%;">
            <div slot="header" class="clearfix">
              <span>菜单权限管理</span>
              <div class="right-part">
                <el-button :disabled="roleId==''" size="small" type="primary" @click="linkRoleMenu">保存</el-button>
              </div>
            </div>
            <div style="height: calc( 100vh - 190px );overflow: hidden;">
              <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
                <el-tree ref="tree" :props="props" :data="permissionTree" default-expand-all node-key="id" check-strictly show-checkbox @check-change="handleCheckChange" />
              </el-scrollbar>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getRoleInfoList } from '@/api/role'
import {
  getPermissionList,
  linkRoleMenu,
  getPermissionTree
} from '@/api/permission'
export default {
  components: {},
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      roleInfoList: [],
      permissionList: [],
      roleId: '',
      permissionTree: [],
      props: {
        label: 'title'
      }
    }
  },
  mounted() {
    this.getRoleInfoList()
    this.getPermissionTree()
  },
  methods: {
    linkRoleMenu() {
      var menuIds = []
      var nodes = this.$refs.tree.getCheckedNodes()
      nodes.forEach((element) => {
        menuIds.push(element.id)
      })
      linkRoleMenu({
        menuIds: menuIds,
        roleId: this.roleId
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
          this.getPermissionList()
        }
      })
    },
    rowClick(row, column, event) {
      this.roleId = row.roleId
      this.getPermissionList()
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    getRoleInfoList() {
      getRoleInfoList().then((res) => {
        if (res.success) {
          this.roleInfoList = res.data
        }
      })
    },
    getPermissionList() {
      getPermissionList({
        roleId: this.roleId
      }).then((res) => {
        if (res.success) {
          this.permissionList = res.data
          var permissionList = []
          this.$refs.tree.setCheckedKeys([])
          this.permissionList.forEach((element) => {
            permissionList.push(element.permId)
          })
          console.log(permissionList)
          this.$refs.tree.setCheckedKeys(permissionList)
        }
      })
    },
    getPermissionTree() {
      getPermissionTree({
        roleId: ''
      }).then((res) => {
        if (res.success) {
          this.permissionTree = res.data
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
