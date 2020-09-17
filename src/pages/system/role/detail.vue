<template>
  <div class="hb-role-detail">
    <wx-header showBack>
      <span slot="headerTitle">角色信息</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content role-container">
        <el-row :gutter="34" class="basic-container">
          <el-col :span="13" class="part">
            <div class="role-detail">
              <div class="detail-top" v-if="roleData">
                <img :src="require('../../../../static/images/roleIcon/' + (roleData.icon) + '.png')">
                <div class="right-content">
                  <p :title="roleData.roleName" class="role-name ellipsis">{{ roleData.roleName }}</p>
                  <p class="role-description">{{ roleData.description }}</p>
                </div>
              </div>
              <div class="user-content">
                <div class="common-title">
                  <i class="descri"></i>
                  <span class="title-font">{{ userList.length }}个用户在用此角色</span>
                </div>
                <el-table
                  class="user-table"
                  :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
                  :cell-style="{fontSize: '12px'}"
                  tooltip-effect="dark"
                  :data="userList"
                  current-row-key="id"
                  height="200">
                  <el-table-column
                    label=" "
                    align="center"
                    type="index"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    label="账号"
                    width="85"
                    prop="username"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span v-if="!scope.row.username">-</span>
                      <el-button size="small" :disabled="btnPermissions.indexOf('100000101') == -1" v-else type="text" @click.native.prevent="handleUserDetail(scope.row.id)">{{ scope.row.username }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位名称"
                    prop="realName"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{ scope.row.realName ? scope.row.realName : '-' }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :span="11" class="part">
            <div class="role-tree">
              <div class="common-title">
                <i class="descri"></i>
                <span class="title-font">角色权限</span>
              </div>
              <div class="tree-parent">
                <el-scrollbar class="role-scroll">
                  <el-tree
                    ref="hbRoleTree"
                    class="tree-content"
                    :data="roleTreeList"
                    :props="props1"
                    :node-key="props1.value"
                    default-expand-all
                  ></el-tree>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="operator-container">
          <el-button :disabled="!roleId || btnPermissions.indexOf('100000202') == -1" type="primary" @click="handleRoleEdit">编辑角色</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getRoleById, getRoleTree } from '@/api/role.js'

export default {
  components: {
    wxHeader
  },
  data () {
    return {
      roleId: '',
      roleData: null,
      userList: [],
      roleTreeList: [],
      props1: {
        value: 'id',
        label: function (data, node) {
          return data.meta.title
        },
        children: 'children'
      }
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  methods: {
    handleRoleEdit () {
      this.$router.push({
        name: 'roleEdit',
        query: {
          roleId: this.roleId
        }
      })
    },
    handleUserDetail (userId) {
      this.$router.push({
        name: 'userDetail',
        query: {
          userId: userId
        }
      })
    }
  },
  created () {
    let rid = this.$route.query.roleId || ''
    if (!rid) {
      this.$message.error('角色不存在')
    } else {
      getRoleById({
        roleId: rid
      }).then((res) => {
        if (res.code == 0) {
          this.roleId = res.data.id
          this.roleData = res.data
          this.userList = res.data.userList
        }
      })
      getRoleTree({
        roleId: rid,
        enable: false
      }).then((res) => {
        if (res.code == 0) {
          this.roleTreeList = res.data.treeList
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .hb-role-detail {
    background-color: #edeef2;
    .role-container {
      display: flex;
      flex-direction: column;
      .basic-container {
        margin-top: 22px;
        position: absolute;
        width: 100%;
        height: calc(100% - 120px);
        overflow: hidden;
        .part {
          height: 100%;
        }
        .common-title {
          margin: 20px 0;
          line-height: 16px;
          .descri {
            display: inline-block;
            background-color: #FD7715;
            width: 4px;
            height: 16px;
            margin-right: 5px;
            vertical-align: text-top;
          }
          .title-font {
            font-size: 16px;
            font-weight: bold;
          }
        }
        .role-detail {
          box-sizing: border-box;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .detail-top {
            border-bottom: 1px solid #ededed;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            box-sizing: border-box;
            padding: 0 30px 7px 10px;
            .right-content {
              width: 100%;
              overflow: hidden;
            }
            .role-name {
              font-size: 16px;
              font-weight: bold;
              width: 100%;
              display: inline-block;
              padding-top: 11px;
            }
            .role-description {
              font-size: 12px;
              width: 100%;
              display: inline-block;
            }
          }
          .user-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .user-table {
              height: 100%;
              overflow: hidden;
              .el-button--text {
                color: #409EFF;
              }
            }
          }
        }
        .role-tree {
          box-sizing: border-box;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          padding: 0 18px 18px;
          display: flex;
          flex-direction: column;
          .tree-parent {
            height: 100%;
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
      .operator-container {
        position: absolute;
        bottom: 35px;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
