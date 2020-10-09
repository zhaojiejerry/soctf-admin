<template>
  <el-dialog :visible.sync="value" :show-close="false" :title="addSign?'新增':'修改'">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门编码" prop="branCode">
        <el-input v-model="ruleForm.branCode" class="itemwidth" />
      </el-form-item>
      <el-form-item label="部门名称" prop="branName">
        <el-input v-model="ruleForm.branName" class="itemwidth" />
      </el-form-item>
      <el-form-item label="关联结构" prop="orgId">
        <el-select v-model="ruleForm.orgId" class="itemwidth" placeholder="请选择关联结构">
          <el-option v-for="(item,index) in organizationList" :key="index" :value="item.orgId" :label="item.orgName" />
        </el-select>
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
import {
  addBranch,
  modifyBranch,
  getOrganizationList
} from '@/api/organization'
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
      organizationList: [],
      rules: {
        branCode: [
          { required: true, message: '请输入部门编码', trigger: 'blur' }
        ],
        branName: [
          { required: true, message: '请选择部门名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择关联结构', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getOrganizationList()
  },
  methods: {
    getOrganizationList() {
      getOrganizationList().then((res) => {
        if (res.success) {
          this.organizationList = res.data
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
            modifyBranch({
              createAt: this.ruleForm.createAt,
              createBy: this.ruleForm.createBy,
              description: this.ruleForm.description,
              orgId: this.ruleForm.orgId,
              branCode: this.ruleForm.branCode,
              branId: this.ruleForm.branId,
              branName: this.ruleForm.branName,
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
            addBranch({
              createAt: new Date(),
              createBy: getCookie('usrId'),
              description: this.ruleForm.description,
              orgId: this.ruleForm.orgId,
              branCode: this.ruleForm.branCode,
              branId: '',
              branName: this.ruleForm.branName,
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
