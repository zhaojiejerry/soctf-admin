<template>
  <div>
    <div class="sys-name">
      <img class="icon-logo" src="./logo.png">
      SOCTF后台管理系统
    </div>
    <div style="height:calc( 100vh - 60px )">
      <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          class="hb-menu"
          mode="vertical"
          background-color="#323638"
          text-color="#fff"
          active-text-color="#B69858"
        >
          <menu-one
            v-for="route in navRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import menuOne from './menuOne'
import { clickoutside } from '@/utils/directives'
// import { navRoutes } from '@/router'
export default {
  components: {
    menuOne
  },
  directives: {
    clickoutside
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created() {
    this.navRoutes = this.permission_routes
  },
  methods: {}
}
</script>

<style lang="scss">
.version {
  position: absolute;
  left: 7px;
  bottom: 20px;
  font-size: 12px;
  color: #ffffff;
  height: 10px;
  line-height: 10px;
}
.sys-name {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 235px;
  height: 60px;
  background-color: #b69858;
  font-size: 18px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  .icon-logo {
    display: inline-block;
    height: 28px;
    margin-right: 3px;
    vertical-align: middle;
  }
  .version {
    position: absolute;
    left: 12px;
    bottom: 2px;
    font-size: 12px;
    color: #ffffff;
    height: 10px;
    line-height: 10px;
  }
}
.wx-menu {
  height: 100vh;
  .tips-user {
    color: #fff;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    width: 235px;
    height: 80px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .split {
      margin-left: 25px;
      margin-right: 25px;
      display: inline-block;
      height: 20px;
      width: 1px;
      background-color: #fff;
    }
    .tips-one {
      color: #fff;
      &:hover {
        color: #b69858;
        .icon-user {
          color: #b69858 !important;
        }
      }
    }
    .tips-icon {
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .user-dialog {
    width: 125px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 235px;
    bottom: 20px;
    padding: 5px 0;
    .user-item {
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      padding-left: 23px;
      cursor: pointer;
      &:hover {
        color: #b69858;
        background: rgba(253, 97, 21, 0.1);
      }
    }
  }
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    top: 60px;
    height: calc(100% - 140px);
  }

  .is-horizontal {
    display: none;
  }
}

.hb-menu {
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }

  .iconfont ,.fa{
    margin-right: 10px;
    font-size: 14px;
    color: #fff;
		width: 15px !important;
    display: inline-block;
  }

  &.el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  .el-submenu.is-opened {
    .el-submenu__title {
      background-color:#323638 !important;
    }
    .nest-menu .el-menu-item {
      padding-left: 43px !important;
      background-color: #323638 !important;
    }
  }
  .el-submenu__icon-arrow {
    color: #fff;
  }
  .submenu-title-noDropdown,
  .el-submenu__title {
    height: 46px;
    line-height: 46px;
    &:hover {
      background-color: #323638 !important;
    }
  }

  .is-active > .el-submenu__title {
    color: #ffffff !important;
  }

  .is-active {
    color: #b69858 !important;
  }

  // .is-active .iconfont {
  //   color: #b69858 !important;
  // }

  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    font-size: 14px;
    height: 46px;
    line-height: 46px;
    min-width: 235px !important;
    background-color: #323638 !important;

    &:hover {
      background-color: #323638 !important;
    }
  }
  .nest-menu .is-active {
    background-color: #323638 !important;
    .active-prefix {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #b69858;
    }
  }
  .nest-menu .el-menu-item:hover {
    span {
      color: #b69858;
    }
    .active-prefix {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 4px;
      height: 100%;
      background-color: #b69858;
    }
  }
}
</style>
