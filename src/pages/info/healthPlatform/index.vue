<template>
  <div>
    <div class="health-platform">
      <wx-header>
        <span slot="headerTitle">体检审核工作台</span>
        <span class="second-font" slot="headerOther">(业务单号 {{healthId}})</span>
        <span class="health-platform-right" slot="headerRight">
          <span class="header-user-name">审核医生：{{user.realName}}</span>
          <span class="header-user-sign">
            <span>个人签章：</span>
            <el-popover trigger="hover" placement="bottom" popper-class="big-popover xc-popover">
              <div class="pop-area">
                <img
                  class="popImg"
                  v-if="!user.userSign"
                  :src="errorImg"
                  :onerror="onerrorImg"
                  alt="个人签章"
                />
                <img class="popImg" v-else :src="user.userSign" :onerror="onerrorImg" alt="个人签章" />
              </div>
              <div class="pop-area" slot="reference">
                <img
                  class="popImg"
                  v-if="!user.userSign"
                  :src="errorImg"
                  :onerror="onerrorImg"
                  alt="个人签章"
                />
                <img class="popImg" v-else :src="user.userSign" :onerror="onerrorImg" alt="个人签章" />
              </div>
            </el-popover>
          </span>
          <span class="header-user-sign">
            单位签章：
            <el-popover trigger="hover" placement="bottom" popper-class="big-popover xc-popover">
              <div class="pop-area">
                <img
                  class="popImg"
                  v-if="!user.orgSign"
                  :src="errorImg"
                  :onerror="onerrorImg"
                  alt="个人签章"
                />
                <img class="popImg" v-else :src="user.orgSign" :onerror="onerrorImg" alt="个人签章" />
              </div>
              <div class="pop-area" slot="reference">
                <img
                  class="popImg"
                  v-if="!user.orgSign"
                  :src="errorImg"
                  :onerror="onerrorImg"
                  alt="个人签章"
                />
                <img class="popImg" v-else :src="user.orgSign" :onerror="onerrorImg" alt="个人签章" />
              </div>
            </el-popover>
          </span>
        </span>
      </wx-header>
      <div class="health-list">
        <div class="health-list-header">
          <p>
            <span class="health-list-header-title">审核任务</span>
            <span class="health-list-header-num">
              (
              <em>{{totalNum}}</em>单待审核)
            </span>
          </p>
          <div class="switch-box">
            <span style="margin-bottom: 6px">语音提示</span>
            <el-switch v-model="warnValue" @change="warnChange" active-color="#fd7715"></el-switch>
          </div>
        </div>
        <div class="platformTable">
          <el-table
            ref="reviewListTable"
            class="list-table"
            :header-cell-style="{background:'#f7f7f7', color:'#333333', fontWeight: 'bold'}"
            :cell-style="{fontSize: '12px'}"
            tooltip-effect="dark"
            :data="healthList"
            highlight-current-row
            @row-click="rowClick"
            @current-change="tableCurrentChange"
            current-row-key="id"
            width="100%"
            height="100%"
          >
            <el-table-column
              show-overflow-tooltip
              align="center"
              prop="id"
              min-width="130"
              label="业务单号"
            >
              <!--            <template slot-scope="scope">-->
              <!--              <el-button style="padding-top:0;padding-bottom:0;" type="text" size="small" @click.native.prevent="handleHealthDetail(scope.row.id)">{{ scope.row.id }}</el-button>-->
              <!--            </template>-->
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              v-if="btnPermissions.indexOf('1000208') != -1"
              align="center"
              prop="driverName"
              label="姓名"
            ></el-table-column>
          </el-table>
        </div>
        <div v-show="healthList.length == 0" class="reloadBtn">
          <em>暂无数据</em>
          <span @click="reviewList">刷新列表</span>
        </div>
        <div class="pager-container mt30 platformPagination">
          <el-pagination
            v-if="totalNum != 0"
            size="small"
            small
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :pager-count="5"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30]"
            layout="prev, pager, next"
            :total="totalNum"
          >
            <el-button size="small" plain class="pagination-button">确定</el-button>
          </el-pagination>
        </div>
      </div>
      <div class="health-detail">
        <health-detail
          v-show="healthList.length != 0"
          @reloadList="reviewList"
          :detailId="healthId"
          :isPlatform="true"
        ></health-detail>
        <div class="noMsg" v-show="healthList.length == 0" style>
          <span>暂无需要审核的体检单</span>
        </div>
      </div>
      <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" width="23%">
        <span>该体检单已被其他医生审核，是否继续审核其他体检单？</span>
        <span style="text-align: center" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeDialog">下一单（{{tenCount}}秒）</el-button>
          <el-button @click="closeDialog('cancel')">查看此订单</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { mapState, mapGetters } from 'vuex'
