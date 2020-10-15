<template>
  <div class="live">
    <el-dialog :visible.sync="value" width="70%" :show-close="false">
      <el-card shadow="never" style="margin-bottom: 15px;">
        <div slot="header" class="clearfix">
          <span>得分趋势展示图</span>
        </div>
        <div id="scorechart" />
      </el-card>
      <el-row :gutter="20">
        <el-col :span="15">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>比赛直播</span>
            </div>
            <div class="details-content">
              <el-scrollbar style="height:100%">
                <div v-for="(item,index) in noticeList" :key="index" class="line">
                  {{ item.createAt }} :
                  <span style="color:#E9852D">【{{ item.json.operator }}】</span>
                  <span style="color:#0DA0B4">{{ item.json.userName }}</span>
                  攻克了
                  <span style="color:#B59758">{{ item.json.questionName }}</span>
                  , 共耗时
                  <span style="color:#04b69d;">{{ item.json.time }}</span>
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </el-col>
        <el-col :span="9">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>排行榜</span>
            </div>
            <div class="details-content">
              <el-scrollbar style="height:100%">
                <el-table :data="rankingList" :show-header="false" highlight-current-row tooltip-effect="dark">
                  <el-table-column align="left">
                    <template slot-scope="scope">
                      <div class="order">
                        <img v-if="scope.row.rowNum == 1" src="@/assets/images/medal1.png" alt="">
                        <img v-else-if="scope.row.rowNum == 2" src="@/assets/images/medal2.png" alt="">
                        <img v-else-if="scope.row.rowNum == 3" src="@/assets/images/medal3.png" alt="">
                        <span v-else>{{ scope.row.rowNum }}</span>
                      </div>
                      <div class="headimg">
                        <img :src="scope.row.portrait==null?'@/assets/images/avater.png':scope.row.portrait" alt="">
                      </div>
                      <span class="name">{{ scope.row.userName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{ parseTime(scope.row.upd_time) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getIndexNotice, directSeeding, getRankingList } from '@/api/match';
import { parseTime } from '@/utils/index';
import echarts from 'echarts'; // 引入echarts
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
      noticeList: [],
      noticeTimer: '',
      rankingList: [],
      rankTimer: '',
      seedTimer: ''
    };
  },
  watch: {
    value(val) {
      if (val) {
        this.getIndexNotice();
        this.getRankingList();
        this.directSeeding();
        this.noticeTimer = setInterval(this.getIndexNotice, 5000);
        this.rankTimer = setInterval(this.getRankingList, 60000);
        this.seedTimer = setInterval(this.directSeeding, 1000 * 60 * 30);
      }
    }
  },
  methods: {
    parseTime(time) {
      return parseTime(time);
    },
    close() {
      this.$emit('input', false);
      setTimeout(() => {
        clearInterval(this.noticeTimer);
        clearInterval(this.rankTimer);
        clearInterval(this.seedTimer);
      }, 500);
    },
    directSeeding() {
      var that = this;
      directSeeding({
        gameId: this.gameId
      }).then((res) => {
        that.getEcharts(res.data);
      });
    },
    getEcharts(data) {
      var myChart = echarts.init(document.getElementById('scorechart'));
      var series = [];
      data.score.forEach((element) => {
        series.push({
          name: element.name,
          type: 'line',
          stack: '分数',
          data: element.data
        });
      });
      var option = {
				tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.time
        },
        yAxis: {
          type: 'value'
        },
        series: series
      };
      myChart.setOption(option);
    },
    getRankingList() {
      var that = this;
      getRankingList({
        gameId: this.gameId,
        enable: 1
      }).then((res) => {
        that.rankingList = res.data;
      });
    },
    getIndexNotice() {
      var that = this;
      getIndexNotice({
        gameId: this.gameId,
        pageNo: 1,
        pageSize: 15,
        type: '2'
      }).then((res) => {
        that.noticeList = res.data.records;
      });
    }
  }
};
</script>
<style >
.head {
  width: 41px;
  height: 41px;
  border-radius: 50%;
}
.details-content {
  width: 100%;
  height: 551px;
}
.live .el-dialog__header {
  padding: 0px;
  padding-bottom: 0px;
}
.order {
  display: inline-block;
  width: 23px;
  text-align: center;
  font-size: 18px;
  margin-right: 8px;
  line-height: 30px;
}
.order img {
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
.headimg img {
  width: 30px;
  height: 30px;
}

.name {
  display: inline-block;
  width: 100px;
  margin-left: 5px;
}

.time {
  float: right;
}
#scorechart {
  width: 100%;
  height: 300px;
}
</style>