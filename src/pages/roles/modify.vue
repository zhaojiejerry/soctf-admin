<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign ? '新增' : '修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="编码" prop="roleCode">
          <el-input v-model="ruleForm.roleCode" class="itemwidth" />
        </el-form-item>
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="ruleForm.roleName" class="itemwidth" />
        </el-form-item>
        <el-form-item label="关联机构" prop="orgId">
          <el-select v-model="ruleForm.orgId" class="itemwidth" placeholder="请选择关联机构">
            <el-option v-for="(item, index) in organizationList" :key="index" :label="item.orgName" :value="item.orgId" />
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <e-icon-picker v-model="ruleForm.icon" :options="options" class="itemwidth" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="ruleForm.description" type="textarea" class="itemwidth" />
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
import { getCookie } from '@/utils/auth';
import { modifyRole, addRole } from '@/api/role';
import { parseTime } from '@/utils/index';
import { getOrganizationList } from '@/api/organization';
import { EIconPicker } from 'e-icon-picker';
export default {
  components: { EIconPicker },
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
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择关联机构', trigger: 'change' }
        ]
      },
      options: {
        FontAwesome: true,
        ElementUI: true,
        addIconList: [],
        removeIconList: []
      }
    };
  },
  mounted() {
    this.getOrganizationList();
  },
  methods: {
    getOrganizationList() {
      getOrganizationList().then((res) => {
        if (res.success) {
          this.organizationList = res.data;
        }
      });
    },
    parseTime(time) {
      return parseTime(time);
    },
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            modifyRole({
              createBy: this.ruleForm.createBy,
              createTime: this.ruleForm.createTime,
              description: this.ruleForm.description,
              icon: this.ruleForm.icon,
              orgId: this.ruleForm.orgId,
              roleCode: this.ruleForm.roleCode,
              roleId: this.ruleForm.roleId,
              roleLevel: this.ruleForm.roleLevel,
              roleName: this.ruleForm.roleName,
              updateBy: getCookie('usrId'),
              updateTime: new Date()
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
            addRole({
              createBy: getCookie('usrId'),
              createTime: new Date(),
              description: this.ruleForm.description,
              icon: this.ruleForm.icon,
              orgId: this.ruleForm.orgId,
              roleCode: this.ruleForm.roleCode,
              roleId: '',
              roleLevel: this.ruleForm.roleLevel,
              roleName: this.ruleForm.roleName,
              updateBy: getCookie('usrId'),
              updateTime: new Date()
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
</style>
