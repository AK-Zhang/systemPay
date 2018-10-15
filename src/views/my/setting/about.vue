<template>
    <div>
      <head-bar title="关于"></head-bar>
      <div class="about-body">
        <div class="link-line" @click="$router.push({path: '/my/setting/about/suggest'})">
          <span>意见反馈</span>
        </div>
        <div class="link-line">
          <span>用户协议</span>
        </div>
        <div class="link-line" @click="$router.push({path: '/my/setting/about/us'})">
          <span>关于我们</span>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .about-body{
    color: #788A96;
    font-size: 14px;
  }
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
