<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="300px">
        <el-card class="box-card" style="height: 99%;">
          <div slot="header" class="clearfix">
            <span>权限角色</span>
            <!-- <div class="right-part">
              <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">新增</el-button>
            </div> -->
          </div>
          <div style="margin: -0.2rem;">
            <el-table :data="roleInfoList" :show-header="false" highlight-current-row tooltip-effect="dark" @row-click="rowClick">
              <el-table-column prop="roleName" align="left" label="角色名称" />
              <!-- <el-table-column align="right" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.questionId)">编辑</el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </el-card>
      </el-aside>
      <el-main style="padding: 0 0 0 0.2rem;">
        <div style="height: 100%;">
          <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix">
              <span>菜单权限管理</span>
              <div class="right-part">
                <el-button size="small" type="primary" icon="iconfont icon-add" @click="addNew">编辑</el-button>
              </div>
            </div>
            <div class="user-child-list">
              <!-- <el-table ref="authorizationListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="roleInfoList" class="list-table" tooltip-effect="dark" current-row-key="id">
                <el-table-column prop="description" align="center" label="标题" />
                <el-table-column prop="mainBody" align="center" label="文本描述" />
                <el-table-column label="答案描述" align="center" prop="answerDescription" show-overflow-tooltip />
                <el-table-column label="分类" align="center" prop="type" show-overflow-tooltip />
                <el-table-column fixed="right" align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.questionId)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table> -->
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
    <!-- <modify v-model="show" :add-sign="addSign" :main-id="mainId" @getList="getAuthorizationList" /> -->
  </div>
</template>
<script>
import { getRoleInfoList } from '@/api/role'
import { parseTime } from '@/utils/index'
import { getPermissionList } from '@/api/permission'
import modify from './modify'
export default {
  components: { modify },
  data() {
    return {
      show: false,
      addSign: false,
      mainId: '',
      roleInfoList: [],
      permissionList: [],
      roleId: ''
    }
  },
  mounted() {
    this.getRoleInfoList()
    this.getPermissionList()
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    addNew() {
      this.show = true
      this.addSign = true
      this.mainId = ''
    },
    handleSubAccountEdit(id) {
      this.show = true
      this.mainId = id
      this.addSign = false
    },
    rowClick(row, column, event) {
      console.log(row, column, event)
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
