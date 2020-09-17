<template>
  <div class="hb-role-edit">
    <wx-header showBack>
      <span slot="headerTitle">{{ roleId ? '编辑角色' : '新建角色' }}</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content role-container">
        <el-form ref="roleEditForm" class="role-edit-form" :model="form" :rules="rules" label-width="100px" hide-required-asterisk>
          <el-row :gutter="34" class="basic-container">
            <el-col :span="13" class="part">
              <el-scrollbar class="role-detail">
                <div class="common-title">
                  <i class="descri"></i>
                  <span class="title-font">基本信息</span>
                </div>
                <el-form-item label="角色名称：" prop="roleName" class="padding-item">
                  <el-input size="small" class="reset-input" :maxlength="15" v-model="form.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="描述：" prop="description" class="padding-item">
                  <el-input size="small" class="reset-input" :maxlength="60" v-model="form.description" placeholder="请输入角色描述"></el-input>
                </el-form-item>
                <div class="common-title">
                  <i class="descri"></i>
                  <span class="title-font">设置头像</span>
                </div>
                <el-form-item label="代理商" class="avatar-item">
                  <div v-for="i in [1, 2, 3, 4, 5]" :key="i" class="avatar" :class="{active: i == form.icon}" :style="{borderColor: i == form.icon ? colorList[0] : ''}" @click="handleClickAvatar(i)">
                    <img :src="require('../../../../static/images/roleIcon/' + i + '.png')" />
                    <i v-if="i == form.icon" class="iconfont icon-pass" :style="{backgroundColor: colorList[0]}"></i>
                  </div>
                </el-form-item>
                <el-form-item label="医院" class="avatar-item">
                  <div v-for="i in [6, 7, 8, 9, 10]" :key="i" class="avatar" :class="{active: i == form.icon}" :style="{borderColor: i == form.icon ? colorList[1] : ''}" @click="handleClickAvatar(i)">
                    <img :src="require('../../../../static/images/roleIcon/' + i + '.png')" />
                    <i v-if="i == form.icon" class="iconfont icon-pass" :style="{backgroundColor: colorList[1]}"></i>
                  </div>
                </el-form-item>
                <el-form-item label="驾校" class="avatar-item">
                  <div v-for="i in [11, 12, 13, 14, 15]" :key="i" class="avatar" :class="{active: i == form.icon}" :style="{borderColor: i == form.icon ? colorList[2] : ''}" @click="handleClickAvatar(i)">
                    <img :src="require('../../../../static/images/roleIcon/' + i + '.png')" />
                    <i v-if="i == form.icon" class="iconfont icon-pass" :style="{backgroundColor: colorList[2]}"></i>
                  </div>
                </el-form-item>
                <el-form-item label="公司" class="avatar-item">
                  <div v-for="i in [16, 17, 18, 19, 20]" :key="i" class="avatar" :class="{active: i == form.icon}" :style="{borderColor: i == form.icon ? colorList[3] : ''}" @click="handleClickAvatar(i)">
                    <img :src="require('../../../../static/images/roleIcon/' + i + '.png')" />
                    <i v-if="i == form.icon" class="iconfont icon-pass" :style="{backgroundColor: colorList[3]}"></i>
                  </div>
                </el-form-item>
                <el-form-item label="其他" class="avatar-item">
                  <div v-for="i in [21, 22, 23, 24, 25]" :key="i" class="avatar" :class="{active: i == form.icon}" :style="{borderColor: i == form.icon ? colorList[4] : ''}" @click="handleClickAvatar(i)">
                    <img :src="require('../../../../static/images/roleIcon/' + i + '.png')" />
                    <i v-if="i == form.icon" class="iconfont icon-pass" :style="{backgroundColor: colorList[4]}"></i>
                  </div>
                </el-form-item>
              </el-scrollbar>
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
                      show-checkbox
                      :check-strictly="true"
                      :data="roleTreeList"
                      :props="props1"
                      :node-key="props1.value"
                      default-expand-all
                      @check="roleTreeChange"
                    ></el-tree>
                  </el-scrollbar>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="operator-container">
          <el-button :disabled="disableSubmit" type="primary" :loading="saveLoading" @click="handleRoleSave">确定</el-button>
          <el-button plain @click="handleRoleList">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxHeader from '@/components/header/index'
import { getRoleById, getRoleTree, editRole } from '@/api/role.js'

