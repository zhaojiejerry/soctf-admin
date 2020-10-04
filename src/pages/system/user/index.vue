<template>
  <div class="hb-user-list">
    <wx-header>
      <span slot="headerTitle">用户管理</span>
      <span slot="headerOther" class="second-font">(共<em class="main-color">{{ userTotal }}</em>个用户)</span>
      <div slot="headerRight" class="flex">
        <el-input :maxlength="20" v-model="userFilterText" size="small" clearable class="reset-input header-search" placeholder="请输入账号/单位名称搜索" @clear="handleSearch" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="iconfont icon-search" @click="handleSearch" />
        </el-input>
        <i class="split-line" />
        <el-button size="small" class="header-search-more" icon="iconfont icon-more" disabled />
      </div>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="space-between">
          <div class="left-part">
            <hb-user-tree :value="userFilterId" class="mr15" holder="请选择单位名称" @getValue="handleUserFilterId" />
            <hb-user-area :value="userFilterCode" class="mr15" @getValue="handleUserFilterCode" />
            <el-select v-model="userStatus" size="small" class="mr15 reset-input tag-status" multiple placeholder="请选择账号状态" @change="handleUserStatus">
              <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
          <div class="right-part">
            <el-button v-if="btnPermissions.indexOf('100000106') != -1" size="small" type="primary" icon="iconfont icon-add" @click="handleUserEdit(null)">新建用户</el-button>
          </div>
        </div>
        <el-table ref="listTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="userList" class="list-table user-table" tooltip-effect="dark" current-row-key="id" height="100%">
          <el-table-column prop="status" align="right" width="90" label="">
            <template slot-scope="scope">
              <el-switch :disabled="btnPermissions.indexOf('100000104') == -1" v-model="scope.row.status" :active-value="1" :inactive-value="0" class="status-switch" active-text="开" inactive-text="关" @change="handleChangeStatus(scope.row.id, scope.row.status)" />
            </template>
          </el-table-column>
          <el-table-column prop="username" width="110" label="账号">
            <template slot-scope="scope">
              <div class="account-item">
                <el-button :disabled="btnPermissions.indexOf('100000101') == -1" type="text" @click.native.prevent="handleUserDetail(scope.row.id)">{{ scope.row.username }}</el-button>
                <img v-show="scope.row.subNum" :title="scope.row.subNum + '个子账号'" src="./images/subCountNum.png" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orgName" label="单位名称" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.orgName ? scope.row.orgName : '-' }}
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop=""
            label="所属上级"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column width="120" label="用户类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.type">-</span>
              {{ userTypeList[scope.row.type - 1] }}
            </template>
          </el-table-column>
          <el-table-column width="120" label="用户角色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.roleList || scope.row.roleList.length == 0">-</span>
              <span v-else> {{ scope.row.roleList[0].roleName }} </span>
            </template>
          </el-table-column>
          <el-table-column label="所在区域" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!scope.row.provinceName && !scope.row.cityName && !scope.row.areaName">-</span>
              <span v-else>{{ scope.row.provinceName }}{{ scope.row.cityName ? `/${scope.row.cityName}` : '' }}{{ scope.row.areaName ? `/${scope.row.areaName}` : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column width="185" label="联系电话" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.phone ? scope.row.phone : '-' }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="185">
            <template slot-scope="scope">
              <el-button v-if="btnPermissions.indexOf('100000102') != -1" size="small" type="text" @click.native.prevent="handleUserEdit(scope.row.id)">编辑</el-button>
              <!-- <span v-if="btnPermissions.indexOf('100000103') != -1 && btnPermissions.indexOf('100000102') != -1" style="color: #409eff;font-size: 0.14rem;">|</span> -->
              <el-button v-if="btnPermissions.indexOf('100000103') != -1" size="small" type="text" @click.native.prevent="handleShowResetPassword(scope.row.id)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30">
          <el-pagination :current-page.sync="currentPage" :page-size="10" :page-sizes="[10, 20, 30]" :total="userTotal" background size="small" layout="prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showResetPassword" title="重置密码" width="428px" @closed="$refs.resetPasswordForm.resetFields()">
      <el-form ref="resetPasswordForm" :model="resetPasswordForm" class="reset-password">
        <el-form-item id="loginStateTwo" :rules="[
            {required:true, validator: validatePassword, trigger: 'change' }
          ]" class="UserEditPassword" label="新密码：" prop="resetPassword">
          <el-input :maxlength="16" v-model="resetPasswordForm.resetPassword" size="small" show-password placeholder="请输入新密码" @blur="loginblurT" @focus="changeFocus" />
          <div v-if="loginFocusStateT" class="el-form-item__tips">8-16位数字、字母、符号的组合，且至少使用其中两种</div>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" type="primary" @click="handleResetPassword">确 定</el-button>
        <el-button size="small" @click="showResetPassword = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import hbUserTree from '@/components/userTree/index'
