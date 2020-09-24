<template>
  <el-popover v-model="showPopover" placement="bottom-start" trigger="click" width="515" class="inline-block">
    <el-scrollbar>
      <div class="user-scroll-content user-area-select">
        <div v-if="provinceTree.length > 0" class="has-content">
          <p class="select-line">
            <i class="iconfont icon-location" />
            <span class="location" @click="handleSearchProvince">中国</span>
            <span v-if="provinceText" class="location" @click="handleSearchCity">/{{ provinceText }}</span>
            <span v-if="cityText" class="location" @click="handleSearchArea">/{{ cityText }}</span>
            <span v-if="areaText" class="location" style="cursor: 'default'">/{{ areaText }}</span>
          </p>
          <div v-if="!selectProvince" class="province-data">
            <span v-for="i in provinceTree" :key="i.ida" :class="{active: selectProvince == i.id}" class="item-province" @click="handleClickArea(i.id, i.name, 'province')">{{ i.name }}</span>
          </div>
          <div v-else class="city-area-data">
            <template v-for="(j, index) in cityTree">
              <span :key="j.idb" class="item-city" @click="handleClickArea(j.id, j.name, 'city', index)"><em :class="{active: selectCity == j.id}" class="item-city-text ellipsis">{{ j.name }}</em></span>
              <div v-if="index % 7 == 6 || (index == cityTree.length - 1)" v-show="selectCityShow(j.id)" :key="j.idc" class="area-data">
                <div class="item-area-parent">
                  <span v-for="k in areaTree" :key="k.idd" :class="{active: selectArea == k.id}" class="item-area" @click="handleClickArea(k.id, k.name, 'area')">{{ k.name }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="no-content">暂无数据</div>
      </div>
    </el-scrollbar>
    <el-input slot="reference" :value="selectText" readonly class="area-select-input" size="small" placeholder="请选择省/市/区" popper-class="hidden-popover" @mouseenter.native="isShowDel" @mouseleave.native="isHideDel">
      <i v-if="showDelIcon" slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clearHandle" />
    </el-input>
  </el-popover>
</template>

<script>
// import { areaSelect } from '@/api/common.js'

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
  data() {
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
    selectCityShow() {
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
            if (returnIndex > _this.cityTree.length - 1) {
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
  created() {},
  methods: {
    isShowDel() {
      if (this.selectText != '') {
        this.showDelIcon = true
      }
    },
    isHideDel() {
      this.showDelIcon = false
    },
    initHandle() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll(
          '.el-scrollbar .user-area-select'
        )[0]
        const scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        )
        scrollWrap.style.cssText = 'margin: 0px; overflow: hidden;'
        scrollBar.forEach((ele) => {
          ele.style.width = 0
        })
      })
    },
    clearHandle() {
      this.showDelIcon = false
      this.selectProvince = ''
      this.selectCity = ''
      this.selectArea = ''
      this.provinceText = ''
      this.cityText = ''
      this.areaText = ''
      this.selectText = ''
      this.$emit('getValue', {
        province: this.selectProvince,
        city: this.selectCity,
        area: this.selectArea
      })
    },
    handleClickArea(id, name, type) {
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
        this.selectText =
          this.provinceText +
          (this.cityText ? `/${this.cityText}` : '') +
          (this.areaText ? `/${this.areaText}` : '')
        this.$emit('getValue', {
          province: this.selectProvince,
          city: this.selectCity,
          area: this.selectArea
        })
      }
    },
    handleSearchProvince() {
      this.searchData('province', 0)
    },
    handleSearchCity() {
      this.searchData('city', this.selectProvince)
    },
    handleSearchArea() {
      this.searchData('area', this.selectCity)
    },
    searchData(type, value) {
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
      this.selectText =
        this.provinceText +
        (this.cityText ? `/${this.cityText}` : '') +
        (this.areaText ? `/${this.areaText}` : '')
      this.$emit('getValue', {
        province: this.selectProvince,
        city: this.selectCity,
        area: this.selectArea
      })
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
      color: #fd7715;
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
          color: #fd7715;
          background: #fff1e7;
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
            color: #fd7715;
            background: #fff1e7;
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
            color: #fd7715;
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
