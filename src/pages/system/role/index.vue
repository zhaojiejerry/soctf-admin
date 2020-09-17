<template>
  <div class="hb-role">
    <wx-header>
      <span slot="headerTitle">角色管理</span>
      <span class="second-font" slot="headerOther">(共<em class="main-color">{{ roleTotal }}</em>个角色)</span>
      <div class="flex" slot="headerRight">
        <el-input size="small" :maxlength="20" clearable class="reset-input header-search" placeholder="请输入角色名称搜索" v-model="roleFilterText" @clear="handleSearch" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="iconfont icon-search" @click="handleSearch"></el-button>
        </el-input>
        <i class="split-line"></i>
        <el-button size="small" class="header-search-more" icon="iconfont icon-more" disabled></el-button>
      </div>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content">
        <el-row :gutter="35" class="card-container">
          <el-col :span="6">
            <div class="add-content" v-if="btnPermissions.indexOf('100000202') != -1" @click="handleEditRole(null)">
              <i class="iconfont icon-add"></i>
              <span>新建角色</span>
            </div>
          </el-col>
          <template v-if="roleList.length > 0">
            <el-col :span="6" v-for="(item, index) in roleList" :key="item.index">
              <el-popover
                placement="bottom"
                width="185"
                trigger="hover"
                :close-delay="20"
                :content="item.description || '暂无描述信息'">
                <div class="grid-content" slot="reference" @click="handleDetailRole(item.id)" @mouseenter="handleEnterRole(index)" @mouseleave="handleLeaveRole">
                  <i class="left-color" :style="{backgroundColor: colorList[Math.floor((item.icon - 1) / 5)]}"></i>
                  <img class="role-icon" :src="require('../../../../static/images/roleIcon/' + (item.icon) + '.png')" />
                  <div class="right-content">
                    <p :title="item.roleName" class="role-name ellipsis">{{ item.roleName }}</p>
                    <p class="role-count"><em class="number">{{ item.userCount || 0 }}</em>个用户</p>
                  </div>
                  <i v-if="btnPermissions.indexOf('100000203') != -1" v-show="hoverIndex == index" class="iconfont icon-delete" @click.stop="handleDeleteRole(item.id)"></i>
                  <i v-if="btnPermissions.indexOf('100000202') != -1" v-show="hoverIndex == index" class="iconfont icon-edit" @click.stop="handleEditRole(item.id)"></i>
                </div>
              </el-popover>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { roleList, roleDelete } from '@/api/role.js'

export default {
  components: {
    wxHeader
  },
  data () {
    return {
      colorList: ['#45acf3', '#2fcaff', '#fd7715', '#fdc449', '#cccccc'], // 角色颜色列表
      roleTotal: 0, // 角色统计
      roleFilterText: '', // 搜索关键字
      roleList: [], // 角色列表
      hoverIndex: -1, // Hover的角色Index
      messageObj: null
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  methods: {
    handleSearch () {
      roleList({
        search: this.roleFilterText
      }).then((res) => {
        if (res.code == 0) {
          this.roleList = res.data
          this.roleTotal = res.data.length
        }
      })
    },
    handleEnterRole (index) {
      this.hoverIndex = index
    },
    handleLeaveRole () {
      this.hoverIndex = -1
    },
    handleDetailRole (roleId) {
      if (this.btnPermissions.indexOf('100000201') == -1) {
        if (this.messageObj) {
          this.messageObj.close()
          this.messageObj = null
        }
        this.messageObj = this.$message.warning('无权限查看角色详情')
      } else {
        this.$router.push({
          name: 'roleDetail',
          query: {
            roleId: roleId
          }
        })
      }
    },
    handleEditRole (roleId) {
      if (roleId) {
        this.$router.push({
          name: 'roleEdit',
          query: {
            roleId: roleId
          }
        })
      } else {
        this.$router.push({
          name: 'roleEdit'
        })
      }
    },
    handleDeleteRole (roleId) {
      if (this.messageObj) {
        this.messageObj.close()
        this.messageObj = null
      }
      this.$confirm('确定删除该角色吗?', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'centerConfirm'
      }).then(() => {
        roleDelete({
          roleId: roleId
        }).then((res) => {
          if (res.code == 0) {
            this.messageObj = this.$message.success('角色删除成功')
            this.handleSearch()
          }
        })
      }).catch(() => {})
    }
  },
  created () {
  },
  mounted () {
    this.handleSearch()
  }
}
</script>
<style lang="scss">
  .hb-role {
    background-color: #edeef2;
    .card-container {
      padding-top: 20px;
    }
    .btn-disabled {
      cursor: not-allowed !important;
    }
    .add-content {
      box-sizing: border-box;
      width: 100%;
      height: 95px;
      background-color:#fff;
      border: 2px solid #FD7715;
      border-radius: 5px;
      box-shadow: 0px 3px 3.68px 0.32px rgba(253, 119, 21, 0.1);
      font-size: 18px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #FD7715;
      margin-bottom: 20px;
      .icon-add {
        font-size: 10px;
        font-weight: normal;
        margin-right: 5px;
        margin-top: 2px;
      }
    }
    .grid-content {
      box-sizing: border-box;
      width: 100%;
      height: 95px;
      background-color:#fff;
      box-shadow: 0px 3px 3.68px 0.32px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      outline: 0;
      &:hover .role-name {
        color: #FD7715;
      }
      .left-color {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 5px;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .role-icon {
        margin-right: 10px;
      }
      .right-content {
        width: calc(100% - 115px);
        .role-name {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 7px;
          max-width: 100%;
          display: inline-block;
        }
        .role-count {
          font-size: 12px;
          .number {
            color: #FD7715;
            font-weight: bold;
          }
        }
      }
      .iconfont {
        position: absolute;
        top: 10px;
        font-size: 12px;
        &:hover {
          color: #FD7715;
        }
        &.icon-delete {
          right: 33px;
        }
        &.icon-edit {
          right: 10px;
        }
      }
    }
  }
</style>
