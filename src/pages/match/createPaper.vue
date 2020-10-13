<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" :show-close="false" title="生成试卷">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="容器题" name="first">
          <docker ref="docker" />
        </el-tab-pane>
        <el-tab-pane label="附件题" name="second">
          <file ref="file" />
        </el-tab-pane>
        <el-tab-pane label="选择题" name="third">
          <choice ref="choice" />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="createPaperInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createPaperInfo } from '@/api/match'
import choice from './choice'
import docker from './docker'
import file from './file'
export default {
  components: { choice, docker, file },
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
			activeName: 'first',
      questions: []
    }
	},
	watch: {
		value(val) {
			if (val) {
				this.activeName = 'first'
				this.$nextTick(() => {
					this.$refs.docker.clearAll()
					this.$refs.file.clearAll()
					this.$refs.choice.clearAll()
				})
			}
		}
	},
  mounted() {},
  methods: {
		handleClick(tab, event) {
			// console.log(tab, event)
		},
    createPaperInfo() {
      var docker = this.$refs.docker.questions
			var file = this.$refs.file.questions
			var choice = this.$refs.choice.questions
      var questionIds = []
      docker.forEach((element) => {
        questionIds.push(element.id)
			})
			file.forEach((element) => {
        questionIds.push(element.id)
			})
			choice.forEach((element) => {
        questionIds.push(element.bankId)
			})
			if (questionIds.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择题目'
        })
        return
      }
      createPaperInfo({
        gameId: this.gameId,
        questionIds: questionIds
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '试卷生成成功'
          })
          this.close()
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    },
    close() {
      this.$emit('input', false)
    }
  }
}
</script>
<style>
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>
