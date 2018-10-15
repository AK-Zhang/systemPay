<template>
    <div>
      <div style="height: 44px;">
        <span class="nav-left" @click="$router.go(-1)"></span>
      </div>
      <div class="gesture-body">
        <div class="logo-box">
          <img src="../../assets/img/logo.png">
        </div>
        <p>这是一个姓名</p>
        <div class="gesture-box">

        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .gesture-box{
    width: 276px;
    height: 276px;
    margin: 43px auto 0;
  }
  .gesture-body >p{
    line-height: 20px;
    font-size: 14px;
    color: #788A96;
    margin-top: 26px;
    text-align: center;
  }
  .logo-box{
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    margin: 37px auto 0;
    box-shadow: 0 2px 1px 2px #f7f7f7;
    >img{
      width: 41px;
      height:41px;
      margin-top: 9.5px;
    }
  }
  .nav-left{
    margin-top: 10px;
  }
</style>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      var lock = new PatternLock(".gesture-box", {
        margin: 11,
        radius: 35,
        onDraw: res => {
          if (res == '123456') this.$router.push({path: '/account/no-apply'})
        }
      });
      console.log(lock)
    },
    methods: {},
    components: {}
  }
</script>
