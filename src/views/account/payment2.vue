<template>
  <div>
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">{{title}}</div>
    </div>
    <div class="payment2-content">
      <div class="money-box"><span>¥</span>{{money}}</div>
      <p class="single-line" v-if="remark">备注: {{remark}}</p>
      <p v-if="payType=='账户余额'">{{payType}}</p>
      <template v-else>
        <!-- <div :class="bankCard.type" @click="showCard=!showCard" :data-id="bankCard.id">
          {{bankCard.name}}
          <span :class="{active:showCard}" class="right-arrow"></span>
        </div> -->
        <template v-if="showCard">
          <div v-if="showAddCard" class="add" @click="$router.push({path:$route.path.replace('/account/payment2','/account/no-card?type=withdraw')})">
            添加银行卡
          </div>
          <!--@click="$router.push({path:'account/choose-card'})" 选卡-->
          <div v-if="!showAddCard" style="background:none">
            <img :src="bankCard[0].icon" style="width:25px;position:relative;top:5px">
            {{bankCard[0].bankName}}（ {{bankCard[0].bankCardTailNumber}}）
          </div>
        </template>
      </template>
    </div>
    <div class="confirm-btn" style="position: absolute;bottom:120px;left: 0;right: 0" @click="payBtn">确认</div>
    <transition :name="trans">
      <router-view v-dom-portal class="router-container"></router-view>
    </transition>
    <pay-board v-model="showSettle" :selectCard="false" :hideMask="true" :paid="money"
               @hasPaid="handleWithdraw"></pay-board>
  </div>
</template>
<style lang="less" scoped>
  .payment2-content {
    > div:nth-child(n+2) {
      // padding-left: 45px;
      height: 61px;
      line-height: 60px;
      color: #788A96;
      font-size: 16px;
      text-align: left;
      &.add {
        background-image: url("../../assets/img/bank-add.png");
        padding-left: 45px
      }
      background: url('../../assets/img/bank-icbc.png') no-repeat 0 center;
      border-bottom: 1px solid #f0f0f0;
    }
    text-align: center;
    color: #788A96;
    > p {
      font-size: 14px;
      line-height: 20px;
      margin: 5px 15px;
    }
    > div.money-box {
      margin-top: 75px;
      line-height: 62px;
      font-size: 44px;
      > span {
        font-size: 25px;
        color: #9DAEB9;
        margin-right: 5px;
      }
    }
    > img {
      width: 60px;
      height: 60px;
      margin: 30px auto 5px;
    }
    padding: 0 45px;
  }
</style>
<script>
  import {JSEncrypt} from 'jsencrypt'
  import {apiService} from "@/utils/apiservice.js";
  import payBoard from '../../components/common/payboard.vue'
  import {config} from '@/utils/config'
  export default {
    data() {
      return {
        showAddCard: false,//一期
        secrutyKey: 'null',
        showSettle: false,
        showCard: true,
        trans: 'slide',
        money: 10000,
        remark: null,
        title: null,
        bankCard: [],
        payType: '',
        newPwd: ''
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.path == '/account/payment2' || from.path == '/account/payment2') {
        this.trans = 'slide'
      } else {
        this.trans = ''
      }
      this.$nextTick(() => {
        next()
      })
    },
    mounted() {
      this.money = this.$route.query.money || 30000
      this.remark = this.$route.query.remark
      this.title = this.$route.query.title
      this.payType = this.$route.query.payType
      this.secrutyKey = this.$route.query.secrutyKey
      var data = JSON.stringify({"encrptCardNo": ""})
      apiService.withDrawIndex(this, data, this.withDrawIndexCallback)
    },
    methods: {
      getKey() {
       let cipherType = ""
        let newpayPwd = ""
        //if (obj.data.data.pubKey) {
          cipherType = 1
         // let datas = {"shaKey": obj.data.data.key, "pubKey": obj.data.data.pubKey}
        // cryptico.setPublicKeyString(datas)
        // let newpayPwdObj = cryptico.encryptV1(this.newPwd);
        // if (newpayPwdObj.status == "success") {
        //   newpayPwd = newpayPwdObj.cipher.replace(/\+/g, '%2B');
        // }
          let publicKey=this.secrutyKey
          // if (publicKey.indexOf('-----') < 0 ) {
          //   publicKey = "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----";
          // }
          var jsencrypt = new JSEncrypt();
          var subStr=/\r\n|\r|\n|\n\r/;
          // var subStr=new RegExp('/r/n');
          var result=publicKey.replace(subStr,"");
          result = result.replace(/\r\n/g,"")
          result = result.replace(/\n/g,"");
          result = result.replace(/\n\r/g,"")
          result = result.replace(/\r/g,"");
        if (result.indexOf('-----') < 0 ) {
          result = "-----BEGIN PUBLIC KEY-----" + result + "-----END PUBLIC KEY-----";
        }
          jsencrypt.setPublicKey(result);
          newpayPwd= encodeURIComponent(jsencrypt.encrypt(this.newPwd))
        // } else {
        //   cipherType = 0
        //   newpayPwd = payPwd
        // }
        let withDrawData = {
          "amount": this.money,
          "bankCardId": this.bankCard[0].bankCardId,
          "payPwd": newpayPwd,
          "cipherType": cipherType
        }
        apiService.handleWithdraw(this, withDrawData, this.handleWithdrawCallBack)
      },
      payBtn() {
        if (this.showAddCard) {
          window.HMO_APP.$vux.toast.show({
            text: "请添加银行卡"
          })
          return
        }
        this.showSettle = true
      },
      withDrawIndexCallback(obj) {
        if (obj.data.code == "00000") {
          if (obj.data.data.withdrawCardList.length > 0) {
            this.showAddCard = false
            this.bankCard = obj.data.data.withdrawCardList;
            this.secrutyKey = obj.data.data.secrutyKey
          }
        }
      },
      handleWithdraw(payPwd) {
        this.newPwd = payPwd
        this.getKey()
       // apiService.commonkey(this, this.getKey)
      },
      handleWithdrawCallBack(obj) {
        if (obj.data.code == "00000") {
          window.location.reload()
          window.location.replace(config.domainPersonal+'/#/account/success')
        } else {
          window.HMO_APP.$vux.toast.show({
            text: obj.data.msg
          })
        }
      }
    },
    components: {
      payBoard
    }
  }
</script>
