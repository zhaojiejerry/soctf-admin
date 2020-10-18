<template>
  <div>
    <el-dialog :visible.sync="value" :show-close="false" :title="addSign ? '新增' : '修改'">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="权限码" prop="permCode">
          <el-input v-model="ruleForm.permCode" class="itemwidth" />
        </el-form-item>
        <el-form-item label="权限名称" prop="permName">
          <el-input v-model="ruleForm.permName" class="itemwidth" />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="ruleForm.name" class="itemwidth" />
        </el-form-item>
        <el-form-item label="权限类型" prop="permType">
          <el-select v-model="ruleForm.permType" class="itemwidth" placeholder="请选择权限类型">
            <el-option label="菜单" value="1" />
            <el-option label="按钮" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-select v-model="ruleForm.parentId" class="itemwidth" placeholder="请选择父级菜单">
            <el-option v-for="(item,index) in tableList" v-show="item.permType==1" :key="index" :label="item.permName" :value="item.permId" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <e-icon-picker v-model="ruleForm.icon" :options="options" class="itemwidth" />
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="ruleForm.component" class="itemwidth" />
        </el-form-item>
        <el-form-item label="跳转路径" prop="path">
          <el-input v-model="ruleForm.path" class="itemwidth" />
        </el-form-item>
        <el-form-item label="重定向地址" prop="redirectUrl">
          <el-input v-model="ruleForm.redirectUrl" class="itemwidth" />
        </el-form-item>
        <el-form-item label="高亮菜单" prop="activeMenu">
          <el-input v-model="ruleForm.activeMenu" class="itemwidth" />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input v-model.number="ruleForm.sortOrder" class="itemwidth" />
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
import { addPermission, modifyPermission } from '@/api/permission';
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
    },
    tableList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      rules: {
        permName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      },
      options: {
        FontAwesome: true,
        ElementUI: true,
        addIconList: [],
        removeIconList: []
      }
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$emit('input', false);
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.addSign) {
            modifyPermission({
              createTime: this.ruleForm.createTime,
              activeMenu: this.ruleForm.activeMenu,
              component: this.ruleForm.component,
              icon: this.ruleForm.icon,
              name: this.ruleForm.name,
              parentId: this.ruleForm.parentId,
              path: this.ruleForm.path,
              permCode: this.ruleForm.permCode,
              permId: this.ruleForm.permId,
              permName: this.ruleForm.permName,
              permType: this.ruleForm.permType,
              redirectUrl: this.ruleForm.redirectUrl,
              sortOrder: this.ruleForm.sortOrder
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
            addPermission({
              createTime: new Date(),
              activeMenu: this.ruleForm.activeMenu,
              component: this.ruleForm.component,
              icon: this.ruleForm.icon,
              name: this.ruleForm.name,
              parentId: this.ruleForm.parentId,
              path: this.ruleForm.path,
              permCode: this.ruleForm.permCode,
              permId: '',
              permName: this.ruleForm.permName,
              permType: this.ruleForm.permType,
              redirectUrl: this.ruleForm.redirectUrl,
              sortOrder: this.ruleForm.sortOrder
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
