<template>
  <div>
    <div class="app-head white-bg">
      <span class="nav-left" @click="back"></span>
      <div class="app-title">提现</div>
    </div>
    <div class="recharge-body">
      <div :class="money?'active':''">
        <span>¥</span>
        <div @click="money=maxMoney">全部提现</div>
        <p v-if="money" @click="showKeyboard=true">
          {{money}}
          <!--<img src="../../assets/img/password-blink.gif">-->
        </p>
        <p v-else @click="showKeyboard=true">
          <img src="../../assets/img/password-blink.gif">{{'可提现' + maxMoney}}
        </p>
      </div>
      <!--<p>转账方式</p>-->
      <!--<div class="withdraw-rule border-bottom-1">-->
      <!--<span class="radio-btn1" :class="{active:rule==1}" @click="rule=1"></span>-->
      <!--<div>-->
      <!--<p>2小时到账</p>-->
      <!--<p>单笔5万，单日5次，日限额15万</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="withdraw-rule border-bottom-1">-->
      <!--<span class="radio-btn1" :class="{active:rule==2}" @click="rule=2"></span>-->
      <!--<div>-->
      <!--<p>隔日到账</p>-->
      <!--<p>单笔限额100万</p>-->
      <!--</div>-->
      <!--</div>-->
      <div class="confirm-btn" @click="confirmSettle">确认</div>
    </div>
    <transition :name="trans">
      <router-view v-dom-portal @chooseCard="chooseCard" class="router-container"></router-view>
    </transition>
    <keyboard :initResult="money" v-model="showKeyboard" :canMin="true" :hideMask="true" :hasDec="true" @result="modNum"
              @done="confirmSettle"></keyboard>
  </div>
</template>
<style lang="less" scoped>
  * {
    touch-action: none;
  }

  .recharge-body {
    .withdraw-rule {
      > span {
        margin-top: 4px;
      }
      > div {
        margin-left: 30px;
        > p:first-child {
          line-height: 23px;
          font-size: 16px;
          color: #788A96;
          margin-bottom: 5px;
        }
        > p:last-child {
          line-height: 20px;
          font-size: 14px;
          color: #9DAEB9;
          margin-bottom: 10px;
        }
      }
      margin-top: 13px;
    }
    > div:nth-child(1) {
      > div {
        float: right;
        font-size: 15px;
        color: #FCAD57;
      }
      &.active {
        > p {
          color: #788A96;
          font-size: 44px;
          vertical-align: middle;
          > img {
            top: 6px;
          }
        }
      }
      > p {
        line-height: 100px;
        font-size: 15px;
        margin: 0 65px 0 40px;
      }
      color: #9DAEB9;
      height: 101px;
      line-height: 100px;
      border-bottom: 1px solid #f0f0f0;
      img {
        height: 44px;
        position: relative;
        top: 16px;
        width: 2px;
      }
      span {
        float: left;
        font-size: 34px;
        margin-right: 23px;
        color: #788A96;
      }
    }
    > p {
      line-height: 20px;
      font-size: 14px;
      margin: 15px 0 6px 0;
      color: #9DAEB9;
    }
    padding: 0 15px;
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import {config} from '@/utils/config'
  export default {
    data() {
      return {
        money: null,
        maxMoney: '',
        trans: 'slide',
        showKeyboard: true,
        rule: 1,
        secrutyKey: ''
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path == '/account/withdraw' || from.path == '/account/withdraw') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted() {
      apiService.checkWithdraw(this, this.checkWithdrawCallback)

    },
    methods: {
      back(){
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/index')
      },
      // 未设置支付密码跳转
      checkWithdrawCallback(obj) {
        let _this=this
        if (obj.data.code == '00000') {
          var data = JSON.stringify({"encrptCardNo": ""})
          apiService.withDrawIndex(_this, data, _this.withDrawIndexCallback)
          // this.$router.push({'path': '/account/withdraw'})
        } else if (obj.data.code == '00006') {
          window.HMO_APP.$vux.toast.show({
            text: obj.data.msg
          })
          this.$router.push({'path': '/identify/real_name'})
          return
        } else if (obj.data.code == '00007') {
          window.HMO_APP.$vux.toast.show({
            text: obj.data.msg
          })
          return
        } else if (obj.data.code == '00008') {
          window.HMO_APP.$vux.toast.show({
            text: obj.data.msg
          })
          return
        }
      },
      withDrawIndexCallback(obj) {
        if (obj.data.code == "00000") {
          this.maxMoney = obj.data.data.withdrawAmount
          //	secrutyKey	支付密码加密公钥	必填 如果为null，则可以暂用明文传输
          this.secrutyKey = obj.data.data.secrutyKey
        }
      },
      /**
       * 确认充值
       * */
      confirmSettle() {
        if (this.money > 0) {
          this.showKeyboard = false
          this.$router.push({
            path: '/account/payment2',
            query: {title: '提现', money: this.money, payType: '中国工商银行', secrutyKey: this.secrutyKey}
          })
        }
      },
      /**
       * 修改金额
       * */
      modNum(v) {
        if (parseFloat(v) > this.maxMoney) return
        this.money = v
      },
      chooseCard(item) {
        this.bankCard = item
      }
    },
    components: {}
  }
</script>
