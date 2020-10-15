<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign ? '新增' : '修改'">
      <div style="display: flex;">
        <div>
          <div id="user-head-div">
            <img :src=" ruleForm.portrait != null ? ruleForm.portrait : '@/assets/images/avater.png' " class="img1" alt="头像">
          </div>
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" class="upload-demo" style="text-align: center;" action="/baseApi/oss">
            <div style="color:#B59758;margin-top: 40px;text-align: center;">
              【上传头像】
            </div>
          </el-upload>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" class="itemwidth" />
          </el-form-item>
          <el-form-item label="昵称" prop="realName">
            <el-input v-model="ruleForm.realName" class="itemwidth" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" placeholder="请选择" class="itemwidth">
              <el-option :value="1" label="男" />
              <el-option :value="2" label="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户状态" prop="usrStatus">
            <el-select v-model="ruleForm.usrStatus" clearable class="itemwidth">
              <el-option label="正常" value="1" />
              <el-option label="不可用" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" clearable class="itemwidth">
              <el-option label="用户端" value="1" />
              <el-option label="管理端" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" class="itemwidth" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" class="itemwidth" />
          </el-form-item>
          <el-form-item label="地区" prop="area">
            <el-cascader v-model="ruleForm.area" :options="areaOptions" :props="{ checkStrictly: true, label: 'name', value: 'name' }" class="itemwidth" clearable />
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input v-model="ruleForm.signature" class="itemwidth" />
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="ruleForm.school" class="itemwidth" />
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="ruleForm.company" class="itemwidth" />
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="ruleForm.address" type="textarea" class="itemwidth" />
          </el-form-item>
          <el-form-item label="个人简介" prop="remark">
            <el-input v-model="ruleForm.remark" type="textarea" class="itemwidth" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { modifyUser, addUser } from '@/api/user';
import areajson from '@/assets/areajson';
export default {
  components: {},
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
      areaOptions: [],
      dialogTableVisible: false,
      question: '',
      label: [],
      rules: {
        title: [
          { required: true, message: '请输入答案/文档标题', trigger: 'blur' }
        ],
        fileType: [
          { required: true, message: '请选择文档类型', trigger: 'change' }
        ]
      },
      fileList: [],
      subList: [],
      subTotal: 0,
      pageSize: 10,
      currentPage: 1,
      questionRow: [],
      questionType: ['容器', '附件', '选择']
    };
  },
  mounted() {
    this.areaOptions = areajson;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.ruleForm.portrait = res.message;
      }
    },
    handleAvatarError(err, file, fileList) {
      this.$message({
        message: err.message,
        type: 'error'
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            modifyUser({
              portrait: this.ruleForm.portrait,
              email: this.ruleForm.email,
              phone: this.ruleForm.phone,
              realName: this.ruleForm.realName,
              remark: this.ruleForm.remark,
              usrBranch: this.ruleForm.usrBranch,
              usrId: this.ruleForm.usrId,
              usrOrganization: this.ruleForm.usrOrganization,
              usrStatus: this.ruleForm.usrStatus,
              usrSuper: this.ruleForm.usrSuper,
              address: this.ruleForm.address,
              area:
                this.ruleForm.area == null ? '' : this.ruleForm.area.join('/'),
              company: this.ruleForm.company,
              gender: this.ruleForm.gender,
              school: this.ruleForm.school,
              signature: this.ruleForm.signature
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
            addUser({
              portrait: this.ruleForm.portrait,
              email: this.ruleForm.email,
              phone: this.ruleForm.phone,
              realName: this.ruleForm.realName,
              remark: this.ruleForm.remark,
              usrBranch: this.ruleForm.usrBranch,
              usrId: this.ruleForm.usrId,
              usrOrganization: this.ruleForm.usrOrganization,
              usrStatus: this.ruleForm.usrStatus,
              usrSuper: this.ruleForm.usrSuper,
              address: this.ruleForm.address,
              area: this.ruleForm.area.join('/'),
              company: this.ruleForm.company,
              gender: this.ruleForm.gender,
              school: this.ruleForm.school,
              signature: this.ruleForm.signature,
              goldCoin: 0,
              idcardNo: '',
              idcardTyp: '',
              joinGame: false,
              password: '',
              roleIds: [],
              score: 0,
              specialRoleId: 0,
              teamId: '',
              teamOwner: false,
              userTyp: '',
              username: this.ruleForm.username
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
  width: 400px;
}
#user-head-div {
  width: 200px;
  text-align: center;
}
#user-head-div img {
  width: 180px;
  height: 180px;
}
</style>
