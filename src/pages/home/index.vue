<template>
  <div class="hb-home">
    <div class="init-info" style="margin-top: 140px;">
      <img src="./lg.png">
      <p class="home-title" style="font-weight:bold;">欢迎使用，SOCTF后台管理系统</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCookie } from '@/utils/auth'

export default {
  components: {},
  data() {
    return {
      tjsk: 0,
      zxsk: 0,
      dshtj: 0,
      sbgl: 0
    }
  },
  computed: {
    ...mapGetters(['user', 'btnPermissions']),
    userName() {
      return getCookie('Account') || ''
    }
  },
  created() {},
  methods: {
    handleViewDetail(type) {
      if (type == 'tj') {
        this.$router.push({
          name: 'business',
          query: {
            time: 'today',
            payStatus: '2,4',
            types: '1,3'
          }
        })
      } else if (type == 'zx') {
        this.$router.push({
          name: 'business',
          query: {
            time: 'today',
            payStatus: '2,4',
            types: '1,2'
          }
        })
      } else if (type == 'dshtj') {
        this.$router.push({
          name: 'healthPlatform'
        })
      } else if (type == 'glsb') {
        this.$router.push({
          name: 'deviceList'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.hb-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .init-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .home-title {
      font-size: 32px;
      color: #333333;
      font-weight: 700;
      width: 450px;
      text-align: left;
      margin-top: 20px;
    }
  }
  .statistics-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    .statistics-info-item {
      width: 232px;
      height: 320px;
      margin-left: 30px;
      background-color: #ffffff;
      box-shadow: 0px 0px 17px 1px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .statistics-info-item-title {
        font-size: 20px;
        font-weight: bold;
        margin-top: 25px;
        color: #333333;
      }
      .statistics-info-item-num {
        font-size: 14px;
        color: #333333;
        margin: 7px 0 20px 0;
        .statistics-info-item-tjsk {
          font-size: 46px;
          color: #b69858;
          font-family: Impact;
        }
      }
    }
  }
}
</style>
