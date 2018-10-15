<template>
  <div class="yellow-body clearM">
    <div class="app-head1">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title1">收付</div>
    </div>
    <div class="collection-body">
      <div class="code-box clearM">
        <p>付款</p>
        <img src="../../assets/img/qrcode.png" alt="">
        <div>
          <span>设置金额</span>|<span @click="$router.push({path: $route.path + '/record'})">收款记录</span>
        </div>
        <div>
          <img src="../../assets/img/balance.png"> 余额<span class="right-arrow"></span>
        </div>
      </div>
      <div class="toggle-box" @click="$router.push({path: '/account/collection'})">
        <span class="right-arrow"></span>
        二维码收款
      </div>
    </div>
    <transition name="slide">
      <router-view  v-dom-portal class="router-container"></router-view>
    </transition>
  </div>
</template>
<style lang="less" scoped>
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
      height: 380px;
      background: #fff;
      text-align: center;
      >div:nth-child(4){
        img{
          vertical-align: middle;
          position: relative;
          top:-1px;
        }
        >span{
          float: none;
          display: inline-block;
          margin-left: 5px;
          margin-top: 17px;
        }
        margin-top: 43px;
        color: #788A96;
        font-size: 15px;
        border-top: 1px solid #f0f0f0;
      }
      >div:nth-child(3){
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
