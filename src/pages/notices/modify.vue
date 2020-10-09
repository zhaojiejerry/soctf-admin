<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign ? '新增' : '修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" class="itemwidth" />
        </el-form-item>
        <el-form-item label="排序" prop="orderNode">
          <el-input v-model.number="ruleForm.orderNode" class="itemwidth" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
          <el-select v-model="ruleForm.enable" class="itemwidth" placeholder="请选择">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="title">
          <el-select v-model="ruleForm.type" class="itemwidth" placeholder="请选择类型">
            <el-option label="系统公告" value="1" />
            <el-option label="赛事公告" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="赛事" prop="gameId">
          <el-select v-model="ruleForm.gameId" class="itemwidth" placeholder="请选择">
            <el-option v-for="(item,index) in tableList" :key="index" :label="item.gameName" :value="item.gameId" />
          </el-select>
        </el-form-item>
        <editor :content="ruleForm.body" @change="change" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updNotice, addNotice, getNoticeDetails } from '@/api/notice'
import editor from '@/components/editor'
import { getGameInfoListForPage } from '@/api/match'
export default {
  components: {
    editor
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addSign: {
      type: Boolean,
      default: false
    },
    mainId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        orgId: [
          { required: true, message: '请选择关联机构', trigger: 'change' }
        ]
      },
      tableList: [],
      ruleForm: {
        body: '',
        createAt: '',
        del: 0,
        enable: '0',
        gameId: '',
        id: 0,
        orderNode: 0,
        title: '',
        type: '1'
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getNoticeDetails()
        } else {
          this.ruleForm = {
            body: '',
            createAt: '',
            del: 0,
            enable: 0,
            gameId: '',
            id: 0,
            orderNode: 0,
            title: '',
            type: 1
          }
        }
      }
    }
  },
  mounted() {
    this.getGameInfoListForPage()
  },
  methods: {
    change(html) {
      this.ruleForm.body = html
    },
    getGameInfoListForPage() {
      getGameInfoListForPage({
        currentPage: 0,
        extraParam: {},
        pageSize: 0
      }).then((res) => {
        if (res.success) {
          this.tableList = res.data
        }
      })
    },
    getNoticeDetails() {
      getNoticeDetails({
        id: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
        }
      })
    },
    back() {
      this.$emit('input', false)
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            updNotice({
              body: this.ruleForm.body,
              createAt: this.ruleForm.createAt,
              del: this.ruleForm.del,
              enable: this.ruleForm.enable,
              gameId: this.ruleForm.gameId,
              id: this.ruleForm.id,
              orderNode: this.ruleForm.orderNode,
              title: this.ruleForm.title,
              type: this.ruleForm.type
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.back()
                this.$emit('getList')
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
          } else {
            addNotice({
              body: this.ruleForm.body,
              createAt: new Date(),
              del: 0,
              enable: this.ruleForm.enable,
              gameId: this.ruleForm.gameId,
              id: 0,
              orderNode: this.ruleForm.orderNode,
              title: this.ruleForm.title,
              type: this.ruleForm.type
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.back()
                this.$emit('getList')
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            })
          }
        }
      })
    }
  }
}
</script>
<style>
.el-form-item__content {
  line-height: 0;
}
.mt30 {
  margin-top: 35px;
}
.pager-container {
  text-align: center;
}
.el-upload__tip {
  display: inline-block;
  margin-left: 20px;
  margin-top: 0;
}
.el-upload-list {
  width: 500px;
}
</style>
