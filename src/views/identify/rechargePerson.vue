<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">充值短信验证</div>
    </div>
     <div class="app-body-2">
        <validate-code :mobile="mobile" @passCheck="passCheck" :type="type" @sendSmsAgin="sendSmsAgin"></validate-code>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .card-box {
    position: absolute;
    right: 27px;
    top: 59px;
    color: #9DAEB9;
    font-size: 14px;
    line-height: 22px;
  }
</style>
<script>

  import {apiService} from "@/utils/apiservice.js";
  import {mapGetters} from 'vuex'
  import validateCode from '@/components/common/validateCode.vue'

  export default {
    name: 'rechargePerson',
    data() {
      return {
        account: null,  //银行卡号
        code: '',
        mobile: '',  // 银行预留手机号
        creditCard: false,
        verifyNum: null,
        forgetPassword: false,
        process: 1,
        showTitleName: false,
        bankCard: [],
        currentBankCardId: '',
        money: '',
        signNo: '',//快捷签约号
        tradeNo: '',//交易流水号
        smsCode: '',
        apiService: null,
        showDes: '银行卡',
        secrutyKey: '',//公钥
        type: 'rechage',
        name: '',
        idNo: ''

      }
    },
    watch: {
      $route(to, from) {
        // console.log(to.path)
        // console.log("实名")
      }
    },
    mounted() {
      $(".key-box").css({display:'none'})
        this.showTitleName = true
        this.forgetPassword = "充值"
        this.type = "rechage"
        this.showDes = "银行卡短信验证码"
        this.bankCard = JSON.parse(this.$route.query.bankCard)
        this.currentBankCardId = this.bankCard[0].bankCardId
        this.mobile = this.bankCard[0].bankcardTel;
        this.money = this.$route.query.money;
    },
    methods: {
      sendSmsAgin() {
        var data = {"bankCardId": this.currentBankCardId, "amount": this.money}
        apiService.sendValidateSms(this, data, this.sendValidateSmsCallback)
      },
      // payPasswordIndexCallBack(obj) {
      //   if (obj.status == "200") {
      //     this.secrutyKey = obj.data.secrutyKey
      //   }
      //   // 获取公钥salt
      //   let dataPamas = JSON.stringify({"salt": ""})
      //   this.apiService.commonkey(this, dataPamas, this.commonkeyCallBack)
      // },
      // commonkeyCallBack(obj) {
      //   this.pubKey = obj.data.data.pubKey
      //   if (this.secrutyKey != '1') {
      //     cardCert = this.mobile
      //   } else {
      //     cardCert = this.mobile
      //   }
      //   let dataPamas = {"cardCert": cardCert, "key": this.pubKey, "cipherType": this.secrutyKey}
      //   // this.apiService.sendValidSms(this, dataPamas, this.sendValidSmsCallBack)
      // },
      // validSms() {
      //   let dataPamas = JSON.stringify({"verifyCode": this.smsCode, "phone": this.mobile})
      //   this.apiService.validSms(this, dataPamas, this.validSmsCallBack)
      // },
      // validSmsCallBack(obj) {
      //   _this.$router.push({path: _this.$route.path.replace('/identify/real_name', '/account/no-apply/identify/password')})
      // },
      handleRechargeCallback(obj) {
        console.log(obj)
        if (obj.data.code == "00000") {
          this.$router.push({'path': '/cashier/success'})
        } else {
        }
      },
      passCheck(sendms) {
        this.smsCode = sendms.sendms
        this.nextProcess()
      },
      back() {
          this.$router.go(-1)
      },
      sendValidateSmsCallback(obj) {
        if (obj.data.code == "00000") {
          this.signNo = obj.data.data.signNo
          this.tradeNo = obj.data.data.tradeNo
        }
      },
      nextProcess(e) {
        console.log(e)
        try {
          // 获取token
          var riskInfo = getJdEid();
          var data = {
            "amount": this.money,
            "bankCardId": this.currentBankCardId,
            "tradeNo": this.tradeNo,
            "smsCode": this.smsCode,
            "signNo": this.signNo,
            "eid": riskInfo.eid,
            "jsContent": riskInfo.fp
          }
          console.log(riskInfo)
          this.apiService.handleRecharge(this, data, this.handleRechargeCallback)
        } catch (e) {
        }
      },
     },
   components: {
      validateCode
   }

  }
</script>
