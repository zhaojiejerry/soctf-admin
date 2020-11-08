<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="比赛成绩">
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
            <el-table-column prop="answer" align="center" label="解题数量" />
          </el-table>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRankingList } from '@/api/match'
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
      rankingList: []
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
        gameId: this.gameId,
        enable: 1
      }).then((res) => {
        that.rankingList = res.data
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
</style>