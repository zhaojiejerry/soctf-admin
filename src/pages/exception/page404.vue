<template>
    <div class="noPage">
      <img src="./page404.png" />
      <p class="no-tip-text">抱歉，您访问的页面不存在</p>
      <el-button type="primary" size="small" @click="goPrePage">返回</el-button>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goPrePage () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.noPage{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    display: inline-block;
  }
  .no-tip-text {
    font-size: 18px;
    color: #666666;
    margin-top: 50px;
  }
  .el-button {
    margin-top: 35px;
    padding: 9px 20px;
  }
}
</style>
