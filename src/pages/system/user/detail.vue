<template>
  <div class="hb-user-detail">
    <wx-header show-back>
      <span slot="headerTitle">用户信息</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div :class="['user-info-con', {'max-height': !arrowPackUp, 'min-height': arrowPackUp}]">
          <span class="arrow-con" @click="changeArrowPackUp">
            <i :class="['iconfont', {'icon-xiangshang': !arrowPackUp, 'icon-dropdown': arrowPackUp}] " />
          </span>
          <el-form :inline="true" :class="{'max-form': !arrowPackUp, 'min-form': arrowPackUp}" label-width="100px">
            <el-form-item label="账号名称：">
              {{ form.username }}
            </el-form-item>
            <el-form-item label="姓名：">
              {{ form.realName }}
            </el-form-item>
            <el-form-item label="用户角色：">
              {{ form.roleName }}
            </el-form-item>
            <el-form-item label="用户类型：">
              {{ computedUserType }}
            </el-form-item>
            <br>
            <el-form-item label="单位名称：">
              {{ form.orgName }}
            </el-form-item>
            <el-form-item v-show="form.type != 1" label="所属上级：">
              {{ form.parentName }}<span v-if="form.type == 4">(上级单位即体检医院)</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              {{ form.phone }}
            </el-form-item>
            <br>
            <el-form-item label="单位地址：">
              {{ form.provinceName }}{{ form.cityName ? `/${form.cityName}` : '' }}{{ form.areaName ? `/${form.areaName}` : '' }} {{ form.address }}
            </el-form-item>
            <br>
            <el-form-item label="备注：">
              {{ form.remark }}
            </el-form-item>
          </el-form>
          <div class="sign-info">
            <div v-show="!arrowPackUp" class="sign-info-row">
              <span v-if="form.userSign" class="sign-title">个人签章</span>
              <span v-if="form.orgSign" class="sign-title">单位签章</span>
            </div>
            <div v-show="!arrowPackUp" class="sign-info-row">
              <el-popover placement="left-start" popper-class="popper-img" trigger="hover">
                <img :src="form.userSign" class="popover-sign-img" alt="">
                <img v-if="form.userSign" slot="reference" :src="form.userSign" class="sign-img" alt="">
              </el-popover>
              <el-popover placement="left-start" popper-class="popper-img" trigger="hover">
                <img :src="form.orgSign" class="popover-sign-img" alt="">
                <img v-if="form.orgSign" slot="reference" :src="form.orgSign" class="sign-img" alt="">
              </el-popover>
            </div>
            <div class="sign-info-center-row">
              <el-button v-if="isPersonalCenter" type="primary" class="edit-user-button" @click="handleUserEdit(userId)">编辑</el-button>
              <el-button v-if="!isPersonalCenter" :disabled="!userId || btnPermissions.indexOf('100000102') == -1" type="primary" class="edit-user-button" @click="handleUserEdit(userId)">编辑用户</el-button>
            </div>
          </div>
        </div>

        <div class="user-child-con">
          <div class="user-child-opearea">
            <div class="user-child-opearea-left">
              <el-input :maxlength="20" v-model="search" size="small" class="search-input reset-input header-search" placeholder="请输入子账号或姓名" clearable @clear="handleSearch" @keyup.enter.native="handleSearch">
                <el-button slot="append" icon="iconfont icon-search" @click="handleSearch" />
              </el-input>
              <el-select v-model="subAccountStatus" size="small" class="ml15 reset-input tag-status" multiple placeholder="请选择账号状态" @change="handleSubAccountStatusStatus">
                <el-option v-for="item in statusOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>

            <div class="user-child-opearea-right">
              <el-button v-if="btnPermissions.indexOf('100000105') != -1" type="primary" size="small" icon="iconfont icon-add" @click="handleCreateSubAccount">新建子账号</el-button>
            </div>
          </div>
          <div class="user-child-list">
            <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="subAccountList" class="list-table" tooltip-effect="dark" current-row-key="id" height="100%">
              <el-table-column prop="status" align="center" width="120" label="启用/禁用">
                <template slot-scope="scope">
                  <el-switch :disabled="btnPermissions.indexOf('100000109') == -1" v-model="scope.row.status" :active-value="1" :inactive-value="0" class="status-switch" active-text="开" inactive-text="关" @change="handleChangeStatus(scope.row.id, scope.row.status)" />
                </template>
              </el-table-column>
              <el-table-column prop="username" label="子账号">
                <template slot-scope="scope">
                  <el-button :disabled="btnPermissions.indexOf('100000107') == -1" type="text" @click.native.prevent="handleSubUserDetail(scope.row.id)">{{ scope.row.username }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="realName" label="姓名" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.realName ? scope.row.realName : '-' }}
                </template>
              </el-table-column>
              <el-table-column label="联系电话" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.phone ? scope.row.phone : '-' }}
                </template>
              </el-table-column>
              <el-table-column label="最后编辑时间" prop="updateTime" show-overflow-tooltip />
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button v-if="btnPermissions.indexOf('100000108') != -1" size="small" type="text" @click.native.prevent="handleSubAccountEdit(scope.row.id)">编辑</el-button>
                  <!-- <span v-if="btnPermissions.indexOf('100000108') != -1 && btnPermissions.indexOf('100000102') != -1" style="color: #409eff;font-size: 0.14rem;">|</span> -->
                  <el-button v-if="btnPermissions.indexOf('100000108') != -1" size="small" type="text" @click.native.prevent="handleShowResetPassword(scope.row.id)">重置密码</el-button>
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
    <el-dialog :visible.sync="showResetPassword" title="重置密码" width="428px" @click.native.prevent="handleShowResetPassword(scope.row.id)">
      <el-form ref="resetPasswordForm" :model="resetPasswordForm" class="reset-password">
        <el-form-item
          id="loginState"
          :rules="[
            { required:true, validator: validatePassword, trigger: 'change' }
          ]"
          class="childrenUserEditPassword"
          label="新密码："
          prop="resetPassword">
          <el-input :maxlength="16" v-model="resetPasswordForm.resetPassword" size="small" show-password placeholder="请输入新密码（6-12位字母或数字）" @blur="loginFocusState=false" @focus="changeFocus" />
          <div v-if="loginFocusState" class="el-form-item__tips">8-16位数字、字母、符号的组合，且至少使用其中两种</div>
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
// import {
//   getUserById,
//   subAccountPageList,
//   userResetPassword,
//   userToggleStatus
// } from '@/api/user.js'

