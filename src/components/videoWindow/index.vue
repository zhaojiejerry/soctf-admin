<template>
  <div class="video-window" v-show="playVideo">
    <div class="video-title">
      <span class="video-title-content">{{deviceName + '(' + deviceCode + ')'}}</span>
      <i class="close-icon iconfont icon-error" @click="closeVideoWindow"></i>
    </div>
    <div class="video-content"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <video id="videoElement" width="503px"></video>
      <div v-show="showRestart" title="重新加载" class="reload">
        <img @click="play" src="../../assets/images/restart.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// flv.js
import flvjs from 'flv.js/dist/flv.min'
import { startStream } from '@/api/device.js'
export default {
  props: {
    deviceName: {
      type: [String],
      default: ''
    },
    deviceCode: {
      type: [String],
      default: ''
    },
    vodeoUrl: {
      type: [String],
      defalut: ''
    },
    streamName: {
      type: [String],
      defalut: ''
    },
    playVideo: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      flvPlayer: null,
      timer: '',
      loading: true,
      showRestart: false
    }
  },
  watch: {
    // playVideo () {
    //   if (!this.playVideo) {
    //     this.deactivated()
    //   } else {
    //     this.clearTimer()
    //     this.loading = true
    //     startStream({streamName: this.streamName}).then((res) => {
    //       if (res.code === 0) {
    //         let timeout = 0
    //         if (res.data) {
    //           timeout = 10000
    //         }
    //         if (flvjs.isSupported()) {
    //           var videoElement = document.getElementById('videoElement')
    //           this.flvPlayer = flvjs.createPlayer({
    //             type: 'flv',
    //             url: this.vodeoUrl
    //           })
    //           this.flvPlayer.attachMediaElement(videoElement)
    //           setTimeout(() => {
    //             this.flvPlayer.load()
    //             this.flvPlayer.play()
    //             this.loading = false
    //             this.setHeartBeatInter(this.streamName)
    //           }, timeout)
    //         }
    //       }
    //     })
    //   }
    // }
    streamName (val) {
      if (val == '') {
        this.deactivated()
      } else {
        this.play()
      }
    }
  },
  methods: {
    setHeartBeatInter (streamName) {
      this.timer = setInterval(() => {
        startStream({streamName: streamName}).then((res) => {
          console.log(res)
        })
      }, 60000 * 5)
    },
    clearTimer () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    deactivated () {
      // 清空播放数据
      this.$emit('closeVideoWindow')

      // 销毁播放组件
      if (this.flvPlayer != null) {
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
        this.clearTimer()
      }
    },
    closeVideoWindow () {
      this.$emit('closeVideoWindow')
    },
    play () {
      // 销毁播放组件
      if (this.flvPlayer != null) {
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
        this.clearTimer()
      }
      this.loading = true
      this.showRestart = false
      startStream({streamName: this.streamName}).then((res) => {
        if (res.code === 0) {
          let timeout = 0
          if (res.data) {
            timeout = 10000
          }
          if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement')
            this.flvPlayer = flvjs.createPlayer({
              type: 'flv',
              url: this.vodeoUrl
            })
            this.flvPlayer.on(flvjs.Events.ERROR, (res) => {
              this.$message.error('播放失败，请稍后重试')
              this.loading = false
              this.showRestart = true
            })
            this.flvPlayer.attachMediaElement(videoElement)
            setTimeout(() => {
              this.flvPlayer.load()
              let promisePlay = this.flvPlayer.play()
              if (promisePlay) {
                promisePlay.then((res) => {
                  console.log('success', res)
                  this.loading = false
                  this.showRestart = false
                }).catch((res) => {
                  console.log('error', res)
                  // this.loading = false
                  // this.showRestart = true
                })
              }
              this.setHeartBeatInter(this.streamName)
            }, timeout)
          }
        } else {
          this.loading = false
          this.showRestart = true
          this.$message.error(res.msg)
        }
      })
    }
  },
  beforeDestroy () {
    this.deactivated()
  }
}
</script>

<style lang="scss">
  .video-window{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -178px;
    display: flex;
    flex-direction: column;
    width: 503px;
    min-height: 450px;
    z-index: 2;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
    .video-title{
      width: 100%;
      box-sizing: border-box;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background-color: #000000;
      color: #ffffff;
      .video-title-content{
        font-size: 14px;
      }
      .close-icon{
        cursor: pointer;
      }
    }
    .video-content{
      position: relative;
      width: 1;
      flex: 1 0 auto;
      background-color: #ffffff;
      .video-content-object{
        width: 100%;
        height: 100%;
      }
      .video-js{
        height: 100% !important;
      }
      .reload{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 30px;
        margin: auto;
        height: 30px;
        img{
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }
</style>
