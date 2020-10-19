<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>作答详情</span>
      </div>
      <div id="mypie" />
      <div>
        <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="listRecord" class="list-table" tooltip-effect="dark">
          <el-table-column prop="gameName" align="center" label="用户名" />
          <el-table-column prop="answer" align="center" label="题目名" />
          <el-table-column prop="answer" align="center" label="提交的答案" />
          <el-table-column prop="answer" align="center" label="是否正确" />
          <el-table-column prop="answer" align="center" label="提交时间" />
        </el-table>
        <div class="pager-container mt30">
          <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="total" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'; // 引入echarts
export default {
  data() {
    return {
      listRecord: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  mounted() {
    this.getEcharts();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getEcharts() {
      var myChart = echarts.init(document.getElementById('mypie'));
      var option = {
        title: {
          text: '题目正确比',
          // subtext: '纯属虚构',
          left: 'center'
        },
        color: ['#B69858', '#d2d3d6'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['正确', '不正确']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 635, name: '正确' },
              { value: 310, name: '不正确' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>
<style>
#mypie {
  width: 100%;
  height: 300px;
}
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
</style>