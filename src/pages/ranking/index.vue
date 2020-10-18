<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>排行榜</span>
      </div>
      <div class="user-child-list">
        <el-table ref="subAccountListTable" :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="rankingList" class="list-table" tooltip-effect="dark">
          <el-table-column align="center" label="排行">
            <template slot-scope="scope">
              <div class="order">
                <img v-if="scope.row.rowNum == 1" src="@/assets/images/medal1.png" alt="">
                <img v-else-if="scope.row.rowNum == 2" src="@/assets/images/medal2.png" alt="">
                <img v-else-if="scope.row.rowNum == 3" src="@/assets/images/medal3.png" alt="">
                <span v-else>{{ scope.row.rowNum }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="头像">
            <template slot-scope="scope">
              <div class="headimg">
                <img :src="scope.row.portrait==null?'@/assets/images/avater.png':scope.row.portrait" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="名称" />
          <el-table-column prop="gold_coin" align="center" label="金币" />
          <el-table-column label="积分" align="center" prop="score" />
          <el-table-column fixed="right" align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="buttons.indexOf('25')!=-1" size="small" type="text" @click="hideUserScore(scope.row)">{{ scope.row.enable== 1?'隐藏成绩':'显示成绩' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getRankingList, hideUserScore } from '@/api/user'
export default {
  data() {
    return {
      rankingList: []
    }
	},
	computed: {
    buttons() {
      return this.$store.state.buttons
    }
  },
  mounted() {
    this.getRankingList()
  },
  methods: {
				hideUserScore(row) {
			this.$confirm('是否要' + (row.enable == 1 ? '隐藏' : '显示') + '用户竞赛成绩?', '提示', {
        type: 'warning'
      })
        .then(() => {
          hideUserScore({
            id: row.id
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
    getRankingList() {
      getRankingList().then((res) => {
        this.rankingList = res.data
      })
    }
  }
}
</script>
<style>
.order {
	display: inline-block;
	width: 23px;
	text-align: center;
	font-size: 18px;
	margin-right: 8px;
	line-height: 30px;

}
.order	img {
		width: 23px;
		height: 38px;
		vertical-align: text-top;
	}

.headimg {
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 30px;
	overflow: hidden;
	vertical-align: middle;

}
.headimg	img {
		width: 30px;
		height: 30px;
	}
</style>