
<template>
  <div class="finance">
    <wx-header>
      <span slot="headerTitle">财务统计</span>
      <div class="flex" slot="headerRight">
        <el-button v-if="btnPermissions.indexOf('1000401') != -1" type="primary" size="small" @click="$router.push('/order/list')">查看数据详情</el-button>
      </div>
    </wx-header>
    <div class="finance-container">
      <div class="finance-top">
        <ul>
          <li>
            <div class="title">
              <span class="text">今日收入</span>
              ￥<span class="money">{{todayMount.totalAmount}}</span>
            </div>
            <div class="line-progress">
              <div class="left-icon">
                <div class="left-icon-1"></div>
                <div class="left-icon-2"></div>
              </div>
              <div id="progress_1" style="width:100%;height:66px"></div>
              <div class="right-data">
                <el-tooltip :content="'￥ ' + todayMount.healthAmount" placement="top">
                  <span class="overflow-span">￥ {{todayMount.healthAmount}}</span>
                </el-tooltip>
                <el-tooltip :content="'￥ ' + todayMount.photoAmount" placement="bottom">
                  <span class="overflow-span">￥ {{todayMount.photoAmount}}</span>
                </el-tooltip>
              </div>
            </div>
          </li>
          <li>
            <div class="title">
              <span class="text">本周收入</span>
              ￥<span class="money">{{weekMount.totalAmount}}</span>
            </div>
            <div class="line-progress">
             <div class="left-icon">
                  <div class="left-icon-1"></div>
                  <div class="left-icon-2"></div>
              </div>
              <div id="progress_2" style="width:100%;height:66px"></div>
              <div class="right-data">
                <el-tooltip :content="'￥ ' + weekMount.healthAmount" placement="top">
                  <span class="overflow-span">￥ {{weekMount.healthAmount}}</span>
                </el-tooltip>
                <el-tooltip :content="'￥ ' + weekMount.photoAmount" placement="bottom">
                  <span class="overflow-span">￥ {{weekMount.photoAmount}}</span>
                </el-tooltip>
              </div>
            </div>
          </li>
          <li>
            <div class="title">
              <span class="text">本月收入</span>
              ￥<span class="money">{{monthMount.totalAmount}}</span>
            </div>
            <div class="line-progress">
              <div class="left-icon">
                <div class="left-icon-1"></div>
                <div class="left-icon-2"></div>
              </div>
              <div id="progress_3" style="width:100%;height:66px"></div>
              <div class="right-data">
                <el-tooltip :content="'￥ ' + monthMount.healthAmount" placement="top">
                  <span class="overflow-span">￥ {{monthMount.healthAmount}}</span>
                </el-tooltip>
                <el-tooltip :content="'￥ ' + monthMount.photoAmount" placement="bottom">
                  <span class="overflow-span">￥ {{monthMount.photoAmount}}</span>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="finance-bottom">
        <div class="bottom-title">
          <h2>收入变化趋势</h2>
          <el-popover
            placement="bottom"
            class="popoverStyle"
            width="124"
            trigger="click"
            v-model="popoverState"
            >
            <div class="typeStyle">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item ,index) in checkData" :key="index" :label="item.label" style="margin-left: 10px;margin-bottom:10px;">{{item.name}}</el-checkbox>
              </el-checkbox-group>
              <div class="styleButton" style="border-top:1px solid #ddd">
                <el-button type="text" @click="selectData">筛选</el-button>
                <el-button type="text" @click="resetselectData">重置</el-button>
              </div>
            </div>
            <el-button slot="reference" plain class="cateButton"></el-button>
          </el-popover>
          <div class="dataType">
             <el-button-group>
              <el-button :type=" state == 1 ? 'primary' : ''" round size="small" @click="dayFormat">天</el-button>
              <el-button :type=" state == 2 ? 'primary' : ''" round size="small" @click="weekFormat">周</el-button>
              <el-button :type=" state == 3 ? 'primary' : ''" round size="small" @click="monthFormat">月</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="right-tip">
          <el-button v-if="state == 1" class="pevButton" size="small" icon="el-icon-arrow-left" @click="pevDay"></el-button>
          <el-button v-if="state == 1 && dateNumber != 1" class="todayButton" size="small" @click="todayMethod" >今</el-button>
          <el-button v-if="state == 1" class="nextButton" size="small" icon="el-icon-arrow-right" @click="nextDay"></el-button>
          <el-button v-if="state == 2" class="pevButton" size="small" icon="el-icon-arrow-left" @click="pevWeek"></el-button>
          <el-button v-if="state == 2 && weekNumber != 1" class="todayButton" size="small" @click="weekFormat" >今</el-button>
          <el-button v-if="state == 2" class="nextButton" size="small" icon="el-icon-arrow-right" @click="nextWeek"></el-button>
          <el-button v-if="state == 3" class="pevButton" size="small" icon="el-icon-arrow-left" @click="pevMonth"></el-button>
          <el-button v-if="state == 3 && monthNumber != 1" class="todayButton" size="small" @click="monthFormat" >今</el-button>
          <el-button v-if="state == 3" class="nextButton"  size="small" icon="el-icon-arrow-right" @click="nextMonth"></el-button>
        </div>
        <div id="finance-echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import wxHeader from '@/components/header/index'
