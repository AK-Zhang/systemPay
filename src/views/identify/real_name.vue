<template>
  <div class="">
    <div class="app-head">
      <span class="nav-left" @click="back"></span>
      <div class="app-title">设置密码</div>
    </div>
    <div class="status-3-box">
      <div class="app-body-2">
        <span v-if="!showTitleName">短信验证码</span>
        <validate-code :mobile="mobile" @passCheck="passCheck" :type="password"></validate-code>
      </div>
    </div>
  </div>
</template>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import validateCode from '@/components/common/validateCode.vue'

  export default {
    name: 'realName',
    components: {
      validateCode
    },
    data() {
      return {
        password: 'password',
        mobile: '',
        verifyNum: 60,
        secrutyKey: '',
        vue: null,
        pubKey: '',//公钥
        apiService: null,
        verifyCode: '',

      }
    },
    create() {
      this.mobile=this.$route.query.mobile

    },
    methods: {
      back(){
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/index')
      },
      // verifyForReal 验证验证码
      validSms(sendms) {
        this.verifyCode = sendms.sendms
        let dataPamas = {"verifyCode": this.verifyCode, "phone": this.mobile}
        this.apiService.validSms(this, dataPamas, this.validSmsCallBack)
      },
      validSmsCallBack(obj) {
        this.$router.push({'path': this.$route.path.replace('/identify/real_name', '/account/no-apply/identify/password')})
      },
      payPasswordIndexCallBack(obj) {
        if (obj.status == "200") {
          this.secrutyKey = obj.data.secrutyKey
        }
        let dataPamas = JSON.stringify({"salt": ""})
        //this.apiService.commonkey(this, dataPamas, this.commonkeyCallBack)
      },
      commonkeyCallBack(obj) {
        this.pubKey = obj.data.data.pubKey
        let cardCert = ""
        if (!this.secrutyKey) {
          cardCert = this.mobile
        } else {
          cardCert = this.mobile
        }
      },
      sendValidSmsCallBack(obj) {
      },
      passCheck(sendms) {
        this.$router.push({'path': this.$route.path.replace('/identify/real_name', '/identify/password')})
      },
    },
    mounted() {
      var _this = this;
      this.vue = this;
      this.apiService = apiService
      apiService.payPasswordIndex(this, _this.payPasswordIndexCallBack)
    }
  }
</script>

<style lang="less" scoped>
  .wraper {
    width: 100%;
  }

  .app-body-2 {
    position: absolute;
    left: 15px;
    right: 15px;
    padding: 25px 0 0 15px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    top: 134px;
    bottom: 90px;
  }
</style>
