<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="比赛说明">
      <div id="details-content">
        <el-scrollbar style="height:100%">
          <pdf v-if="fileType == 'pdf'" :src="urlArr" />
          <div v-else style="white-space: pre-wrap;text-align: left;" v-html="gameList" />
        </el-scrollbar>
      </div>
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
      fileType: 'md'
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getGameOssFile()
      }
    }
  },
  mounted() {
    // this.getGameOssFile()
  },
  methods: {
    close() {
      this.$emit('input', false)
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