import moment from 'moment'
import { getfinanceApi } from '@/api/order.js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dateNumber: 0,
      weekNumber: 0,
      monthNumber: 0,
      state: 1,
      financeData: {},
      checkList: [1, 2, 3, 4, 5],
      TopData: [],
      todayMount: {},
      weekMount: {},
      monthMount: {},
      popoverState: false,
      checkData: [
        {label: 1, name: '总收入'},
        {label: 2, name: '体检收入'},
        {label: 3, name: '照相收入'},
        {label: 4, name: '体检支付单数'},
        {label: 5, name: '照相支付单数'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  components: {
    wxHeader
  },
  mounted () {
    this.dateNumber = 0
    this.$nextTick(() => {
      this.getTopData()
      this.todayMethod()
    })
    setTimeout(() => {
      this.echartsBarInit('progress_1', this.todayMount.photoAmount, this.todayMount.healthAmount)
      this.echartsBarInit('progress_2', this.weekMount.photoAmount, this.weekMount.healthAmount)
      this.echartsBarInit('progress_3', this.monthMount.photoAmount, this.monthMount.healthAmount)
    }, 500)
  },
  methods: {
    getTopData () {
      this.getTodayMount(1)
      this.getTodayMount(2)
      this.getTodayMount(3)
    },
    resetselectData () {
      this.checkList = [1, 2, 3, 4, 5]
      this.popoverState = false
      this.state == 1 && this.dayFormat()
      this.state == 2 && this.weekFormat()
      this.state == 3 && this.monthFormat()
    },
    getTodayMount (type) {
      var date1 = moment().subtract(0, 'Days').format('YYYY-MM-DD')
      var params = {
        dateType: type,
        startTime: date1,
        endTime: date1
      }
      getfinanceApi(params).then(res => {
        if (type == 1) {
          this.todayMount = res.data[0]
          // this.TopData[0] = this.todayMount
          // this.TopData[0].title = '今日收入'
        }
        if (type == 2) {
          this.weekMount = res.data[0]
          // this.TopData[1] = this.weekMount
          // this.TopData[1].title = '本周收入'
        }
        if (type == 3) {
          this.monthMount = res.data[0]
          // this.TopData[2] = this.monthMount
          // this.TopData[2].title = '本月收入'
        }
      })
    },
    selectData () {
      this.popoverState = false
      this.state == 1 && this.dayFormat()
      this.state == 2 && this.weekFormat()
      this.state == 3 && this.monthFormat()
    },
    getDataApi (dateType, startTime, endTime, arrTime) {
      var params = {
        dateType,
        startTime,
        endTime
      }
      getfinanceApi(params).then(res => {
        const sumArr = res.data.map((item) => {
          return item.totalAmount
        })
        const tjArr = res.data.map((item) => {
          return item.healthAmount
        })
        const photoArr = res.data.map((item) => {
          return item.photoAmount
        })
        const tjPage = res.data.map((item) => {
          return item.healthNum
        })
        const photoPage = res.data.map((item) => {
          return item.photoNum
        })
        this.financeData = {
          sumArr,
          tjArr,
          photoArr,
          tjPage,
          photoPage
        }
        let splitObj = {}
        let connectArr = [...this.financeData.tjPage, ...this.financeData.photoPage]
        let maxLeft = Math.max.apply(Math, connectArr)
        if (maxLeft < 10) {
          splitObj.max = 10
          splitObj.inter = 2
        } else {
          splitObj.max = Math.ceil(maxLeft * 1.1 / 100) * 100
          splitObj.inter = splitObj.max / 5
        }
        let maxRight = Math.max.apply(Math, this.financeData.sumArr)
        if (maxRight < 10) {
          splitObj.maxtwo = 10
          splitObj.intertwo = 2
        } else {
          splitObj.maxtwo = Math.ceil(maxRight * 1.1 / 1000) * 1000
          splitObj.intertwo = splitObj.maxtwo / 5
        }
        this.fEcharts('finance-echarts', arrTime, splitObj, this.financeData)
      })
    },
    dayFormat () {
      this.state = 1
      this.todayMethod()
    },
    weekFormat () {
      this.state = 2
      this.weekNumber = 1
      var weekTime = []
      var arrTime = []
      var weekOfday = moment().format('d')
      var monday
      var sunday
      for (var i = this.weekNumber - 1; i < (this.weekNumber + 5); i++) {
        if (i == 0) {
          monday = moment().subtract(weekOfday - 0 - 1, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else if (i == 1) {
          monday = moment().subtract(weekOfday - 0 + 6, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else {
          monday = moment().subtract(weekOfday - 0 + 6 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        }
      }
      this.getDataApi(this.state, weekTime[0].monday, weekTime[weekTime.length - 1].sunday, arrTime)
    },
    pevWeek () {
      var res = this.getWeek()
      this.getDataApi(this.state, res.weekTime[0].monday, res.weekTime[res.weekTime.length - 1].sunday, res.arrTime)
    },
    getWeek () {
      var arrTime = []
      var weekTime = []
      var weekOfday = moment().format('d')
      var monday
      var sunday
      for (var i = this.weekNumber; i < (this.weekNumber + 7); i++) {
        if (i == 0) {
          monday = moment().subtract(weekOfday - 0 - 1, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else if (i == 1) {
          monday = moment().subtract(weekOfday - 0 + 6, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else {
          monday = moment().subtract(weekOfday - 0 + 6 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        }
      }
      this.weekNumber++
      return {
        arrTime,
        weekTime
      }
    },
    nextWeek () {
      if (this.weekNumber == 1) {
        this.$message.warning('已是最新日期')
        return
      }
      var res = this.getNextWeek()
      this.getDataApi(this.state, res.weekTime[0].monday, res.weekTime[res.weekTime.length - 1].sunday, res.arrTime)
    },
    getNextWeek () {
      var arrTime = []
      var weekTime = []
      var weekOfday = moment().format('d')
      var monday
      var sunday
      for (var i = this.weekNumber - 2; i < (this.weekNumber + 5); i++) {
        if (i == 0) {
          monday = moment().subtract(weekOfday - 0 - 1, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else if (i == 1) {
          monday = moment().subtract(weekOfday - 0 + 6, 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0, 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        } else {
          monday = moment().subtract(weekOfday - 0 + 6 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          sunday = moment().subtract(weekOfday - 0 + 7 * (i - 1), 'days').format('YYYY-MM-DD')
          arrTime.unshift(monday.slice(5) + '~' + sunday.slice(5))
          weekTime.unshift({
            monday,
            sunday
          })
        }
      }
      this.weekNumber--
      return {
        arrTime,
        weekTime
      }
    },
    monthFormat () {
      this.state = 3
      var monthTime = []
      var res = []
      this.monthNumber = 1
      for (var i = this.monthNumber - 1; i < (this.monthNumber + 6); i++) {
        var month = moment().subtract(i, 'month').format('YYYY-MM-DD')
        res.unshift(month.slice(0, 7) + '月')
        monthTime.unshift(month)
      }
      this.getDataApi(this.state, monthTime[0], monthTime[monthTime.length - 1], res)
    },
    pevMonth () {
      var res = this.getMonth()
      this.getDataApi(this.state, res.monthTime[0], res.monthTime[res.monthTime.length - 1], res.res)
    },
    getMonth () {
      var res = []
      var monthTime = []
      for (var i = this.monthNumber; i < (this.monthNumber + 7); i++) {
        var month = moment().subtract(i, 'month').format('YYYY-MM-DD')
        res.unshift(month.slice(0, 7) + '月')
        monthTime.unshift(month)
      }
      this.monthNumber++
      return {
        monthTime,
        res
      }
    },
    nextMonth () {
      if ((this.monthNumber - 1) == 0) {
        this.$message.warning('已是最新日期')
        return
      }
      var res = this.getNextMonth()
      this.getDataApi(this.state, res.monthTime[0], res.monthTime[res.monthTime.length - 1], res.res)
    },
    getNextMonth () {
      var res = []
      var monthTime = []
      for (var i = this.monthNumber - 2; i < (this.monthNumber + 5); i++) {
        var month = moment().subtract(i, 'month').format('YYYY-MM-DD')
        res.unshift(month.slice(0, 7) + '月')
        monthTime.unshift(month)
      }
      this.monthNumber--
      return {
        monthTime,
        res
      }
    },
    pevDay () {
      var res = this.getTime()
      this.getDataApi(this.state, res.resTime[0], res.resTime[res.resTime.length - 1], res.res)
    },
    nextDay () {
      if ((this.dateNumber - 1) == 0) {
        this.$message.warning('已是最新日期')
        return
      }
      var res = this.nextTime()
      this.getDataApi(this.state, res.resTime[0], res.resTime[res.resTime.length - 1], res.res)
    },
    todayMethod () {
      this.dateNumber = 1
      const res = []
      const resTime = []
      for (var i = this.dateNumber - 1; i < (this.dateNumber + 6); i++) {
        var date1 = moment().subtract(i, 'Days').format('YYYY-MM-DD')
        res.unshift(date1.slice(5))
        resTime.unshift(date1)
      }
      this.getDataApi(this.state, resTime[0], resTime[resTime.length - 1], res)
    },
    fEcharts (id, xData, yObject, financeData) {
      var myChart = this.$echarts.init(document.getElementById(id))
      var app = {}
      var option = {
        title: {
          x: 60,
          y: 0,
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          },
          formatter: (params, ticket, callback) => {
            var imgUrl1 = require('../../assets/images/mount.png')
            var imgUrl2 = require('../../assets/images/health.png')
            var imgUrl3 = require('../../assets/images/photo.png')
            var res = `<div style="padding:5px;line-height:2;">
                        <span style="font-weight:bold;display:block;">${params[0].name}</span>
                        <span style="display:block; padding-left:25px; background:url(${imgUrl1}) center left no-repeat">${this.financeData.sumArr[params[0].dataIndex] + '元'}</span>
                        <span style="display:block; padding-left:25px; background:url(${imgUrl2}) center left no-repeat">${this.financeData.tjArr[params[0].dataIndex] + '元 | ' + this.financeData.tjPage[params[0].dataIndex] + ' 单'}</span>
                        <span style="display:block; padding-left:25px; background:url(${imgUrl3}) center left no-repeat">${this.financeData.photoArr[params[0].dataIndex] + '元 | ' + this.financeData.photoPage[params[0].dataIndex] + ' 单'}</span>
                      </div>`
            return res
          },
          backgroundColor: 'rgba(255,255,255,1)',
          textStyle: {
            color: '#333',
            fontSize: 12
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['总收入', '体检收入', '照相收入', '已支付体检单数', '已支付照相单数'],
          selected: {
            '总收入': this.checkList.indexOf(1) !== -1,
            '体检收入': this.checkList.indexOf(2) !== -1,
            '照相收入': this.checkList.indexOf(3) !== -1,
            '已支付体检单数': this.checkList.indexOf(4) !== -1,
            '已支付照相单数': this.checkList.indexOf(5) !== -1
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            offset: 10,
            type: 'category',
            boundaryGap: true,
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(253,119,21,0.1)'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 14,
                color: '#333'
              }
            },
            data: xData
          },
          {
            type: 'category',
            boundaryGap: true,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '数量（单）',
            max: yObject.max,
            min: 0,
            interval: yObject.inter,
            boundaryGap: [0.2, 0.2],
            splitNumber: 6, // Y 轴分隔格数
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
            // splitLine: {
            //     show: false
            // }
          },
          {
            type: 'value',
            scale: true,
            name: '收入（元）',
            max: yObject.maxtwo,
            min: 0,
            interval: yObject.intertwo,
            boundaryGap: [0.2, 0.2],
            splitNumber: 6, // Y 轴分隔格数
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '总收入',
            yAxisIndex: 1,
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#f56f2d',
                lineStyle: {
                  color: '#f56f2d',
                  width: 3
                }
              }
            },
            data: financeData.sumArr
          },
          {
            name: '体检收入',
            yAxisIndex: 1,
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#2dacf5',
                lineStyle: {
                  color: '#2dacf5',
                  width: 3
                }
              }
            },
            data: financeData.tjArr
          },
          {
            name: '照相收入',
            yAxisIndex: 1,
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#f5b12d',
                lineStyle: {
                  color: '#f5b12d',
                  width: 3
                }
              }
            },
            data: financeData.photoArr
          },
          {
            name: '已支付体检单数',
            type: 'bar',
            barWidth: 12,
            barMaxWidth: 12,
            yAxisIndex: 0,
            data: financeData.tjPage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: '#8fd2f8'
              }
            }
          },
          {
            name: '已支付照相单数',
            type: 'bar',
            barWidth: 12,
            barMaxWidth: 12,
            yAxisIndex: 0,
            data: financeData.photoPage,
            itemStyle: {
              emphasis: {
                barBorderRadius: 3
              },
              normal: {
                barBorderRadius: [6, 6, 0, 0],
                color: '#fbd790'
              }
            }
          }
        ]
      }
      myChart.setOption(option, true)
      const _this = this
      myChart.on('legendselectchanged', function (obj) {
        var selected = obj.selected
        _this.checkList = []
        if (selected['总收入']) {
          _this.checkList.push(1)
        }
        if (selected['体检收入']) {
          _this.checkList.push(2)
        }
        if (selected['照相收入']) {
          _this.checkList.push(3)
        }
        if (selected['已支付体检单数']) {
          _this.checkList.push(4)
        }
        if (selected['已支付照相单数']) {
          _this.checkList.push(5)
        }
      })
    },
    getTime () {
      var res = []
      var resTime = []
      for (var i = this.dateNumber; i < (this.dateNumber + 7); i++) {
        var date1 = moment().subtract(i, 'Days').format('YYYY-MM-DD')
        res.unshift(date1.slice(5))
        resTime.unshift(date1)
      }
      this.dateNumber++
      return {
        resTime,
        res
      }
    },
    nextTime () {
      var res = []
      var resTime = []
      for (var i = this.dateNumber - 2; i < (this.dateNumber + 5); i++) {
        var date1 = moment().subtract(i, 'Days').format('YYYY-MM-DD')
        res.unshift(date1.slice(5))
        resTime.unshift(date1)
      }
      this.dateNumber--
      return {
        resTime,
        res
      }
    },
    echartsBarInit (element, dataArr1, dataArr2) {
      if (dataArr2 >= 0) {
        var dataArr3 = 100
      }
      if (dataArr1 >= 0 && dataArr2 >= 0) {
        var dataArr4 = dataArr1 / dataArr2 * 100
      }
      var self = this
      self.chart = self.$echarts.init(document.getElementById(element))
      self.chart.setOption(
        {
          grid: {
            left: '10',
            top: '10',
            right: '10',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
          },
          yAxis: {
            type: 'category',
            axisTick: {show: false},
            axisLine: {show: false},
            minInterval: 2,
            maxInterval: 2,
            axisLabel: {
              color: '#000',
              fontSize: 12
            }
          },
          series: [
            {
              name: '%',
              type: 'bar',
              barWidth: 10,
              data: [dataArr4, dataArr3],
              label: {
                show: false,
                position: 'right',
                offset: [0, 0],
                formatter: '￥{c}',
                color: '#fd7715',
                fontSize: 12
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: function (params) {
                    var colorList = ['#f5b12d', '#2dacf5']
                    return colorList[params.dataIndex]
                  }
                }
              },
              zlevel: 1
            },
            {
              name: '进度条背景',
              type: 'bar',
              barGap: '-100%',
              barWidth: 12,
              data: [100, 100],
              color: 'none',
              itemStyle: {
                normal: {
                  barBorderRadius: 10
                }
              }
            }
          ]
        })
    }
  }
}
</script>
<style lang="scss" scoped>

@media screen and (max-width: 1368px) {
  #finance-echarts{
    width:100%;
    height:300px;
  }
}
@media screen and (min-width: 1369px) and (max-width: 1600px) {
  #finance-echarts{
    width:100%;
    height:360px;
  }
}
@media screen and (min-width: 1601px) and (max-width: 1700px) {
  #finance-echarts{
    width:100%;
    height:400px;
  }
}
@media screen and (min-width: 1701px){
  #finance-echarts{
    width:100%;
    height:460px;
  }
}
.finance{
  overflow: auto;
  .finance-container{
    margin-top:60px;
    width:100%;
    .finance-top{
      margin:24px;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        li{
          flex: 1;
          margin:6px 12px;
          display: inline-block;
          background:#fff;
          height:157px;
          border-radius:12px;
          box-shadow: 0 0 10px #ddd;
          padding:32px;
          box-sizing:border-box;
          .title{
            margin-bottom: 0;
            color:#fd7715;
            .text{
              color:#333;
              font-size:20px;
              font-weight:bold;
            }
            .money{
              font-size:38px;
              font-weight:bold;
              font-family: 'Rubik';
              line-height:1;
            }
          }
          .line-progress{
            display: flex;
            align-items: center;
            #progress_1,#progress_2,#progress_3{
              flex:1
            }
            .left-icon{
              width:20px;
              .left-icon-1{
                width:18px;
                height:18px;
                margin-bottom: 0px;
                margin-top:3px;
                background:url(../../assets/images/health.png) center center no-repeat;
              }
              .left-icon-2{
                width:18px;
                height:18px;
                margin-top: 15px;
                background:url(../../assets/images/photo.png) center center no-repeat;
              }
            }
            .right-data{
              width:60px;
              color:#fd7715;
              line-height:2;
              margin-top:8px;
              .overflow-span {
                white-space: nowrap;
                display: inline-block;
                max-width: 80px;
                overflow: hidden;
                vertical-align:top;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    .finance-bottom{
      position:relative;
      margin:24px 36px;
      margin-top:22px;
      border-radius:12px;
      box-shadow: 0 0 10px #ddd;
      background:#fff;
      padding:20px;
      padding-top:40px;
      .bottom-title{
        overflow: hidden;
        .popoverStyle{
          padding:13px;
          width:124px;
        }
        .typeStyle {
          .styleButton {
            border-top:1px solid #dcdcdc !important;
            .el-button{
              color:#666 !important;
            }
          }
          .el-checkbox{
            margin:6px 0 !important;
          }
        }
        h2{
          width:140px;
          margin:0 !important;
          float:left;
          font-size:20px;
          margin-left:60px;
          font-weight: bold;
          color:#333;
        }
        .cateButton{
          float: left;
          width:24px;
          height:24px;
          padding:0 !important;
          background:url(../../assets/images/type.png) center center no-repeat;
          &:hover,&:active,&:focus{
            background:url(../../assets/images/type_on.png) center center no-repeat;
          }
        }
        .dataType{
          float: right;
          margin-right:80px;
        }
      }
      .right-tip{
        position:absolute;
        z-index: 1;
        right:20px;
        left:20px;
        bottom:46px;
        padding-left:60px;
        padding-right:60px;
        .pevButton{
          float: left;
          padding:0 !important;
          width:34px;
          height:24px;
          line-height:24px;
          text-align: center
        }
        .nextButton{
          float: right;
          padding:0 !important;
          width:34px;
          height:24px;
          line-height:24px;
          text-align: center
        }
        .todayButton{
          float: right;
          padding:0 !important;
          width:34px;
          height:24px;
          line-height:24px;
          text-align: center
        }
      }
    }
  }
}
</style>
