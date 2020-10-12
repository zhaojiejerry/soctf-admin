<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div style="display: flex;">
        <div>
          <div id="user-head-div">
            <img :src=" userObj.portrait != null ? userObj.portrait : '@/assets/images/avater.png' " class="img1" alt="头像">
          </div>
          <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" class="upload-demo" style="text-align: center;" action="/baseApi/oss">
            <div style="color:#B59758;margin-top: 40px;text-align: center;">【上传头像】</div>
          </el-upload>
        </div>
        <el-form ref="userObj" :model="userObj" :rules="rules" label-width="100px" class="demo-userObj">
          <el-form-item label="用户名" prop="orgCode">
            <el-input v-model="userObj.username" readonly class="itemwidth" />
          </el-form-item>
          <el-form-item label="昵称" prop="realName">
            <el-input v-model="userObj.realName" class="itemwidth" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="userObj.gender" text-color="#B59758" fill="#B59758">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userObj.email" class="itemwidth" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userObj.phone" class="itemwidth" />
          </el-form-item>
          <el-form-item label="地区" prop="area">
            <el-cascader v-model="userObj.area" :options="areaOptions" :props="{ checkStrictly: true ,label:'name',value:'name'}" class="itemwidth" clearable />
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input v-model="userObj.signature" class="itemwidth" />
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="userObj.school" class="itemwidth" />
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="userObj.company" class="itemwidth" />
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="userObj.address" type="textarea" class="itemwidth" />
          </el-form-item>
          <el-form-item label="个人简介" prop="remark">
            <el-input v-model="userObj.remark" type="textarea" class="itemwidth" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyUser">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getOneUserInfo, modifyUser } from '@/api/user'
import areajson from '@/assets/areajson'
import { getCookie } from '@/utils/auth'
export default {
  data() {
    return {
      areaOptions: [],
      userObj: {},
      rules: {}
    }
  },
  created() {
    this.areaOptions = areajson
    this.getOneUserInfo()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.userObj.portrait = res.message
      }
    },
    handleAvatarError(err, file, fileList) {
      this.$message({
        message: err.message,
        type: 'error'
      })
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    toUserInfo() {
      this.$router.push({ name: 'career' })
    },
    getOneUserInfo() {
      getOneUserInfo({
        usrId: getCookie('usrId')
      }).then((res) => {
        if (res.success) {
          this.userObj = res.data
          this.userObj.area =
            res.data.area == null ? [] : res.data.area.split('/')
        }
      })
    },
    modifyUser() {
      if (this.userObj.phone != null) {
        if (!/^1[3456789]\d{9}$/.test(this.userObj.phone)) {
          this.$message({
            message: '请输入合法的手机号码',
            type: 'error'
          })
          return
        }
      }
      var a = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      if (this.userObj.email != '') {
        if (!a.test(this.userObj.email)) {
          this.$message({
            message: '请输入合法的邮箱号码',
            type: 'error'
          })
          return
        }
      }
      modifyUser({
        portrait: this.userObj.portrait,
        email: this.userObj.email,
        phone: this.userObj.phone,
        realName: this.userObj.realName,
        remark: this.userObj.remark,
        usrBranch: this.userObj.usrBranch,
        usrId: this.userObj.usrId,
        usrOrganization: this.userObj.usrOrganization,
        usrStatus: this.userObj.usrStatus,
        usrSuper: this.userObj.usrSuper,
        address: this.userObj.address,
        area: this.userObj.area.join('/'),
        company: this.userObj.company,
        gender: this.userObj.gender,
        school: this.userObj.school,
        signature: this.userObj.signature
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      })
    }
  }
}
</script>
<style>
#user-head-div {
  width: 300px;
  text-align: center;
}
#user-head-div img {
  width: 180px;
  height: 180px;
}
</style>
