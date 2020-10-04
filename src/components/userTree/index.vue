<template>
  <el-popover :disabled="disabled" :width="dropdownWidth" placement="bottom" trigger="click" class="inline-block" popper-class="user-popover-parent">
    <el-scrollbar class="user-poppover">
      <div class="user-scroll-content">
        <el-input v-model="filterText" class="sort-input" size="small" placeholder="输入关键字进行过滤" />
        <el-tree id="hbUserTree" ref="hbUserTree" :data="userTree" :props="props1" :node-key="props1.value" :default-expanded-keys="defaultExpandedKey" :filter-node-method="filterNode" class="tree-content" @node-click="handleNodeClick">
          <span slot-scope="{ node, data }" class="el-tree-node__label custom-tree-node span-ellipsis">
            <i v-if="data.type == 3" class="iconfont icon-hospital" />
            <span :title="node.label" class="node-text">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-scrollbar>
    <el-input slot="reference" :disabled="disabled" :value="selectTreeText" :placeholder="holder" readonly class="reset-input slot-input" size="small" popper-class="hidden-popover" @mouseenter.native="isShowDel" @mouseleave.native="isHideDel">
      <i v-if="showDelIcon" slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clearHandle" />
    </el-input>
  </el-popover>
</template>

<script>
import { getUserTree } from '@/api/user.js'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    dropdownWidth: {
      type: Number,
      default: 225
    },
    value: {
      type: [Number, String],
      default: () => {
        return null
      }
    },
    holder: {
      type: String,
      default: '请选择用户'
    }
  },
  data() {
    return {
      selectTreeId: this.value, // 选中的树ID
      selectTreeText: '',
      userTree: [], // 树数据
      filterText: '',
      defaultExpandedKey: [],
      props1: {
        value: 'id',
        label: 'orgName',
        children: 'children'
      },
      showDelIcon: false
    }
  },
  watch: {
    value() {
      this.selectTreeId = this.value
      this.initHandle()
    },
    filterText(val) {
      this.$refs.hbUserTree.filter(val)
    }
  },
  created() {},
  mounted() {
    getUserTree().then((res) => {
      if (res.code == 0) {
        this.userTree = res.data
        this.initHandle()
      }
    })
  },
  methods: {
    isShowDel() {
      if (this.selectTreeText != '') {
        this.showDelIcon = true
      }
    },
    isHideDel() {
      this.showDelIcon = false
    },
    filterNode(value, data) {
      if (!value) return true
      return data[this.props1.label].indexOf(value) !== -1
    },
    initHandle() {
      this.$nextTick(() => {
        if (this.selectTreeId) {
          this.selectTreeText = this.$refs.hbUserTree.getNode(this.selectTreeId)
            ? this.$refs.hbUserTree.getNode(this.selectTreeId).data[
                this.props1.label
              ]
            : ''
          this.$refs.hbUserTree.setCurrentKey(this.selectTreeId)
          this.defaultExpandedKey = [this.selectTreeId]
        }
        const scrollWrap = document.querySelectorAll(
          '.user-popover-parent .user-scroll-content'
        )[0]
        const scrollBar = document.querySelectorAll(
          '.user-popover-parent .el-scrollbar__bar'
        )
        scrollWrap.style.cssText = 'margin: 0px;'
        scrollBar.forEach((ele) => {
          ele.style.width = 0
        })
      })
    },
    // 切换选项
    handleNodeClick(node) {
      this.selectTreeText = node[this.props1.label]
      this.selectTreeId = node[this.props1.value]
      this.$emit('getValue', this.selectTreeId)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle() {
      this.showDelIcon = false
      this.selectTreeText = ''
      this.filterText = ''
      this.selectTreeId = null
      this.defaultExpandedKey = []
      this.$refs.hbUserTree.setCurrentKey(this.selectTreeId)
      this.$emit('getValue', this.selectTreeId)
    }
  }
}
</script>

<style lang="scss">
.user-poppover .el-tree-node__content {
  height: 34px;
}
</style>
<style lang="scss" scoped>
.sort-input {
  box-sizing: border-box;
  padding: 0 10px 5px 10px;
}
.el-scrollbar .el-scrollbar__view .user-scroll-content {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #b69858;
  .icon-hospital {
    color: #b69858;
  }
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #333;
  font-weight: normal;
  .icon-hospital {
    color: #cccccc;
  }
}
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.icon-hospital {
  font-size: 10px;
  margin-right: 5px;
  vertical-align: text-bottom;
  color: #cccccc;
}
</style>
