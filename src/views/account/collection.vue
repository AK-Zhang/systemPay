<template>
    <div class="yellow-body clearM">
      <div class="app-head1">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title1">收付</div>
      </div>
      <div class="collection-body">
        <scroller style="height:100%">
          <div class="code-box clearM">
            <p>收款</p>
            <img src="../../assets/img/qrcode.png" alt="">
            <div>
              <span>设置金额</span>|<span @click="$router.push({path: $route.path + '/record'})">收款记录</span>
            </div>
          </div>
          <div class="toggle-box" @click="$router.push({path: '/account/payment'})">
            <span class="right-arrow"></span>
            二维码付款
          </div>
          <div class="collection-content">
            <div class="border-bottom-1">
              合计
              <span>¥ 1200</span>
            </div>
            <div class="border-bottom-1">
              <img src="../../assets/img/female-icon.png">
              <span>支付中...</span>
              <p class="single-line">萧施予</p>
            </div>
            <div class="border-bottom-1">
              <img src="../../assets/img/female-icon.png">
              <span>支付中...</span>
              <p class="single-line">萧施予</p>
            </div>
            <div class="border-bottom-1">
              <img src="../../assets/img/female-icon.png">
              <span>支付中...</span>
              <p class="single-line">萧施予</p>
            </div>
          </div>
        </scroller>
      </div>
      <transition name="slide">
        <router-view  v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .collection-content{
    border-radius: 5px;
    background: #fff;
    color: #788A96;
    >div:first-child{
      >span{
        float: right;
      }
      padding: 0 15px;
      line-height: 46px;
      height: 47px;
      font-size: 16px;
    }
    >div:nth-child(n+2){
      font-size: 14px;
      line-height: 70px;
      margin-left: 15px;
      height: 71px;
      padding-right: 15px;
      >img{
        width: 40px;
        height: 40px;
        margin: 15px 0;
        float: left;
      }
      >p{
        margin: 0 100px 0 60px;
      }
      >span{
        float: right;
        width: 100px;
        text-align: right;
      }
    }
    >div:last-child{
      border: none;
    }
  }
  .collection-body{
    .toggle-box{
      >span{
        margin-top: 18px;
      }
      border-radius: 5px;
      background: #fff;
      line-height: 48px;
      font-size: 16px;
      color: #788A96;
      margin: 20px 0;
      padding: 0 15px;
    }
    .code-box{
      height: 360px;
      background: #fff;
      text-align: center;
      >div{
        color: #999999;
        line-height: 21px;
        margin-top: 20px;
        span{
          line-height: 21px;
          font-size: 15px;
          color: #FCAD57;
          margin: 0 18px;
          vertical-align: middle;
        }
      }
      >p:first-child{
        color: #5A4B41;
        font-size: 16px;
        margin: 25px 0 30px;
      }
    }
    padding: 20px 15px 30px;
    position: absolute;
    top:44px;
    bottom:0;
    left: 0;
    right: 0;
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
