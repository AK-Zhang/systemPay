<template>
  <div>
    <div class="my-box">
      <div class="my-head common-main-bg clearM">
        <img src="../../assets/img/my-icon.png">
        <p @click="$router.push({path:'/my/info'})">好象君</p>
        <img src="../../assets/img/my-qrcode.png" @click="$router.push({path:'/my/qrcode'})">
        <p>认证身份</p>
      </div>
      <div class="my-body">
        <div class="flex-container">
          <div class="flex-item-1">
            <img src="../../assets/img/my-points.png">
            <p>积分</p>
          </div>
          <div class="flex-item-1">
            <img src="../../assets/img/my-order.png">
            <p>订单</p>
          </div>
          <div class="flex-item-1">
            <img src="../../assets/img/my-coupon.png">
            <p>卡券</p>
          </div>
        </div>
        <div class="flex-container">
          <div class="flex-item-1">
            <img src="../../assets/img/my-shop.png">
            <p>商家</p>
          </div>
          <div class="flex-item-1" @click="$router.push({path: '/my/address-list'})">
            <img src="../../assets/img/my-list.png">
            <p>通讯录</p>
          </div>
          <div class="flex-item-1" @click="$router.push({path:'/my/setting'})">
            <img src="../../assets/img/my-setting.png">
            <p>设置</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .my-body{
    font-size: 14px;
    color: #BCC7D5;
    >div:first-child{
      margin-bottom: 49px;
    }
    >div{
      >div{
        >img{
          width: 28px;
          height: 28px;
        }
        >p{
          line-height: 20px;
          margin-top: 10px;
        }
      }
    }
    text-align: center;
    padding-top: 35px;
  }
  .my-head{
    >img{
      display: block;
      margin: auto;
    }
    >img:first-of-type{
      width: 72px;
      height:72px;
      margin-top: 55px;
      border-radius: 50%;
    }
    >img:last-of-type{
      width: 18px;
      height: 18px;
      margin-bottom: 5px;
    }
    >p{
      margin: 5px auto;
    }
    >p:first-of-type{
    }
    >p:last-of-type{
      font-size: 14px;
    }
    line-height: 34px;
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
