<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" title="新增权限">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="编码" prop="authCode">
          <el-input v-model="ruleForm.authCode" class="itemwidth" />
        </el-form-item>
        <el-form-item label="名称" prop="authName">
          <el-input v-model="ruleForm.authName" class="itemwidth" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" type="textarea" class="itemwidth" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCookie } from '@/utils/auth'
import { addAuthorization } from '@/api/role'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    ruleForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        authName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$emit('input', false)
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addAuthorization({
            authCode: this.ruleForm.authCode,
            authId: '',
            authName: this.ruleForm.authName,
            remark: this.ruleForm.remark,
            createBy: getCookie('usrId'),
            createTime: new Date(),
            description: this.ruleForm.description
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
                message: '新增失败'
              })
            }
          })
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
