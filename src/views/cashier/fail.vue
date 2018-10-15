<template>
  <div>
    <span class="nav-left" style="top:14px;" @click="$router.go(-1)"></span>
    <div class="app-body pay-status-body">
      <img src="../../assets/img/cashier-success.png">
      <div class="title">支付失败</div>
      <p><a @click="$router.push({path:'/login'})">登录注册</a>后可在我的订单中找到未支付订单</p>
    </div>
    <div class="pay-status-button" @click="$router.push({path:'/cashier/index'})">重新支付</div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
