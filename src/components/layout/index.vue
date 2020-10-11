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
              <img src="@/assets/images/avater.jpeg" class="user-avatar">
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toPsnDetail">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="toModifyPwd">修改密码</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="background-color: #edeef2;height: calc(100vh - 60px);overflow: hidden;">
        <div style="height: 100%;overflow: auto;">
          <transition name="fade" mode="out-in">
            <keep-alive>
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
// import { playSound } from '@/utils/js-play-sound'
// import wxFooter from '@/components/footer/index'
import wxMenu from '@/components/menuBar/index'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    // wxFooter,
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
        // eslint-disable-next-line space-before-function-paren
        .then(async (action) => {
          await _this.$store.dispatch('logout')
          _this.$router.push({
            name: 'login',
            params: { disableBtn: true }
          })
        })
        // eslint-disable-next-line space-before-function-paren
        .catch(async (action) => {})
    },
    toPsnDetail() {
      this.$router.push({
        path: 'psnDetail'
      })
    },
    toModifyPwd() {
      this.$router.push({
        path: 'modifyPwd'
      })
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
}
</style>
