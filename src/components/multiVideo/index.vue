<template>
  <el-dialog
    :visible.sync="multiVideoVisible"
    :show-close="false"
    :width="isFullScreen?'100%':'658px'"
    :fullscreen="isFullScreen"
    :close-on-click-modal="false"
    class="multi-video-con">
    <div slot="title" class="multi-video-title">
      <span>多设备实时监控</span>
      <div class="right-btns">
        <i :class="{'icon-full-screen': !isFullScreen, 'icon-small-screen' : isFullScreen}" @click="handleFullScreen"></i>
        <i class="iconfont icon-error close-icon" @click="handleCloseDialog"></i>
      </div>
    </div>
    <div class="multi-video-body">
      <div class="multi-videos">
        <div class="video-list" v-show="showVideoList">
          <div class="video-search-con">
            <div class="video-search-input-con">
              <el-button icon="el-icon-arrow-left back-icon" @click="handleCloseVideoList"></el-button>
              <el-input placeholder="请输入设备编码或设备地点" class="video-search-input" @keyup.native="handleSearchDebounce" clearable @clear="handleSearchDebounce" v-model="searchFilterText">
                <el-button slot="append" type="primary" class="video-search-input-icon" @click="handleSearchDebounce" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
          <el-table
            ref="videoListTable"
            class="list-table"
            :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
            :cell-style="{fontSize: '12px'}"
            tooltip-effect="dark"
            row-class-name="device-list-row"
            :data="deviceList"
            @row-click="handleDbClick"
            current-row-key="id"
            height="100%">
            <el-table-column
              prop="code"
              label="设备编号">
              <template slot-scope="scope">
                <div class="flex device-code" style="align-items:center;">
                  {{ scope.row.code }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="设备地点"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.place ? scope.row.place : '--' }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div :class="['multi-video', 'flex', 'flex-column', {'multi-video-fullscreen': isFullScreen}]"
            v-for="(item, key) in videosInfo"
            :key="key">
          <div class="before-add-video flex flex-column"
              v-show="!item.playVideo"
              @click="handleAddVideo(key)">
            <img src="./video.png" alt="">
            <span class="add-tip">添加设备到这里</span>
          </div>
          <div class="after-add-video" v-show="item.playVideo">
            <div class="video-title">
              <span class="video-title-tip ellipsis" :title="item.place + '(' + item.code + ')'">{{item.place}}({{item.code}})</span>
              <i class="iconfont icon-error close-icon" @click="handleCloseVideo(key)"></i>
            </div>
            <div class="video-content">
              <video :id="'videoElement' + key"  controls="controls"></video>
            </div>
          </div>
        </div>
      </div>
      <div class="multi-footer">
        <el-button @click="handleCloseDialog">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import flvjs from 'flv.js/dist/flv.min'
