<template>
    <div class="third-login-box">
      <div><img src="../../assets/img/third-zhifubao.png"></div>
      <div><img src="../../assets/img/third-weibo.png"></div>
      <div><img src="../../assets/img/third-qq.png"></div>
      <div @click="weixinAuth"><img src="../../assets/img/third-weixin.png"></div>
    </div>
</template>
<style lang="less" scoped>
  .third-login-box{
    >div:last-child{
      margin-right: 0;
    }
    >div{
      float: left;
      width:26px;
      height: 26px;
      margin-right: 50px;
      >img{
        width:26px;
        height: 26px;
      }
    }
    width:254px;
    height:26px;
    margin: 0 auto;
    position: absolute;
    bottom:62px;
    left: 0;
    right: 0;
    margin: auto;
  }
</style>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      /**
       * 微信授权地址跳转
       * */
      weixinAuth () {
        var url = encodeURIComponent('https://apidoc.baintime.cn/' + '#/third/weixin')
        this.$ajax.get('/qh/mobile/wechat/oauth/url?redirect_uri=' + url, data => {
          location.href = data
        })
      }
    },
    components: {}
  }
</script>
