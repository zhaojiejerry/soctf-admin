<template>
  <div class="check-bill">
    <wx-header>
      <span slot="headerTitle">对账统计</span>
    </wx-header>
    <div class="hb-main-container">
      <div class="hb-main-content flex flex-column">
        <div class="headerSearch">
          <div class="filter-container">
            <el-date-picker
              prefix-icon="iconfont icon-calendar"
              size="small"
              class="reset-input mr15 mb15 bill"
              type="daterange"
              v-model="timeRange"
              range-separator="至"
              @change="timeFilterChange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
            <div class="select mr15">
              <el-select
                ref="headerSort"
                size="small"
                popper-class="header-sort-select"
                v-model="processedStatusValue"
                @change="filterChangeData"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="headerCount">
              <span>
                异常订单
                <span class="number">{{billCount.total || 0}}</span>条, 已处理
                <span class="number">{{billCount.processed || 0}}</span>条, 未处理
                <span class="number">{{billCount.unProcessed || 0}}</span>条
              </span>
            </div>
          </div>
          <el-button
            size="small"
            type="primary"
            @click="exportExcelData"
            style="width:80px;letter-spacing: 10px; text-indent: 7px;align-self: flex-start;"
          >导出</el-button>
        </div>
        <el-table
          :data="billList"
          :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold',fontSize: '12px'}"
          :cell-style="{fontSize: '12px'}"
          tooltip-effect="dark"
          height="100%"
          @sort-change="handleSortChange"
          :header-row-style="{height:'50px'}"
          style="margin-top: 5px"
        >
          <el-table-column align="center">
            <template slot="header">
              <span style="font-size: 14px">体检机支付数据</span>
            </template>
            <el-table-column
              prop="localPartner"
              label="商户号"
              sortable="custom"
              align="left"
              show-overflow-tooltip
              class-name="no-border-right"
            ></el-table-column>
            <el-table-column prop="channel" label="支付方式" width="70px" class-name="no-border-right">
              <template slot-scope="scope">
                <span v-if="scope.row.channel == 0">支付宝</span>
                <span v-if="scope.row.channel == 1">微信</span>
                <span v-if="scope.row.channel == 2">银联商务</span>
                <span v-if="scope.row.channel == 4">农业银行</span>
                <span v-if="scope.row.channel == 3">工商银行</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="localOrderId"
              label="订单编号"
              show-overflow-tooltip
              class-name="no-border-right"
            ></el-table-column>
            <el-table-column prop="localPaymentStatusStr" label="支付状态" class-name="no-border-right"></el-table-column>
            <el-table-column prop="localPaymentAmount" label="金额" width="50px"></el-table-column>
          </el-table-column>
          <el-table-column prop="date" label>
            <el-table-column label="处理状态" prop="processedStatus" width="130px">
              <template slot-scope="scope">
                <div class="dealStatus" v-if="scope.row.processedStatus == '2' ">
                  <div class="point"></div>
                  <span style="padding-left: 6px">已处理</span>
                  <el-button
                    @click="billInfo(scope.row)"
                    type="text"
                    style="padding-left: 10px; color: rgb(64, 158, 255);font-size: 12px;"
                  >详情</el-button>
                </div>
                <div class="unDealStatus" v-if="scope.row.processedStatus == '1' ">
                  <div class="darkPoint"></div>
                  <span style="padding-left: 6px">未处理</span>
                  <el-button
                    @click="handleBill(scope.row)"
                    type="text"
                    style="padding-left: 10px; color: rgb(64, 158, 255);font-size: 12px;"
                  >处理</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <template slot="header">
              <span style="font-size: 14px">第三方支付数据</span>
            </template>
            <el-table-column
              prop="thirdOrderId"
              label="第三方支付单号"
              show-overflow-tooltip
              width="250px"
              class-name="no-border-right"
            ></el-table-column>
            <el-table-column prop="thirdPaymentStatusStr" label="支付状态" class-name="no-border-right"></el-table-column>
            <el-table-column
              prop="thirdPaymentAmount"
              label="金额"
              width="50px"
              class-name="no-border-right"
            ></el-table-column>
            <el-table-column
              prop="createDate"
              label="创建时间"
              width="150px"
              class-name="no-border-right"
            ></el-table-column>
          </el-table-column>
        </el-table>
        <div class="pager-container mt30" style="margin-top: 50px">
          <el-pagination
            v-if="totalNum != 0"
            background
            size="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            layout="prev, pager, next, sizes, jumper, slot"
            :total="totalNum"
          >
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="处理异常"
      :visible.sync="DealDialogVisible"
      width="453px"
      custom-class="check-bill-dialog"
      center
      style="text-align: center"
      @close="resetForm"
    >
      <div class="billDealInfo">
        <el-form :model="form" :rules="rules" label-width="100px" ref="EditForm">
          <el-form-item label="处理方式：" prop="processedDetail" style="font-size: 12px;">
            <template>
              <el-radio v-model="form.processedDetail" label="1">处理异常</el-radio>
              <el-radio v-model="form.processedDetail" label="2">挂起异常</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="处理人：" prop="updateBy">
            <el-input style="width: 80%" v-model="form.updateBy" placeholder="请填写处理人"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="processedRemark">
            <el-input
              type="textarea"
              placeholder="请填写备注信息"
              style="width: 80%;height: 70px"
              resize="none"
              v-model="form.processedRemark"
            ></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button
              type="primary"
              size="small"
              @click="updateBill"
              style="display: inline-block"
            >{{this.form.processedDetail == 2 ? `挂起`:`同步`}}</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="InfoDialogVisible" title="处理详情" width="30%" center>
      <div class="billDealInfo">
        <div class="dealMethod">
          <label>处理方式：</label>
          <template>
            <span>{{processedDetail == '1'?'同步':'挂起异常'}}</span>
          </template>
        </div>
        <div class="dealTime">
          <label>处理时间：</label>
          <span>{{updateDate}}</span>
        </div>
        <div class="dealPerson">
          <label>处理人：</label>
          <span>{{updateBy}}</span>
        </div>
        <div class="dealRemark">
          <label>备注：</label>
          <span>{{processedRemark}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import { getBillList, getBillCount, updateBill } from '@/api/order.js'
import moment from 'moment'
import constant from '@/api/api'
import {exportExcel} from '@/utils/exportExcel'

export default {
  components: {
    wxHeader
  },
  data () {
    return {
      orderType: 'DESC', // 排序规则 ASC
      form: {
        updateBy: '',
        processedDetail: '1',
        processedRemark: ''
      },
      rules: {
        updateBy: [
          { required: true, message: '请输入处理人' }
        ],
        processedRemark: [
          { required: true, message: '请填写备注' }
        ]
      },
      id: '',
      localOrderId: '',
      DealDialogVisible: false,
      InfoDialogVisible: false,
      timeRange: [], // 时间段
      billList: [],
      processedStatus: '',
      totalNum: '',
      currentPage: 1,
      pageSize: 10,
      updateBy: '',
      updateDate: '',
      processedDetail: '',
      processedRemark: '',
      processedStatusValue: '',
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未处理'
      }, {
        value: '2',
        label: '已处理'
      }],
      billCount: {
        unProcessed: '',
        processed: '',
        total: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'btnPermissions'
    ])
  },
  methods: {
    handleSortChange (obj) {
      if (!obj.order || obj.order == 'descending') {
        this.orderType = 'DESC'
      } else {
        this.orderType = 'ASC'
      }
      this.handleSearch()
    },
    exportExcelData () {
      this.formData = {
        processedStatus: this.processedStatus,
        orderType: this.orderType,
        startTime: this.timeRange.length > 0 ? this.timeRange[0] : '',
        endTime: this.timeRange.length > 0 ? this.timeRange[1] : ''
      }
      exportExcel('/api' + constant.exportBill, this.formData)
      // exportBill(this.formData).then(res => {
      //   if (res.code == 0) {
      //     this.$message({
      //       type: 'success',
      //       message: '导出成功'
      //     })
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'error',
      //     message: '导出失败'
      //   })
      // })
    },
    updateBill () {
      this.$refs.EditForm.validate(valid => {
        if (valid) {
          let formData = {
            id: this.id,
            localOrderId: this.localOrderId,
            updateBy: this.form.updateBy,
            processedDetail: this.form.processedDetail,
            processedRemark: this.form.processedRemark
          }
          this.$confirm(`${this.form.processedDetail == 2 ? `请确认是否挂起` : `请确认是否同步`}`, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            customClass: 'check-bill-confirm',
            showClose: false,
            center: true
          }).then(() => {
            this.saveLoading = true
            updateBill(formData).then((res) => {
              this.saveLoading = false
              if (res.code == 0) {
                this.disableSubmit = true
                this.$message({
                  type: 'success',
                  duration: 2000,
                  message: res.msg,
                  onClose: () => {
                    this.DealDialogVisible = false
                    this.handleSearch()
                    this.handleCount()
                  }
                })
              } else {
                this.saveLoading = false
              }
            }).catch(() => {
              this.saveLoading = false
            })
          }).catch(() => {
          })
        }
      })
    },
    resetForm () {
      this.$refs.EditForm.resetFields()
    },
    handleBill (row) {
      this.id = row.id
      this.DealDialogVisible = true
      this.localOrderId = row.localOrderId
    },
    billInfo (row) {
      this.updateBy = row.updateBy
      this.updateDate = row.updateDate
      this.processedDetail = row.processedDetail
      this.processedRemark = row.processedRemark
      this.InfoDialogVisible = true
    },
    filterChangeData (val) {
      this.processedStatus = this.processedStatusValue
      this.currentPage = 1
      this.handleSearch()
    },
    timeFilterChange () {
      this.currentPage = 1
      this.handleSearch()
    },

    handleSearch () {
      const this_ = this
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        target: document.querySelector('tbody')
      })
      this.formData = {
        processedStatus: this.processedStatus,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : '',
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : '',
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        orderType: this.orderType
      }
      getBillList(this.formData).then((res) => {
        loading.close()
        if (res.code == 0) {
          this_.billList = res.list
          this_.totalNum = parseInt(res.totalCount)
        }
      }).catch(() => {
        loading.close()
      })
    },
    handleCount () {
      const this_ = this
      this.formData = {
        processedStatus: this.processedStatus,
        startTime: (this.timeRange && this.timeRange.length > 0) ? this.timeRange[0] : '',
        endTime: this.timeRange && this.timeRange.length > 0 ? this.timeRange[1] : ''
      }
      getBillCount(this.formData).then((res) => {
        if (res.code == 0) {
          this_.billCount = res.data
        }
      }).catch(() => {
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.handleSearch()
    }
  },
  created () {
    this.handleSearch()
    this.handleCount()
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.check-bill {
  text-align: center;
  .el-table thead.is-group tr:first-child th {
    background: #fff !important;
  }
  .dealStatus {
    display: flex;
    flex-direction: row;
    display: inline-block;
    .point {
      border-radius: 50%;
      background-color: rgb(103, 194, 58);
      width: 12px;
      height: 12px;
      z-index: 210;
      display: inline-block;
    }
  }
  .unDealStatus {
    display: flex;
    flex-direction: row;
    display: inline-block;
    .darkPoint {
      border-radius: 50%;
      background-color: rgb(204, 204, 204);
      width: 12px;
      height: 12px;
      z-index: 210;
      display: inline-block;
    }
  }
  .headerSearch {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span {
    }
    .el-button + .el-button {
      margin-left: 0;
    }
    .filter-container {
      display: flex;
      flex-direction: row;
      .select {
        width: 120px;
      }
      .bill {
        width: 240px;
      }
    }
  }

  .headerTime {
    margin-top: 40px;
  }

  .headerCount {
    span {
      line-height: 30px;
      vertical-align: top;
      display: inline-block;
    }
    .number {
      color: #fd7715;
      font-weight: bold;
    }
  }
  .checkPager {
    display: flex;
    justify-content: center;
  }
  .el-dialog--center {
    text-align: left;
  }
  .billDealInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    label {
      font-size: 12px;
      color: rgb(102, 102, 102);
      text-align: right;
      width: 80px;
      display: inline-block;
    }
    .dealMethod {
      span {
        font-size: 12px;
        color: rgb(253, 119, 21);
      }
    }
    .el-textarea__inner {
      height: 70px;
      font-size: 12px;
    }
    .dealRemark {
      margin-top: 25px;
      font-size: 12px;
      display: flex;
      span {
        bottom: 110px;
        display: inline-block;
      }
      label {
        flex: 0 0 80px;
      }
    }
    .dealTime {
      margin-top: 25px;
      font-size: 12px;
    }
    .dealPerson {
      margin-top: 25px;
      font-size: 12px;
    }
  }
  .el-table th,
  .el-table td {
    padding: 4px 0;
  }
  .el-table .no-border-right {
    border-right: 0;
  }
  .el-table .no-border-left {
    border-left: 0;
  }
  .el-table--border {
    border-left: 0;
    border-right: 0;
  }
  .el-table--group::after,
  .el-table--border::after,
  .el-table::before {
    background-color: transparent;
  }
  .el-radio__label {
    font-size: 12px;
    padding-left: 0.1rem;
  }
  .el-input__inner {
    font-size: 12px;
  }
  .el-textarea {
    input:-ms-input-placeholder {
      font-size: 12px !important;
    }
  }
}
</style>
