<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
    width="515"
    class="inline-block"
    v-model="showPopover">
    <el-scrollbar>
      <div class="user-scroll-content user-area-select">
        <div class="has-content" v-if="provinceTree.length > 0">
          <p class="select-line">
            <i class="iconfont icon-location"></i>
            <span class="location" @click="handleSearchProvince">中国</span>
            <span v-if="provinceText" class="location" @click="handleSearchCity">/{{ provinceText }}</span>
            <span v-if="cityText" class="location" @click="handleSearchArea">/{{ cityText }}</span>
            <span v-if="areaText" class="location" style="cursor: 'default'">/{{ areaText }}</span>
          </p>
          <div class="province-data" v-if="!selectProvince">
            <span class="item-province" v-for="i in provinceTree" :key="i.ida" :class="{active: selectProvince == i.id}" @click="handleClickArea(i.id, i.name, 'province')">{{ i.name }}</span>
          </div>
          <div class="city-area-data" v-else>
            <template v-for="(j, index) in cityTree">
              <span class="item-city" :key="j.idb" @click="handleClickArea(j.id, j.name, 'city', index)"><em class="item-city-text ellipsis" :class="{active: selectCity == j.id}">{{ j.name }}</em></span>
              <div class="area-data" :key="j.idc" v-if="index % 7 == 6 || (index == cityTree.length - 1)" v-show="selectCityShow(j.id)">
                <div class="item-area-parent">
                  <span class="item-area" v-for="k in areaTree" :key="k.idd" :class="{active: selectArea == k.id}" @click="handleClickArea(k.id, k.name, 'area')">{{ k.name }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="no-content">暂无数据</div>
      </div>
    </el-scrollbar>
    <el-input
      readonly
      class="area-select-input"
      slot="reference"
      size="small"
      :value="selectText"
      placeholder="请选择省/市/区"
      popper-class="hidden-popover"
      @mouseenter.native="isShowDel"
      @mouseleave.native="isHideDel">
      <i v-if="showDelIcon" slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clearHandle"></i>
    </el-input>
  </el-popover>
</template>

<script>
import { areaSelect } from '@/api/common.js'

export default {
  props: {
    province: {
      type: [Number, String],
      default: ''
    },
    city: {
      type: [Number, String],
      default: ''
    },
    area: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      showPopover: false,
      selectProvince: this.province,
      selectCity: this.city,
      selectArea: this.area,
      provinceText: '',
      cityText: '',
      areaText: '',
      selectText: '',
      provinceTree: [],
      cityTree: [],
      areaTree: [],
      showDelIcon: false
    }
  },
  computed: {
    selectCityShow () {
      const _this = this
      return (id) => {
        if (!this.selectCity) {
          return false
        } else {
          const findIndex = this.cityTree.findIndex((value) => {
            return value.id == _this.selectCity
          })
          if (findIndex == -1) {
            return false
          } else {
            let returnIndex = (Math.floor(findIndex / 7) + 1) * 7 - 1
            if (returnIndex > (_this.cityTree.length - 1)) {
              returnIndex = _this.cityTree.length - 1
            }
            if (_this.cityTree[returnIndex].id == id) {
              return true
            } else {
              return false
            }
          }
        }
      }
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
        let scrollWrap = document.querySelectorAll('.el-scrollbar .user-area-select')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; overflow: hidden;'
        scrollBar.forEach(ele => { ele.style.width = 0 })
      })
    },
    clearHandle () {
      this.showDelIcon = false
      this.selectProvince = ''
      this.selectCity = ''
      this.selectArea = ''
      this.provinceText = ''
      this.cityText = ''
      this.areaText = ''
      this.selectText = ''
      this.$emit('getValue', { province: this.selectProvince, city: this.selectCity, area: this.selectArea })
    },
    handleClickArea (id, name, type) {
      if (type == 'province') {
        this.selectProvince = id
        this.provinceText = name
        this.searchData('city', id)
      } else if (type == 'city') {
        this.selectCity = id
        this.cityText = name
        this.searchData('area', id)
      } else if (type == 'area') {
        this.showPopover = false
        this.selectArea = id
        this.areaText = name
        this.selectText = this.provinceText + (this.cityText ? `/${this.cityText}` : '') + (this.areaText ? `/${this.areaText}` : '')
        this.$emit('getValue', { province: this.selectProvince, city: this.selectCity, area: this.selectArea })
      }
    },
    handleSearchProvince () {
      this.searchData('province', 0)
    },
    handleSearchCity () {
      this.searchData('city', this.selectProvince)
    },
    handleSearchArea () {
      this.searchData('area', this.selectCity)
    },
    searchData (type, value) {
      const _this = this
      if (type == 'province') {
        this.selectProvince = ''
        this.provinceText = ''
        this.selectCity = ''
        this.cityText = ''
        this.selectArea = ''
        this.areaText = ''
      } else if (type == 'city') {
        this.selectCity = ''
        this.cityText = ''
        this.selectArea = ''
        this.areaText = ''
      } else if (type == 'area') {
        this.selectArea = ''
        this.areaText = ''
      }
      this.selectText = this.provinceText + (this.cityText ? `/${this.cityText}` : '') + (this.areaText ? `/${this.areaText}` : '')
      this.$emit('getValue', { province: this.selectProvince, city: this.selectCity, area: this.selectArea })
      areaSelect({
        pid: value
      }).then((res) => {
        if (res.code == 0) {
          if (type == 'province') {
            this.provinceTree = res.data.list
          } else if (type == 'city') {
            this.cityTree = res.data.list
          } else if (type == 'area') {
            this.areaTree = res.data.list
          }
          this.initHandle()
        }
      })
    }
  },
  created () {
    areaSelect({
      pid: 0
    }).then((res) => {
      if (res.code == 0) {
        this.provinceTree = res.data.list
      }
    })
  },
  watch: {
    province () {
      this.selectProvince = this.province || ''
      this.selectCity = this.city || ''
      this.selectArea = this.area || ''
      if (this.selectProvince) {
        areaSelect({
          pid: this.selectProvince
        }).then((res) => {
          if (res.code == 0) {
            this.cityTree = res.data.list
            this.provinceText = res.data.name
            if (this.selectCity) {
              areaSelect({
                pid: this.selectCity
              }).then((res) => {
                if (res.code == 0) {
                  this.areaTree = res.data.list
                  this.cityText = res.data.name
                  if (this.selectArea) {
                    areaSelect({
                      pid: this.selectArea
                    }).then((res) => {
                      if (res.code == 0) {
                        this.areaText = res.data.name
                        this.selectText = this.provinceText + (this.cityText ? `/${this.cityText}` : '') + (this.areaText ? `/${this.areaText}` : '')
                      }
                    })
                  } else {
                    this.selectText = this.provinceText + (this.cityText ? `/${this.cityText}` : '') + (this.areaText ? `/${this.areaText}` : '')
                  }
                }
              })
            } else {
              this.selectText = this.provinceText + (this.cityText ? `/${this.cityText}` : '') + (this.areaText ? `/${this.areaText}` : '')
            }

            this.initHandle()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .user-area-select {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
    line-height: 1;
    text-align: left;
    box-sizing: border-box;
    .has-content {
      .select-line {
        color: #FD7715;
        margin-bottom: 10px;
        .icon-location {
          font-size: 20px;
          vertical-align: middle;
        }
        .location {
          vertical-align: middle;
          cursor: pointer;
        }
      }
      .province-data {
        font-size: 12px;
        .item-province {
          cursor: pointer;
          padding: 5px;
          margin-right: 15px;
          display: inline-block;
          &.active {
            color: #FD7715;
            background: #FFF1E7;
          }
        }
      }
      .city-area-data {
        font-size: 12px;
        box-sizing: border-box;
        .item-city {
          display: inline-block;
          width: 13.6%;
          cursor: pointer;
          padding-left: 5px;
          padding-right: 5px;
          box-sizing: border-box;
          .item-city-text {
            box-sizing: border-box;
            max-width: 100%;
            display: inline-block;
            padding: 5px;
            &.active {
              color: #FD7715;
              background: #FFF1E7;
            }
          }
        }
        .area-data {
          background: #f7f7f7;
          color: #333;
          font-size: 12px;
          margin-top: 10px;
          margin-bottom: 10px;
          width: 100%;
          border-radius: 3px;
          .item-area-parent {
            padding: 5px 10px;
          }
          .item-area {
            cursor: pointer;
            padding: 5px;
            margin-right: 15px;
            display: inline-block;
            &.active {
              color: #FD7715;
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
