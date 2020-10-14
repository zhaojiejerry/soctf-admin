<template>
  <div style="height: 100%;">
    <el-card class="box-card" style="height: 100%;">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div style="width: 375px;margin: auto;">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
          <el-form-item prop="newPassword">
            <el-input v-model="ruleForm.newPassword" type="password" class="input-item" placeholder="请输入新密码">
              <div slot="prefix">
                <span class="el-icon-lock icon" />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmNewPassword">
            <el-input v-model="ruleForm.confirmNewPassword" type="password" class="input-item" placeholder="请确认新密码">
              <div slot="prefix">
                <span class="el-icon-lock icon" />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" class="input-item" placeholder="请输入手机号">
              <div slot="prefix">
                <span class="el-icon-mobile-phone icon" />
              </div>
              <div slot="suffix" class="sentPhoto" @click="sendCode">
                {{ codeValue }}
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="smsCode">
            <el-input v-model="ruleForm.smsCode" class="input-item" placeholder="请输入短信验证码">
              <div slot="prefix" style="text-decoration: underline;">
                123
              </div>
            </el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input v-model="ruleForm.verifyCode" class="input-item" placeholder="请输入验证码">
              <div slot="prefix" style=" font-size: 13px;text-decoration: underline;">
                ABC
              </div>
              <div slot="suffix">
                <img :src="chartCode" style=" height: 37px;width: 87px; margin-top: 3px;" alt="" @click="getChartCode">
              </div>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPassword">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getCookie } from '@/utils/auth';
import { getLoginCode, getMobileCode, resetPassword } from '@/api/user';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.newPassword !== '') {
          this.$refs.ruleForm.validateField('newPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.confirmNewPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatemobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号!'));
      } else {
        callback();
      }
    };
    return {
      codeTime: 60,
      ruleForm: {},
      chartCode: '', // 图形验证码
      codeValue: '发送验证码',
      rules: {
        confirmNewPassword: [{ validator: validatePass, trigger: 'blur' }],
        newPassword: [{ validator: validatePass2, trigger: 'blur' }],
        phoneNumber: [{ validator: validatemobile, trigger: 'blur' }],
        mobileCode: [
          { trigger: 'blur', required: true, message: '请输入短信验证码' }
        ],
        verifyCode: [
          { trigger: 'blur', required: true, message: '请输入验证码' }
        ]
      }
    };
  },
  mounted() {
    this.getChartCode();
  },
  methods: {
    resetPassword() {
      var that = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          resetPassword({
            confirmNewPassword: this.ruleForm.confirmNewPassword,
            newPassword: this.ruleForm.newPassword,
            phoneNumber: this.ruleForm.phoneNumber,
            smsCode: this.ruleForm.smsCode,
            userId: getCookie('usrId'),
            verifyCode: this.ruleForm.verifyCode
          }).then((res) => {
            if (res.success) {
              this.$message({
                message: res.message,
                type: 'success'
              });
              that.$store.dispatch('logout');
              that.$router.push({
                name: 'login',
                params: { disableBtn: true }
              });
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              });
            }
          });
        }
      });
    },
    sendCode() {
      const that = this;
      if (!this.ruleForm.phoneNumber) {
        this.$message({
          message: '请输入手机号',
          type: 'error'
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.ruleForm.phoneNumber)) {
        this.$message({
          message: '手机号码有误',
          type: 'error'
        });
        return;
      }
      if (this.codeValue != '发送验证码') {
        return;
      }
      this.codeValue = '正在发送...';
      getMobileCode({
        bizTyp: 'modifyPwd',
        phoneNumber: this.ruleForm.phoneNumber
      }).then((res) => {
        if (res.success) {
          that.codeInter = setInterval(() => {
            if (that.codeTime == 0) {
              that.codeValue = '发送验证码';
              return;
            }
            that.codeValue = `${--that.codeTime}s`;
          }, 1000);
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          });
          that.codeValue = '发送验证码';
        }
      });
    },
    getChartCode() {
      getLoginCode().then((data) => {
        this.chartCode =
          'data:image/png;base64,' +
          btoa(
            new Uint8Array(data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
      });
    }
  }
};
</script>
<style>
.input-item {
  width: 375px;
}
.icon {
  font-size: 23px;
  vertical-align: middle;
}
.sentPhoto {
  cursor: pointer;
}
</style>
