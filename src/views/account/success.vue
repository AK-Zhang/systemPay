<template>
  <div>
    <span class="nav-left" style="top:14px;" @click="$router.push({path:'/account/index'})"></span>
    <div class="app-body pay-status-body">
      <img src="../../assets/img/cashier-success.png">
      <div class="title">支付成功</div>
      <p>登录注册后可领取积分抵用现金</p>
    </div>
    <div class="pay-status-button" @click="$router.push({path:'/account/index'})">返回首页</div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {},
    components: {}
  }
</script>
