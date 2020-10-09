<template>
  <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="机构编码" prop="orgCode">
        <el-input v-model="ruleForm.orgCode" class="itemwidth" />
      </el-form-item>
      <el-form-item label="机构名称" prop="orgName">
        <el-input v-model="ruleForm.orgName" class="itemwidth" />
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
</template>
<script>
import { getCookie } from '@/utils/auth'
import { addOrganization, modifyOrganization } from '@/api/organization'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addSign: {
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
        orgCode: [
          { required: true, message: '请输入机构编码', trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: '请选择机构名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back() {
      this.$emit('input', false)
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            modifyOrganization({
              createAt: this.ruleForm.createAt,
              createBy: this.ruleForm.createBy,
              description: this.ruleForm.description,
              orgCode: this.ruleForm.orgCode,
              orgId: this.ruleForm.orgId,
              orgName: this.ruleForm.orgName,
              remark: this.ruleForm.remark
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
            addOrganization({
              createAt: new Date(),
              createBy: getCookie('usrId'),
              description: this.ruleForm.description,
              orgCode: this.ruleForm.orgCode,
              orgId: '',
              orgName: this.ruleForm.orgName,
              remark: this.ruleForm.remark
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
