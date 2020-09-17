<template>
  <el-popover
    placement="bottom"
    trigger="click"
    width="220"
    popper-class="user-area-popover"
    v-model="showPopover">
    <el-scrollbar>
      <div class="user-scroll-content user-area-content">
        <div class="has-content" v-if="areaTree.length > 0">
          <div class="menu-parent" v-for="item in areaTree" :key="item.id">
            <p class="province ellipsis area-name" :class="{active: selectCode == item.id}" :data-name="item.name" @click="handleClickArea(item.id, item.name)">{{ item.name }}</p>
            <div class="menu-child" v-if="item.children && item.children.length > 0">
              <div v-for="i in item.children" :key="i.id" class="mb10">
                <p :title="i.name" class="city ellipsis area-name" :class="{active: selectCode == i.id}" :data-name="`${item.name}/${i.name}`" @click="handleClickArea(i.id, `${item.name}/${i.name}`)">{{ i.name }}</p>
                <div class="menu-grand-son" v-if="i.children && i.children.length > 0">
                  <span :title="j.name" class="area ellipsis area-name" :class="{active: selectCode == j.id}" :data-name="`${item.name}/${i.name}/${j.name}`" v-for="j in i.children" :key="j.id" @click="handleClickArea(j.id, `${item.name}/${i.name}/${j.name}`)">{{ j.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-content">暂无数据</div>
      </div>
    </el-scrollbar>
    <el-input
      readonly
      class="reset-input slot-input"
      slot="reference"
      size="small"
      :value="selectText"
      :placeholder="holder"
      popper-class="hidden-popover"
      @mouseenter.native="isShowDel"
      @mouseleave.native="isHideDel">
      <i v-if="showDelIcon" slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clearHandle"></i>
    </el-input>
  </el-popover>
</template>

<script>
import { getUserArea, getDeviceArea } from '@/api/user.js'

export default {
  props: {
    value: {
      type: [Number, String],
      default: () => { return null }
    },
    holder: {
      type: String,
      default: '请选择用户所在区域'
    },
    dataShow: {
      type: String,
      default: 'user'
    }
  },
  data () {
    return {
      showPopover: false,
      selectCode: this.value,
      selectText: '',
      areaTree: [],
      showDelIcon: false
    }
  },
  methods: {
    isShowDel () {
      if (this.selectText != '') {
        this.showDelIcon = true
      }
    },
    isHideDel () {
      this.showDelIcon = false
    },
    initHandle () {
      this.$nextTick(() => {
        if (document.querySelectorAll('.area-name.active')[0]) {
          this.selectText = document.querySelectorAll('.area-name.active')[0].dataset.name
        }
        let scrollWrap = document.querySelectorAll('.user-area-popover .user-area-content')[0]
        let scrollBar = document.querySelectorAll('.user-area-popover .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px;'
        scrollBar.forEach(ele => { ele.style.width = 0 })
      })
    },
    clearHandle () {
      this.showDelIcon = false
      this.selectCode = null
      this.selectText = ''
      this.$emit('getValue', this.selectCode)
    },
    handleClickArea (id, name) {
      this.selectCode = id
      this.selectText = name
      this.$emit('getValue', this.selectCode)
      this.showPopover = false
    }
  },
  mounted () {
    if (this.dataShow == 'device') {
      getDeviceArea().then((res) => {
        if (res.code == 0) {
          this.areaTree = res.data
          this.initHandle()
        }
      })
    } else if (this.dataShow == 'user') {
      getUserArea().then((res) => {
        if (res.code == 0) {
          this.areaTree = res.data
          this.initHandle()
        }
      })
    }
  },
  watch: {
    value () {
      this.selectCode = this.value
      this.initHandle()
    }
  }
}
</script>

<style lang="scss">
  .user-area-popover {
    padding-right: 0;
  }
  .user-area-content {
    height: auto;
    max-height: 274px;
    padding: 0;
    padding-right: 12px;
    overflow: hidden;
    overflow-y: auto;
    .has-content {
      .menu-parent {
        padding-bottom: 10px;
        margin-bottom: 5px;
        border-bottom: 1px solid #dcdcdc;
        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .province {
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          margin: 0 auto;
          &.active {
            color: #FD7715;
          }
        }
        .menu-child {
          margin-top: 10px;
          .mb10 {
            margin-bottom: 7px;
          }
          .city {
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
            width: 25%;
            font-size: 12px;
            font-weight: bold;
            vertical-align: top;
            padding-top: 3px;
            &.active {
              color: #FD7715;
            }
          }
          .menu-grand-son {
            box-sizing: border-box;
            display: inline-block;
            width: 70%;
            text-align: left;
            .area {
              cursor: pointer;
              width: 33.33%;
              font-size: 12px;
              padding: 5px;
              &.active {
                color: #FD7715;
                background: #FFF1E7;
              }
            }
          }
        }
      }
    }
    .no-content {
      font-size: 14px;
      text-align: center;
    }
  }
</style>