import { getDeviceList, startStream } from '@/api/device.js'
export default {
  data () {
    const handleSearchDebounce = _.debounce(() => {
      this.handleSearch()
    }, 250)
    return {
      currentVideoNum: 0,
      handleSearchDebounce: handleSearchDebounce,
      isFullScreen: false,
      showVideoList: false,
      searchFilterText: '',
      currentPageNo: 1,
      pageSize: 100,
      orderBy: 'CREATE_TIME', // 排序字段
      orderType: 'DESC', // 排序规则 ASC
      deviceList: [],
      videosInfo: {
        1: {
          playVideo: false,
          flvPlayer: null,
          place: '',
          code: '',
          videoUrl: ''
        },
        2: {
          playVideo: false,
          flvPlayer: null,
          place: '',
          code: '',
          videoUrl: ''
        },
        3: {
          playVideo: false,
          flvPlayer: null,
          place: '',
          code: '',
          videoUrl: ''
        },
        4: {
          playVideo: false,
          flvPlayer: null,
          place: '',
          code: '',
          videoUrl: ''
        }
      },
      timerArr: []
    }
  },
  computed: {
    multiVideoVisible: {
      get () {
        return this.$store.state.multiVideoVisible
      },
      set (val) {
        this.$store.commit('setMultiVideoVisible', val)
      }
    }
  },
  methods: {
    setHeartBeatInter (videoUrl, streamId, index) {
      console.log(videoUrl)
      this.timerArr[index - 1] = setInterval(() => {
        startStream({streamName: videoUrl}).then((res) => {
          console.log(res)
        })
      }, 60000 * 5)
    },
    clearTimer (index) {
      clearInterval(this.timerArr[index - 1])
    },
    handleCloseVideoList () {
      this.showVideoList = false
    },
    handleFullScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    handleCloseVideo (key) {
      // 销毁播放组件
      if (this.videosInfo[key].flvPlayer != null) {
        this.videosInfo[key].flvPlayer.unload()
        this.videosInfo[key].flvPlayer.detachMediaElement()
        this.videosInfo[key].flvPlayer.destroy()
        this.videosInfo[key].flvPlayer = null
        this.videosInfo[key].playVideo = false
        this.videosInfo[key].place = ''
        this.videosInfo[key].code = ''
        this.videosInfo[key].videlUrl = ''
        this.clearTimer(key)
      }
    },
    handleCloseDialog () {
      this.$store.commit('setMultiVideoVisible', false)
      setTimeout(() => {
        this.isFullScreen = false
        this.showVideoList = false
        this.searchFilterText = ''
      }, 800)
      this.closeAllVideo()
    },
    closeAllVideo () {
      this.handleCloseVideo(1)
      this.handleCloseVideo(2)
      this.handleCloseVideo(3)
      this.handleCloseVideo(4)
      this.timerArr.forEach((item) => {
        if (item) {
          this.clearTimer(item)
        }
      })
    },
    handleAddVideo (videoNum) {
      // videoNum 四个视频编号分别是1,2,3,4
      this.currentVideoNum = videoNum
      this.showVideoList = true
      this.handleSearch()
    },
    handleSearch () {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('tbody')
      })
      getDeviceList({
        search: this.searchFilterText,
        pageNo: this.currentPageNo,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      }).then((res) => {
        loading.close()
        if (res.code == 0) {
          this.deviceList = []
          this.deviceList = res.list
          this.$nextTick(() => {
            this.$refs.videoListTable.bodyWrapper.scrollTop = 0
          })
        }
      }).catch(() => {
        loading.close()
      })
    },
    handleDbClick (row, column, event) {
      // 判断设备是否被选用
      let flag = false
      for (let key in this.videosInfo) {
        if (this.videosInfo[key].code == row.code) {
          flag = true
        }
      }

      if (!flag) {
        this.showVideoList = false
        this.videosInfo[this.currentVideoNum].playVideo = true
        this.videosInfo[this.currentVideoNum].place = row.place
        this.videosInfo[this.currentVideoNum].code = row.code
        this.videosInfo[this.currentVideoNum].videoUrl = row.videoUrl
        startStream({streamName: row.streamName}).then((res) => {
          if (res.code === 0) {
            let timeout = 0
            if (res.data) {
              timeout = 10000
            }
            // 播放视频
            if (flvjs.isSupported()) {
              let videoElement = document.getElementById('videoElement' + this.currentVideoNum)
              this.videosInfo[this.currentVideoNum].flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: row.videoUrl
              })
              this.videosInfo[this.currentVideoNum].flvPlayer.on(flvjs.Events.ERROR, (res) => {
                console.log(res)
              })
              this.videosInfo[this.currentVideoNum].flvPlayer.attachMediaElement(videoElement)
              setTimeout(() => {
                this.videosInfo[this.currentVideoNum].flvPlayer.load()
                this.videosInfo[this.currentVideoNum].flvPlayer.play()
                this.setHeartBeatInter(row.streamName, this.currentVideoNum)
              }, timeout)
            }
            // }, 2000)
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '您已添加过此台设备'
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .multi-video-con{
    .device-list-row{
      cursor: pointer;
    }
    .el-dialog__header{
      padding: 0;
    }
    .el-dialog__body{
      padding: 0 15px 15px 15px;
    }
    .el-dialog.is-fullscreen{
      .el-dialog__body{
        height: calc(100% - 110px);
        .multi-video-body{
          height: 100%;
          .multi-videos{
            height: 100%;
            .multi-video-fullscreen{
              height: 50%;
            }
          }
        }
        .video-search-input{
          width: 620px !important;
        }
      }
    }
    .multi-video-title{
      height: 42px;
      line-height: 42px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
      font-size: 14px;
      color: #333333;
      .right-btns{
        display: flex;
        align-items: center;
        .icon-full-screen{
          cursor: pointer;
          width: 10px;
          height: 8px;
          border: 2px solid #333333;
          margin-right: 14px;
        }
        .icon-small-screen{
          width: 14px;
          height: 12px;
          background: url('./small-screen.png');
          margin-right: 14px;
        }
        .close-icon{
          cursor: pointer;
        }
      }
    }
    .multi-footer{
      text-align: center;
      margin-top: 10px;
    }
    .multi-videos{
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .video-list{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        z-index: 10;
        background: #ffffff;
        .video-search-con{
          display: flex;
          margin-bottom: 10px;
          .video-search-input-con{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-button{
              padding: 12px;
            }
            .video-search-input{
              width: 532px;
              margin-left: 12px;
              .el-input__inner{
                background-color: #edeef2;
                border-radius: 4px;
              }
              .video-search-input-icon{
                background-color: #fd7715;
                border-radius: 0px 4px 4px 0px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .multi-video{
        width: 49%;
        height: 205px;
        .after-add-video{
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          background: #333333;
          border: solid 1px #dcdcdc;
          overflow: hidden;
          .video-content{
            flex: 1 0 0%;
            position: relative;
            video{
              position: absolute;
              width: 100%;
              height: 100%;
            }
          }
          .video-title{
            height: 32px;
            flex: 0 0 auto;
            background-color: #333333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #ffffff;
            padding: 0 11px;
            overflow: hidden;
          }
        }
        .before-add-video{
          height: 100%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #333333;
          border: solid 1px #dcdcdc;
          .add-tip{
            font-size: 14px;
            color: #999999;
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
