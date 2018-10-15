<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">等待认证</div>
    </div>
    <div class="app-body-3">
      <div class="wait-identify">
        <div>...</div>
        <div>上传完成</div>
        <div>资料上传成功，请耐心等待</div>
      </div>
      <div class="fun-main-btn" style="bottom:193px;" @click="$router.push({path: $route.path.replace('wait', 'fail')})">确认</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .wait-identify{
    text-align: center;
    >div:last-child{
      color:#788A96;
      font-size: 14px;
      line-height: 17px;
    }
    >div:nth-child(2){
      color:#FE9D32;
      font-size: 20px;
      width:80px;
      line-height: 28px;
      height: 28px;
      margin: 22px auto 14px;
      text-shadow: 0 2px 4px 0 RGBA(254, 157, 50, 0.19);
    }
    >div:first-child{
      width:30px;
      height:30px;
      background:rgba(254,157,50,1);
      color: #fff;
      margin: 140px auto 0;
      border-radius: 50%;
      letter-spacing: 1px;
      font-size: 30px;
      line-height: 13px;
    }
  }
  .app-body-1{
    .template-content{
      margin: 10px 0 20px 0;
    }
    .main-content{
      color:#788A96;
      line-height: 20px;
      >span{
        width:110px;
        display: inline-block;
      }
    }
    color:#9DAEB9;
    font-size: 14px;
  }
</style>
<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
