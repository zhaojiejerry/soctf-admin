<template>
  <div style="height: 60px; margin-bottom: 20px;">
    <el-header class="hb-header" height="0.6rem">
      <div class="header-title">
        <i v-if="showBack" class="el-icon-arrow-left return-arrow" @click="goPrePage" />
        <!-- 页面名称插槽 -->
        <slot name="headerTitle" />
        <!-- 页面附加信息插槽 -->
        <slot name="headerOther" />
      </div>
      <!-- 右侧插槽 -->
      <slot name="headerRight" />
    </el-header>
  </div>
</template>

<script>
export default {
  props: {
    showBack: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    goPrePage() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.hb-header {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1998;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1.732px 10px 0px rgba(0, 0, 0, 0.08);
  .header-title {
    font-size: 16px;
    font-weight: bold;
    .return-arrow {
      font-weight: bold;
      cursor: pointer;
    }
  }
  .second-font {
    font-size: 12px;
    font-weight: normal;
  }
  .main-color {
    color: #fd7715;
  }
  .header-search {
    font-size: 12px;
  }
  .split-line {
    display: inline-block;
    width: 1px;
    height: 34px;
    background-color: #dcdcdc;
    margin: -1px 15px 0 15px;
  }
  .header-search-more {
    padding: 0 9px;
    color: #999;
    background-color: #f7f7f7;
    .icon-more {
      font-size: 12px;
    }
  }
}
</style>
