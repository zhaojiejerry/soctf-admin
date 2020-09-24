<template>
  <el-container class="wx-layout">
    <!-- <multi-video /> -->
    <el-main class="wx-main">
      <div class="side-container">
        <wx-menu />
      </div>
      <div class="view-container">
        <transition name="fade" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view ref="viewContainer" :key="key" class="content-container" />
          </keep-alive>
        </transition>
      </div>
    </el-main>
    <!-- <wx-footer></wx-footer> -->
    <!--    <video style="display: none" id="warnVideo" name="media">-->
    <!--      <source src="./warning.mp3" type="audio/mp3">-->
    <!--    </video>-->
  </el-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { playSound } from '@/utils/js-play-sound'
import wxFooter from '@/components/footer/index'
import wxMenu from '@/components/menuBar/index'

export default {
  components: {
    wxFooter,
    wxMenu
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
  methods: {}
}
</script>

<style lang="scss">
.wx-layout {
  height: 100%;
  flex-direction: column;
  .wx-main {
    padding: 0;
    display: flex;
    flex-direction: column;
    .side-container {
      transition: width 0.28s;
      width: 235px !important;
      background-color: #333333;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
    .view-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      transition: margin-left 0.28s;
      margin-left: 235px;
      position: relative;
      background: #fff;
      overflow: hidden;
      .content-container {
        display: flex;
        flex-direction: column;
        position: relative;
        flex-grow: 1;
        overflow: hidden;
        .hb-main-container {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          box-sizing: border-box;
          margin-top: 60px;
          padding: 10px 0 0 20px;
          overflow: scroll;
          position: relative;
          .hb-main-content {
            flex-grow: 1;
            box-sizing: border-box;
            min-width: 899px;
            padding: 0 20px 35px 0;
            width: calc(100% - 20px);
            height: calc(100% - 10px);
            // height: calc(100% - 169px);
            position: absolute;
            top: 10px;
            left: 20px;
          }
        }
      }
    }
  }
}
</style>
