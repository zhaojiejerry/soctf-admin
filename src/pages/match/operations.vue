<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="比赛排名">
      <div id="details-content">
        <el-scrollbar style="height:100%">
          <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="rankingList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="rowNum" align="center" label="排名" />
            <el-table-column prop="gameText" align="center" label="头像">
              <template slot-scope="{row}">
                <img class="head" :src="row.portrait==null?'':row.portrait" alt="">
              </template>
            </el-table-column>
            <el-table-column v-if="type=='2'" prop="team_name" align="center" label="战队" />
            <el-table-column v-else prop="userName" align="center" label="姓名" />
            <el-table-column prop="score" align="center" label="成绩" />
            <el-table-column prop="mold" align="center" label="解题数量" />
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="viewList(scope.row.id)">查看答题列表</el-button>
                <el-button size="small" type="text" @click="hideContestUserScore(scope.row)">{{ scope.row.enable== 1?'隐藏成绩':'显示成绩' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showList" :show-close="false" title="答题列表">
      <div id="details-content">
        <el-scrollbar style="height:100%">
          <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="scoreViewList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="gameName" align="center" label="竞赛名称" />
            <el-table-column prop="challengeName" align="center" label="题目" />
            <el-table-column prop="resultScore" align="center" label="成绩">
              <template slot-scope="{row}">
                <el-input v-if="row.edit" v-model="row.resultScore" size="small" style=" width: calc(100% - 40px);" placeholder="请输入" />
                <span v-if="!row.edit" style="line-height: 32px;">{{ row.resultScore }}</span>
                <span v-if="!row.edit&&buttons.indexOf('39')!=-1" class="el-icon-edit-outline icon" @click="row.edit=true" />
                <span v-if="row.edit" class="el-icon-close icon" @click="getScoreViewList" />
                <span v-if="row.edit" class="el-icon-check icon" @click="modifyContestFinalScore(row)" />
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showList=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRankingList,
  getScoreViewList,
	modifyContestFinalScore,
	hideContestUserScore
} from '@/api/match'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    gameId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      rankingList: [],
			scoreViewList: [],
			showList: false,
			scoreId: ''
    }
	},
	computed: {
    buttons() {
      return this.$store.state.buttons
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getRankingList()
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    getRankingList() {
      var that = this
      getRankingList({
        gameId: this.gameId
      }).then((res) => {
        that.rankingList = res.data
      })
    },
    viewList(id) {
			this.scoreId = id
			this.getScoreViewList()
		},
		getScoreViewList() {
			var that = this
      getScoreViewList({
        scoreId: this.scoreId
      }).then((res) => {
				if (res.data) {
					res.data.forEach(element => {
						element.edit = false
					})
				}
				that.scoreViewList = res.data
				that.showList = true
      })
		},
		hideContestUserScore(row) {
			this.$confirm('是否要' + (row.enable == 1 ? '隐藏' : '显示') + '用户竞赛成绩?', '提示', {
        type: 'warning'
      })
        .then(() => {
          hideContestUserScore({
            scoreId: row.id
          }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.getRankingList()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    modifyContestFinalScore(row) {
      var that = this
			var arr = [{
				id: row.id,
				resultScore: row.resultScore,
				scoreId: row.scoreId
			}]
				this.$confirm('是否要修改用户竞赛成绩?', '提示', {
        type: 'warning'
      })
        .then(() => {
      modifyContestFinalScore(arr).then((res) => {
        if (res.success) {
					this.$message({
						type: 'success',
						message: '修改成功'
					})
					that.getScoreViewList()
				} else {
					this.$message({
						type: 'warning',
						message: res.message
					})
				}
			})
			})
    }
  }
}
</script>
<style  scoped>
.head {
  width: 41px;
  height: 41px;
  border-radius: 50%;
}
#details-content {
  width: 100%;
  height: 551px;
}
.icon{
	font-size: 17px;
	float: right;
	line-height: 32px;
}
</style>