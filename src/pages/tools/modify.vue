<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign ? '新增' : '修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="工具名称" prop="weapName">
          <el-input v-model="ruleForm.weapName" class="itemwidth" />
        </el-form-item>
        <!-- <el-form-item label="图片">
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader" action="/api/oss">
            <img v-if="mainPic" :src="mainPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item> -->
        <el-form-item label="描述URL" prop="descUrl">
          <el-input v-model="ruleForm.descUrl" class="itemwidth" />
        </el-form-item>
        <el-form-item label="下载URL" prop="downloadUrl">
          <el-input v-model="ruleForm.downloadUrl" class="itemwidth" />
        </el-form-item>
        <el-form-item label="图片URL" prop="iconUrl">
          <el-input v-model="ruleForm.iconUrl" class="itemwidth" />
        </el-form-item>
        <el-form-item label="官网URL" prop="orgUrl">
          <el-input v-model="ruleForm.orgUrl" class="itemwidth" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" class="itemwidth" />
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-select v-model="ruleForm.weapLabel" multiple filterable allow-create default-first-option class="itemwidth" placeholder="请选择标签">
            <el-option v-for="(item,index) in label" :key="index" :label="item" :value="item" />
          </el-select>
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
import {
  updateWeaponTool,
  addWeaponTool,
  getOneWeaponToolInfo
} from '@/api/tool'
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
    mainId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: {
        weapName: [
          { required: true, message: '请输入工具名称', trigger: 'blur' }
        ]
      },
      label: [],
      ruleForm: {
        createById: '',
        createTime: '',
        del: false,
        descUrl: '',
        description: '',
        downloadUrl: '',
        iconUrl: '',
        id: 0,
        orgUrl: '',
        weapLabel: '',
        weapName: ''
      },
      mainPic: ''
    }
  },
  watch: {
    value(val) {
      if (val) {
        if (!this.addSign) {
          this.getOneWeaponToolInfo()
        } else {
          this.ruleForm = {
            createById: '',
            createTime: '',
            del: false,
            descUrl: '',
            description: '',
            downloadUrl: '',
            iconUrl: '',
            id: 0,
            orgUrl: '',
            weapLabel: '',
            weapName: ''
          }
        }
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.mainPic = URL.createObjectURL(file.raw)
      } else {
        this.mainPic = ''
        this.$message.error(res.message)
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type)
      const isJPG = file.type == 'image/jpeg' || 'image/png' || 'image/git'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG /png /git 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getOneWeaponToolInfo() {
      getOneWeaponToolInfo({
        id: this.mainId
      }).then((res) => {
        if (res.success) {
          this.ruleForm = res.data
          this.ruleForm.weapLabel = this.getLabel(res.data.weapLabel)
          this.label = this.ruleForm.weapLabel
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
            updateWeaponTool({
              createById: this.ruleForm.createById,
              del: this.ruleForm.del,
              descUrl: this.ruleForm.descUrl,
              description: this.ruleForm.description,
              downloadUrl: this.ruleForm.downloadUrl,
              iconUrl: this.ruleForm.iconUrl,
              id: this.ruleForm.id,
              orgUrl: this.ruleForm.orgUrl,
              weapLabel: this.ruleForm.weapLabel.join('|'),
              weapName: this.ruleForm.weapName
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
            addWeaponTool({
              createById: getCookie('usrId'),
              del: false,
              descUrl: this.ruleForm.descUrl,
              description: this.ruleForm.description,
              downloadUrl: this.ruleForm.downloadUrl,
              iconUrl: this.ruleForm.iconUrl,
              id: 0,
              orgUrl: this.ruleForm.orgUrl,
              weapLabel: this.ruleForm.weapLabel.join('|'),
              weapName: this.ruleForm.weapName
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
