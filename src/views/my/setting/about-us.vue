<template>
    <div>
       <head-bar title="关于我们"></head-bar>
      <div class="about-us-body">
        <img src="../../../assets/img/logo.png">
        <div class="version-box">版本号：1.00.34</div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .about-us-body{
    .version-box{
      position: absolute;
      bottom: 58px;
      color: #9DAEB9;
      width: 100%;
    }
    img{
      width: 93px;
      height: 93px;
      margin-top: 143px;
    }
    text-align: center;
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
