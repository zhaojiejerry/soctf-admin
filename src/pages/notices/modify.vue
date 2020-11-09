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
          <el-switch v-model="ruleForm.enable" :width="50" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="类型" prop="title">
          <el-select v-model="ruleForm.type" :disabled="show" class="itemwidth" placeholder="请选择类型" clearable>
            <el-option label="系统公告" :value="1" />
            <el-option label="赛事公告" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.type==1" label="赛事">
          <el-select v-model="ruleForm.gameId" :disabled="show" class="itemwidth" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in gameList" :key="index" :label="item.gameName" :value="item.gameId">
              {{ item.gameName }}
              <span style="float: right;">{{ gameStatus[item.gameStatus-1] }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="赛事" prop="gameId">
          <el-select v-model="ruleForm.gameId" class="itemwidth" placeholder="请选择" clearable>
            <el-option v-for="(item,index) in gameList" :key="index" :label="item.gameName" :value="item.gameId">
              {{ item.gameName }}
              <span style="float: right;">{{ gameStatus[item.gameStatus-1] }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <editor ref="editor" v-model="ruleForm.body" @change="change" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updNotice, addNotice, getNoticeDetails } from '@/api/notice';
import editor from '@/components/editor';
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
    },
    gameList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    gameId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gameStatus: ['未开始', '进行中', '已结束'],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        orgId: [
          { required: true, message: '请选择关联机构', trigger: 'change' }
        ],
        gameId: [
          { required: true, message: '请选择关联赛事', trigger: 'change' }
        ]
      },
      ruleForm: {
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
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getNoticeDetails();
        } else {
          this.ruleForm = {
            body: '',
            createAt: '',
            del: 0,
            enable: 1,
            gameId: this.show ? this.gameId : '',
            id: 0,
            orderNode: 0,
            title: '',
            type: this.show ? 5 : 1
          };
        }
      }
    }
  },
  methods: {
    change(html) {
      this.ruleForm.body = html;
    },
    getNoticeDetails() {
      getNoticeDetails({
        id: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data;
        }
      });
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            updNotice({
              body: this.ruleForm.body,
              // createAt: this.ruleForm.createAt,
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
                });
                this.back();
                this.$emit('getList');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                });
              }
            });
          } else {
            addNotice({
              body: this.ruleForm.body,
              del: 0,
              enable: this.ruleForm.enable,
              gameId: this.ruleForm.gameId,
              orderNode: this.ruleForm.orderNode,
              title: this.ruleForm.title,
              type: this.ruleForm.type
            }).then((res) => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                });
                this.back();
                this.$emit('getList');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style>
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
  width: 400px;
}
</style>