import wxHeader from '@/components/header/index'
import healthDetail from '@/pages/info/health/detail'
import { getReviewList, getCurrentCheckState } from '@/api/health.js'
import errorImg from './errorImg.png'
export default {
  name: 'healthPlatform',
  components: {
    wxHeader,
    healthDetail
  },
  computed: {
    ...mapState({
      user: state => state.user,
      warningTipFlag: state => state.warningTipFlag
    }),
    ...mapGetters([
      'btnPermissions'
    ])
  },
  data () {
    return {
      dialogVisible: false,
      tenCount: 0,
      timer: null,
      errorImg: errorImg,
      onerrorImg: 'this.src="' + errorImg + '"',
      healthList: [],
      defaultCurrentPage: 1,
      currentPage: 1,
      pageSize: 15,
      totalNum: 0,
      formData: null,
      healthId: '',
      healthListHeight: [],
      healthDetailId: '',
      closeDialogFlag: false,
      currentRow: null,
      chooseId: '',
      warnValue: false
    }
  },
  methods: {
    warnChange (val) {
      this.$store.commit('setWarningTipFlag', val)
    },
    closeDialog (type) {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.dialogVisible = false
        this.closeDialogFlag = true
      }
      if (type == 'cancel') {
        this.healthId = this.chooseId
      } else {
        this.reviewList()
      }
    },
    reviewList (state) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '',
      //   spinner: 'el-icon-loading',
      //   background: '#fff',
      //   target: document.querySelector('tbody')
      // })
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }

      getReviewList(data).then((res) => {
        // loading.close()
        if (res.code == 0) {
          this.healthList = res.data.list
          if (this.healthList.length != 0) {
            this.totalNum = parseInt(res.data.total)
            if (!state) {
              this.healthId = this.healthList[0].id
              this.healthListHeight = this.healthList[0]
              this.$refs.reviewListTable.setCurrentRow(this.healthList[0])
            } else {
              this.$refs.reviewListTable.setCurrentRow(this.currentRow ? this.currentRow : this.healthListHeight)
            }
          } else {
            // this.healthId = undefined
            this.totalNum = 0
            this.$message.error('暂无待审核的体检单，请稍后再试')
          }

          // this.waitCheckNum = parseInt(res.data.uncheckCount)
          this.$nextTick(() => {
            this.$refs.reviewListTable.bodyWrapper.scrollTop = 0
          })
        } else {
        }
      }).catch(() => {
        // loading.close()
      })
    },
    rowClick (val) {
      this.currentRow = val
      this.handleHealthDetail(val.id)
    },
    tableCurrentChange () {
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.reviewList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.currentPage = val
      this.reviewList()
    },
    getCode (id) {
      this.closeDialogFlag = false
      const TIME_COUNT = 10
      if (!this.timer) {
        this.tenCount = TIME_COUNT
        // this.show = false
        this.timer = setInterval(() => {
          if (this.tenCount > 0 && this.tenCount <= TIME_COUNT) {
            this.tenCount--
          } else {
            // this.show = true
            clearInterval(this.timer)
            this.timer = null
            this.dialogVisible = false
            if (!this.closeDialogFlag) {
              this.reviewList()
            }
          }
        }, 1000)
      }
    },
    handleClose () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
        this.dialogVisible = false
        this.closeDialogFlag = true
      }
      // this.reviewList()
    },
    handleHealthDetail (id) {
      let data = {
        reportId: id
      }
      getCurrentCheckState(data).then((res) => {
        if (res.data) {
          this.healthId = id
        } else {
          this.getCode(id)
          this.chooseId = id
          this.dialogVisible = true
        }
      })
    }
  },
  created () {
    this.warnValue = this.warningTipFlag
    this.pageNo = 1
    this.pageSize = 10
    let bodyWidth = document.body.clientWidth
    if (bodyWidth < 1440) {
      this.pageSize = 10
    }
    if (bodyWidth >= 1440 && bodyWidth < 1920) {
      this.pageSize = 10
    }
    if (bodyWidth >= 1920) {
      this.pageSize = 14
    }
    this.reviewList()
  }
}
</script>

