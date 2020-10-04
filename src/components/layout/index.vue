<template>
  <el-container class="wx-layout">
    <el-aside width="235px" style="background-color: #323638;">
      <wx-menu />
    </el-aside>
    <el-container class="wx-layout">
      <el-header style="box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);line-height: 60px;z-index: 5;">
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <div style="float: right;">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img src="./icon.png" class="user-avatar">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/profile/index">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="background-color: #edeef2;">
        <div class="view-container">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view ref="viewContainer" :key="key" class="content-container" />
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { playSound } from '@/utils/js-play-sound'
import wxFooter from '@/components/footer/index'
import wxMenu from '@/components/menuBar/index'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    wxFooter,
    wxMenu,
    Breadcrumb
  },
  data() {
    return {
      timer: '',
      timestamp: ''
    }
  },
  computed: {
    ...mapGetters(['cachedViews']),
    key() {
      return this.$route.path
    },
    ...mapState({
      warningTipFlag: (state) => state.warningTipFlag
    })
  },
  watch: {
    warningTipFlag(val) {
      this.waitCheckNotice(val)
    }
  },
  created() {},
  mounted() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    logout() {
      const _this = this
      this.$confirm('确认要退出登录吗?', '退出')
        .then(async (action) => {
          await _this.$store.dispatch('logout')
          _this.$router.push({
            name: 'login',
            params: { disableBtn: true }
          })
        })
        .catch(async (action) => {})
    }
  }
}
</script>

<style lang="scss">
.user-avatar {
  width: 40px;
  vertical-align: middle;
}
.wx-layout {
  height: 100vh;
  // .wx-main {
  //   padding: 0;
  //   display: flex;
  //   flex-direction: column;
  //   .side-container {
  //     transition: width 0.28s;
  //     width: 235px !important;
  //     background-color: #333333;
  //     height: 100%;
  //     position: fixed;
  //     font-size: 0px;
  //     top: 0;
  //     bottom: 0;
  //     left: 0;
  //     z-index: 1001;
  //     overflow: hidden;
  //   }
  //   .view-container {
  //     display: flex;
  //     flex-direction: column;
  //     flex-grow: 1;
  //     transition: margin-left 0.28s;
  //     margin-left: 235px;
  //     position: relative;
  //     background: #fff;
  //     overflow: hidden;
  //     .content-container {
  //       display: flex;
  //       flex-direction: column;
  //       position: relative;
  //       flex-grow: 1;
  //       overflow: hidden;
  //       .hb-main-container {
  //         display: flex;
  //         flex-direction: column;
  //         flex-grow: 1;
  //         box-sizing: border-box;
  //         margin-top: 60px;
  //         padding: 10px 0 0 20px;
  //         overflow: scroll;
  //         position: relative;
  //         .hb-main-content {
  //           flex-grow: 1;
  //           box-sizing: border-box;
  //           min-width: 899px;
  //           padding: 0 20px 35px 0;
  //           width: calc(100% - 20px);
  //           height: calc(100% - 10px);
  //           // height: calc(100% - 169px);
  //           position: absolute;
  //           top: 10px;
  //           left: 20px;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
