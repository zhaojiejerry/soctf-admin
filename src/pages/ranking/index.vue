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
                <img v-if="scope.row.rowNum == 0" src="@/assets/images/medal1.png" alt="">
                <img v-else-if="scope.row.rowNum == 1" src="@/assets/images/medal2.png" alt="">
                <img v-else-if="scope.row.rowNum == 2" src="@/assets/images/medal3.png" alt="">
                <span v-else>{{ scope.row.rowNum }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="头像">
            <template slot-scope="scope">
              <div class="headimg">
                <img :src="scope.row.portrait==null?'@/assets/images/avater.jpeg':scope.row.portrait" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="名称" />
          <el-table-column prop="gold_coin" align="center" label="金币" />
          <el-table-column label="积分" align="center" prop="score" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getRankingList } from '@/api/user'
export default {
  data() {
    return {
      rankingList: []
    }
  },
  mounted() {
    this.getRankingList()
  },
  methods: {
    getRankingList() {
      getRankingList({
        enable: 1
      }).then((res) => {
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