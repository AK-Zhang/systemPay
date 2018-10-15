<template>
    <div>
      <head-bar title="我的二维码"></head-bar>
      <div class="app-body-1 qrcode-body">
        <div>
          <img src="../../assets/img/my-icon.png">
          <div>
            <p>好象君</p>
            <p>ID:18876289</p>
          </div>
        </div>
        <img src="../../assets/img/my-qrcode.png">
        <p>扫一扫上面的二维码，加我为好友</p>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .qrcode-body{
    >div:first-child{
      >img{
        float: left;
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }
      >div{
        margin-left: 71px;
        >p:first-child{
          color: #373F47;
          font-size: 18px;
          line-height: 34px;
        }
      }
    }
    >img{
      display: block;
      margin: 37px auto 25px;
    }
    >p{
      text-align: center;
    }
    color: #B4C0CB;
    font-size: 12px;
    line-height: 17px;
    bottom: auto;
    background: #fff;
    padding: 26px 25px;
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
