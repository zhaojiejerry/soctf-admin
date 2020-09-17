<template>
  <div class="hb-add-subaccount">
    <wx-header showBack>
      <span slot="headerTitle">子账号信息</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-add-subaccount-content flex flex-column">
        <div class="subaccount-con">
          <div class="subaccount-info">
            <el-form ref="subAccountEditForm" :model="subAccountForm" label-width="100px" hide-required-asterisk>
              <el-form-item label-width="0" style="margin-bottom:10px;">
                <div class="form-title">子账号信息</div>
              </el-form-item>
              <el-form-item label="账号名称：" prop="username">
                {{subAccountForm.username}}
              </el-form-item>
              <el-form-item label="姓名" prop="realName">
                {{subAccountForm.realName}}
              </el-form-item>
              <el-form-item label="联系电话：" prop="phone">
                {{subAccountForm.phone}}
              </el-form-item>
              <el-form-item label="单位名称：" prop="orgName">
                {{subAccountForm.orgName}}
              </el-form-item>
              <el-form-item label="个人签章：">
                <el-image class="sign-container sub-sign-info" fit="fill" :src="subAccountForm.userSign">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                {{subAccountForm.remark}}
              </el-form-item>
            </el-form>
          </div>
          <div class="subaccount-limits">
            <el-form>
              <el-form-item label-width="0" style="margin-bottom:10px;">
                <div class="form-title">子账号权限</div>
              </el-form-item>
            </el-form>
            <div class="tree-parent">
              <el-scrollbar class="role-scroll">
                <el-tree
                  ref="hbRoleTree"
                  class="tree-content"
                  :check-strictly="true"
                  :data="permList"
                  :props="props1"
                  :node-key="props1.value"
                  default-expand-all
                ></el-tree>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="button-con">
          <el-button
            @click="handleEditSubAcount"
            type="primary"
            :loading="saveLoading"
            v-if="isPersonalCenter"
            size="small">编辑信息</el-button>
          <el-button
            @click="handleEditSubAcount"
            type="primary"
            :loading="saveLoading"
            v-if="!isPersonalCenter && btnPermissions.indexOf('100000108') != -1"
            size="small">编辑子账号</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { fileUpload } from '@/api/common.js'
import { subAccountPageList, getPermTree, addSubAccount, getSubAccountDetail, updateSubAccount } from '@/api/user.js'

export default {
  components: {
    wxHeader
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (value.length == 0) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else if (value.length > 10) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('数字和字母组合，不超过10个字符'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      const mobileReg = /^((\+?86)|(\(\+86\)))?1(3|4|5|6|7|8|9)\d{9}$/
      const guhuaReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,16}$/
      if (value.length == 0) {
        callback(new Error('请输入电话号码'))
      } else if (!mobileReg.test(value) && !guhuaReg.test(value)) {
        callback(new Error('请输入有效的电话号码'))
      } else {
        callback()
      }
    }

    const validateRealname = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5_-]+$/
      if (value.length == 0) {
        callback(new Error('12位以内汉字、字母和数字'))
      } else if (!reg.test(value)) {
        callback(new Error('12位以内汉字、字母和数字'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9]+$/
      if (value.length == 0) {
        callback(new Error('6-12位字母或数字'))
      } else if (value.length > 12 || value.length < 6) {
        callback(new Error('6-12位字母或数字'))
      } else if (!reg.test(value)) {
        callback(new Error('6-12位字母或数字'))
      } else {
        callback()
      }
    }

    return {
      isPersonalCenter: false,
      saveLoading: false,
      userId: '',
      subUserId: '',
      enterUserSign: false,
      isReuse: false,
      reuseAccount: '',
      reuseAccountList: [], // 子账号列表
      permList: [], // 子账号所有权限
      checkedList: [], // 子账号已经拥有权限
      props1: {
        value: 'id',
        label: function (data, node) {
          return data.meta.title
        },
        children: 'children'
      },
      subAccountForm: {
        username: '',
        realName: '',
        password: '',
        phone: '',
        primaryId: '',
        userSign: '',
        remark: '',
        orgName: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  methods: {
    handleEditSubAcount () {
      if (this.isPersonalCenter) {
        this.$router.push({
          name: 'subAccountPersonalEdit',
          query: {
            userId: this.userId,
            subUserId: this.subUserId,
            isPersonalCenter: this.isPersonalCenter
          }
        })
      } else {
        this.$router.push({
          name: 'addSubAccount',
          query: {
            userId: this.userId,
            subUserId: this.subUserId
          }
        })
      }
    },
    handleSearchPermTree () {
      getPermTree({
        userId: this.subUserId,
        isPersonalCenter: this.isPersonalCenter,
        enable: false
      }).then(res => {
        if (res.code == 0) {
          this.permList = res.data.treeList
        } else {
          this.$message({
            type: 'error',
            message: '查询权限树出错:' + res.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '查询权限树出错'
        })
      })
    },
    handleSubAccountDetail () {
      getSubAccountDetail({
        userId: this.subUserId,
        isPersonalCenter: this.isPersonalCenter
      }).then(res => {
        if (res.code == 0) {
          this.subAccountForm.username = res.data.username || ''
          this.subAccountForm.realName = res.data.realName || ''
          this.subAccountForm.phone = res.data.phone || ''
          this.subAccountForm.userSign = res.data.userSign || ''
          this.subAccountForm.remark = res.data.remark || ''
          this.subAccountForm.orgName = res.data.orgName || ''
        }
      }).catch(() => {})
    }
  },
  created () {
    this.userId = this.$route.query.userId || ''
    this.subUserId = this.$route.query.subUserId || ''
    this.subAccountForm.orgName = this.$route.query.orgName || ''
    this.isPersonalCenter = this.$route.query.isPersonalCenter || false

    if (this.subUserId) {
      this.handleSubAccountDetail()
    }

    // 查询权限树（子账号的所有权限）
    this.handleSearchPermTree()
  }
}
</script>

<style lang="scss">
  .hb-add-subaccount {
    background: #edeef2;
    .sub-sign-info {
      width: 132px;
      height: 132px;
      margin-top: 0;
      .image-slot {
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
      }
    }
    .form-title{
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }
    .form-title:before{
      content: '';
      display: inline-block;
      width: 4px;
      height: 16px;
      background-color: #fd7715;
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
    .el-form-item__content{
      width: 380px;
      display: flex;
      align-items: center;
    }
    .hb-add-subaccount-content{
      flex-grow: 1;
      box-sizing: border-box;
      min-width: 1000px;
      padding: 22px 27px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      .subaccount-con{
        width: 100%;
        flex: 1;
        display: flex;
        .subaccount-info{
          flex: 656;
          margin-right: 20px;
          padding: 17px;
          background: #ffffff;
        }
        .subaccount-limits{
          flex: 431;
          background: #ffffff;
          padding: 17px 20px;
          display: flex;
          flex-direction: column;
          .tree-parent {
            flex: 1;
            position: relative;
            .role-scroll {
              position: absolute;
              width: 100%;
              height: 100%;
              .el-tree-node__expand-icon {
                color: #333;
              }
              .el-tree-node__expand-icon.is-leaf {
                color: transparent;
              }
              .el-tree-node:focus>.el-tree-node__content {
                background-color: #FFF1E7;
                color: #FD7715;
              }
              .el-tree-node__content:hover {
                background-color: #FFF1E7;
                color: #FD7715;
              }
            }
          }
        }
      }
      .button-con{
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }
</style>
