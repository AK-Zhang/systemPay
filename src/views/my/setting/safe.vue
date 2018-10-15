<template>
    <div>
      <head-bar title="账号与安全"></head-bar>
      <div class="safe-body">
        <div class="show-line">
          <span>千呼号</span>
          <span>9878373874</span>
        </div>
        <div class="link-show-line" @click="$router.push({path: '/my/setting/safe/modPhone'})">
          <span>手机号</span>
          <span>未绑定</span>
        </div>
        <div class="link-show-line" @click="$router.push({path: '/my/setting/safe/modPwd'})">
          <span>登录密码</span>
        </div>
      </div>
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
