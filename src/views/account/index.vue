<template>
  <div>
    <div class="app-head1">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title1">有钱</div>
      <!--<div class="nav-right" @click="$router.push({path:$route.path.replace('/account/index','/my/setting')})">设置</div>-->
      <div class="nav-right nav-more" @click="$router.push({path:$route.path.replace('/account/index','/my/setting')})">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="account-box">
      <div class="account-head common-main-bg clearM">
        <p @click="accountDetailBind">资产总额</p>
        <p @click="accountDetailBind">
          {{accountBalance}}</p>
        <!--<p @click="$router.push({path: $route.path.replace('/account/index', '/account/detail')})">资产总额</p>-->
        <!--<p @click="$router.push({path: $route.path.replace('/account/index', '/account/detail')})">-->
          <!--{{accountBalance}}</p>-->
        <!-- <p>昨日收益+0.56</p> -->
      </div>
      <div class="account-body">
        <div class="flex-container">
          <div class="flex-item-1" @click="rechargeBind">
          <!--<div class="flex-item-1" @click="rechargeBind">-->
            <img src="../../assets/img/account-recharge.png">
            <p>充值</p>
          </div>
          <!--<div class="flex-item-1" @click="$router.push({path: '/account/transfer'})">-->
          <div class="flex-item-1" @click="showTip">
            <img src="../../assets/img/account-transfer.png">
            <p>转账</p>
          </div>
          <div class="flex-item-1" @click="withdrawBind">
          <!--<div class="flex-item-1">availableBalance-->
            <img src="../../assets/img/account-withdraw.png">
            <p>提现</p>
          </div>
        </div>
        <div class="flex-container">
          <!--<div class="flex-item-1" @click="$router.push({path: '/account/collection'})">-->
          <div class="flex-item-1" @click="showTip">
            <img src="../../assets/img/account-collection.png">
            <p>收款</p>
          </div>
          <div class="flex-item-1" @click="showTip">
          <!--<div class="flex-item-1" @click="$router.push({path: '/account/chest'})">-->
            <img src="../../assets/img/account-chest.png">
            <p>金库</p>
          </div>
          <div class="flex-item-1"  @click="chooseBankCard">
          <!--<div class="flex-item-1" @click="$router.push({path: '/account/card'})">-->
            <img src="../../assets/img/account-card.png">
            <p>银行卡</p>
          </div>
        </div>
      </div>
    </div>
    <!--<div style="text-align: center;font-size: 20px;position: absolute;bottom: 20px;width: 100%">敬请期待！</div>-->
  </div>
</template>
<style lang="less" scoped>
  .account-body {
    font-size: 14px;
    > div:first-child {
      margin-bottom: 49px;
    }
    > div {
      > div {
        > img {
          width: 40px;
          height: 40px;
        }
        > p {
          line-height: 20px;
          margin-top: 4px;
        }
      }
    }
    text-align: center;
    padding-top: 35px;
  }

  .account-head {
    > p:first-child {
      margin: 74px 0 6px;
    }
    > p:nth-child(2) {
      font-size: 36px;
      line-height: 50px;
    }
    line-height: 22px;
  }
  .nav-more{
    width: 23px;
    height: 24px;
  }
  .nav-more > span{
    float: left;
    background: #fff;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin: 9px 0;
  }
  .nav-more > span:nth-child(2) {
    margin: 8px 3px;
    width: 7px;
    height: 7px;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  export default {
    data() {
      return {
        accountBalance: '0'
      }
    },
    mounted() {
      // var data = JSON.stringify({"encrptCardNo": ""})
      apiService.queryEnterAccountInfo(this, this.balanceCallBack);
    },
    methods: {
      accountDetailBind(){
        apiService.accountDetailBind(this, function (data) {
          if(data.data.success){
            window.location.href=data.data.data
          }else{
            window.HMO_APP.$vux.toast.show({
              text: data.data.msg
            })
          }
        })
      },
      withdrawBind(){
        apiService.withdrawBind(this, function (data) {
          if(data.data.success){
            window.location.href=data.data.data
          }else{
            window.HMO_APP.$vux.toast.show({
              text: data.data.msg
            })
          }
        })
      },
      rechargeBind() {
        apiService.rechargeBind(this, function (data) {
          if(data.data.success){
            window.location.href=data.data.data
          }else{
            window.HMO_APP.$vux.toast.show({
              text: data.data.msg
            })
          }
        })
      },
      chooseBankCard(){
        apiService.bankCardBind(this, function (data) {
          if(data.data.success){
            window.location.href=data.data.data
          }else{
            window.HMO_APP.$vux.toast.show({
              text: data.data.msg
            })
          }
        })
      },

      // checkWithdraw() {
      //    apiService.checkWithdraw(this, this.checkWithdrawCallback)
      // },
      // checkWithdrawCallback(obj) {
      //
      //   if (obj.data.code == '00000') {
      //     this.$router.push({'path': '/account/withdraw'})
      //   } else if (obj.data.code == '00006') {
      //     window.HMO_APP.$vux.toast.show({
      //       text: obj.data.msg
      //     })
      //     this.$router.push({'path': '/identify/real_name'})
      //     return
      //   } else if (obj.data.code == '00007') {
      //     window.HMO_APP.$vux.toast.show({
      //       text: obj.data.msg
      //     })
      //     return
      //   } else if (obj.data.code == '00008') {
      //     window.HMO_APP.$vux.toast.show({
      //       text: obj.data.msg
      //     })
      //     return
      //   }
      // },
      // checkRechargeCallBack(obj) {
      //   if (obj.data.code == '00000') {
      //     this.$router.push({'path': '/account/recharge'})
      //   } else {
      //     //00007 未实名 实名模块走完后，需自动跳转到充值主页
      //     window.HMO_APP.$vux.toast.show({
      //       text: obj.data.msg
      //     })
      //     return
      //   }
      // },
      balanceCallBack(obj) {
        console.log(obj)
        let _this=this
        // if(obj.data.code=="00000"){
          _this.accountBalance = obj.data.data.availableBalance
          _this.$store.dispatch('setUserInfo', {"accountBalance": this.accountBalance})
        // }else{
        //   window.HMO_APP.$vux.toast.show({
        //     text:obj.data.data.msg
        //   })
        // }
      },
      showTip(){
        window.HMO_APP.$vux.toast.show({
          text: '敬请期待'
        })
      }
    },
    components: {}
  }
</script>
