<template>
  <div>
    <el-dialog :visible.sync="value" width="70%" title="题目作答详情" @closed="close">
      <el-tabs v-model="mold" type="card" @tab-click="handleClick">
        <el-tab-pane label="练习" name="1" />
        <el-tab-pane label="个人赛" name="2" />
        <el-tab-pane label="团队赛" name="3" />
      </el-tabs>
      <el-card class="box-card">
        <div id="mypie" />
      </el-card>
      <el-card class="box-card mt30">
        <div>
          <el-table :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}" :cell-style="{fontSize: '12px'}" :data="tableList" class="list-table" tooltip-effect="dark">
            <el-table-column prop="gameName" align="center" label="用户名" />
            <el-table-column prop="answer" align="center" label="题目名" />
            <el-table-column prop="answer" align="center" label="提交的答案" />
            <el-table-column prop="answer" align="center" label="是否正确" />
            <el-table-column prop="answer" align="center" label="提交时间" />
          </el-table>
          <div class="pager-container mt30">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" :total="tableTotal" background size="small" layout="total,prev, pager, next, sizes, jumper, slot" @size-change="handleSizeChange" @current-change="handleCurrentChange">
              <el-button size="small" plain class="pagination-button">确定</el-button>
            </el-pagination>
          </div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'; // 引入echarts
import { getChoiceRstDetail, getChoiceStatistics } from '@/api/choice';
export default {
  props: {
		value: Boolean,
		mainId: {
			type: String,
			default: ''
		}
  },
  data() {
    return {
      tableList: [],
      tableTotal: 0,
      currentPage: 1,
			pageSize: 10,
			mold: '1'
    };
  },
  watch: {
    value(val) {
      if (val) {
				this.mold = '1'
        this.$nextTick(() => {
					this.getChoiceRstDetail();
					this.getChoiceStatistics()
        });
      }
    }
  },
  methods: {
		handleClick(tab, event) {
			console.log(tab, event);
				this.getChoiceRstDetail();
				this.getChoiceStatistics()
		},
		getChoiceRstDetail() {
      getChoiceRstDetail({
        currentPage: this.currentPage,
        extraParam: {
					mold: this.mold,
					questionId: this.mainId
				},
        pageSize: this.pageSize
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data;
          this.tableTotal = res.count;
        }
      });
		},
		getChoiceStatistics() {
			getChoiceStatistics({
        mold: this.mold,
        questionId: this.mainId
      }).then((res) => {
        if (res.success) {
					this.getEcharts(res.data)
        }
      });
		},
    close() {
      this.$emit('input', false);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getChoiceRstDetail();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getChoiceRstDetail();
    },
    getEcharts(data) {
      var myChart = echarts.init(document.getElementById('mypie'));
      var option = {
        title: {
          text: '题目正确率',
          left: 'center'
        },
        color: ['#B69858', '#d2d3d6'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['正确', '不正确']
        },
        series: [
          {
            type: 'pie',
            radius: '75%',
            center: ['50%', '55%'],
            data: [
              { value: data.correctCount ? data.correctCount : 0, name: '正确' },
              { value: data.errorCount ? data.errorCount : 0, name: '不正确' }
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