export default {
  components: {},
  data() {
    return {
      loginFocusState: false,
      isPersonalCenter: false,
      resetPasswordId: '',
      resetPasswordForm: {
        resetPassword: ''
      },
      showResetPassword: false,
      arrowPackUp: false,
      search: '',
      subAccountStatus: [1],
      subAccountList: [],
      subAccountTotal: 0,
      pageSize: 10,
      currentPage: 1,
      userId: '',
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
      form: {
        username: '',
        realName: '',
        roleName: '',
        type: '', // 1.公司 2.代理商 3.医院 4.驾校
        typeName: '',
        parentName: '',
        orgName: '',
        phone: '',
        provinceName: '',
        cityName: '',
        areaName: '',
        address: '',
        remark: '',
        userSign: '',
        orgSign: ''
      }
    }
  },
  computed: {
    ...mapGetters(['btnPermissions']),
    computedUserType() {
      let result = ''
      switch (this.form.type) {
        case 1:
          result = '公司'
          break
        case 2:
          result = '代理商'
          break
        case 3:
          result = '医院'
          break
        case 4:
          result = '驾校'
          break
        default:
          result = ''
      }
      return result
    }
  },
  created() {
    const uid = this.$route.query.userId || ''
    this.isPersonalCenter = this.$route.query.isPersonalCenter || false
    if (!uid) {
      this.$message.error('用户不存在')
    } else {
      this.userId = uid
      getUserById({
        userId: uid,
        isPersonalCenter: this.isPersonalCenter
      }).then((res) => {
        if (res.code == 0) {
          this.form.username = res.data.username || ''
          this.form.realName = res.data.realName || ''
          this.form.roleName = res.data.roleList.length
            ? res.data.roleList[0].roleName
            : ''
          this.form.type = res.data.type || ''
          this.form.typeName = res.data.typeName || ''
          this.form.parentName = res.data.parentName || ''
          this.form.orgName = res.data.orgName || ''
          this.form.phone = res.data.phone || ''
          this.form.provinceName = res.data.provinceName || ''
          this.form.cityName = res.data.cityName || ''
          this.form.areaName = res.data.areaName || ''
          this.form.address = res.data.address || ''
          this.form.remark = res.data.remark || ''
          this.form.userSign = res.data.userSign || ''
          this.form.orgSign = res.data.orgSign || ''
        }
      })

      // 查询子账号列表
      this.handleSearch()
    }
  },
  methods: {
    changeFocus() {
      const state = document.getElementById('loginState')
      const stateClass = state.getElementsByClassName('el-form-item__error')[0]
      if (!stateClass) {
        this.loginFocusState = true
      }
    },
    handleSubUserDetail(id) {
      this.$router.push({
        name: 'subAccountInfo',
        query: {
          userId: this.userId,
          subUserId: id,
          orgName: this.form.orgName
        }
      })
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
    validatePassword(rule, value, callback) {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)/
      this.loginFocusState = false
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
    },
    changeArrowPackUp() {
      this.arrowPackUp = !this.arrowPackUp
    },
    handleCreateSubAccount() {
      this.$router.push({
        name: 'addSubAccount',
        query: {
          userId: this.userId,
          orgName: this.form.orgName,
          primaryType: this.form.type
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleSubAccountStatusStatus(val) {
      this.subAccountStatus = val
      this.currentPage = 1
      this.handleSearch()
    },
    handleSearch() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('tbody')
      })

      subAccountPageList({
        search: this.search,
        status: this.subAccountStatus.join(','),
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        primaryId: this.userId,
        isPersonalCenter: this.isPersonalCenter
      })
        .then((res) => {
          loading.close()
          if (res.code == 0) {
            this.subAccountList = res.list
            this.subAccountTotal = parseInt(res.totalCount)
            this.$nextTick(() => {
              this.$refs.subAccountListTable.bodyWrapper.scrollTop = 0
            })
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleUserEdit(userId) {
      if (this.isPersonalCenter) {
        this.$router.push({
          name: 'personalEdit',
          query: {
            userId: userId,
            isPersonalCenter: this.isPersonalCenter
          }
        })
      } else {
        this.$router.push({
          name: 'userEdit',
          query: {
            userId: userId
          }
        })
      }
    },
    handleSubAccountEdit(subUserId) {
      this.$router.push({
        name: 'addSubAccount',
        query: {
          userId: this.userId,
          subUserId: subUserId,
          orgName: this.form.orgName
        }
      })
    }
  }
}
</script>

<style lang="scss">
.hb-user-detail {
  background-color: #edeef2;
  .reset-password {
    .el-input {
      width: 310px;
    }
  }
  .el-dialog__footer {
    text-align: center;
  }
  .pager-container {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .el-form-item__label {
    font-size: 12px;
    color: #666666;
  }
  .el-form-item__content {
    font-size: 12px;
  }
  .el-form-item {
    margin-bottom: 6px;
  }
  .max-height {
    height: 216px;
    min-height: 216px;
  }
  .min-height {
    height: 77px;
  }
  .user-info-con {
    position: relative;
    width: 100%;
    display: flex;
    background: #ffffff;
    background-color: #ffffff;
    border-radius: 4px;
    margin: 10px 20px 10px 0;
    justify-content: space-between;
    overflow: hidden;
    .max-form {
      padding-top: 8px;
    }
    .min-form {
      padding-top: 18px;
    }
    .arrow-con {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 34px;
      height: 24px;
      border-radius: 4px;
      border: solid 1px #dcdcdc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .sign-info {
      width: 160px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .sign-info-center-row {
        width: 120px;
        display: flex;
        justify-content: center;
        .edit-user-button {
          width: 120px;
        }
      }
      .sign-info-row {
        width: 120px;
        display: flex;
        justify-content: space-between;
        .sign-title {
          font-size: 12px;
          color: #333333;
        }
        .sign-img {
          width: 55px;
          height: 55px;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px#B69858;
          margin-top: 16px;
          margin-bottom: 21px;
        }
      }
    }
  }
  .user-child-con {
    width: 100%;
    background: #ffffff;
    flex: 1;
    margin-top: 13px;
    display: flex;
    flex-direction: column;
    .user-child-opearea {
      display: flex;
      justify-content: space-between;
      margin: 18px 26px;
      .user-child-opearea-left {
        .search-input {
          width: 267px;
          margin-right: 15px;
        }
      }
    }
    .user-child-list {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
