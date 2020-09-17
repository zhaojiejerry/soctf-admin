<template>
  <el-footer height="0.4rem" class="hb-footer">
    copyright © {{ year }}
  </el-footer>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      year: ''
    }
  },
  methods: {
  },
  created () {
    this.year = new Date().getFullYear()
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss">
  .hb-footer {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background: #2b4055;
    a {
      margin-left: 10px;
      color: #42b983;
    }
  }
</style>