export default {
  components: {
    wxHeader
  },
  data () {
    const validateRoleName = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      if (value.length == 0) {
        callback(new Error('请输入角色名称'))
      } else if (!reg.test(value)) {
        callback(new Error('角色名称只能输入中英文和数字'))
      } else {
        callback()
      }
    }
    return {
      colorList: ['#45acf3', '#2fcaff', '#fd7715', '#fdc449', '#666666'], // 角色颜色列表
      roleId: '',
      saveLoading: false,
      disableSubmit: false,
      form: {
        roleName: '',
        icon: '',
        description: ''
      },
      rules: {
        roleName: [
          { validator: validateRoleName, trigger: 'change' }
        ]
      },
      roleTreeList: [],
      roleCheckedList: [],
      props1: {
        value: 'id',
        label: function (data, node) {
          return data.meta.title
        },
        children: 'children'
      },
      parentIds: [],
      childIds: []
    }
  },
  computed: {
  },
  methods: {
    roleTreeChange (p1, p2) {
      const _this = this
      let checkedKeys = p2.checkedKeys
      if (checkedKeys.includes(p1.id)) {
        // 设置勾选的时候同时勾选父节点
        this.parentIds = []
        this.getParentIds(p1)
        checkedKeys = [...new Set([...checkedKeys, ...this.parentIds])]
        this.$refs.hbRoleTree.setCheckedKeys(checkedKeys)
      } else {
        // 取消勾选的时候同时取消子节点
        this.childIds = []
        this.getChildIds(p1)
        if (this.childIds.length > 0) {
          let b = new Set(_this.childIds)
          checkedKeys = [...new Set(checkedKeys.filter((x) => {
            return !b.has(x)
          }))]
          this.$refs.hbRoleTree.setCheckedKeys(checkedKeys)
        }
      }
    },
    getParentIds (data) {
      if (!data.pid || data.pid == -1) {
        return false
      }
      this.parentIds.push(data.pid)
      let node = this.$refs.hbRoleTree.getNode(data.pid)
      if (node) {
        this.getParentIds(node.data)
      }
    },
    getChildIds (data) {
      const _this = this
      if (data.children && data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          _this.childIds.push(data.children[i].id)
          _this.getChildIds(data.children[i])
        }
      }
    },
    handleRoleSave () {
      const _this = this
      this.$refs.roleEditForm.validate(valid => {
        let word = ''
        if (this.roleId == '') {
          word = '新建'
        } else {
          word = '编辑'
        }
        if (valid) {
          if (!this.form.icon) {
            this.$message.error('请选择角色头像')
            return false
          }
          let formData = {
            roleName: this.form.roleName,
            description: this.form.description,
            icon: this.form.icon,
            permList: this.$refs.hbRoleTree.getCheckedKeys(false)
          }
          if (this.roleId != '') {
            formData.id = this.roleId
          }
          this.saveLoading = true
          editRole(formData).then((res) => {
            this.saveLoading = false
            if (res.code == 0) {
              this.disableSubmit = true
              this.$message({
                type: 'success',
                duration: 2000,
                message: word + '角色成功！',
                onClose: () => {
                  _this.handleRoleList()
                }
              })
            }
          }).catch(() => {
            this.saveLoading = false
          })
        } else {
          this.$message.error(word + '角色不成功，请重新编辑')
        }
      })
    },
    handleRoleList () {
      this.$router.push({
        name: 'role'
      })
    },
    handleClickAvatar (index) {
      this.form.icon = '' + index
    }
  },
  created () {
    let rid = this.$route.query.roleId || ''
    this.roleId = rid
    if (rid) {
      getRoleById({
        roleId: rid
      }).then((res) => {
        if (res.code == 0) {
          this.roleId = res.data.id
          this.form.roleName = res.data.roleName
          this.form.description = res.data.description
          this.form.icon = res.data.icon
        } else {
          this.roleId = ''
        }
        getRoleTree({
          roleId: this.roleId,
          enable: true
        }).then((res) => {
          if (res.code == 0) {
            this.roleTreeList = res.data.treeList
            this.$refs.hbRoleTree.setCheckedKeys(res.data.checkedList)
          }
        })
      })
    } else {
      getRoleTree({
        roleId: rid,
        enable: true
      }).then((res) => {
        if (res.code == 0) {
          this.roleTreeList = res.data.treeList
          this.$refs.hbRoleTree.setCheckedKeys([])
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .hb-role-edit {
    background-color: #edeef2;
    .role-container {
      display: flex;
      flex-direction: column;
      .role-edit-form {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
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
        .el-form-item__label {
          font-size: 12px;
          color: #666666;
        }
        .role-detail {
          box-sizing: border-box;
          height: 100%;
          background: #fff;
          border-radius: 4px;
          padding: 0 0 18px 18px;
          display: flex;
          flex-direction: column;
          .padding-item {
            .el-input__inner {
              width: 330px;
            }
          }
          .avatar-item {
            .el-form-item__label {
              line-height: 60px;
            }
          }
          .avatar {
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 4px;
            background-color: #f7f7f7;
            box-sizing: border-box;
            margin-right: 8px;
            position: relative;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              border: 2px solid;
              background-color: #ffffff;
            }
            img {
              display: inline-block;
              width: 100%;
              height: 100%;
            }
            .icon-pass {
              position: absolute;
              line-height: normal;
              top: -7px;
              right: -6px;
              font-size: 10px;
              color: #fff;
              border-radius: 50%;
              padding: 0 1px;
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
        .el-button {
          letter-spacing: 5px;
          text-indent: 5px;
        }
      }
    }
  }
</style>
