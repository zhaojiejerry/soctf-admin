<template>
  <div style="background-color: #edeef2;">
    <div class="hb-user-detail" style="height: 60px;">
      <wx-header show-back>
        <span slot="headerTitle">问题新增</span>
      </wx-header>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import wxHeader from '@/components/header/index'
export default {
  components: {
    wxHeader
  },
  data() {
    return {
      ruleForm: {},
      rules: {}
    }
  }
}
</script>
