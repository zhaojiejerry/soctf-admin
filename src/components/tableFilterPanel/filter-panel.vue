<template>
  <el-popover
    popper-class="el-table-header__filters"
    placement="bottom"
    trigger="click"
    transition="el-zoom-in-top"
    @hide="handleOutsideClick"
    v-model="showPopper"
  >
    <div class="el-table-filter__parent">
      <div class="el-table-filter__content">
        <el-scrollbar wrap-class="el-table-filter__wrap">
          <el-checkbox-group class="el-table-filter__checkbox-group" v-model="filteredValue">
            <el-checkbox
              v-for="filter in filters"
              :key="filter.value"
              :label="filter.value"
            >{{ filter.text }}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <div class="el-table-filter__bottom">
        <button @click="handleConfirm">确定</button>
        <button @click="handleReset">重置</button>
      </div>
    </div>
    <span
      class="el-filter-title"
      :class="{ 'is-active': commitValue.length !== 0 }"
      slot="reference"
    >
      {{ title }}
      <span class="el-table__column-filter-trigger">
        <i class="el-icon-arrow-down"></i>
      </span>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'filterPanels',
  props: {
    columnKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    filters: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultValue: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showPopper: false,
      filteredValue: [],
      commitValue: []
    }
  },
  methods: {
    handleOutsideClick () {
      this.filteredValue = [...this.commitValue]
      this.showPopper = false
    },
    handleConfirm () {
      this.commitValue = [...this.filteredValue]
      this.$emit('change', { key: this.columnKey, value: this.commitValue })
      this.showPopper = false
    },
    handleReset () {
      this.filteredValue = []
      this.commitValue = [...this.filteredValue]
      this.$emit('change', { key: this.columnKey, value: this.commitValue })
      this.showPopper = false
    }
  },
  created () {
    this.commitValue = this.filteredValue = [...this.defaultValue]
  }
}
</script>

<style lang="scss">
.el-table-header__filters {
  padding: 0;
}
.el-filter-title {
  outline: none;
  cursor: pointer;
  &.is-active {
    color: #fd7715;
  }
}
</style>
