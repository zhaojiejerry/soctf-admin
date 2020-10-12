<template>
  <div class="live">
    <el-dialog :visible.sync="value" width="70%" :show-close="false" title="用户比赛详情">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="总览" name="first">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>用户信息</span>
            </div>
            <div class="details-content">
              <el-row :gutter="20">
                <el-col :span="9">
                  <div class="bg-purple">
                    <img :src="userObj.portrait!=''?userObj.portrait:'@/assets/images/avater.png'" alt="头像">
                  </div>
                  <span style="color: rgba(181, 151, 88, 1);padding-left: 25px;  cursor: pointer;" @click="show=true"> [修改信息]</span>
                </el-col>
                <el-col :span="5">
                  <div class="bg-purple">
                    <p class="p1">{{ userObj.score }}</p>
                  </div>
                  <p class="p2">积分</p>
                </el-col>
                <el-col :span="5">
                  <div class="bg-purple">
                    <p class="p1">{{ userObj.rowNum }}</p>
                  </div>
                  <p class="p2">排名</p>
                </el-col>
                <el-col :span="5">
                  <div class="bg-purple">
                    <p class="p1">{{ userObj.gold_coin }}</p>
                  </div>
                  <p class="p2">金币</p>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card shadow="never" style="margin-top: 15px;">
            <div slot="header" class="clearfix">
              <span>个人技能雷达图</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div id="skill-chart" />
                <div id="skill-title">
                  <img src="@/assets/images/icon-06.png" alt>
                  <span>各项值</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div v-for="(item, index) in kdaList" :key="index" class="skill-item">
                  <span class="name">{{ item.category }}</span>
                  <img class="stars" src="@/assets/images/icon-07.png" alt>
                  <div class="progress">
                    <p :style="{width:(item.Count/item.allCount)*100+'%'}" />
                  </div>
                  <span class="billie">{{ fixed((item.Count/item.allCount)*100) }}%</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="历史战绩" name="second">
          <el-card shadow="never">
            <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="listRecords" class="list-table" tooltip-effect="dark">
              <el-table-column prop="name" align="center" label="题目" />
              <el-table-column align="center" label="耗时">
                <template slot-scope="{row}">
                  {{ formatSeconds(row.consumeTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="score" align="center" label="积分" />
              <el-table-column label="答题时间" align="center" prop="answerTime" />
            </el-table>
            <div class="pager-container mt30">
              <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                <el-button size="small" plain class="pagination-button">确定</el-button>
              </el-pagination>
            </div>
          </el-card>
          <el-card shadow="never" style="margin-top: 15px;">
            <div slot="header" class="clearfix">
              <span>近日做题趋势</span>
            </div>
            <div id="category-box" style="padding-top: 30px;">
              <div v-for="(item,index) in categoryList" :key="index" :class="type==item?'box-act':'category-box'" @click="getPersonalSkillRadarChart(item)">{{ item }}</div>
            </div>
            <div id="skill-chart2" />
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="比赛记录" name="third">
          <el-card shadow="never">
            <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="rankingList" class="list-table" tooltip-effect="dark">
              <el-table-column prop="gameName" align="center" label="比赛名称" />
              <el-table-column align="center" label="获得名次">
                <template slot-scope="{row}">
                  第 {{ row.ranking }} 名
                </template>
              </el-table-column>
              <el-table-column align="center" label="比赛类型">
                <template slot-scope="{row}">
                  {{ row.gameType=='1'?'个人':'团队' }}
                </template>
              </el-table-column>
              <el-table-column prop="answer" align="center" label="解题数量" />
              <el-table-column label="获得积分" align="center" prop="score" />
            </el-table>
            <div class="pager-container mt30">
              <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                <el-button size="small" plain class="pagination-button">确定</el-button>
              </el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="历史荣誉" name="fourth">
          <el-card shadow="never">
            <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="listRecord" class="list-table" tooltip-effect="dark">
              <el-table-column prop="gameName" align="center" label="比赛名称" />
              <el-table-column prop="answer" align="center" label="解题数量" />
              <el-table-column label="获得积分" align="center" prop="score" />
            </el-table>
            <div class="pager-container mt30">
              <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                <el-button size="small" plain class="pagination-button">确定</el-button>
              </el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
    <modify v-model="show" :add-sign="false" :rule-form="ruleForm" @getList="getUserInfoList" />
  </div>
</template>
<script>
import modify from './modify'
import echarts from 'echarts' // 引入echarts
import { getOverviewForUser, getHistoricalRecords, getPersonalSkillRadarChart, getCompetitionRecord, HistoricalHonor } from '@/api/user'
export default {
	components: { modify },
	props: {
		value: Boolean,
		ruleForm: {
      type: Object,
      default: () => {}
    }
	},
	data() {
		return {
			show: false,
			activeName: 'first',
			kdaList: [],
			userObj: {},
			categoryList: [],
			listRecords: [],
      total: 0,
			currentPage: 1,
			pageSize: 10,
			type: '',
			rankingList: [],
			listRecord: []
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.activeName = 'first'
				this.getOverviewForUser()
			}
		}
	},
	methods: {
		getUserInfoList() {
			this.$emit('getUserInfoList')
			if (this.activeName == 'first') {
				this.getOverviewForUser()
			}
		},
		handleClick(tab) {
			this.currentPage = 1
			this.getData()
		},
		getData() {
			switch (this.activeName) {
				case 'first': {
					this.getOverviewForUser()
					break
				}
					case 'second': {
						this.getHistoricalRecords()
						this.getPersonalSkillRadarChart(this.categoryList[0])
					break
				}
				case 'third': {
					this.getCompetitionRecord()
					break
				}
				case 'fourth': {
					this.HistoricalHonor()
					break
				}
			}
		},
		handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
		fixed(num) {
      return num.toFixed(2)
		},
		HistoricalHonor() {
      var that = this
      HistoricalHonor({
        pageNo: this.currentPage,
        pageSize: 9,
        userId: this.ruleForm.usrId
      }).then((res) => {
        if (res.success) {
          that.listRecord = res.data.records
          that.total = res.data.total
        }
      })
    },
		getCompetitionRecord() {
      var that = this
      getCompetitionRecord({
        pageNo: this.currentPage,
        pageSize: 20,
        userId: this.ruleForm.usrId
      }).then((res) => {
        that.rankingList = res.data.records
        that.total = res.data.total
      })
    },
		getOverviewForUser() {
      var that = this
      getOverviewForUser({
        userId: this.ruleForm.usrId
      }).then((res) => {
        if (res.success) {
          that.userObj = res.data.userInfo
          that.kdaList = res.data.kda
          that.getEcharts(res.data.kda)
          that.categoryList = []
          that.kdaList.forEach((item) => {
            that.categoryList.push(item.category)
          })
        }
      })
		},
		getEcharts(data) {
      var myChart = echarts.init(document.getElementById('skill-chart'))
      var indicator = []
      var series = []
      data.forEach((element) => {
        indicator.push({
          name: element.category,
          max: element.allCount
        })
        series.push(element.Count)
      })
      var option = {
        radar: {
          name: {
            textStyle: {
              color: '#888'
            }
          },
          indicator: indicator,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              color: '#888'
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#B59758'
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: series,
                name: '技能',
                lineStyle: {
                  color: '#B59758'
                },
                areaStyle: {
                  opacity: 0.3,
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    {
                      color: '#B59758',
                      offset: 0.3
                    },
                    {
                      color: '#B59758',
                      offset: 0.3
                    }
                  ])
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
		close() {
			this.$emit('input', false)
		},
		getHistoricalRecords() {
      var that = this
      getHistoricalRecords({
        category: '',
        difficultyLevel: '',
        name: '',
        pageNo: this.currentPage,
        pageSize: 10,
        userId: this.ruleForm.usrId
      }).then((res) => {
        if (res.success) {
          that.listRecords = res.data.records
          that.total = res.data.total
        }
      })
    },
    currentChange(val) {
      this.currentPage = val
      this.getHistoricalRecords()
    },
    getPersonalSkillRadarChart(type) {
      this.type = type
      var date = new Date()
      var time = date.getTime() - 6 * 24 * 60 * 60 * 1000
      var tragetTime = new Date(time)
      var that = this
      getPersonalSkillRadarChart({
        endTime: date,
        startTime: tragetTime,
        userId: this.ruleForm.usrId,
        category: type
      }).then((res) => {
        if (res.success) {
          that.getEcharts2(res.data)
        }
      })
    },
    formatSeconds(time) {
      const min = Math.floor(time % 3600)
      const val =
        Math.floor(time / 3600) +
        '时' +
        Math.floor(min / 60) +
        '分' +
        (time % 60) +
        '秒'
      return val
    },
    getEcharts2(data) {
      var myChart = echarts.init(document.getElementById('skill-chart2'))
      var xAxis = []
      var legend = []
      var series = []
      data.forEach((element) => {
        if (element.category != null) {
          series.push(element.count)
        } else {
          series.push(0)
        }
        if (xAxis.indexOf(element.date) == -1) {
          xAxis.push(element.date)
        }
      })
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend,
          textStyle: {
            color: '#B59757',
            fontSize: 14
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          axisLabel: {
            color: '#B59757',
            fontSize: 14
          },
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#B59757',
            fontSize: 14
          }
        },
        series: [
          {
            data: series,
            type: 'line',
            smooth: true,
            name: 'dd',
            itemStyle: {
              normal: {
                color: '#B59757', // 折线点的颜色
                lineStyle: {
                  color: '#B59757' // 折线的颜色
                }
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
	}
}
</script>
<style >
#category-box{
    text-align: center;
  }
#category-box  div{
	display: inline-block;
	font-size: 14px;
	color: #fff;
	margin: 0 15px;
	cursor: pointer;
}
#skill-chart2 {
	width: 100%;
	height: 413px;
}
.category-box {
  width: 126px;
  height: 27px;
  line-height: 27px;
  color: #b59757 !important;
  border: 1px solid #313537;
  background: #b5975817;
}
.p1{
	color: #0baac0;
  font-size: 20px;
}
.p2{
	text-align: center;
  width: 96px;
}
.box-act {
  width: 126px;
  height: 27px;
  background: #b59757;
  border: 1px solid #313537;
  line-height: 27px;
}
.bg-purple{
	background-image: url('../../assets/images/icon-head1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
	width: 96px;
  height: 96px;
	text-align: center;
  line-height: 96px;
	display: inline-block;
}
.bg-purple img{
	width: 70px;
	height: 70px;
	border-radius: 70px;
	vertical-align: middle;
}
#skill-chart {
	width: 378px;
	height: 324px;
}
#skill-title {
	text-align: center;
	margin-top: 40px;
}
#skill-title img {
	width: 33px;
	height: 33px;
	margin-right: 5px;
	vertical-align: middle;
}
#skill-title  span {
	font-size: 14px;
	font-family: FZLanTingHeiS-R-GB;
	font-weight: 400;
	vertical-align: middle;
}
.skill-item {
	display: flex;
	align-items: center;
}
.name {
	font-size: 16px;
	font-family: FZLanTingHeiS-R-GB;
	font-weight: 400;
	color: rgba(181, 151, 88, 1);
	margin-right: 20px;
	display: inline-block;
	width: 70px;
}
.stars {
	width: 79px;
	height: 75px;
	margin-right: -20px;
	position: relative;
	z-index: 1;
}
.progress {
	width: 250px;
	height: 20px;
	background: rgba(38, 47, 58, 1);
}
.progress	p {
		height: 100%;
		background: linear-gradient(
			270deg,
			rgba(181, 151, 88, 1) 0%,
			rgba(255, 245, 224, 1) 100%
		);
	}
.billie {
	font-size: 16px;
	font-family: FZLanTingHeiS-R-GB;
	font-weight: 400;
	color: rgba(181, 151, 88, 1);
	margin-left: 16px;
}
</style>