<style scoped lang="scss">
.el-table__empty-text {
  display: none;
}
.wx-layout
  .wx-main
  .view-container
  .content-container
  .hb-main-container
  .hb-main-content {
  top: 0;
  left: 0;
}
.wx-layout .wx-main .view-container .content-container .hb-main-container {
  margin-top: 0;
}
.reloadBtn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 84px;
  bottom: 0;
  margin: auto;
  /*box-shadow: 0px 0px 10px 0px*/
  /*rgba(103, 194, 58, 0.5);*/
  z-index: 99;
  span {
    width: 90px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
    background-color: #fd7715;
    border-radius: 4px;
    cursor: pointer;
  }
  em {
    color: #7f7f7f;
    margin-bottom: 30px;
  }
}
.hb-health-detail {
  /*background-color: #fff!important;*/
}
.health-platform {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /*padding: 20px;*/
  .health-list {
    position: relative;
    box-sizing: border-box;
    width: 24%;
    margin-top: 60px;
    height: calc(100% - 60px);
    /*padding-bottom: 35px;*/
    border-right: 1px solid #edeef2;
    padding: 13px 13px 0 15px;
    background-color: #edeef2;
    display: flex;
    flex-direction: column;
    .platformTable {
      height: calc(95% - 60px);
    }
    .pager-container {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      background: #fff;
      position: static;
      width: 100%;
      transform: none;
    }
  }
  .health-detail {
    width: 76%;
    margin-top: 60px;
    height: calc(100% - 60px);
    display: flex;
    padding: 13px 10px 0 0;
    background: #edeef2;
    box-sizing: border-box;
    padding-left: 0;
    .hb-health-detail {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      overflow: hidden;
    }
  }
  .list-table {
    .el-button--text {
      color: #409eff;
    }
    .table-pay-status {
      display: inline-block;
      border-radius: 4px;
      width: 44px;
      height: 18px;
      line-height: 18px;
      vertical-align: middle;
      text-align: center;
    }
    .table-check-status {
      display: inline-block;
      height: 18px;
      line-height: 18px;
      vertical-align: middle;
    }
    .reject-btn {
      padding: 0;
      margin-left: 3px;
      vertical-align: middle;
    }
    .reject-icon {
      color: #ef4646;
      background-color: rgba(239, 70, 70, 0.2);
      border-radius: 50%;
      padding: 1px;
      font-size: 10px;
    }
    .send-msg {
      height: 12px;
      vertical-align: text-top;
    }
  }
  .pager-container {
    text-align: center;
  }
  .health-list-header {
    height: 68px;
    width: 100%;
    padding-left: 19px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
    justify-content: space-between;
    padding-right: 20px;
    p {
      display: flex;
      width: 50%;
      flex-direction: column;
      .health-list-header-title {
        font-weight: bold;
        padding-left: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 16px;
        font-size: 16px;
        color: #333333;
        border-left: 4px solid #fd7715;
      }
      .health-list-header-num {
        font-size: 12px;
        color: #666;
        margin-left: 18px;
        margin-top: 9px;
        em {
          color: #fd7714;
        }
      }
    }
    .switch-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .health-platform-right {
    display: flex;
    height: 100%;
    align-items: center;
    color: #333;
    .header-user-sign {
      display: flex;
      align-items: center;
      margin-left: 25px;
      img {
        width: 27px;
        height: 26px;
      }
    }
  }
  .popImg {
    max-width: 100%;
    max-height: 100%;
  }
  .el-popover.big-popover {
    width: 344px;
    height: 261px;
    border: 2px solid #fd7715 !important;
    box-sizing: border-box;
    &.xc-popover {
      width: 230px;
      height: 304px;
    }
    .pop-area {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .popImg {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &.el-popper[x-placement^="bottom"] .popper__arrow {
      border-bottom-color: #fd7715;
      &::after {
        top: 3px;
      }
    }
  }
  .platformPagination {
    position: absolute;
    bottom: 16px;
    transform: translateX(-50%);
    left: 50%;
    width: calc(100% - 27px);
  }
  .noMsg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
