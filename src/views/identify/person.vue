<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div v-if="!showTitleName" class="app-title">{{forgetPassword ? '找回密码' : '认证'}}</div>
      <div v-if="showTitleName" class="app-title">{{forgetPassword }}</div>
    </div>
    <process v-if="!forgetPassword" :process="process"></process>
    <div class="app-body-2">
      <span v-if="!showTitleName"></span>
      <!-- <span v-if="showTitleName">{{showDes}}</span> -->
      <div v-show="process==1">
        <d-input v-model="account" title="银行卡号" placeholder="请输入银行卡号"></d-input>
        <!-- <div class="card-box" @click="(creditCard=!creditCard)&&(code=null)">
          <span class="radio-btn" :class="{active:creditCard}"></span>
          <span>信用卡</span>
        </div> -->
        <!-- <d-input v-show="creditCard" v-model="code" title="信用卡安全码" placeholder="请输入信用卡安全码"></d-input> -->
        <d-input type="num" v-model="mobile" title="银行预留手机" placeholder="请输入银行预留手机"></d-input>
      </div>
      <!--&lt;!&ndash;hhr start手机号&ndash;&gt;-->
      <!--<div v-if="process==2">-->
      <!--<d-input type="num" v-model="mobile" title="银行预留手机" placeholder="请输入银行预留手机"></d-input>-->
      <!--</div>-->
      <!--&lt;!&ndash;hhr end 手机号&ndash;&gt;-->
      <div v-if="process==2">
        <validate-code :mobile="mobile" @passCheck="passCheck" :type="type" @sendSmsAgin="sendSmsAgin"></validate-code>
      </div>
    </div>
    <div id="fun-main-btn" v-show="process==1" class="fun-main-btn" @click="nextProcess"
         :class="{disabled: creditCard?!(account&&code&&/^1[34578]\d{9}$/.test(mobile)):!(account&&/^1[34578]\d{9}$/.test(mobile))}">
      下一步
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
/*

  Created by lvhan1 on 2018/07/13
  template 中隐掉了选择信用卡 因为信用卡认证的功能没实现  若后期要实现该功能 解掉

*/
  import {apiService} from "@/utils/apiservice.js";
  import {mapGetters} from 'vuex'
  import validateCode from '../../components/common/validateCode.vue'
  import {config} from '@/utils/config'
  export default {
    data() {
      return {
        account: null,  //银行卡号
        code: '',
        // mobile: '18710090378',
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
        name:'',
        idNo:'',
        verifyReqId:""

      }
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    watch:{
      $route (to,from) {
      }
    },
    mounted() {
      this.apiService = apiService;
      if (this.$route.query.forgetPassword) {
        this.forgetPassword = true
        this.process = 2
      }
      if (this.$route.query.forgetPassword == '2') {
        this.showTitleName = true
        this.forgetPassword = "充值"
        this.type = "rechage"
        this.showDes = "银行卡短信验证码"
        this.bankCard = JSON.parse(this.$route.query.bankCard)
        this.currentBankCardId = this.bankCard[0].bankCardId
        this.mobile = this.bankCard[0].bankcardTel;
        this.money = this.$route.query.money;
      }
      if (this.$route.query.forgetPassword == '1') {
        this.type = "password"
        this.showTitleName = true
        this.forgetPassword = "忘记密码"
        this.showDes = "设置密码短信验证码"
        apiService.payPasswordIndex(this, this.payPasswordIndexCallback)
      }
    },
    methods: {
      sendSmsAgin() {
        var data = {"bankCardId": this.currentBankCardId, "amount": this.money}
        apiService.sendValidateSms(this, data, this.sendValidateSmsCallback)
      },
      payPasswordIndexCallBack(obj) {
        if (obj.status == "200") {
          this.secrutyKey = obj.data.secrutyKey
        }
        // 获取公钥salt
        let dataPamas = JSON.stringify({"salt": ""})
        this.apiService.commonkey(this, dataPamas, this.commonkeyCallBack)
      },
      commonkeyCallBack(obj) {
        this.pubKey = obj.data.data.pubKey
        if (this.secrutyKey != '1') {
          cardCert = this.mobile
        } else {
          cardCert = this.mobile
        }
        let dataPamas = {"cardCert": cardCert, "key": this.pubKey, "cipherType": this.secrutyKey}
        // this.apiService.sendValidSms(this, dataPamas, this.sendValidSmsCallBack)
      },
      // sendValidSmsCallBack(obj) {
      // },
      validSms() {
        let dataPamas = JSON.stringify({"verifyCode": this.smsCode, "phone": this.mobile})
        this.apiService.validSms(this, dataPamas, this.validSmsCallBack)
      },
      validSmsCallBack(obj) {
        _this.$router.push({path: _this.$route.path.replace('/identify/real_name', '/account/no-apply/identify/password')})
      },
      handleRechargeCallback(obj) {
        if (obj.data.code == "00000") {
          window.location.replace(config.domainPersonal+'/#/cashier/success')
        } else {
          window.HMO_APP.$vux.toast.show({
            text: res.data.msg
          })
        }
      },
      passCheck(sendms) {
        this.smsCode = sendms.sendms
        this.nextProcess()
      },
      back() {
        if (this.process == 2 && !this.forgetPassword) {
          this.account = null
          this.code = null
          this.mobile = null
          this.creditCard = false
          this.process = 1
        } else {
          this.$router.go(-1)
        }
      },
      sendValidateSmsCallback(obj) {
        if (obj.data.code == "00000") {
          this.signNo = obj.data.data.signNo
          this.tradeNo = obj.data.data.tradeNo
        }
      },
      nextProcess(e) {
        if (!e) {
          let obj = {
            path: this.$route.path.replace('person', 'password')
          }
          if (this.forgetPassword && this.forgetPassword != "充值") {
            obj.query = {
              forgetPassword: 1
            }
            this.$router.replace(obj)
          } else if (this.forgetPassword == "充值") {

          } else if (this.forgetPassword == "1") {

          } else {
            this.$router.push(obj)
          }
        } else {
          if ($(e.target).hasClass('disabled')) return;
          this.idInfo.cardNo = this.account
          this.idInfo.mobile = this.mobile
          this.idInfo.cvv2 = this.code
          this.idInfo.idfa = ""
          this.idInfo.realStatus = true
          this.idInfo.deviceId = ""
          this.idInfo.expMonth = ""
          this.idInfo.macAddress = ""
          this.idInfo.openUdId = ""
          this.idInfo.macAddress = ""
          this.idInfo.expYear = ""
          this.idInfo.id = "123"
          this.idInfo.ip = "127.0.0.1"
          // this.idInfo.verifyReqId = this.verifyReqId
        }
        if (this.forgetPassword != "充值"){
          $("#fun-main-btn").addClass("disabled")
          let _this=this
          this.idInfo.expYear='29'
          this.idInfo.expMonth='08'
          var data=this.idInfo
          var idInfoObj=JSON.stringify(data)
          sessionStorage.setItem('idInfoObj',idInfoObj)
          this.apiService.sendVerifyCode(this,data,function (res) {
            if(!res.data.success){
              window.HMO_APP.$vux.toast.show({
                text: res.data.message
              })
              $("#fun-main-btn").addClass("disabled")

              return
            }else{
              console.log("认证",res.data.data)
              var ver = res.data.data
              sessionStorage.setItem("verifyReqId",ver)
              setTimeout(function () {
                $("#fun-main-btn").removeClass("disabled")
              },1200)
              _this.$router.push({"path": _this.$route.path.replace('/identify/person', '/identify/realName?mobile='+_this.mobile)})
            }
          })
        }
        if (this.forgetPassword == "充值"){
          let _this=this
          try {
            // 获取token
            var riskInfo = getJdEid();
            var data = {
              "amount": _this.money,
              "bankCardId": _this.currentBankCardId,
              "tradeNo": _this.tradeNo,
              "smsCode": _this.smsCode,
              "signNo": _this.signNo,
              "eid": riskInfo.eid,
              "jsContent": riskInfo.fp
            }
            let dataparams="amount="+_this.money+"&bankCardId="+_this.currentBankCardId+"&tradeNo="+ _this.tradeNo+"&smsCode="+ _this.smsCode+"&signNo="+ _this.signNo+"&eid="+riskInfo.eid+"&jsContent="+riskInfo.fp
            _this.apiService.handleRecharge(this, dataparams, _this.handleRechargeCallback)
          } catch (e) {
          }
        }
      }

    },
    components: {
      validateCode
    }
  }
</script>