import hbUserArea from '@/components/userArea/index'
import {
  userPageList,
  userToggleStatus,
  userResetPassword
} from '@/api/user.js'

export default {
  name: 'User',
  components: {
    hbUserTree,
    hbUserArea
  },
  data() {
    return {
      loginFocusStateT: false,
      resetPasswordId: '',
      resetPasswordForm: {
        resetPassword: ''
      },
      showResetPassword: false,
      userTotal: 0,
      userFilterText: '',
      userFilterId: null, // 用户ID
      userFilterCode: null, // 用户所在区域
      userStatus: [1], // 用户账号状态
      statusOptions: [
        {
          id: 0,
          name: '禁用'
        },
        {
          id: 1,
          name: '启用'
        }
      ],
      userList: [],
      currentPage: 1,
      pageSize: 10,
      messageObj: null,
      userTypeList: ['公司', '代理商', '医院', '驾校']
    }
  },
  computed: {
    ...mapGetters(['btnPermissions'])
  },
  watch: {
    showResetPassword() {
      this.resetPasswordForm.resetPassword = ''
    }
  },
  created() {},
  mounted() {
    this.handleSearch()
  },
  methods: {
    validatePassword(rule, value, callback) {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)/
      this.loginFocusStateT = false
      if ((value.length > 16 || value.length < 8) && reg.test(value)) {
        callback(new Error('长度8-16位'))
      } else if (value.length <= 16 && value.length >= 8 && !reg.test(value)) {
        callback(new Error('数字、字母、符号的组合，且至少使用其中两种'))
      } else if ((value.length > 16 || value.length < 8) && !reg.test(value)) {
        if (!reg.test(value)) {
          callback(
            new Error('8-16位数字、字母、符号的组合，且至少使用其中两种')
          )
        }
      } else {
        callback()
      }
    },
    loginblurT() {
      this.loginFocusStateT = false
    },
    changeFocus() {
      const state = document.getElementById('loginStateTwo')
      const stateClass = state.getElementsByClassName('el-form-item__error')[0]
      if (!stateClass) {
        this.loginFocusStateT = true
      }
    },
    handleSearch() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('.view-container')
      })
      userPageList({
        search: this.userFilterText,
        userId: this.userFilterId || '',
        serviceAreaId: this.userFilterCode || '',
        status: this.userStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.userList = res.list
            this.userTotal = parseInt(res.totalCount)
            this.$nextTick(() => {
              this.$refs.listTable.bodyWrapper.scrollTop = 0
            })
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleUserFilterId(id) {
      this.userFilterId = id
      this.currentPage = 1
      this.handleSearch()
    },
    handleUserFilterCode(id) {
      this.userFilterCode = id
      this.currentPage = 1
      this.handleSearch()
    },
    handleUserStatus(val) {
      this.userStatus = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleChangeStatus(id, status) {
      userToggleStatus({
        userId: id,
        status: status
      }).then((res) => {
        if (!res || res.code != 0) {
          this.handleSearch()
        }
      })
    },
    handleUserEdit(userId) {
      if (userId) {
        this.$router.push({
          name: 'userEdit',
          query: {
            userId: userId
          }
        })
      } else {
        this.$router.push({
          name: 'userEdit'
        })
      }
    },
    handleUserDetail(userId) {
      this.$router.push({
        name: 'userDetail',
        query: {
          userId: userId
        }
      })
    },
    handleShowResetPassword(id) {
      this.showResetPassword = true
      this.resetPasswordId = id
    },
    handleResetPassword() {
      this.$refs.resetPasswordForm.validate((valid) => {
        if (valid) {
          userResetPassword({
            userId: this.resetPasswordId,
            password: this.resetPasswordForm.resetPassword
          }).then((res) => {
            if (res.code == 0) {
              this.showResetPassword = false
              this.messageObj = this.$message.success('密码已更新')
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '重置密码不成功，请重新输入'
          })
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to && to.name == 'userDetail') {
      this.$store.commit('ADD_CACHED_VIEW', 'user')
      next()
    } else {
      this.$store.commit('DEL_ALL_CACHED_VIEWS')
      next()
    }
  }
}
</script>
<style lang="scss">
.user-table {
  td {
    padding: 4px 0;
  }
}
.hb-user-list {
  .ml15 {
    margin-left: 15px;
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .mt30 {
    margin-top: 35px;
  }
  .icon-add {
    margin-right: 5px;
    font-size: 12px;
  }
  .reset-password {
    .el-input {
      width: 300px;
    }
  }
  .el-dialog__footer {
    text-align: center;
  }
  .list-table {
    .status-icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #cccccc;
    }
    .el-button--text {
      color: #409eff;
    }
    .account-item {
      display: flex;
      align-items: center;
      img {
        margin-left: 8px;
        min-width: 19px;
        height: 15px;
      }
    }
  }
  .pager-container {
    text-align: center;
  }
  .status-switch {
    margin-left: -23px;
  }
}
</style>
