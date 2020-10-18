<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="比赛说明">
      <div id="details-content">
        <el-scrollbar ref="myscrollbar" style="height:100%">
          <pdf v-if="fileType == 'pdf'" :src="urlArr" />
          <div v-else style="white-space: pre-wrap;text-align: left;" v-html="gameList" />
        </el-scrollbar>
      </div>
      <p v-if="fileType == 'pdf'" class="arrow" style="color:#cfc092;margin: 10px;text-align: right;">
        <span :style="{cursor: currentPage==1?'not-allowed':'pointer',color: currentPage==1?'gray':''}" @click="changePdfPage(0)">上一页</span>
        <span style="padding: 0 15px;">{{ currentPage }} / {{ pageCount }}</span>
        <span :style="{cursor: currentPage==pageCount?'not-allowed':'pointer',color: currentPage==pageCount?'gray':''}" @click="changePdfPage(1)">下一页</span>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGameOssFile } from '@/api/match'
import { getjson } from '@/api/common'
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gameId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      gameList: '',
      urlArr: '',
			fileType: 'md',
			currentPage: 0, // pdf文件页码
				pageCount: 0
				}
  },
  watch: {
    value(val) {
      if (val) {
        this.getGameOssFile()
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
		},
				changePdfPage(val) {
				// console.log(val)
				this.$refs.myscrollbar.wrap.scrollTop = 0
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
          // console.log(this.currentPage)
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
          // console.log(this.currentPage)
        }
      },

      // pdf加载时
      loadPdfHandler(e) {
				this.$refs.myscrollbar.wrap.scrollTop = 0
        this.currentPage = 1 // 加载的时候先加载第一页
      },
    getGameOssFile() {
      var that = this
      getGameOssFile({
        gameId: this.gameId,
        type: 1
      }).then((res) => {
        if (res.data) {
          var urlArr = res.message.split('/')
          urlArr.splice(0, 3)
          var fileArr = urlArr[urlArr.length - 1].split('.')
          that.fileType = fileArr[fileArr.length - 1]
          that.urlArr = '/jsonApi/' + urlArr.join('/')
          getjson('/' + urlArr.join('/')).then((res) => {
            that.gameList = res
          })
        }
      })
    }
  }
}
</script>
<style  scoped>
#details-content {
  width: 100%;
  height: 551px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-top: 31px;
  padding: 25px 30px;
  position: relative;
}
</style>